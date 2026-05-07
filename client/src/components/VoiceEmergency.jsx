import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import toast from 'react-hot-toast';

const VoiceEmergency = ({ onTriggerEmergency }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setRecognizedText(transcript);
        
        const emergencyKeywords = ['call ambulance', 'call 108', 'emergency', 'help me'];
        if (emergencyKeywords.some(keyword => transcript.includes(keyword))) {
          toast.success(`Voice command recognized: "${transcript}"`);
          onTriggerEmergency();
        } else {
          toast.error(`Command not recognized: "${transcript}"`);
        }
        setIsListening(false);
      };

      rec.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        toast.error('Voice recognition failed or denied.');
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    } else {
      toast.error('Speech recognition is not supported in this browser.');
    }
  }, [onTriggerEmergency]);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      setRecognizedText('');
      try {
         recognition?.start();
         setIsListening(true);
      } catch (e) {
         console.error(e);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-lg mt-8 w-full max-w-md mx-auto">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleListening}
        className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${isListening ? 'bg-red-500 animate-pulse text-white shadow-red-500/40' : 'bg-white text-gray-800 border-2 border-gray-200 hover:border-red-500 hover:text-red-500'}`}
      >
        {isListening ? <Mic className="w-10 h-10" /> : <MicOff className="w-10 h-10" />}
      </motion.button>
      <p className="mt-4 font-bold text-gray-700">{isListening ? 'Listening...' : 'Tap and Speak'}</p>
      <p className="mt-2 text-sm text-gray-500 text-center">Say "Call Ambulance" or "Help Me"</p>
      {recognizedText && <p className="mt-4 text-md font-medium text-blue-600 italic bg-blue-50 px-4 py-2 rounded-lg">"{recognizedText}"</p>}
    </div>
  );
};

export default VoiceEmergency;
