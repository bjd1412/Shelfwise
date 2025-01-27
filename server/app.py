#!/usr/bin/env python3

from flask import request, session, Flask, make_response, jsonify
from datetime import datetime, timedelta
from flask_restful import Resource
from config import app, db, api
from models import Author, Book, Genre, Borrowing, Patron




@app.route('/')
def index():
    return '<h1>Project Server</h1>'




class Authors(Resource):
    def get(self):
        authors = Author.query.all()
        authors_list = []
        for author in authors:
            author_dict = author.to_dict()
            author_dict["books"] = []
            for book in author.books:
                book_dict = book.to_dict()  
                book_dict["genre"] = book.genre.to_dict(only=("id", "name"))
                author_dict["books"].append(book_dict)
            authors_list.append(author_dict)
        return make_response(authors_list, 200)

    
    def post(self):
        data = request.form
        author = Author.query.filter_by(name=data["name"]).first()
        if author:
            return make_response({"error": "Author already exists."}, 409)
        try:
            new_author = Author(
                name=data["name"],
            )
        except:
            return make_response({"Error": "Validation Error"}, 403)
        db.session.add(new_author)
        db.session.commit()
        return make_response(new_author.to_dict(), 201)

class Author_ID(Resource):

    def get(self, id):
        author = Author.query.filter(Author.id == id).first()
        if author:
            return make_response(author.to_dict(), 200)
        else:
            return make_response({"Error": "Author not found"}, 404)
        

    def delete(self, id):
        author = Author.query.filter(Author.id == id).first()
        if author:
            db.session.delete(author)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response({"Error": "User not found"}, 404)


class Books(Resource):

    def get(self):
        books = Book.query.options(joinedload(Book.genre)).order_by(Book.title).all()
        book_list = []
        for book in books:
            book_dict = book.to_dict()
            book_dict["genre"] = book.genre.to_dict(only=("id", "name"))  # Ensure genre data is included
            book_list.append(book_dict)
        return make_response(book_list, 200)

    def post(self):
        data = request.form
        try:
            new_book = Book(
                title=data["title"],
                summary=data["summary"],
                author_id=data["author_id"],
                genre_id=data["genre_id"]               
            )
        except:
            return make_response({"Error": "Validation Error"}, 403)
        db.session.add(new_book)
        db.session.commit()
        return make_response(new_book.to_dict(), 201)

class Book_ID(Resource):

    def get(self, id):
        book = Book.query.filter(Book.id == id).first()
        if book:
            book_dict = book.to_dict()
            book_dict["author"] = book.author.to_dict(only=("id", "name"))
            book_dict["genre"] = book.genre.to_dict(only=("id", "name"))
            return make_response(book_dict, 200)
        else:
            return make_response({"Error": "Book not found"}, 404)

    def patch(self, id):
        book = Book.query.filter(Book.id == id).first()
        data = request.form
        if book:
            try:
                for attr in data:
                    setattr(book, attr, data[attr])
                db.session.commit()
                book_dict = book.to_dict()
                return make_response(book_dict, 200)
            except:
                return make_response({"Error": "Validation Error"}, 403)
        else:
            return make_response({"Error": "Book not found"}, 404)
        

    def delete(self, id):
        book = Book.query.filter(Book.id == id).first()
        if book:
            db.session.delete(book)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response({"Error": "Book not found"}, 404)


class Genres(Resource):
    
    def get(self):
        genres = Genre.query.order_by(Genre.name).all()  # Querying all genres
        genre_list = []

        for genre in genres:  # Iterate over each genre
            genre_dict = genre.to_dict()  # Convert genre to dict
            genre_dict["authors"] = []  # Initialize an empty list for authors

            # Iterate over the authors related to the genre
            for author in genre.authors:
                author_dict = author.to_dict()  # Convert author to dict
                # For each author, add their books related to this genre
                author_dict["books"] = [book.to_dict(only=("id", "title", "summary"))
                                        for book in author.books if book.genre_id == genre.id]
                genre_dict["authors"].append(author_dict)  # Add author to the authors list

            genre_list.append(genre_dict)  # Append genre to the final list

        return make_response(genre_list, 200)  


    def post(self):
        data = request.form
        try:
            new_genre = Genre(
            name=data["name"],
            )
        except:
            return make_response({"Error": "Validation Error"}, 403)
        db.session.add(new_genre)
        db.session.commit()
        return make_response(new_genre.to_dict(), 201) 

