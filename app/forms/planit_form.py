from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField

from wtforms.validators import DataRequired, ValidationError
from app.models import Party

class PartyForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    image_url = StringField('image_url')
    details = StringField('details')
    starts_at = DateTimeField('starts_at')
    ends_at = DateTimeField('ends_at')
    host_id = IntegerField('host_id', validators=[DataRequired()])