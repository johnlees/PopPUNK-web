### Renders sketch.html template that runs sketch.js. Sequence uploader saves to "uploads", and will be retrieved and read by sketch.js

from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os 

app = Flask("__main__")

#Configure
app.config['UPLOAD_EXTENSIONS'] = ['.fna', '.fasta', '.fa', '.txt']
app.config['UPLOAD_PATH'] = 'uploads'

@app.route('/', methods=['GET', 'POST'])
def index():
    ### Retrieve and save file uplaoded to uploader.html, then sketch

    if request.method == 'POST':
        uploaded_file = request.files['file']
        uploaded_file.save(os.path.join('static', "pp-sketch1.data"))
        return render_template('worker.html')
    else:
        return render_template('uploader.html')

@app.route('/pp-sketch.data', methods=['GET'])
def data():
    return render_template('data.html')
   
if __name__=="__main__":
    app.run(debug=True)
