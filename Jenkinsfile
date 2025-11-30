pipeline {
    // 1. Définir l'Agent : Utiliser l'hôte Windows directement
    agent any

    stages {
        
        // Pipeline 1 & 2: Build & Smoke Test (Pour Pull Requests / Push sur dev)
        
        stage('Build & Smoke Test') {
            when { 
                // Exécuter si ce n'est PAS un tag (pour les PR et les Pushes)
                not { tag 'V.*' } 
            }
            steps {
                echo '=== 1. Checkout (Fait automatiquement) ==='
                
                echo '=== 2. Setup (npm install) ==='
                // Utilisation de 'bat' pour les commandes Windows
                bat 'npm install'
                
                echo '=== 3. Build (npm run build) ==='
                bat 'npm run build'
                
                echo '=== 4. Run (Docker Build) ==='
                // Nécessite que Docker Desktop soit en cours d'exécution
                bat "docker build -t react-app:${env.BUILD_NUMBER} ."
                
                echo '=== 5. Smoke Test ==='
                // Lance l'application avec redirection de port (nécessite le port 8080 libre)
                bat "docker run --rm -d -p 8080:80 --name test-app react-app:${env.BUILD_NUMBER}"
                // Laisser le temps à l'application de démarrer
                bat 'timeout /t 10' 
                
                // Test de connectivité simple (curl est souvent disponible sur Windows 10/11)
                // Le test échouera si l'application ne répond pas.
                bat 'curl -f http://localhost:8080' 
                
                // Arrêter le conteneur de test
                bat 'docker stop test-app'

                echo '=== 6. Archive Artifacts ==='
                // Archive les fichiers de construction pour les télécharger et les vérifier
                archiveArtifacts artifacts: 'build/**/*', fingerprint: true
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
                
                // *** LOGIQUE DE PUSH ICI ***
                // Vous devrez ajouter l'authentification Docker Hub/Registry ici
            }
        }
    }
}