class Genre_ID(Resource):

    def get(self, id):       
        genre = Genre.query.filter(Genre.id == id).first()
        if genre:
            return make_response(genre.to_dict(), 200)
        else:
            return make_response({"Error": "Genre not found"}, 404)

    def patch(self, id):
        genre = Genre.query.filter(Genre.id == id).first()
        data = request.form
        if genre:
            try:
                for attr in data:
                    setattr(genre, attr, data[attr])
                db.session.commit()
                genre_dict = genre.to_dict()
                return make_response(genre_dict, 200)
            except:
                return make_response({"Error": "Validation Error"}, 403)
        else:
            return make_response({"Error": "Genre not found"}, 404)
        

    def delete(self, id):
        genre = Genre.query.filter(Genre.id == id).first()
        if genre:
            db.session.delete(genre)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response({"Error": "Genre not found"}, 404)

class Patrons(Resource):

    def get(self):
        patron = Patron.query.order_by(Patron.name).all()
        patron_list = []
        for pat in patron:
            patron_dict = pat.to_dict()
            patron_list.append(patron_dict)
        return make_response(patron_list, 200)

    def post(self):
        data = request.form
        try:
            new_patron = Patron(
                name=data["name"],
                email=data["email"]
            )
        except:
            return make_response({"Error": "Validation Error"}, 403)
        db.session.add(new_patron)
        db.session.commit()
        return make_response(new_patron.to_dict(), 201)

class Patron_ID(Resource):

    def get(self, id):
        patron = Patron.query.filter(Patron.id == id).first()
        if patron:
            return make_response(patron.to_dict(), 200)
        else:
            return make_response({"Error": "Petron not found"})

    def patch(self, id):
        patron = Patron.query.filter(Patron.id == id).first()
        data = request.form
        if patron:
            try:
                for attr in data:
                    setattr(patron, attr, data[attr])
                db.session.commit()
                patron_dict = patron.to_dict()
                return make_response(patron_dict, 200)
            except:
                return make_response({"Error": "Validation Error"}, 403)
        else:
            return make_response({"Error": "Genre not found"}, 404)

    def delete(self, id):
        patron = Patron.query.filter(Patron.id == id).first()
        if patron:
            db.session.delete(patron)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response({"Error": "Genre not found"}, 404)


class Borrowings(Resource):

    def get(self):
        borrowing = Borrowing.query.all()
        borrowing_list = []
        for bo in borrowing:
            borrow_dict = bo.to_dict()
            borrowing_list.append(borrow_dict)
        return make_response(borrowing_list, 200)

    def post(self):
        data = request.form

        try:
            due_date = datetime.strptime(data["due_date"], "%m/%d/%Y")
        except ValueError:
            return make_response({"Error": "Invalid due date format. Use MM/DD/YYYY."}, 400)

        borrow_date = datetime.today()

        if due_date <= borrow_date:
            return make_response({"Error": "Due date must be after the borrow date."}, 400)
        if due_date > borrow_date + timedelta(days=30):
            return make_response({"Error": "Due date cannot exceed 30 days from borrow date."}, 400)

        book = Book.query.filter_by(title=data["book_title"]).first()
        patron = Patron.query.get(data["patron_id"])

        if not book:
            return make_response({"Error": "Book not found."}, 404)
        if not patron:
            return make_response({"Error": "Patron not found."}, 404)

        
        new_borrowing = Borrowing(
            book_id=book.id,
            patron_id=patron.id,
            due_date=due_date,
            borrow_date=borrow_date,
            return_date=None
        )
        db.session.add(new_borrowing)
        db.session.commit()

        
        return make_response(new_borrowing.to_dict(), 201)

