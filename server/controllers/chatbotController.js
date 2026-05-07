// Offline Keyword Dictionary mapping multiple languages to core English intents
const keywordMap = {
  fever: ["fever", "காய்ச்சல்", "बुखार", "జ్వరం", "പനി", "ಜ್ವರ"],
  cough: ["cough", "இருமல்", "खांसी", "దగ్గు", "ചുമ", "ಕೆಮ್ಮು"],
  chestPain: ["chest pain", "நெஞ்சு வலி", "மார்பு வலி", "सीने में दर्द", "ఛాతి నొప్పి", "നെഞ്ച് വേദന", "എದೆ ನೋವು"],
  headache: ["headache", "தலைவலி", "सिरदर्द", "తలనొప్పి", "തലവേദന", "ತಲೆನೋವು"],
  accident: ["accident", "விபத்து", "दुर्घटना", "പ്രമാദം"],
  bleeding: ["bleeding", "இரத்தப்போக்கு", "खून बहना"]
};

// Multilingual Templates
const templates = {
  en: {
    emergency: "This may require emergency medical attention. Please call 108 or visit the nearest emergency department.",
    fever: "Fever can be a sign of infection. Please monitor your temperature and drink plenty of fluids. Consider booking an appointment with a General Physician.",
    default: "I understand you are feeling unwell. Could you provide more details about your symptoms?"
  },
  ta: {
    emergency: "இதற்கு அவசர மருத்துவ கவனிப்பு தேவைப்படலாம். தயவுசெய்து 108 ஐ அழைக்கவும் அல்லது அருகிலுள்ள அவசர பிரிவை அணுகவும்.",
    fever: "காய்ச்சல் நோய்த்தொற்றின் அறிகுறியாக இருக்கலாம். உங்கள் வெப்பநிலையை கண்காணிக்கவும். ஒரு பொது மருத்துவரை சந்திக்க முன்பதிவு செய்யவும்.",
    default: "உங்களுக்கு உடல்நிலை சரியில்லை என்பதை நான் புரிந்துகொள்கிறேன். உங்கள் அறிகுறிகளைப் பற்றிய கூடுதல் விவரங்களை வழங்க முடியுமா?"
  },
  hi: {
    emergency: "इसके लिए आपातकालीन चिकित्सा ध्यान देने की आवश्यकता हो सकती है। कृपया 108 पर कॉल करें।",
    fever: "बुखार संक्रमण का संकेत हो सकता है। कृपया अपना तापमान जांचें।",
    default: "मैं समझता हूं कि आप अस्वस्थ महसूस कर रहे हैं। क्या आप अपने लक्षणों के बारे में अधिक विवरण दे सकते हैं?"
  },
  te: {
    emergency: "దీనికి అత్యవసర వైద్య సహాయం అవసరం కావచ్చు. దయచేసి 108 కు కాల్ చేయండి.",
    fever: "జ్వరం ఇన్ఫెక్షన్ సంకేతం కావచ్చు.",
    default: "మీరు అనారోగ్యంగా ఉన్నారని నేను అర్థం చేసుకున్నాను. దయచేసి మరింత సమాచారం ఇవ్వండి."
  },
  ml: {
    emergency: "ഇതിന് അടിയന്തര വൈദ്യസഹായം ആവശ്യമായി വന്നേക്കാം. ദയവായി 108-ലേക്ക് വിളിക്കുക.",
    fever: "പനി അണുബാധയുടെ ലക്ഷണമാകാം.",
    default: "നിങ്ങൾക്ക് സുഖമില്ലെന്ന് ഞാൻ മനസ്സിലാക്കുന്നു. കൂടുതൽ വിവരങ്ങൾ നൽകാമോ?"
  },
  kn: {
    emergency: "ಇದಕ್ಕೆ ತುರ್ತು ವೈದ್ಯಕೀಯ ಗಮನ ಬೇಕಾಗಬಹುದು. ದಯವಿಟ್ಟು 108 ಗೆ ಕರೆ ಮಾಡಿ.",
    fever: "ಜ್ವರವು ಸೋಂಕಿನ ಲಕ್ಷಣವಾಗಿರಬಹುದು.",
    default: "ನಿಮಗೆ ಅನಾರೋಗ್ಯವಿದೆ ಎಂದು ನಾನು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಹೆಚ್ಚಿನ ವಿವರಗಳನ್ನು ನೀಡಿ."
  }
};

exports.chatMessage = async (req, res) => {
  try {
    const { userId, message, language = 'en' } = req.body;
    
    if (!message) return res.status(400).json({ message: "Message is required" });

    const msgLower = message.toLowerCase();

    // Detect Intent
    const isEmergency = keywordMap.chestPain.some(k => msgLower.includes(k)) || 
                        keywordMap.accident.some(k => msgLower.includes(k)) || 
                        keywordMap.bleeding.some(k => msgLower.includes(k));
    
    const isFever = keywordMap.fever.some(k => msgLower.includes(k));

    // Select correct template language (fallback to English if not found)
    const langDict = templates[language] || templates['en'];

    if (isEmergency) {
      return res.status(200).json({ reply: langDict.emergency, isEmergency: true });
    }

    if (isFever) {
      return res.status(200).json({ reply: langDict.fever, isEmergency: false });
    }

    res.status(200).json({ reply: langDict.default, isEmergency: false });
  } catch (error) {
    res.status(500).json({ message: "Chatbot error", error: error.message });
  }
};
