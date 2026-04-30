export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
  maxDuration: 300,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, prompt } = req.body;

  const attemptCall = async () => {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 8000,
        messages: messages || [{ role: 'user', content: prompt }],
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }
    return data;
  };

  // 2 Versuche – bei Fehler einmal automatisch wiederholen
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const data = await attemptCall();
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Versuch ${attempt} fehlgeschlagen:`, error);
      if (attempt === 2) {
        return res.status(500).json({ error: String(error) });
      }
      // 3 Sekunden warten vor dem zweiten Versuch
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}
