from flask import Blueprint, jsonify, session, request
from app.models import User, Party, Item, Guest_List, db
from app.forms import PartyForm, ItemForm
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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
            time=form.data['time'],
            starts_at=form.data['starts_at'], 
        )
        db.session.add(party)
        db.session.commit() 
        return party.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@planit_routes.route('/<int:id>', methods=['PUT'])
def update_planit(id):
    """
    Updates a party.
    """
    form = PartyForm()
    print(request.get_json())
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        party = Party.query.get(id)
        party.name=form.data['name'],
        party.details=form.data['details'],
        party.location=form.data['location'],
        party.image_url=form.data['image_url'],
        party.host_id=form.data['host_id'],
        party.time=form.data['time'],
        party.starts_at=form.data['starts_at'], 
     
        print(',,,,,,,,,,,,,,,,,,,,,', party)
        # db.session.add(party)
        db.session.commit() 
        return party.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@planit_routes.route('/<int:id>/items', methods=['POST'])
def planit_items(id):
    """
    Creates items for a party.
    """
    form = ItemForm()
    # print(request.get_json())
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


@planit_routes.route('/<int:id>/guests', methods=['POST'])
def invite(id):
    """
    adds a guest to guest_list
    """
    data = request.get_json()
    guest = Guest_List(
        party_id=data['party_id'],
        user_id=data['user_id']
    )
    db.session.add(guest)
    db.session.commit()
    return {'party_invites': guest.to_dict()}


@planit_routes.route('/<int:id>/guests')
def get_guests(id):
    """
    gets all guests from the guest list
    """
    guests = Guest_List.query.filter(Guest_List.party_id == id).all()
   
    return {'guest_list': [guest.to_dict() for guest in guests]}


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


@planit_routes.route('/image', methods=['POST'])
def pic():

    if "image" not in request.files:
            url = ''
    else:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            upload['url'] = ''
        url = upload['url']
        print('hit.........', url)

    return {'url': url}

