async function compareTexts() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;

    if (text1 && text2) {
        const apiUrl = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2';
        const headers = {
            'Authorization': `Bearer YOUR_HUGGING_FACE_API_KEY`, // Reemplaza con tu clave de API
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

            const result = await response.json();
            const similarityScore = result.similarity || result[0]; 
            document.getElementById('result').innerText = `Similarity score: ${similarityScore.toFixed(2)}`;
        } catch (error) {
            console.error("Error al comparar textos:", error);
            document.getElementById('result').innerText = 'Hubo un error al comparar los textos.';
        }
    } else {
        document.getElementById('result').innerText = 'Please enter both texts to compare.';
    }
}
