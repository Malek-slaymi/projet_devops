// Jenkinsfile (Pipeline as Code)
pipeline {
    // Définir l'environnement où le pipeline s'exécutera (ex: un agent Docker/Jenkins)
    agent any

    // Définir les variables globales
    environment {
        // Tag par défaut, sera surchargé pour le pipeline versionné
        DOCKER_IMAGE = "my-devops-app:${env.BUILD_NUMBER}"
        # Mettre à jour le port si votre application utilise un autre port
        APP_PORT = 8080 
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Clonage du dépôt..."
                // Cloner le code (Jenkins le fait automatiquement dans les pipelines SCM)
                // Assurez-vous d'utiliser la bonne branche/tag/PR
                checkout scm
            }
        }

        stage('Setup Dependencies') {
            steps {
                echo "Installation des dépendances (npm install)..."
                sh 'npm install'
            }
        }

        stage('Build & Dockerize') {
            steps {
                script {
                    // Logique pour le Pipeline 3 (Tag) :
                    if (env.TAG_NAME) {
                        env.DOCKER_IMAGE = "my-devops-app:${env.TAG_NAME}"
                    }
                    echo "Construction de l'image Docker: ${DOCKER_IMAGE}"
                    // Construction du Dockerfile Multi-Stage
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Run (Docker)') {
            steps {
                echo "Lancement du conteneur..."
                // Lancer l'image en arrière-plan
                sh "docker run -d --name test-app -p ${APP_PORT}:${APP_PORT} ${DOCKER_IMAGE}"
            }
        }

        stage('Smoke Test') {
            steps {
                echo "Exécution du script de smoke test..."
                // Exécuter le script créé précédemment
                sh './smoke_test.sh'
            }
        }
        
        // --- Exigence de Parallélisation (Mettre ce stage dans le Pipeline 2 uniquement) ---
        stage('Parallel Tests (Exemple)') {
            when { 
                // Cette condition doit être gérée dans la configuration du Job Jenkins 2
                // OU en ajoutant une condition ici basée sur la branche env.BRANCH_NAME == 'dev'
                expression { return env.BRANCH_NAME == 'dev' } 
            }
            parallel {
                stage('Test Node 18') {
                    steps {
                        echo "Tests unitaires sur environnement 1..."
                        // Exemple: Lancer des tests avec une version spécifique
                        // sh 'docker run --rm node:18-alpine npm test' 
                    }
                }
                stage('Test Node 20') {
                    steps {
                        echo "Tests unitaires sur environnement 2..."
                        // sh 'docker run --rm node:20-alpine npm test'
                    }
                }
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                echo "Archivage des artefacts (logs et résultats)..."
                // Archiver le résultat du smoke test (Passed/Failed)
                archiveArtifacts artifacts: 'smoke_result.txt', fingerprint: true
                // Archiver les logs de build (nécessite une redirection dans les étapes 'sh')
                // archiveArtifacts artifacts: 'build_log.txt', onlyIfSuccessful: true
            }
        }
    }

    // Un bloc pour nettoyer l'environnement (Recommandé)
    post {
        always {
            stage('Cleanup') {
                steps {
                    echo "Arrêt et suppression du conteneur de test..."
                    sh 'docker rm -f test-app || true' // '|| true' pour ne pas échouer si le conteneur n'existe pas
                }
            }
        }
    }
}