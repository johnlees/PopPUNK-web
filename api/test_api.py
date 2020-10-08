import os
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin


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
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    sketch = request.json
    file = open('uploads/out.txt', 'w')
    file.write(str(sketch))
    file.close()
    response="3"
    return response
    
if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,use_reloader=False)

