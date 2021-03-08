from flask import Blueprint, jsonify, session, request
from app.models import User, Party, Item, Guest_List, db
from app.forms import PartyForm, ItemForm

planit_routes = Blueprint('planits', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@planit_routes.route('/', methods=['POST'])
def host_planit():
    """
    Creates a party.
    """
    form = PartyForm()
    print(request.get_json())
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        party = Party(
            name=form.data['name'],
            details=form.data['details'],
            location=form.data['location'],
            image_url=form.data['image_url'],
            host_id=form.data['host_id'],
            ends_at=form.data['ends_at'],
            starts_at=form.data['starts_at'], 
        )
        db.session.add(party)
        db.session.commit() 
        return party.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@planit_routes.route('/<int:id>', methods=['PUT'])
def update_planit():
    """
    Updates a party.
    """
    form = PartyForm()
    print(request.get_json())
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        party = Party(
            name=form.data['name'],
            details=form.data['details'],
            location=form.data['location'],
            image_url=form.data['image_url'],
            host_id=form.data['host_id'],
            ends_at=form.data['ends_at'],
            starts_at=form.data['starts_at'], 
        )
        db.session.add(party)
        db.session.commit() 
        return party.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@planit_routes.route('/<int:id>/items', methods=['POST'])
def planit_items(id):
    """
    Creates items for a party.
    """
    form = ItemForm()
    print(request.get_json())
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        item = Item(
            name=form.data['name'],
            party_id=form.data['party_id'],
            # user_id=form.data['user_id']
        )
        db.session.add(item)
        db.session.commit() 
        return item.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@planit_routes.route('/<int:id>/items')
def getItems(id):
    """
    gets party items
    """
    items = Item.query.filter(Item.party_id == id).all()
    return {'party_items': [item.to_dict() for item in items]}


@planit_routes.route('/<int:id>')
def get_party(id):
    """
    Gets a single party.
    """
    party = Party.query.get(id)
    return party.to_dict()


@planit_routes.route('/<int:id>', methods=['DELETE'])
def delete_party(id):
    """
    Deletes a single party.
    """
    deleted = Party.query.get(id)
    db.session.delete(deleted)
    db.session.commit()
    return deleted.to_dict()
