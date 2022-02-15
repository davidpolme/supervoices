# from . import create_app
# app = create_app()
from flask import Flask
from .routes import front
from .app.routes import supervoices
#from flask_login import LoginManager
#from flask_sqlalchemy import SQLAlchemy

#login_manager = LoginManager()
#db = SQLAlchemy()

app = Flask(__name__)
app.config['SECRET_KEY'] = '7110c8ae51a4b5af97be6534caef90e4bb9bdcb3380af008f90b23a5d1616bf319bc298105da20fe'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# login_manager.init_app(app)
# login_manager.login_view = "auth.login"

#db.init_app(app)


# from apps.user.routes import user

app.register_blueprint(front,url_prefix='')
app.register_blueprint(front,url_prefix='/login')
app.register_blueprint(supervoices,url_prefix='/supervoice')
# app.register_blueprint(user,url_prefix='/user')

if __name__ == "__main__":

    app.run(debug=True)