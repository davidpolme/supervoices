from flask import Flask,request
from flask_mail import Mail, Message
from config import EMAIL_USER, EMAIL_PASSWORD

app = Flask(__name__)
mail= Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = EMAIL_USER
app.config['MAIL_PASSWORD'] = EMAIL_PASSWORD
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

@app.route("/email",methods=['POST'])
def send_email():
   email_user = request.json.get('email',None)
   email_message = request.json.get('message',None)
   email_subject = request.json.get('subject',None)
   msg = Message(email_subject, sender = 'daveyouup@gmail.com', recipients = [f'{email_user}'])
   msg.body = email_message
   mail.send(msg)
   return "Sent"

if __name__ == '__main__':
   app.run(debug = True)