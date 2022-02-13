from flask import Blueprint, render_template

supervoices = Blueprint("supervoices",__name__,template_folder="templates/app",static_folder="static/app",static_url_path="static/app")


@supervoices.route("/")
def supervoice():
    return render_template("app/baseapp.html")