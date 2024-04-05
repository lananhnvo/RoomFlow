import psycopg2

# Connect to your postgres DB
conn = psycopg2.connect("dbname=postgres user=postgres")

# Open a cursor to perform database operations
cur = conn.cursor()

from flask import Flask

app = Flask(__name__)

@app.route("/search")
def search():
    return "<p>Hello, World!</p>"

@app.route("/edit")
def edit():
    return <p>

@app.route("/selectall")
def selectall():
    cur.execute("SELECT * FROM my_data")
    return cur.fetchall()