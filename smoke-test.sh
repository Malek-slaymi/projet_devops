APP_URL="http://localhost:8081"

EXPECTED_TEXT="React App" 

echo "--- Démarrage du Smoke Test ---"
echo "Vérification de l'URL: $APP_URL"
echo "Attente du texte: \"$EXPECTED_TEXT\""


curl -s -f --max-time 5 $APP_URL 


if [ $? -ne 0 ]; then
    echo "Statut: FAILED - Impossible d'accéder à l'application ou timeout."
   
    exit 1
fi

echo "SUCCESS: Le serveur répond avec un code HTTP 200/3xx."


PAGE_CONTENT=$(curl -s $APP_URL)

if echo "$PAGE_CONTENT" | grep -q "$EXPECTED_TEXT"; then
    echo "SUCCESS: Contenu de la page vérifié. Élément '$EXPECTED_TEXT' trouvé."
    echo "Smoke Test GLOBAL: PASSED"
    exit 0
else
    echo "FAILED: Le contenu de la page ne contient PAS l'élément '$EXPECTED_TEXT'."
    echo "Smoke Test GLOBAL: FAILED"
    exit 1
fi
