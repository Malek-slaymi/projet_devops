pipeline {
    agent any
    stages {
        // Pipeline 1 & 2: Build & Test (PRs / Push to dev)
        stage('Build & Test') {
            when { 
                // Exécuter si ce n'est PAS un tag (pour exclure le pipeline 3)
                not { buildingTag() } 
            }
            steps {
                // ... Vos étapes de Checkout, Setup, Build, Smoke, etc.
                echo "Running Build and Smoke Test for ${env.BRANCH_NAME}"
            }
        }

        // Pipeline 3: Build Versionné sur Tag
        stage('Release/Versioning') {
            when { 
                // Exécuter si c'est un Tag (V.X.Y.Z)
                tag 'V.*' 
            }
            steps {
                echo "Creating versioned build for tag ${env.TAG_NAME}"
                // ... Vos étapes de Dockerisation et push vers un registry
            }
        }
    }
}
