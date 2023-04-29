const readline = require('readline');
const natural = require('natural');

const healthPatterns = [
  { pattern: /.*(headache|sore throat|cough|fever|nausea|vomiting|diarrhea).*/, response: 'It sounds like you might be experiencing symptoms of a viral illness. I recommend drinking plenty of fluids and getting plenty of rest. If your symptoms persist or worsen, you may want to consult a healthcare provider.' },
  { pattern: /.*(stomachache|indigestion|heartburn).*/, response: 'It could be a sign of acid reflux or gastritis. Try to avoid spicy, acidic, or fried foods, and eat smaller, more frequent meals throughout the day. If your symptoms persist, you may want to see a healthcare provider.' },
  { pattern: /.*(depression|anxiety|stress).*/, response: 'It is important to prioritize your mental health. You may want to consider talking to a mental health professional or therapist. You can also try stress-reducing activities such as exercise, meditation, or spending time with loved ones.' },
  { pattern: /.*(weight loss|weight gain).*/, response: 'A healthy diet and regular exercise can help you maintain a healthy weight. You may also want to consult a healthcare provider or registered dietitian for personalized recommendations.' },
  { pattern: /.*(allergies|asthma).*/, response: 'It is important to avoid triggers that may worsen your symptoms. You may also want to consider over-the-counter or prescription medications to manage your symptoms. If your symptoms persist, you may want to see a healthcare provider.' },
];

const healthChatbot = new natural.BayesClassifier();
healthPatterns.forEach((pattern) => {
  healthChatbot.addDocument(pattern.pattern, pattern.response);
});
healthChatbot.train();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Hello, I am a health chatbot. How can I assist you today?');

rl.on('line', (input) => {
  const classification = healthChatbot.classify(input);
  const response = healthChatbot.getClassifications(input)[0].label === 
  'negative' ? "I'm sorry, I'm not sure what you mean. Could you please provide more information?" : 
  healthPatterns.find(pattern => pattern.pattern.test(input)).response;
  console.log(response);
});
