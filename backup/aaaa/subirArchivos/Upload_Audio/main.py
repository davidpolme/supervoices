from flask import Flask, render_template,redirect,url_for
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
import os
from wtforms.validators import InputRequired

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['UPLOAD_FOLDER'] = 'static/files'

class UploadFileForm(FlaskForm):
    file = FileField("File", validators=[InputRequired()])
    submit = SubmitField("Upload File")

@app.route('/', methods=['GET',"POST"])
def home():
    form = UploadFileForm()
    if form.validate_on_submit():
        file = form.file.data # First grab the file
        file.save(os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename))) # Then save the file
        return redirect(url_for('display_audios'))
    return render_template('index.html', form=form)

@app.route("/audios")
def display_audios():
    audioList = os.listdir('static/files')
    audioList = ['files/' + audio for audio in audioList]
    return render_template('showaudios.html', audioList=audioList)

if __name__ == '__main__':
    app.run(debug=True)