import os
from flask import Flask, flash, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import time 

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = set(['txt', 'fa', 'fna', 'fas', 'fasta'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app, expose_headers='Authorization')

@app.route('/upload', methods=['POST'])
@cross_origin()
def fileUpload():
    if not request.json:
        return "not a json post"
    if not os.path.isdir(UPLOAD_FOLDER):
        os.mkdir(UPLOAD_FOLDER)
    sketch = request.json
    file = open('uploads/out.txt', 'w')
    file.write(str(sketch))
    file.close()
    time.sleep(1) #Simulate running process 
    response =  '{"species":"Influenza", "prev":"30%", "query":5, "clusters":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "prevalences":[1, 5, 10, 40, 30, 7, 3, 3, 1, 0]}'
    #response =  '{"first_name":"billy", "age":23}'
    return jsonify(response)

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,use_reloader=False)
 