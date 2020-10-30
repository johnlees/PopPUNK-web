import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import time 
import requests 

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = set(['txt', 'fa', 'fna', 'fas', 'fasta'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app, expose_headers='Authorization')

def api():
    url = "https://microreact.org/api/project/"

    with open("lm_example/lm_example_microreact_clusters.csv", "r") as csv:
        clusters = csv.read()
    with open("lm_example/lm_example_core_NJ.nwk", "r") as nwk:
        tree = nwk.read()

    data = {"name":"PopPUNK-web-testing","data":clusters,"tree":tree}
    x = requests.post(url, data = data)
    print(x.text)
    return x.text.split('url":')[1].replace("}", "")


def get_colours(query, clusters):
    colours = []
    for clus in clusters:
        if not clus == query:
            colours.append('"blue"')
        else:
            colours.append('"rgb(255,128,128)"')
    return colours

@app.route('/upload', methods=['POST'])
@cross_origin()
def fileUpload():
    if not request.json:
        return "not a json post"
    if request.json:
        sketch = request.json
        time.sleep(3) #Simulate running process 
        url = api()
        query = 2
        clusters = [1,2,3,4,5,6,7,8,9,10]
        prevalences = [1,5,10,40,30,7,3,3,1,0]
        colours = str(get_colours(query, clusters)).replace("'", "")
        response = '{"species":"Influenza","prev":"'+str(prevalences[query-1])+'%","query":' + str(query) + ',"clusters":' + str(clusters) + ',"prevalences":' + str(prevalences) + ',"colours":' + colours + ',"microreactUrl":'+ url +'}'
        return jsonify(response)

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,use_reloader=False)
 