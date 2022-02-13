from flask import Blueprint, render_template


front = Blueprint("front",__name__,template_folder="templates/front",static_folder='static/front',static_url_path="static/front")

@front.route("/")
def home():
    return render_template("home.html")



@front.route("/login")
def login():
    return render_template("login.html")