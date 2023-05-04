import nltk
import sqlite3
from nltk.chat.util import Chat, reflections
from flask import Flask, request, jsonify

# Connect to the database and retrieve the patterns and responses
conn = sqlite3.connect('healthdata.db')
c = conn.cursor()
c.execute("SELECT pattern, response FROM chatbot")
data = c.fetchall()

# Convert the data to a list of tuples
patterns = [(pattern, [response]) for pattern, response in data]

# Add default patterns and responses
patterns += [
    (r'hi|hello|hey', ['Hello!', 'Hi there!', 'Hey!']),
    (r'how are you?', ['I am doing well, thank you!', 'I am a machine, I don\'t have feelings.']),
    (r'what is your name?', ['My name is Chatbot!', 'I am Chatbot, nice to meet you!']),
    (r'bye|goodbye', ['Goodbye!', 'See you later!', 'Take care!']),
    (r'(.*)', ['Sorry, I didn\'t understand what you said.'])
]

# Initialize the chatbot
chatbot = Chat(patterns, reflections)

# Create a Flask app
app = Flask(__name__)

# Define a route to handle POST requests
@app.route('/chatbot', methods=['POST'])
def chatbot_route():
    input_text = request.json['text']
    # Check if the user input matches any of the defined patterns
    for pattern, responses in patterns:
        if nltk.re.match(pattern, input_text):
            response = chatbot.respond(input_text)
            return jsonify({'response': response[0]})
    # If no pattern is matched, return a default response
    return jsonify({'response': chatbot.respond("Sorry, I didn't understand what you said.")[0]})

# Run the app
if __name__ == '__main__':
    app.run()
