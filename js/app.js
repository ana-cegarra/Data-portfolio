async function compareTexts() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;

    if (text1 && text2) {
        // Llamada a una API para comparar textos (reemplaza <API_URL> con la URL de tu API)
        try {
            const response = await fetch('<API_URL>', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text1, text2 })
            });

            const result = await response.json();
            document.getElementById('result').innerText = `Similarity score: ${result.similarity}`;
        } catch (error) {
            console.error("Error al comparar textos:", error);
            document.getElementById('result').innerText = 'Hubo un error al comparar los textos.';
        }
    } else {
        document.getElementById('result').innerText = 'Please enter both texts to compare.';
    }
}