class Borrowing_ID(Resource):

    def get(self, id):
        borrow = Borrowing.query.filter(Borrowing.id == id).first()
        if borrow:
            return make_response(borrow.to_dict(), 200)
        else:
            return make_response({"Error": "Petron not found"})



    def delete(self, id):
        borrow = Borrowing.query.filter(Borrowing.id == id).first()
        if patron:
            db.session.delete(borrow)
            db.session.commit()
            return make_response("", 204)
        else:
            return make_response({"Error": "Genre not found"}, 404)


class AuthorBooks(Resource):
    def get(self, author_id):
        author = Author.query.get(author_id)
        if not author:
            return make_response({"Error": "Author not found"}, 404)

        books = Book.query.filter_by(author_id=author_id).order_by(Book.title).all()
        books_list = [book.to_dict() for book in books]
        return make_response(books_list, 200)

class GenreAuthors(Resource):
    def get(self, genre_id):
        genre = Genre.query.get(genre_id)
        if not genre:
            return make_response({"Error": "Genre not found"}, 404)

        authors = (
            Author.query.join(Book)
            .filter(Book.genre_id == genre_id)
            .order_by(Author.name)
            .all()
        )

        authors_list = [author.to_dict() for author in authors]
        return make_response(authors_list, 200)


class PatronBooks(Resource):
    def get(self, patron_id):
        patron = Patron.query.get(patron_id)
        if not patron:
            return make_response({"Error": "Patron not found"}, 404)

        books = [borrowing.book.to_dict() for borrowing in patron.borrowings]
        return make_response(books, 200)

class PatronBorrows(Resource):
    def get(self, patron_id):
        patron = Patron.query.get(patron_id)
        if not patron:
            return make_response({"Error": "Patron not found"}, 404)

        borrowings = [
            {
                "id": borrowing.id,
                "book_id": borrowing.book_id,
                "book_title": borrowing.book.title,
                "borrow_date": borrowing.borrow_date.strftime("%m/%d/%Y"),
                "due_date": borrowing.due_date.strftime("%m/%d/%Y"),
                "return_date": borrowing.return_date.strftime("%m/%d/%Y") if borrowing.return_date else None,
            }
            for borrowing in patron.borrowings
        ]
        return make_response(borrowings, 200)

class GenreAuthorBooks(Resource):
    
    def get(self, genre_id, author_id):
        books = Book.query.filter_by(genre_id=genre_id, author_id=author_id).all()
        if not books:
            return make_response({"Error": "No books found for this genre and author"}, 404)
        return make_response([book.to_dict() for book in books], 200)






        

            

        















api.add_resource(Authors, "/authors")
api.add_resource(Author_ID, "/authors/<int:id>")
api.add_resource(AuthorBooks, '/authors/<int:author_id>/books')
api.add_resource(Books, "/books")
api.add_resource(Book_ID, "/books/<int:id>")
api.add_resource(Genres, "/genres")
api.add_resource(GenreAuthors, '/genres/<int:genre_id>/authors')
api.add_resource(GenreAuthorBooks, '/genres/<int:genre_id>/authors/<int:author_id>/books')
api.add_resource(Genre_ID, "/genres/<int:id>")
api.add_resource(Borrowings, "/borrowings")
api.add_resource(Borrowing_ID, "/borrowings/<int:id>")
api.add_resource(Patrons, "/patrons")
api.add_resource(Patron_ID, "/patrons/<int:id>")
api.add_resource(PatronBooks, '/patrons/<int:patron_id>/books')
api.add_resource(PatronBorrows, '/patrons/<int:patron_id>/borrowings')








if __name__ == '__main__':
    app.run(port=5555, debug=True)