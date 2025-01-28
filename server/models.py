from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import date, datetime, timedelta
import re

from config import db

class Author(db.Model, SerializerMixin):
    __tablename__ = "authors"

    serialize_rules = ("-books", "-genres",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    books = db.relationship("Book", back_populates="author", cascade="all, delete-orphan")
    genres = association_proxy("books", "genre")

    def __repr__(self):
        return f"<Author: {self.id}, {self.name}>"


    @validates("name")
    def validate_name(self, key, name):
        if not name.strip():
            raise ValueError("Name cannot be empty")
        elif len(name) > 100:
            raise ValueError("Name cannot be longer than 100 characters")
        elif Author.query.filter(db.func.lower(Author.name) == name.lower()).first():
            raise ValueError("Author already exists")        
        else:
            return name


class Book(db.Model, SerializerMixin):
    __tablename__ = "books"

    serialize_rules = ( "-borrowings", "genre", "-author")

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    summary = db.Column(db.String)
    author_id = db.Column(db.Integer, db.ForeignKey("authors.id"), index=True)
    genre_id = db.Column(db.Integer, db.ForeignKey("genres.id"), index=True)

    author = db.relationship("Author", back_populates="books")
    genre = db.relationship("Genre", back_populates="books")
    borrowings = db.relationship("Borrowing", back_populates="book", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Book: {self.id}, {self.title}>"


    @validates("title")
    def validate_title(self, key, title):
        if not title.strip():
            raise ValueError("Title cannot be empty")
        elif len(title) > 100:
            raise ValueError("Title cannot exceed 100 characters")
        elif Book.query.filter(db.func.lower(Book.title) == title.lower()).first():
            raise ValueError("Book already exists with this title")
        else:
            return title

    @validates("summary")
    def validate_summary(self, key, summary):
        if not summary.strip():
            raise ValueError("Summary cannot be empty")
        elif len(summary) > 1500:
            raise ValueError("Summary cannot exceed 1,500 characters")
        else:
            return summary
        

    @validates('author_id')
    def validate_author_id(self, key, author_id):
        author = Author.query.get(author_id)
        if not author:
            raise ValueError('Invalid author ID')
        return author_id


class Genre(db.Model, SerializerMixin):
    __tablename__ = "genres"

    serialize_rules = ("-books", "-authors",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    books = db.relationship("Book", back_populates="genre")
    authors = association_proxy('books', 'author')

    def __repr__(self):
        return f"<Genre: {self.id}, {self.name}>"

    @validates("name")
    def validate_genre(self, key, name):
        if not name.strip():
            raise ValueError("Genre cannot be empty")
        elif len(name) > 100:
            raise ValueError("Genre cannot be longer than 100 characters")
        elif Genre.query.filter(db.func.lower(Genre.name) == name.lower()).first():
            raise ValueError("Genre with this name already exists")
        else:
            return name


class Borrowing(db.Model, SerializerMixin):
    __tablename__ = "borrowings"

    serialize_rules = ("book", "-patron",)

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

    @validates('book_id')
    def validate_book_id(self, key, book_id):
        book = Book.query.get(book_id)
        if not book:
            raise ValueError('Invalid book ID')
        return book_id

    @validates('patron_id')
    def validate_patron_id(self, key, patron_id):
        patron = Patron.query.get(patron_id)
        if not patron:
            raise ValueError('Invalid patron ID')
        return patron_id





class Patron(db.Model, SerializerMixin):
    __tablename__ = "patrons"

    serialize_rules = ("borrowings", "-books",)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String)

    borrowings = db.relationship("Borrowing", back_populates="patron")
    books = association_proxy("borrowings", "book")

    def __repr__(self):
        return f"<Patron {self.id}, {self.name}, {self.email}>"

    @validates("name")
    def validate_name(self, key, name):
        if not name.strip():
            raise ValueError("Name cannot be empty")
        return name

    @validates("email")
    def validate_email(self, key, email):
        if not email:
            raise ValueError("Email cannot be empty")
        elif not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Invalid email format")
        elif Patron.query.filter_by(email=email).first():
            raise ValueError("Patron with this email already exists")
        else:
            return email