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

    def __repr__(self):
        return f"<Author: {self.id}, {self.name}>"


class Book(db.Model, SerializerMixin):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    author_id = db.Column(db.Integer, db.ForeignKey("authors.id"), index=True)
    genre_id = db.Column(db.Integer, db.ForeignKey("genres.id"), index=True)

    author = db.relationship("Author", back_populates="books")
    genre = db.relationship("Genre", back_populates="books")
    borrowings = db.relationship("Borrowing", back_populates="book")

    def __repr__(self):
        return f"<Book: {self.id}, {self.title}>"


class Genre(db.Model, SerializerMixin):
    __tablename__ = "genres"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    books = db.relationship("Book", back_populates="genre")
    authors = association_proxy('books', 'author')

    def __repr__(self):
        return f"<Genre: {self.id}, {self.name}>"


class Borrowing(db.Model, SerializerMixin):
    __tablename__ = "borrowings"

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False, index=True)
    patron_id = db.Column(db.Integer, db.ForeignKey('patrons.id'), nullable=False, index=True)
    borrow_date = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    due_date = db.Column(db.DateTime, nullable=False)
    return_date = db.Column(db.DateTime, nullable=True)

    book = db.relationship("Book", back_populates="borrowings")
    patron = db.relationship("Patron", back_populates="borrowings")

    def __repr__(self):
        return f"<Borrowing: {self.id}, {self.book_id}, {self.patron_id}, {self.borrow_date}, {self.due_date}, {self.return_date}>"



class Patron(db.Model, SerializerMixin):
    __tablename__ = "patrons"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)

    borrowings = db.relationship("Borrowing", back_populates="patron")
    books = association_proxy("borrowings", "book")

    def __repr__(self):
        return f"<Patron {self.id}, {self.name}, {self.email}>"