const libreUrl = "https://libretranslate.de/translate";

document.getElementById('languageSelect').addEventListener('change', function() {
    let targetLang = this.value;
    if (!targetLang) return;

    document.getElementById('loading').style.display = 'block';

    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li, a');
    const requests = [];

    elements.forEach((el) => {
        let originalText = el.getAttribute('data-original-text') || el.innerText;
        if (!el.getAttribute('data-original-text')) {
            el.setAttribute('data-original-text', originalText);
        }

        if (originalText.trim() !== "") {
            requests.push(
                fetch(libreUrl, {
                    method: "POST",
                    body: JSON.stringify({
                        q: originalText,
                        source: "en",
                        target: targetLang,
                        format: "text"
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(res => res.json())
                .then(data => {
                    if (data && data.translatedText) {
                        el.innerText = data.translatedText;
                    }
                })
                .catch(err => console.error("Translation error:", err))
            );
        }
    });

    Promise.all(requests).then(() => {
        document.getElementById('loading').style.display = 'none';
    });
});
