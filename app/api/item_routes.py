from flask import Blueprint, jsonify, session, request
from app.models import User, Party, Item, Guest_List, db
from sqlalchemy import update
from flask_login import current_user


item_routes = Blueprint('items', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@item_routes.route('/<int:id>', methods=['PUT'])
def claim_item(id):
    """
    Claims an item and assigns to a user.
    """
    # user_id = request.body['user_id']
    # print('\n\n\n\\\\\\\\\\\\.............. ', request.json)
    item = Item.query.get(id)
    
    item.user_id = current_user.id
    db.session.commit()
    return item.to_dict()
