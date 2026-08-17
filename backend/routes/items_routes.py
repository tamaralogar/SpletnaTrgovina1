import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Blueprint, jsonify, request
from models.item_model import get_all_items

items_bp = Blueprint('items', __name__)

@items_bp.route('/api/items', methods=['GET'])
def get_items():

    velikost = request.args.get('velikost')
    max_cena = request.args.get('maxCena', type=float)

    kategorija_param = request.args.get('kategorije')
    kategorija = kategorija_param.split(',') if kategorija_param else None
    barva_param = request.args.get('barve')
    barva = barva_param.split(',') if barva_param else None    

    items = get_all_items(velikost, max_cena, kategorija, barva)
    return jsonify(items)