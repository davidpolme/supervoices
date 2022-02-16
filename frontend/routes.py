from flask import Blueprint, redirect, render_template, request, url_for

front = Blueprint("front",__name__,template_folder="templates/front",static_folder='static/front',static_url_path="static/front")

@front.route("/")
def home():
    return render_template("home.html")



@front.route("/login",methods=['GET','POST'])
def login():

    if request.method=="GET":    
        return render_template("login.html")
    print("hola mundo")
    return redirect(url_for("supervoices.supervoice"))
    