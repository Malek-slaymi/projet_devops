pipeline {
    // Agent pour Windows. Exécute le job directement sur la machine hôte.
    agent any

    stages {
        
       
        // Pipeline 1 & 2: Build & Smoke Test (Pour PR / Push 'dev')
        
        stage('Build & Smoke Test') {
            when { 
                // Exécuter si ce n'est PAS un tag
                not { tag 'V.*' } 
            }
            steps {
                echo '=== 1. Checkout (Fait automatiquement) ==='
                
                // *** FOCUS DE DIAGNOSTIC ***
                echo '=== 2. Setup (npm install) ==='
                // La commande 'bat' est requise pour Windows.
                bat 'npm install'
                
                echo '=== 3. Build (npm run build) ==='
                bat 'npm run build'
                // *** FIN DU FOCUS DE DIAGNOSTIC ***
                
                
                // NOTE: Les étapes Docker/Smoke Test sont commentées pour identifier l'échec 'npm'
                
                /*
                echo '=== 4. Run (Docker Build) ==='
                bat "docker build -t react-app:${env.BUILD_NUMBER} ."
                
                echo '=== 5. Smoke Test ==='
                bat "docker run --rm -d -p 8080:80 --name test-app react-app:${env.BUILD_NUMBER}"
                bat 'timeout /t 10' 
                bat 'curl -f http://localhost:8080' 
                bat 'docker stop test-app'

                echo '=== 6. Archive Artifacts ==='
                // Archive les fichiers de construction pour les télécharger
                archiveArtifacts artifacts: 'build/**/*', fingerprint: true
                */
            }
        }
        
        
        
        // Pipeline 3: Build Versionné (Pour Push de Tag V.X.Y.Z)
        
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
                
                // LOGIQUE DE PUSH NON INCLUSE - À AJOUTER UNE FOIS LE BUILD RÉUSSI
            }
        }
    }
}
