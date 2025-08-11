document.getElementById("translate-btn").addEventListener("click", () => {
  const text = document.getElementById("text-input").value.trim();
  const targetLang = document.getElementById("target-lang").value;

  if (!text) {
    document.getElementById("result").innerText = "Please enter text to translate.";
    return;
  }

  fetch("https://libretranslate.com/translate", {
    method: "POST",
    body: JSON.stringify({
      q: text,
      source: "auto",
      target: targetLang,
      format: "text"
    }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").innerText = data.translatedText;
  })
  .catch(err => {
    console.error(err);
    document.getElementById("result").innerText = "Error during translation.";
  });
});
