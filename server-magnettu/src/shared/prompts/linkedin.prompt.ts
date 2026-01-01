export function buildLinkedinPrompt(email: string) {
  return `
    Transforma el siguiente email en un post corto para LinkedIn.

    Reglas:
    - Máximo 4-6 líneas
    - Tono profesional y cercano
    - Usa entre 2 y 3 emojis
    - Incluye 3-5 hashtags
    - No menciones que viene de un email
    - No uses Markdown, HTML o listas ni simbolos especiales como (- , * , etc)

    EMAIL:
    """
    ${email}
    """
    """
  `;
}
