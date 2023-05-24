from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import atexit

app = Flask(__name__)
CORS(app)

conn = sqlite3.connect('databases/finance.db', check_same_thread=False)
curr = conn.cursor()

curr.execute("SELECT payment FROM tblPayment")
payments = curr.fetchall()
curr.execute("SELECT category FROM tblPayment")
category = curr.fetchall()

curr.execute("SELECT * FROM tblIncome")
income = curr.fetchall()

conn.commit()

def close_connection():
    conn.close()

atexit.register(close_connection)

@app.route("/api/finance", methods=['POST'])
def HandleRequest():
    finance_data = {
        'income': income,
        'payments': payments,
        'category': category
    }
    return jsonify(finance_data)

if __name__ == '__main__':
    app.run(port=4000)
