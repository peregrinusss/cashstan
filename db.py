import os

from peewee import PostgresqlDatabase, Model
from peewee import TextField, SmallIntegerField, IntegerField, ForeignKeyField, DateField, BooleanField

db = PostgresqlDatabase(
    "stuff",
    host="squidass.com",
    port=9432,
    user=str(os.environ.get('ABC_USER')),
    password=str(os.environ.get('ABC_PASSWORD'))
)


class BaseModel(Model):
    """A base model for the event schema for the inheritance usage"""

    class Meta:
        database = db
        schema = 'alfabank-cashbacks'


class Beneficiary(BaseModel):
    """Beneficiary (account holder) table representation object"""
    id = SmallIntegerField(primary_key=True)
    full_name = TextField()


class Card(BaseModel):
    """Credit card table representation object"""
    id = SmallIntegerField(primary_key=True)
    number = TextField()
    type = TextField()
    beneficiary_id = ForeignKeyField(Beneficiary, backref='cards')
    icon = TextField()


class Category(BaseModel):
    """Cashback category table representation object"""
    id = SmallIntegerField(primary_key=True)
    name = TextField()
    icon = TextField()
    description = TextField()
    mcc = TextField()


class Cashback(BaseModel):
    """Cashback for a month table representation object"""
    id = SmallIntegerField(primary_key=True)
    date = DateField()
    category_id = ForeignKeyField(Category, backref='cashbacks')
    beneficiary_id = ForeignKeyField(Beneficiary, null=False, backref='cashbacks')
    percent = SmallIntegerField()
    start_date = DateField(null=False)
    end_date = DateField(null=False)
    overwritten_description = TextField(null=False)
    super = BooleanField(default=False)
