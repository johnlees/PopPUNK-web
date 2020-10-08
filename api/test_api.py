import os
from flask import Flask, flash, request, redirect, url_for, session
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
    time.sleep(3) #Simulate running process 
    response = "5"
    return response
    
if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,use_reloader=False)
