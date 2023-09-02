from flask import Flask, jsonify
import json
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import datetime

class JSONEncoder(json.JSONEncoder):
    def default(self,o):
        if isinstance(o, ObjectId):
            return(o)
        if isinstance(o,datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self,o)




app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://Flask:gonzo123@prueba1.uaipc9p.mongodb.net/?retryWrites=true&w=majority'

print("URI de conexión a MongoDB:", app.config['MONGO_URI'])

app.json_encoder = JSONEncoder
mongo = PyMongo(app)

@app.route('/test_mongo')
def test_mongo():
    try:
        result = mongo.db.Usuarios.find_one()
        
        if result is not None:
            return jsonify({'message': 'Conexión exitosa a MongoDB', 'data': result}), 200
        else:
            return jsonify({'message': 'No se pudo recuperar datos de MongoDB'}), 500

    except Exception as e:
        return jsonify({'message': f'Error de conexión a MongoDB: {str(e)}'}), 500




from app.controladores import *