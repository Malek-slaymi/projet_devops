#!/bin/bash

APP_URL="http://localhost:8080/health"
MAX_ATTEMPTS=10
ATTEMPT=0

echo "Lancement du Smoke Test sur $APP_URL..."

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $APP_URL)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ Smoke Test PASSED! L'application est UP (Code $HTTP_CODE)."
        # Créer le fichier d'artefact 'Passed'
        echo "Status: PASSED" > smoke_result.txt
        exit 0
    else
        echo "❌ Tentative $ATTEMPT/$MAX_ATTEMPTS: Application non prête (Code $HTTP_CODE)."
        sleep 5
        ATTEMPT=$((ATTEMPT+1))
    fi
done

echo "❌ Smoke Test FAILED! L'application n'a pas répondu en $MAX_ATTEMPTS tentatives."
# Créer le fichier d'artefact 'Failed'
echo "Status: FAILED" > smoke_result.txt
exit 1