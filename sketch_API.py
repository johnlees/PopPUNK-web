```Renders sketch.html template that runs sketch.js. Sequence uploader saves to "uploads", and will be retrieved and read by sketch.js```

from flask import Flask, render_template

app = Flask("__main__")

@app.route('/', methods=['GET', 'POST'])
def index():
    render_template('sketch.html')
