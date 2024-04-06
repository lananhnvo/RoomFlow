from flask import Flask, jsonify
import psycopg2
import psycopg2.extras

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        dbname='RoomFlow', 
        user='postgres', 
        password='2409', 
        host='localhost'
    )
    return conn

@app.route('/api/rooms')
def get_rooms():
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute('''
        SELECT r.room_number, h.address, hc.name as hotel_chain_name, r.price, r.capacity
        FROM room r
        JOIN hotel h ON r.hotel_id = h.id
        JOIN hotel_chain hc ON h.hotel_chain_id = hc.id
    ''')
    rooms = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(rooms)

if __name__ == '__main__':
    app.run(debug=True)
