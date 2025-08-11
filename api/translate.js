export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Leggiamo il corpo della richiesta manualmente
    let body = "";
    for await (const chunk of req) {
      body += chunk;
    }
    const { q, source, target } = JSON.parse(body);

    if (!q || !target) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (q.length > 500) {
      return res.status(400).json({ error: "Text too long (max 500 characters)" });
    }

    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q,
        source: source || "auto",
        target,
        format: "text"
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Translation error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
