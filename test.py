from flask import Flask, request, jsonify
from nltk.chat.util import Chat, reflections
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

conn = sqlite3.connect('healthdata.db')
c = conn.cursor()
c.execute("SELECT pattern, response FROM chatbot")
data = c.fetchall()

patterns = [(pattern, [response]) for pattern, response in data]

patterns += [
    (r'hi|hello|hey', ['Hello!', 'Hi there!', 'Hey!']),
    (r'how are you?', ['I am doing well, thank you!', 'I am a machine, I don\'t have feelings.']),
    (r'what is your name?', ['My name is Chatbot!', 'I am Chatbot, nice to meet you!']),
    (r'bye|goodbye', ['Goodbye!', 'See you later!', 'Take care!']),
    (r'(.*)', ['Sorry, I didn\'t understand what you said.'])
]

chatbot = Chat(patterns, reflections)

@app.route('/chatbot', methods=['POST'])
def chatbot_response():
    message = request.json['message']
    response = chatbot.respond(message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run()
