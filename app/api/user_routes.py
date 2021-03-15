from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Party, Item, Guest_List

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/me/friends/<int:userid>', methods=['POST'])
@login_required
def add_friend(userid):
    friend = User.query.get(userid)
    current_user.friends.append(friend)
    db.session.add(friend)
    db.session.commit()
    return {'message': 'success'}


@user_routes.route('/me/friends')
@login_required
def friends():
    users = current_user.friends
    print(users, '------------')
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/planits')
def get_parties(id):
    """
    Gets parties filtered by user.
    """
    hosted = Party.query.filter(Party.host_id == id).order_by(Party.starts_at.asc()).all()
    visiting = Guest_List.query.filter(Guest_List.user_id == id).all()
    return {'hosted_parties': [party.to_dict() for party in hosted], 'visiting_parties': [party.to_dict() for party in visiting]}


@user_routes.route('/<int:id>/items')
def get_items(id):
    """
    Gets items filtered by user.
    """
    items = Item.query.filter(Item.user_id == id).all()
    
    return {'party_items': [item.to_dict() for item in items]}
