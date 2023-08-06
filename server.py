from flask import Flask, redirect, render_template, request,flash
import smtplib,ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
app.secret_key = '5XexS+y6dSfgN1KK0ii6aA=='

@app.route('/send', methods=['POST'])
def send():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        text = request.form['message']
        message = MIMEMultipart("alternative")
        message["Subject"] = request.form['subject']
        message["From"] = email
        message["To"] = "g1ur1vsinha@gmail.com"
        message.attach(MIMEText(f'''
                <html>
                    <body>
                        <h3>Hi, Gaurav</h3>
                        <br/>
                        <p>{text}</p>
                        <br/>
                        <p>From: {name}</p>
                        <p>Email: {email}</p>
                    </body>
                </html>''', 'html'))
        
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as server:
            server.login('gauravsinha618@gmail.com', 'uufjicmubtmnlpig')
            try:
                server.sendmail(from_addr=email,to_addrs='golubspr@gmail.com',msg=message.as_string())
                server.sendmail(from_addr=email,to_addrs='g1ur1vsinha@gmail.com',msg=message.as_string())
                flash("success")
            except:
                flash("error")
    return redirect('/')
    
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=False,host='0.0.0.0')
