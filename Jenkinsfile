pipeline {
    // Agent pour Windows. Exécute le job directement sur la machine hôte.
    agent any

    stages {
        
        
        // Pipeline 1 & 2: Build & Smoke Test (Pour PR / Push 'dev')
        // Exigences : Build & Smoke sur PR, Build complet sur push (dev)
        
        stage('Build & Smoke Test') {
            when { 
                // Exécuter si ce n'est PAS un tag (pour les PR et les Pushes)
                not { tag 'V.*' } 
            }
            steps {
                echo '=== 1. Checkout (Fait automatiquement) ==='
                
                echo '=== 2. Setup (npm install) ==='
                bat 'npm install'
                
                echo '=== 3. Build (npm run build) ==='
                bat 'npm run build'
                
                echo '=== 4. Run (Docker Build) ==='
                // Construit l'image à partir du Dockerfile
                bat "docker build -t react-app:${env.BUILD_NUMBER} ."
                
                echo '=== 5. Smoke Test ==='
                // Lance le conteneur en arrière-plan et expose le port 8080 de l'hôte
                bat "docker run --rm -d -p 8080:80 --name test-app react-app:${env.BUILD_NUMBER}"
                // Attend 10 secondes que le conteneur démarre
                bat 'timeout /t 10' 
                // Vérifie la connectivité (l'option -f force l'échec si la connexion échoue ou renvoie une erreur HTTP)
                bat 'curl -f http://localhost:8080' 
                // Arrête le conteneur de test
                bat 'docker stop test-app'

                echo '=== 6. Archive Artifacts ==='
                // Archive les fichiers de construction pour les télécharger et les vérifier (Exigence: Archiver les artefacts)
                archiveArtifacts artifacts: 'build/**/*', fingerprint: true
            }
        }
        
        
        
        // Pipeline 3: Build Versionné (Pour Push de Tag V.X.Y.Z)
        // Exigence : Build versionné (tag V.X.Y.Z)
        
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
                // Construit l'image avec le nom du tag comme version
                bat "docker build -t mon-registry/mon-app:${env.TAG_NAME} ."
                
                // NOTE: Ajoutez ici la commande 'docker push mon-registry/mon-app:${env.TAG_NAME}' si vous avez un registre.
            }
        }
    }
}
