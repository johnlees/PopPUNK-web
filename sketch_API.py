```Renders sketch.html template that runs sketch.js. Sequence uploader saves to "uploads", and will be retrieved and read by sketch.js```

from flask import Flask, render_template

app = Flask("__main__")

#Configure
app.config['UPLOAD_EXTENSIONS'] = ['.fna', '.fasta', '.fa', '.txt']
app.config['UPLOAD_PATH'] = 'uploads'

@app.route('/', methods=['GET', 'POST'])
def index():
    ```Retrieve and save file uplaoded to uploader.html```

    if request.method == 'POST':
        uploaded_file = request.files['file']
        isolate_name = uploaded_file.read().decode("utf-8").split("\n")[0].replace('>', '')

        uploaded_file = request.files['file']
        uploaded_file.save(os.path.join('uploads', secure_filename(uploaded_file.filename)))
        return render_template('sketch.html')
    else:
        return render_template('uploader.html')