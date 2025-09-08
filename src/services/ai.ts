export interface AiSuggestions {
  suggestions: string[];
}

export async function improveText(apiKey: string, prompt: string, text: string): Promise<AiSuggestions> {
  try {
    if (!apiKey) {
      throw new Error("API Key não fornecida. Cole sua chave do Gemini.");
    }

    const fullPrompt = `${prompt}\n\nAnalise o texto abaixo e forneça 3 opções de melhoria em português do Brasil. As opções devem ser claras, objetivas e com tom profissional. Retorne sua resposta como um objeto JSON com uma única chave "suggestions", que contém um array de strings. Exemplo: {"suggestions": ["Opção 1", "Opção 2", "Opção 3"]}\n\nTexto: ${text}`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?alt=json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Erro na API Gemini:", errorBody);
      throw new Error(`Erro na resposta da API Gemini: ${response.status}`);
    }

    const data = await response.json();
    const suggestionsText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!suggestionsText) {
      return { suggestions: ["Não foi possível gerar sugestões."] };
    }

    try {
      const parsedSuggestions: AiSuggestions = JSON.parse(suggestionsText);
      return parsedSuggestions;
    } catch (parseError) {
      console.error("Erro ao processar o JSON da IA:", parseError);
      // Retorna a resposta da IA como texto puro se não for um JSON válido
      return { suggestions: [suggestionsText] };
    }

  } catch (err) {
    console.error("Erro na função improveText (IA):", err);
    return { suggestions: ["Ocorreu um erro ao processar sua solicitação. Verifique o console."] };
  }
}