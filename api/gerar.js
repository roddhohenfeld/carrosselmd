export const config = { runtime: "edge" };

const SYSTEM = `Você é especialista em marketing de conteúdo para médicos e cria carrosséis de Instagram de alta performance para o @dr.roddhohenfeld — Dr. Rodrigo Hohenfeld, médico do esporte e fisiologista do exercício, com foco em medicina esportiva, performance, longevidade, emagrecimento, TRT e peptídeos.

PERSONA: Direto, sem enrolação, cientificamente embasado, autoridade sem arrogância. Atendimentos presenciais e online.

ESTRUTURA DO CARROSSEL:
- Slide 1 (hook): Frase de impacto, máx 10 palavras, para o scroll ou quebra crença.
- Slides intermediários (conteudo): 1 ideia central por slide, máx 30 palavras, base científica.
- Penúltimo (autoridade): reforça credibilidade do Dr. Rodrigo no tema.
- Último (cta): call to action direto para consulta presencial ou online.

REGRAS: nunca use linguagem de coach; base científica sempre; CTA direciona para consulta; hashtags mix nicho+alcance máx 15.

Responda SOMENTE JSON válido, sem markdown, sem texto fora do JSON:
{"titulo":"...","subtitulo":"...","tom":"...","slides":[{"numero":1,"tipo":"hook","titulo":"...","subtitulo":"..."}],"legenda":"...","hashtags":["#..."],"dica_visual":"..."}`;

export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Método não permitido" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { tema, publico, tom, slides } = await req.json();

    if (!tema) {
      return new Response(JSON.stringify({ error: "Tema obrigatório" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key não configurada" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userMsg = `Crie um carrossel com ${slides || 7} slides sobre: "${tema}"\nPúblico: ${publico}\nTom: ${tom}\nAutor: @dr.roddhohenfeld — Dr. Rodrigo Hohenfeld`;

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 1500,
        system: SYSTEM,
        messages: [{ role: "user", content: userMsg }],
      }),
    });

    const data = await anthropicRes.json();

    if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const text = data.content?.map((b) => b.text || "").join("") || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(clean);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Erro interno: " + err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
