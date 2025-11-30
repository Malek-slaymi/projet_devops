pipeline {
    agent any {
       
        docker {
            image 'node:lts-slim'
            args '-v /var/run/docker.sock:/var/run/docker.sock' 
        }
    }

    stages {

        // STAGE 1 & 2: Build & Smoke Test (Pour Pull Requests / Push sur dev)
        
        stage('Build & Test') {
            when { 
                // Exécuter si ce n'est PAS un tag (pour les PR et les Pushes)
                not { tag 'V.*' } 
            }
            steps {
                echo '=== 1. Checkout (Fait automatiquement) ==='
                // Stage Checkout implicite

                echo '=== 2. Setup (npm install) ==='
                bat 'npm install'
                
                echo '=== 3. Build (npm run build) ==='
                bat 'npm run build'
                
                echo '=== 4. Run (Docker Build) ==='
                // Nécessite le Dockerfile dans le dépôt
                bat "docker build -t react-app:${env.BUILD_NUMBER} ."
                
                echo '=== 5. Smoke Test ==='
                // Lance l'application avec redirection de port
                bat "docker run --rm -d -p 8080:80 --name test-app react-app:${env.BUILD_NUMBER}"
                bat 'sleep 10' 
                
                // Test de connectivité en utilisant l'adresse de l'hôte Docker
                bat 'curl -f http://host.docker.internal:8080 || curl -f http://172.17.0.1:8080 || exit 1' 
                
                // Arrêter le conteneur de test
                bat 'docker stop test-app'

                echo '=== 6. Archive Artifacts ==='
                // Archive les fichiers de construction pour les télécharger et les vérifier
                archiveArtifacts artifacts: 'build/**/*', fingerprint: true
            }
        }
        
        
        // STAGE 3: Build Versionné (Pour Push de Tag V.X.Y.Z)
      
        stage('Docker Release & Push') {
            when {
                // S'exécuter UNIQUEMENT si un tag V.* est poussé
                tag 'V.*' 
            }
            steps {
                echo "=== Build de la version finale ${env.TAG_NAME} ==="
                bat 'npm install'
                bat 'npm run build'
                
                echo '=== Dockerisation et Tagging ==='
                bat "docker build -t mon-registry/mon-app:${env.TAG_NAME} ."
                
                // --- AJOUTER LA LOGIQUE DE PUSH ICI UNE FOIS LES CRÉDENTIELS CONFIGURÉS ---
                // withCredentials(...) { sh "docker push ..." }
            }
        }
    }
}
