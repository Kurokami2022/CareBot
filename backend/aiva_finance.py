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
def handle_request():
    finance_data = {
        'income': income,
        'payments': payments,
        'category': category
    }
    return jsonify(finance_data)


@app.route("/api/delete-payment", methods=['POST'])
def delete_payment():
    payment = request.json.get('payment')
    category = request.json.get('category')
    print('Received payment:', payment)
    print('Received category:', category)
    if payment is not None and category is not None:
        curr.execute("DELETE FROM tblPayment WHERE payment=? AND category=?", (payment, category))
        conn.commit()

        curr.execute("SELECT payment FROM tblPayment")
        updated_payments = curr.fetchall()
        curr.execute("SELECT category FROM tblPayment")
        updated_category = curr.fetchall()

        return jsonify({'message': 'Payment deleted successfully', 'payments': updated_payments, 'category': updated_category})
    else:
        return jsonify({'error': 'Invalid payment or category'})





if __name__ == '__main__':
    app.run(port=4000)
