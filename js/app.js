async function compareTexts() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;

    if (text1 && text2) {
        // API URL para Hugging Face
        const apiUrl = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2';

        // Configura la solicitud
        const headers = {
            'Authorization': `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`, // Reemplaza con tu clave de API
            'Content-Type': 'application/json'
        };

        const body = JSON.stringify({
            inputs: [text1, text2]
        });

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: body
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const embeddings = await response.json();
            // Calcula la similitud (coseno) entre los dos embeddings
            const similarityScore = cosineSimilarity(embeddings[0], embeddings[1]);
            document.getElementById('result').innerText = `Similarity score: ${similarityScore.toFixed(2)}`;
        } catch (error) {
            console.error("Error al comparar textos:", error);
            document.getElementById('result').innerText = 'Hubo un error al comparar los textos.';
        }
    } else {
        document.getElementById('result').innerText = 'Please enter both texts to compare.';
    }
}

// Función para calcular la similitud del coseno
function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);
    return dotProduct / (normA * normB);
}
