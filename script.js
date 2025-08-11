document.getElementById("translate-btn").addEventListener("click", () => {
  const text = document.getElementById("text-input").value.trim();
  const targetLang = document.getElementById("target-lang").value;

  if (!text) {
    document.getElementById("result").innerText = "Please enter text to translate.";
    return;
  }

  fetch("https://libretranslate.de/translate", {
    method: "POST",
    body: JSON.stringify({
      q: text,
      source: "auto",
      target: targetLang,
      format: "text"
    }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (data && data.translatedText) {
        document.getElementById("result").innerText = data.translatedText;
      } else {
        document.getElementById("result").innerText = "No translation found.";
      }
    })
    .catch(err => {
      console.error("Translation error:", err);
      document.getElementById("result").innerText = "Error during translation.";
    });
});
