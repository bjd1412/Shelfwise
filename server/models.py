from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

class Author(db.Model, SerializerMixin):
    __tablename__ = "authors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    books = db.relationship("Book", back_populates="author")
    genres = association_proxy("books", "genre")


class Book(db.Model, SerializerMixin):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    author_id = db.Column(db.Integer, db.ForeignKey("authors.id"))
    genre_id = db.Column(db.Integer, db.ForeignKey("genres.id"))

    author = db.relationship("Author", back_populates="books")
    genre = db.relationship("Genre", back_populates="books")
    borrowings = db.relationship("Borrowing", back_populates="book")


class Genre(db.Model, SerializerMixin):
    __tablename__ = "genres"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    books = db.relationship("Book", back_populates="genre")

    authors = association_proxy('books', 'author')


class Borrowing(db.Model, SerializerMixin):
    __tablename__ = "borrowings"

    id = db.Column(db.Integer, primary_key=True)
    patron_id = db.Column(db.Integer, db.ForeignKey('patron.id'), nullable=False)
    borrow_date = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    due_date = db.Column(db.DateTime, nullable=False)
    return_date = db.Column(db.DateTime, nullable=True)

    book = db.relationship("Book", back_populates="borrowings")
    patron = db.relationship("Patron", back_populates="borrowings")



class Patron(db.Model, SerializerMixin):
    __tablename__ = "patrons"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)

    borrowings = db.relationship("Borrowing", back_populates="patron")
    books = association_proxy("borrowings", "book")