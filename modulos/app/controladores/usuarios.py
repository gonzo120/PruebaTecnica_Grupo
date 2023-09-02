import os
from flask import request, jsonify
from app import app, mongo

ROOT_PATH = os.environ.get('ROOT_PATH')

@app.route('/usuarios/listado', methods=['GET'])
def listar_usuarios():
    if request.method == 'GET':
        data = mongo.db.Usuarios.find({})
        listado_documentos = list(data)

        if not listado_documentos:
            listado_documentos = []

        return jsonify({"Usuario": True, "data": listado_documentos})
