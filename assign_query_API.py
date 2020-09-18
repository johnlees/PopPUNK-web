from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os

from PopPUNK.assign_query import assign_query

app = Flask("__main__")

#Configure
app.config['UPLOAD_EXTENSIONS'] = ['.fna', '.fasta', '.fa', '.txt']
app.config['UPLOAD_PATH'] = 'uploads'

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        uploaded_file = request.files['file']
        isolate_name = uploaded_file.read().decode("utf-8").split("\n")[0].replace('>', '')
        uploaded_file = request.files['file']
        uploaded_file.save(os.path.join('uploads', secure_filename(uploaded_file.filename)))
        with open(os.path.join('uploads', "q_file.txt"), "w") as w:
            w.write(isolate_name + '\t' + str(os.path.join('uploads', secure_filename(uploaded_file.filename))))
            
        #Params
        min_k = int(request.form['min_k'])
        max_k = int(request.form['max_k'])
        k_step = int(request.form['k_step'])
        sketch_sizes = int(request.form['sketch_sizes'])
        min_count = int(request.form['min_count'])

        core_only = request.form['core_only']
        accessory_only = request.form['accessory_only']
        use_accessory = request.form['use_accessory']
        
        if not request.form['use_exact'] == True:
            use_exact = False
        else:
            use_exact = True

        max_a_dist = float(request.form['max_a_dist'])

        plot_fit = 0
        model_dir = 'databases/reference/reference'
        previous_clustering = 'databases/reference/reference'

        assign_query('databases/reference/reference', os.path.join('uploads', "q.txt"), "outputs",
                 min_k, max_k, k_step, sketch_sizes, 4,
                 plot_fit, max_a_dist, model_dir, previous_clustering, core_only, accessory_only, use_accessory,
                 # added extra arguments for constructing sketchlib libraries
                min_count, use_exact)
        return render_template('read.html', text="yes")
    else:
        return render_template('index.html')

if __name__=="__main__":
    app.run(debug=True)
