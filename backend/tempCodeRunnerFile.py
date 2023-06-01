from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app, methods=['GET', 'POST', 'OPTIONS'])
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    todo = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {'id': self.id, 'todo': self.todo}

@app.route('/api/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    todos_dict = [todo.to_dict() for todo in todos]
    return jsonify(todos_dict)

@app.route('/api/todos', methods=['POST'])
def add_todo():
    todo_text = request.json.get('todo')
    todo = Todo(todo=todo_text)
    db.session.add(todo)
    db.session.commit()
    return jsonify({'message': 'Todo added successfully'})

@app.route('/api/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get(id)
    if todo:
        db.session.delete(todo)
        db.session.commit()
        return jsonify({'message': 'Todo deleted successfully'})
    else:
        return jsonify({'error': 'Invalid todo ID'})

if __name__ == '__main__':
    db.create_all()
    app.run(port=4100)
