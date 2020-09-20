from flask import Flask, render_template

app = Flask("__main__")

@app.route('/', methods=['GET', 'POST'])
def index():
    render_template('sketch.html')