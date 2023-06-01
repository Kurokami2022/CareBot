from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
DATABASE = 'databases/todo.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    return conn

@app.route('/api/todos', methods=['GET'])
def get_todos():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM todos')
    todos = cursor.fetchall()
    todos_dict = [{'id': todo[0], 'todo': todo[1]} for todo in todos]
    conn.close()
    return jsonify(todos_dict)

@app.route('/api/todos', methods=['POST'])
def add_todo():
    todo_text = request.json.get('todo')
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO todos (todo) VALUES (?)', (todo_text,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Todo added successfully'})

@app.route('/api/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM todos WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Todo deleted successfully'})

if __name__ == '__main__':
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, todo TEXT NOT NULL)')
    conn.commit()
    conn.close()
    app.run(port=4100)
