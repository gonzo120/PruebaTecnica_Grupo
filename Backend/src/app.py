from flask import Flask, request, json, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId

# instancia del servidor
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}}, supports_credentials=True)

# Propiedades de conf de mongo
# asegurar que mongodb inicie
app.config['MONGO_URI'] = 'mongodb://localhost:27017/usuarios'

# conexion
mongo = PyMongo(app)

@app.route('/createPatient', methods=['POST'])
def createPatient():
    # definir campos
    nombre = request.json['nombre']
    Consulta = request.json['Consulta']
    correo = request.json['correo']
    atendido = request.json['atendido']

    # comprobar campos vacios
    if nombre and Consulta and correo:
        # insertar Paciente
        
        objeto = mongo.db.pacientes.insert_one({
            'nombre': nombre,
            'Consulta': Consulta,
            'correo': correo,
            'atendido': atendido
        })

        # obtener respuesta
        return jsonify({
            'data': {
                '_id': str(objeto.inserted_id),
                'nombre': nombre,
                'Consulta': Consulta,
                'correo': correo,
                'atendido': atendido
            },
            'message': 'Paciente ' + nombre + ' agregado satisfactoriamente'
        }), 200
    else:
        # obtener respuesta
        return jsonify({'data': {}, 'message': 'Los campos nombre, consulta y correo son obligatorios'}), 400

@app.route('/listOfPatients', methods=['GET'])
def listOfPatients():
    # obtener lista
    Pacientes = mongo.db.pacientes.find({})
    # convertir cursor a json
    Pacientes = json_util.dumps(Pacientes)
    # cargar como objeto de json
    Pacientes = json.loads(Pacientes)

    return jsonify({'data': Pacientes}), 200

@app.route('/listOfPatients/<id>', methods=['GET'])
def listOfPatientsID(id):
    # obtener lista
    Pacientes = mongo.db.pacientes.find({'_id': ObjectId(id)})
    # convertir cursor a json
    Pacientes = json_util.dumps(Pacientes)
    # cargar como objeto de json
    Pacientes = json.loads(Pacientes)

    return jsonify({'data': Pacientes}), 200


@app.route('/updatePatient/<id>', methods=['PUT'])
def updateBook(id):
     # definir campos
    nombre = request.json['nombre']
    Consulta = request.json['Consulta']
    correo = request.json['correo']
    atendido = request.json['atendido']
    
    # comprobar campos vacios
    if nombre and Consulta and correo:
        # buscar y modificar
        objeto = mongo.db.pacientes.find_one_and_update({'_id': ObjectId(id)}, { '$set': {
            'nombre': nombre,
            'Consulta': Consulta,
            'correo': correo,
            'atendido': atendido
        }})
        # respuesta
        if objeto != None:
            return jsonify({'message': 'Paciente ' + id + ' fue actualizado satisfactoriamente'}), 200
        else:
            return jsonify({'message': 'Paciente ' + id + ' no encontrado'}), 400

@app.route('/deletePatient/<id>', methods=['DELETE'])
def deletePatient(id):
    pass

     # buscar y eliminar
    pacienteliminar = mongo.db.pacientes.find_one_and_delete({ '_id': ObjectId(id)})
    # respuesta
    if pacienteliminar != None:
        return jsonify({'message': 'Paciente ' + id + ' fue eliminado satisfactoriamente'}), 200
    else:
        return jsonify({'message': 'paciente ' + id + ' no encontrado'}), 400

# iniciar modulo  principal
if __name__ == '__main__':
    # debug=True activar modo desarrollador
    
    app.run(debug=True, port=5000)