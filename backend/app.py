from decimal import Decimal
import json
import uuid
from flask import Flask, Response, request, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_marshmallow import Marshmallow #configurar el esquema para el nuevo modelo
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from functools import wraps
from flask_cors import CORS

#AppConfigAndDeployment
app=Flask(__name__)
db=SQLAlchemy(app)
#CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///supervoices.db'
app.config['SECRET_KEY']='thisissecret'
ma=Marshmallow(app)
api=Api(app)
bcrypt = Bcrypt(app)
CORS(app)

#ModeloDeDatos
class tblConcursos(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(255))
    url=db.Column(db.String(50), unique=True)
    valor=db.Column(db.Numeric(10,2))
    guion=db.Column(db.Text)
    recomendaciones=db.Column(db.Text)
    fechainicio=db.Column(db.DateTime)
    fechafin=db.Column(db.DateTime)
    creadopor=db.Column(db.String(255))
    fechacreacion=db.Column(db.DateTime,default=datetime.now)    

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
    nombreArchivo=db.Column(db.String(50))
    extensionArchivo=db.Column(db.String(50))
    pathArchivo=db.Column(db.String(50))
    tipoArchivo=db.Column(db.String(50))
    fechacreacion=db.Column(db.DateTime,default=datetime.now)



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
        fields=('id','nombre','apellido','email','observaciones','nombreArchivo','extensionArchivo','pathArchivo','tipoArchivo','fechacreacion')
loc_schema=tblLocutores_Schema()
locs_schema=tblLocutores_Schema(many=True)


#ConfiguraciondeRestful
#RegistrarConcursos
class RecursoListarConcursos(Resource):
    def get(self):
        #def get_concursos(current_user):
            concursos=tblConcursos.query.all()
            message = concs_schema.dump(concursos)
            return jsonify({"concursos":message})
    def post(self):
        #def create_concurso(current_user):
        
            nuevo_concurso=tblConcursos(
                nombre=request.json['nombre'],
                url=request.json['frontEndUrl']+request.json['url'],
                valor=request.json['valor'],
                guion=request.json['guion'],
                recomendaciones=request.json['recomendaciones'],
                fechainicio=request.json['fechainicio'],
                fechafin=request.json['fechafin'],
                creadopor=request.json['creadopor'],
                fechacreacion=datetime.utcnow()
            )
            db.session.add(nuevo_concurso)
            db.session.commit()
            message = json.dumps({"message": "concurso creado"})
            return Response(message, status=201, mimetype='application/json')
        
class RecursoUnConcurso(Resource):
    def get(self,id_tblConcursos):
        #def get_concurso(current_user,id_tblConcursos):
            concurso=tblConcursos.query.get_or_404(id_tblConcursos)
            message = conc_schema.dump(concurso)
            return jsonify(message)
        
    def put(self, id_tblConcursos):
        #def update_concurso(current_user,id_tblConcursos):
            concurso=tblConcursos.query.get_or_404(id_tblConcursos)
            if 'nombre' in request.json:
                concurso.nombre=request.json['nombre']
            if 'url' in request.json:
                concurso.url=request.json['frontEndUrl']+request.json['url']
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
            db.session.add(concurso)
            db.session.commit()
            message =  json.dumps({"message": "Concurso Actualizado Exitosamente"})
            return Response(message, status=201, mimetype='application/json')



#RegistrarAdmins
class RecursoAgregarAdmins(Resource):
    def get(self):
        #def get_all_users(current_user):
         #   if not current_user.id:
          #      return jsonify({"error":"User not authenticated"}), 401
            administradores=tblAdministradores.query.all()
            return admins_schema.dump(administradores)
    def post(self):
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
            message = json.dumps({"message": "usuario creado", "usuario": admin_schema.dump(nuevo_admin) })
            return Response(message, status=201, mimetype='application/json')

class RecursoUnAdmin(Resource):
    def get(self,id_tblAdministradores):
            admin=tblAdministradores.query.get_or_404(id_tblAdministradores)
            message = admin_schema.dump(admin)
            return jsonify(message)
        
    def put(self, id_tblAdministradores):
        #def update_concurso(current_user,id_tblConcursos):
            admin=tblAdministradores.query.get_or_404(id_tblAdministradores)
            if 'nombre' in request.json:
                concurso.nombre=request.json['nombre']
            if 'apellido' in request.json:
                concurso.url=request.json['apellido']
            if 'email' in request.json:
                concurso.valor=request.json['email']
            if 'clave' in request.json:
                concurso.guion=request.json['clave']
            db.session.add(admin)
            db.session.commit()
            message =  json.dumps({"message": "Administrador Actualizado Exitosamente"})
            return Response(message, status=201, mimetype='application/json')


#AdminLogin
class RecursoLogin(Resource):
    def post(self):
        
        email=request.json['email']
        clave=request.json['clave']
        
        if not email or not clave:
                return jsonify({'message':'Email or password mismatch'})
        
        user = tblAdministradores.query.filter_by(email=email).first()
      
        if user is None:
            message = json.dumps({"error": "No Autorizado, el email no está registrado o es incorrecto"})
            return Response(message, status=401, mimetype='application/json')

        elif not bcrypt.check_password_hash(user.clave, clave):
            message = json.dumps({"error": "No Autorizado, la contraseña es incorrecta"})
            return Response(message, status=401, mimetype='application/json')
        else:
            return jsonify({'message': 'Autenticado exitosamente'})

#RegistroLocutoresConcursos
class RecursoListarLocutores(Resource):
    def get(self):
        #def get_locutores(current_user):
            locutores=tblLocutores.query.all()
            return locs_schema.dump(locutores)
    def post(self):
        # def create_locutor(current_user):
            nuevo_locutor=tblLocutores(
                nombre=request.json['nombre'],
                apellido=request.json['apellido'],
                email=request.json['email'],
                observaciones=request.json['observaciones'],
                nombreArchivo=request.json['nombreArchivo'],
                extensionArchivo=request.json['extensionArchivo'],
                pathArchivo=request.json['pathArchivo'],
                tipoArchivo=request.json['tipoArchivo']   
            )
            db.session.add(nuevo_locutor)
            db.session.commit()
            return loc_schema.dump(nuevo_locutor), 201

api.add_resource(RecursoListarConcursos,'/api/registrarConcursos')
api.add_resource(RecursoUnConcurso,'/api/registrarConcursos/<int:id_tblConcursos>')
api.add_resource(RecursoAgregarAdmins,'/api/registrarAdmin')
api.add_resource(RecursoLogin,'/api/login')
api.add_resource(RecursoListarLocutores,'/api/locutores')

#Deployment
if __name__=='__main__':app.run(debug=True)