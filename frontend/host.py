from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/apply')
def apply():
    return render_template("apply.html")

@app.route('/hotels')
def hotels():
    return render_template("Hotels.html")

@app.route('/admin')
def admin():
    return render_template("admin.html")

@app.route('/faq')
def faq():
    return render_template("faq.html")

@app.route('/referee')
def referee():
    return render_template("referee.html")

@app.route('/sponsors')
def sponsors():
    return render_template("sponsors.html")

@app.route('/team')
def team():
    return render_template("team.html")

@app.route('/refereeSignUp')
def refereeSignUp():
    return render_template("refereeSignUp.html")

@app.route('/adminContent/<token>')
def adminContent(token=None):
    return render_template("adminContent.html", token=token)

if __name__ == '__main__':
    app.run(port=8000)
