
// ElevenLabs voice ID for a multilingual voice that can handle Tigrigna
const VOICE_ID = '9BWtsMINqrJLrRacOk9x'; // Aria - multilingual voice

const getApiKey = () => {
  return localStorage.getItem('elevenlabs_api_key') || (window as any).VITE_ELEVENLABS_API_KEY || '';
};

export const playPronunciation = async (text: string, pronunciation?: string) => {
  const ELEVENLABS_API_KEY = getApiKey();
  
  if (!ELEVENLABS_API_KEY) {
    console.warn('ElevenLabs API key not found. Please add your API key in the Audio Settings.');
    return;
  }

  try {
    const textToSpeak = pronunciation || text;
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: textToSpeak,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    await audio.play();
    
    // Clean up the object URL after playing
    audio.addEventListener('ended', () => {
      URL.revokeObjectURL(audioUrl);
    });

  } catch (error) {
    console.error('Error playing pronunciation:', error);
    // Fallback: use browser's speech synthesis
    fallbackTextToSpeech(text);
  }
};

// Fallback using browser's built-in speech synthesis
const fallbackTextToSpeech = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn('Speech synthesis not supported in this browser');
  }
};

export default { playPronunciation };
