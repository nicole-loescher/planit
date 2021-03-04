from flask import Blueprint, jsonify, session, request
from app.models import User, Party, Item, Guest_List, db
from app.forms import PartyForm

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


@planit_routes.route('/')
def get_parties():
    """
    Gets parties filtered by user.
    """
    hosted = Party.query.filter(Party.host_id == form.data['host_id']).all()
    
    return {'hosted_parties': [party.to_dict() for party in hosted]}

@planit_routes.route('/', methods=['POST'])
def host_planit():
    """
    Creates a party.
    """
    form = PartyForm()
    print(request.get_json())
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('==============', form.data)
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
