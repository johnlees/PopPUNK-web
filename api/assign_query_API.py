from flask import Flask, request, jsonify, send_from_directory
import os
from flask_cors import CORS

from PopPUNK.assign_query import assign_query


app = Flask(__name__, static_folder='../build')

CORS(app)

#Configure
app.config['UPLOAD_EXTENSIONS'] = ['.fna', '.fasta', '.fa', '.txt']
app.config['UPLOAD_PATH'] = 'uploads'

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("frontend/build/" + path):
        return send_from_directory('../frontend/build', path)
    else:
        return send_from_directory('../frontend/build', 'index.html')

@app.route('/result', methods=['POST'])
def index():
    sketch = jsonify(request.json)
        #need to run sketch in browser, store .json uploads. .Json is read by assign query  
    assign_query("databases/reference", sketch, "uploads/q_file.txt", "outputs",
                14, 29, 3, 10000, 4,
                0, 0.5, 'databases/reference', 'databases/reference', False, False, False,
                # added extra arguments for constructing sketchlib libraries
                0, False)
    return 

if __name__=="__main__":
    app.run(debug=True)
