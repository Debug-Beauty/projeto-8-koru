// src/services/ai.ts
export async function improveText(apiKey: string, prompt: string, text: string): Promise<string> {
  try {
    if (!apiKey) {
      throw new Error("API Key não fornecida. Cole sua chave do Gemini.");
    }

    console.log("API KEY (Gemini):", apiKey);

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey, 
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `${prompt}\n\nTexto: ${text}` }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na resposta da API Gemini: ${response.status}`);
    }

    const data = await response.json();

    const improved =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Não foi possível melhorar o texto.";

    return improved.trim();
  } catch (err) {
    console.error("Erro IA (Gemini):", err);
    throw err;
  }
}
