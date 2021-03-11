from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker

# Adds a demo user, you can add other users here if you want
def seed_users():
    faker= Faker()
    images =[
        'https://myplanits.s3-us-west-1.amazonaws.com/balloons-zoom-background.jpg',
        'https://myplanits.s3-us-west-1.amazonaws.com/0266554465.jpeg',
        'https://myplanits.s3-us-west-1.amazonaws.com/cute-planet-illustration_136610-17.jpg',
        'https://myplanits.s3-us-west-1.amazonaws.com/planit-favicon.png',
        'https://myplanits.s3-us-west-1.amazonaws.com/profile.png',
        'https://myplanits.s3-us-west-1.amazonaws.com/Screen+Shot+2021-03-08+at+4.58.09+PM.png',
        'https://myplanits.s3-us-west-1.amazonaws.com/default-profile.jpg',
        'https://myplanits.s3-us-west-1.amazonaws.com/profile2.jpg',
        'https://myplanits.s3-us-west-1.amazonaws.com/profile3.jpg',
        'https://myplanits.s3-us-west-1.amazonaws.com/profile4.jpg',
        'https://myplanits.s3-us-west-1.amazonaws.com/profile5.jpg',
        'https://myplanits.s3-us-west-1.amazonaws.com/profile6.jpg',
        'https://myplanits.s3-us-west-1.amazonaws.com/profile7.jpg',
        'https://myplanits.s3-us-west-1.amazonaws.com/profile8.jpg',
    ]
    demo = User(first_name='Demo', 
                last_name='User', 
                email='demo@aa.io',
                image_url='https://myplanits.s3-us-west-1.amazonaws.com/default-profile.jpg',
                password='password')

    db.session.add(demo)
    times = 0
    while times < 13:
        newUser = User(
            first_name= faker.first_name(),
            last_name= faker.last_name(),
            email= faker.email(),
            image_url= images[times],
            password= (f'password{times}')
        ) 
        times = times + 1
        db.session.add(newUser)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
