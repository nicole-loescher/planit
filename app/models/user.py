from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

    
class Guest_List(db.Model):
  __tablename__:'guest_list'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  party_id = db.Column(db.Integer, db.ForeignKey('parties.id'))
  rsvp = db.Column(db.Boolean)

  # party = db.relationship('Party', lazy='joined', back_populates='guests')

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'party_id': self.party_id,
      'rsvp': self.rsvp,
      # 'party': self.party.to_dict(),
    }

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  first_name = db.Column(db.String(40), nullable = False)
  last_name = db.Column(db.String(40), nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  image_url = db.Column(db.String(255))
  hashed_password = db.Column(db.String(255), nullable = False)

  hosting = db.relationship('Party', lazy='joined', back_populates='host')
  # visiting = db.relationship('Party', lazy='joined', secondary='guest_list', back_populates='guests')
  items = db.relationship('Item', lazy='joined', back_populates='guest')

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "image_url": self.image_url,
      "email": self.email
    }

class Party(db.Model):
  __tablename__='parties'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  location = db.Column(db.String(50), nullable=False)
  image_url = db.Column(db.String(255))
  starts_at = db.Column(db.String(20), nullable=False)
  time = db.Column(db.String(20))
  details = db.Column(db.String(255))
  host_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  created_at = db.Column(db.DateTime())
  updated_at = db.Column(db.DateTime())

  host = db.relationship('User', lazy='joined', back_populates='hosting')
  # guests = db.relationship('User', lazy='joined', secondary='guest_list', back_populates='visiting')
  items = db.relationship('Item', lazy='joined', back_populates='party', cascade='all, delete')

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "location": self.location,
      "image_url": self.image_url,
      "starts_at": self.starts_at,
      "time": self.time,
      "details": self.details,
      "host_id": self.host_id,
      'host': self.host.to_dict()
    }


class Item(db.Model):
  __tablename__:'items'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(30), nullable=False)
  quantity = db.Column(db.Integer, default=1)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  party_id = db.Column(db.Integer, db.ForeignKey('parties.id'))
  
  guest = db.relationship('User', lazy='joined', back_populates='items')
  party = db.relationship('Party', lazy='joined', back_populates='items')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'quantity': self.quantity,
      'user_id': self.user_id,
      'party_id': self.party_id,
      'party': self.party.to_dict(),
      # 'guest': self.guest.to_dict()
    }
