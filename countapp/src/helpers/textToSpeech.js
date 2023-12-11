import { BASE_URL } from '../helpers/constants.js';

let currentAudio = null;

export async function textToSpeech(utterance, onSpeechEnd) {
    try {
    const requestData = {
      text: utterance,
    };

    const response = await fetch(`${BASE_URL}/speech/synthesize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    
    const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
    currentAudio = audio;

    audio.addEventListener('ended', () => {
      currentAudio = null;
      if (typeof onSpeechEnd === 'function') {
        onSpeechEnd();
      }
    });
    
    audio.play()
  } catch (error) {
    console.error('Error in Google Text-to-Speech:', error);
  }
  }
