from flask import Flask, request, jsonify, make_response
import mysql.connector as mysql
import json
import uuid
import bcrypt

db = mysql.connect(
    host = "localhost",
    user = "root",
    passwd = "Sa204124978",
    database = "myblog"
)

app = Flask(__name__)

@app.route('/register', methods=['POST'])
def register():
	data = request.get_json()
	print(data)
	query = "select id from users where username = (%s)"
	value = (data['username'], )
	cursor = db.cursor()
	cursor.execute(query, value)
	records = cursor.fetchall()
	print(records)
	if records:
		abort(401)
	hashed_pwd = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
	query = "insert into users (first_name, last_name, email, username, password) values (%s, %s, %s, %s, %s)"
	values = (data['firstName'], data['lastName'], data['email'], data['username'], hashed_pwd)
	cursor.execute(query, values)
	db.commit()
	new_user_id = cursor.lastrowid
	cursor.close()
	return 'New user id: ' + str(new_user_id)


@app.route('/login', methods=['POST'])
def login():
	data = request.get_json()
	print(data)
	query = "select id, password, first_name from users where username = %s"
	values = (data['username'], )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	if not record:
		abort(401)
	user_id = record[0]
	first_name = record[2]
	hashed_pwd = record[1].encode('utf-8')
	if bcrypt.hashpw(data['password'].encode('utf-8'), hashed_pwd) != hashed_pwd:
		abort(401)
	session_id = str(uuid.uuid4())
	query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id=%s"
	values = (user_id, session_id, session_id)
	cursor.execute(query, values)
	db.commit()
	first_and_id = {"first_name": first_name, "user_id": user_id}
	resp = make_response(first_and_id)
	resp.set_cookie("session_id", session_id)
	return resp

@app.route('/logout', methods=['POST'])
def logout():
	data = request.get_json()
	query = "delete from sessions where user_id=%s"
	value = (data['user_id'],)
	cursor = db.cursor()
	cursor.execute(query, value)
	db.commit()
	cursor.close()
	resp = make_response()
	resp.set_cookie("session_id", '', expires=0)
	return resp


@app.route('/posts', methods=['GET', 'POST'])

def manage_requests():
    if request.method == 'GET':
        return get_all_posts()
    else:
    	return add_new_post()

def add_new_post():
	data = request.get_json()
	query = "insert into posts (title, content, author) values (%s, %s, %s)"
	values = (data['title'], data['content'], data['author'])
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	new_post_id = cursor.lastrowid
	cursor.close()
	return 'New post id: ' + str(new_post_id)


def get_all_posts():
	query = "select * from posts"
	data = []
	cursor = db.cursor()
	cursor.execute(query)
	records = cursor.fetchall()
	header = ['id', 'title', 'content', 'author']
	for r in records:
		data.append(dict(zip(header, r)))
	cursor.close()
	return json.dumps(data, default=str)

@app.route('/posts/<id>')

def get_post_by_ID(id):
	query = "select * from posts where id=" + str(id)
	data = []
	cursor = db.cursor()
	cursor.execute(query)
	records = cursor.fetchall()
	header = ['id', 'title', 'content', 'author']
	cursor.close()
	return json.dumps(dict(zip(header,records[0])), default=str)

if __name__ == "__main__":
	app.run()