export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

// Updated backend endpoint
const BACKEND_URL = 'http://51.20.5.14:8000/ask';

export async function sendMessage(text: string): Promise<Message> {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: text }),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();

    return {
      id: `bot-${Date.now()}`,
      text: data?.response ?? 'No response received.',
      sender: 'bot',
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}
