from flask import Flask, request, jsonify, make_response, abort, g
from datetime import datetime
import mysql.connector, mysql.connector.pooling
import json
import uuid
import bcrypt

pool = mysql.connector.pooling.MySQLConnectionPool(
    host = "my-rds.cyoip7lq8wu8.us-east-1.rds.amazonaws.com",
    user = "admin",
    passwd = "Sa12345678",
    database = "myblog",
    buffered = True,
    pool_size = 3
 )
    #"my-rds.cyoip7lq8wu8.us-east-1.rds.amazonaws.com",
    # my-rds.cyoip7lq8wu8.us-east-1.rds.amazonaws.com
    #port = 3306,
    #"admin",
    #"Sa12345678",


app = Flask(__name__,
            static_folder='/home/ubuntu/build',
            static_url_path='/')

@app.before_request
def before_request():
    g.db = pool.get_connection()

@app.teardown_request
def teardown_request(exception):
    g.db.close()

@app.route('/')
def index():
 return app.send_static_file('index.html')


@app.route("/api/alive")
def api_alive():
    return "alive"

@app.route('/register', methods=['POST'])
def register():
	data = request.get_json()
	print(data)
	query = "select id from users where username = (%s)"
	value = (data['username'], )
	cursor = g.db.cursor()
	cursor.execute(query, value)
	records = cursor.fetchall()
	print(records)
	if records:
		abort(401)
	hashed_pwd = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
	query = "insert into users (first_name, last_name, email, username, password) values (%s, %s, %s, %s, %s)"
	values = (data['firstName'], data['lastName'], data['email'], data['username'], hashed_pwd)
	cursor.execute(query, values)
	g.db.commit()
	new_user_id = cursor.lastrowid
	cursor.close()
	return 'New user id: ' + str(new_user_id)


@app.route('/login', methods=['POST'])
def login():
	data = request.get_json()
	print(data)
	query = "select id, password, first_name from users where username = %s"
	values = (data['username'], )
	cursor = g.db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	if not record:
		abort(401)
	user_id = record[0]
	first_name = record[2]
	hashed_pwd = record[1].encode('utf-8')
	if bcrypt.hashpw(data['password'].encode('utf-8'), hashed_pwd) != hashed_pwd:
		abort(403)
	session_id = str(uuid.uuid4())
	query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id=%s"
	values = (user_id, session_id, session_id)
	cursor.execute(query, values)
	g.db.commit()
	first_and_id = {"first_name": first_name, "user_id": user_id, "user_name": data['username']}
	resp = make_response(first_and_id)
	resp.set_cookie("session_id", session_id)
	return resp

@app.route('/logout', methods=['POST'])
def logout():
	data = request.get_json()
	query = "delete from sessions where user_id=%s"
	value = (data['user_id'],)
	cursor = g.db.cursor()
	cursor.execute(query, value)
	g.db.commit()
	cursor.close()
	resp = make_response()
	resp.set_cookie("session_id", '', expires=0)
	return resp

@app.route('/edit/<id>', methods=['POST'])
def edit_post_by_id(id):
    data = request.get_json()
    now = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    query = "UPDATE posts SET title= %s, content= %s, author= %s, image= %s, published= %s WHERE id = %s"
    value = [data['title'], data['content'], data['author'], data['image'], now, str(id)]
    data = []
    cursor = g.db.cursor()
    cursor.execute(query, value)
    g.db.commit()
    cursor.close()
    return  "edit succeed"

@app.route('/posts/delete/<id>', methods=['POST'] )
def delete_post_by_ID(id):
    value = [str(id)]
    query = "DELETE FROM comments Where post_id=%s"
    cursor = g.db.cursor()
    cursor.execute(query, value)
    g.db.commit()
    cursor.close()
    query = "DELETE FROM posts WHERE id=%s"
    cursor = g.db.cursor()
    cursor.execute(query, value)
    g.db.commit()
    cursor.close()
    return  "post delete succeed"

@app.route('/posts', methods=['GET', 'POST'])

def manage_requests():
    if request.method == 'GET':
        return get_all_posts()
    else:
    	return add_new_post()

def add_new_post():
	data = request.get_json()
	now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
	query = "insert into posts (userId, title, content, author, image, published) values (%s, %s, %s, %s, %s, %s)"
	values = (data['user_id'], data['title'], data['content'], data['author'], data['image'], now)
	cursor = g.db.cursor()
	cursor.execute(query, values)
	g.db.commit()
	new_post_id = cursor.lastrowid
	cursor.close()
	return 'New post id: ' + str(new_post_id)


def get_all_posts():
	query = "select id, userId, title, content, author, image, published from posts"
	data = []
	cursor = g.db.cursor()
	cursor.execute(query)
	records = cursor.fetchall()
	if not records:
	    return "no posts"
	header = ['id','user_id', 'title', 'content', 'author', 'image', 'published']
	for r in records:
	    data.append(dict(zip(header, r)))
	cursor.close()
	return json.dumps(data, default=str)

@app.route('/posts/<id>')

def get_post_by_ID(id):
	query = "select id, title, content, author, image, published from posts where id=%s"
	value = [str(id)]
	data = []
	cursor = g.db.cursor()
	cursor.execute(query, value)
	records = cursor.fetchall()
	header = ['id', 'title', 'content', 'author', 'image', 'published']
	cursor.close()
	return json.dumps(dict(zip(header,records[0])), default=str)

@app.route('/comment/delete/<id>', methods=['POST'])
def delete_comment_by_ID(id):
    query = "DELETE from comments where id=%s"
    value = [str(id)]
    cursor = g.db.cursor()
    cursor.execute(query,value)
    g.db.commit()
    cursor.close()
    return "comment delete succeed"



@app.route('/comment/<id>', methods=['GET','POST'])

def manage_request(id):
    if request.method == 'GET':
        return get_comment_by_ID(id)
    else:
    	return add_new_comment()

def add_new_comment():
	data = request.get_json()
	now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
	query = "insert into comments (content, username, published, post_id) values (%s, %s, %s, %s)"
	values = (data['content'], data['username'], now, data['post_id'])
	cursor = g.db.cursor()
	cursor.execute(query, values)
	g.db.commit()
	new_comment_id = cursor.lastrowid
	cursor.close()
	return 'New post id: ' + str(new_comment_id)

def get_comment_by_ID(id):
	query = "select id, content, username, published, post_id from comments where post_id=%s"
	value = [str(id)]
	data=[]
	header = ['id', 'content', 'username', 'published', 'post_id']
	cursor = g.db.cursor()
	cursor.execute(query, value)
	records = cursor.fetchall()
	if not records:
   		return 'no comments'
	for r in records:
	    data.append(dict(zip(header,r)))
	cursor.close()
	return json.dumps(data, default=str)

if __name__ == "__main__":
	app.run()