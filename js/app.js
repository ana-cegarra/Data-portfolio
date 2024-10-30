async function compareTexts() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;

    if (text1 && text2) {
        // Ejemplo de llamada a una API para comparar textos (reemplaza <API_URL>)
        const response = await fetch('<API_URL>', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text1, text2 })
        });

        const result = await response.json();
        document.getElementById('result').innerText = `Similarity score: ${result.similarity}`;
    } else {
        document.getElementById('result').innerText = 'Please enter both texts to compare.';
    }
}
