from flask import Flask, request, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow #configurar el esquema para el nuevo modelo
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from functools import wraps

#AppConfigAndDeployment
app=Flask(__name__)
db=SQLAlchemy(app)
#CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///supervoices.db'
app.config['SECRET_KEY']='thisissecret'
ma=Marshmallow(app)
api=Api(app)
bcrypt = Bcrypt(app)

#ModeloDeDatos
class tblConcursos(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(255))
    url=db.Column(db.String(50))
    valor=db.Column(db.Numeric(10,2))
    guion=db.Column(db.Text)
    recomendaciones=db.Column(db.Text)
    fechainicio=db.Column(db.DateTime)
    fechafin=db.Column(db.DateTime)
    creadopor=db.Column(db.String(255))
    fechacreacion=db.Column(db.DateTime,default=datetime.datetime.now)    

class tblAdministradores(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(50),nullable=False)
    apellido=db.Column(db.String(50),nullable=False)
    email=db.Column(db.String(50), nullable=False, unique=True)
    clave=db.Column(db.String(50), nullable=False)

class tblLocutores(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(50))
    apellido=db.Column(db.String(50))
    email=db.Column(db.String(50))
    observaciones=db.Column(db.Text)
    fechacreacion=db.Column(db.DateTime,default=datetime.datetime.now)



#funciones

#def token_required(f):
    #@wraps(f)
    #def decorated(*args, **kwargs):
        #token = None

        #if 'x-access-token' in request.headers:
            #token = request.headers['x-access-token']

        #if not token:
            #return jsonify({'message' : 'Token is missing!'}), 401

        #try: 
            #data = jwt.decode(token, app.config['SECRET_KEY'])
            #current_user = tblAdministradores.query.filter_by(id=data['id']).first()
            #return print(current_user)
        #except:
            #return jsonify({'message' : 'Token is invalid!'}), 401

        #return f(current_user, *args, **kwargs)

    #return decorated


#ConfiguracionDelEsquema
class tblConcursos_Schema(ma.Schema):
    class Meta:
        fields=('id','nombre','url','valor','guion','recomendaciones','fechainicio','fechafin','fechacreacion')
conc_schema=tblConcursos_Schema()
concs_schema=tblConcursos_Schema(many=True)

class tblAdministradores_Schema(ma.Schema):
    class Meta:
        fields=('id','nombre','apellido','email','clave')
admin_schema=tblAdministradores_Schema()
admins_schema=tblAdministradores_Schema(many=True)

class tblLocutores_Schema(ma.Schema):
    class Meta:
        fields=('id','nombre','apellido','email','observaciones','fechacreacion')
loc_schema=tblLocutores_Schema()
locs_schema=tblLocutores_Schema(many=True)


#ConfiguraciondeRestful
#RegistrarConcursos
class RecursoListarConcursos(Resource):
    def get(self):
        #@token_required
        #def get_concursos(current_user):
            concursos=tblConcursos.query.all()
            return concs_schema.dump(concursos)
    def post(self):
       #@token_required
        #def create_concurso(current_user):
            nuevo_concurso=tblConcursos(
                nombre=request.json['nombre'],
                url=request.json['url'],
                valor=request.json['valor'],
                guion=request.json['guion'],
                recomendaciones=request.json['recomendaciones'],
                fechainicio=request.json['fechainicio'],
                fechafin=request.json['fechafin']
            )
            db.session.add(nuevo_concurso)
            db.session.commit()
            return conc_schema.dump(nuevo_concurso)
class RecursoUnConcurso(Resource):
    def get(self,id_tblConcursos):
        #@token_required
        #def get_concurso(current_user,id_tblConcursos):
            concurso=tblConcursos.query.get_or_404(id_tblConcursos)
            return post_schema.dump(concurso)
    def put(self, id_tblConcursos):
        #@token_required
        #def update_concurso(current_user,id_tblConcursos):
            concurso=tblConcursos.query.get_or_404(id_tblConcursos)
            if 'nombre' in request.json:
                concurso.nombre=request.json['nombre']
            if 'url' in request.json:
                concurso.url=request.json['url']
            if 'valor' in request.json:
                concurso.valor=request.json['valor']
            if 'guion' in request.json:
                concurso.guion=request.json['guion']
            if 'recomendaciones' in request.json:
                concurso.recomendaciones=request.json['recomendaciones']
            if 'fechainicio' in request.json:
                concurso.fechainicio=request.json['fechainicio']
            if 'fechafin' in request.json:
                concurso.fechafin=request.json['fechafin']
            if 'fechacreacion' in request.json:
                concurso.fechacreacion=request.json['fechacreacion']
            db.session.add(nuevo_concurso)
            db.session.commit()
            return conc_schema.dump(nuevo_concurso)



#RegistrarAdmins
class RecursoAgregarAdmins(Resource):
    def get(self):
        #@token_required
        def get_all_users(current_user):
            if not current_user.id:
                    return jsonify({"error":"User not authenticated"})
            administradores=tblAdministradores.query.all()
            return admins_schema.dump(administradores)
    def post(self):
        #@token_required
        #def create_admin(current_user):
            nombre=request.json['nombre']
            apellido=request.json['apellido']
            email=request.json['email']
            clave=request.json['clave']
                
            admin_exists = tblAdministradores.query.filter_by(email=email).first() is not None
            if admin_exists:
                return jsonify({"error": "Usuario ya esta registrado"}), 409
                
            hashed_clave=bcrypt.generate_password_hash(clave)
            
            nuevo_admin=tblAdministradores(nombre=nombre, apellido=apellido, email=email,clave=hashed_clave)
            db.session.add(nuevo_admin)
            db.session.commit()
            return admin_schema.dump(nuevo_admin)

#AdminLogin
class RecursoLogin(Resource):
    def post(self):
            email=request.json['email']
            clave=request.json['clave']
            
            user = tblAdministradores.query.filter_by(email=email).first()

            if user is None:
                return jsonify({"error": "No Autorizado"}), 401

            if not bcrypt.check_password_hash(user.clave, clave):
                #token=jwt.encode({'id':user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},app.config['SECRET_KEY'])
                #return jsonify ({'token': token.decode('UTF-8')})
                #return jsonify ({'token': jwt.decode(token, app.config['SECRET_KEY'])})
            return jsonify({"error": "No Autorizado"}), 401

#RegistroLocutoresConcursos
class RecursoListarLocutores(Resource):
    def get(self):
        #@token_required
        #def get_locutores(current_user):
            locutores=tblLocutores.query.all()
            return locs_schema.dump(locutores)
    def post(self):
        #@token_required
        # def create_locutor(current_user):
            nuevo_locutor=tblLocutores(
                nombre=request.json['nombre'],
                apellido=request.json['apellido'],
                email=request.json['email'],
                observaciones=request.json['observaciones']
            )
            db.session.add(nuevo_locutor)
            db.session.commit()
            return loc_schema.dump(nuevo_locutor)

api.add_resource(RecursoListarConcursos,'/registrarConcursos')
api.add_resource(RecursoUnConcurso,'/registrarConcursos/<int:id_tblConcursos>')
api.add_resource(RecursoAgregarAdmins,'/registrarAdmin')
api.add_resource(RecursoLogin,'/login')
api.add_resource(RecursoListarLocutores,'/locutores')

#Deployment
if __name__=='__main__':app.run(debug=True)