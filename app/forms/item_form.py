from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField

from wtforms.validators import DataRequired, ValidationError

class ItemForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    party_id = IntegerField('party_id', validators=[DataRequired()])
    # user_id = IntegerField('user_id', default='')