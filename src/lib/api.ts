export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

const BACKEND_URL = "http://ec2-54-175-50-51.compute-1.amazonaws.com:8000/ask-question/";

export async function sendMessage(text: string): Promise<Message> {
  try {
    const formData = new FormData();
    formData.append("question", text);

    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();

    return {
      id: `bot-${Date.now()}`,
      text: data?.answer ?? 'No response received.',
      sender: 'bot',
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('API call failed:', error);
    return {
      id: `bot-${Date.now()}`,
      text: 'Error: Unable to reach server.',
      sender: 'bot',
      timestamp: Date.now(),
    };
  }
}
