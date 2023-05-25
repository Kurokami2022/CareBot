from flask import Flask, request, jsonify
from nltk.chat.util import Chat, reflections
import sqlite3
from flask_cors import CORS
from fuzzywuzzy import fuzz, process

app = Flask(__name__)
CORS(app, methods=['GET', 'POST', 'OPTIONS'])

conn = sqlite3.connect('healthdata.db')
patterns = []

def load_chatbot():
    global patterns
    conn = sqlite3.connect('healthdata.db')
    c = conn.cursor()
    c.execute("SELECT pattern, response FROM chatbot")
    data = c.fetchall()

    patterns = [(pattern, [response]) for pattern, response in data]
    patterns += [
        (r'hi|hello|hey', ['Hello!', 'Hi there!', 'Hey!']),
        (r'how are you?', ['I am doing well, thank you!', 'I am a machine, I don\'t have feelings.']),
        (r'what is your name?', ['My name is CareBot!', 'I am CareBot, nice to meet you!']),
        (r'bye|goodbye', ['Goodbye!', 'See you later!', 'Take care!']),
        (r'(.*)', ['Sorry, I didn\'t understand what you said.'])
    ]

load_chatbot()
chatbot = Chat(patterns, reflections)

def fuzzy_match(input_text, patterns, threshold=80):
    best_score = 0
    best_response = None

    for pattern, responses in patterns:
        score = fuzz.token_set_ratio(input_text.lower(), pattern.lower())
        if score > best_score and score >= threshold:
            best_score = score
            best_response = responses[0]

    return best_response

@app.route('/chatbot', methods=['POST'])
def chatbot_response():
    message = request.json['message']
    
    response = fuzzy_match(message, patterns)
    
    if response is None:
        response = chatbot.respond(message)

    return jsonify({'response': response})

if __name__ == '__main__':
    load_chatbot() 
    app.run()
