#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Patron, Author, Book, Borrowing, Genre
from datetime import date, datetime, timedelta

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        Author.query.delete()  
        Book.query.delete()  
        Genre.query.delete()  
        Borrowing.query.delete()  
        Patron.query.delete()

        # Seed authors
        authors = []
        for _ in range(10):
            author = Author(name=fake.name())
            db.session.add(author)
            authors.append(author)

        db.session.commit()

        # Seed genres
        genres = []
        for _ in range(5):
            genre = Genre(name=fake.word())
            db.session.add(genre)
            genres.append(genre)

        db.session.commit()

        # Seed books
        books = []
        for _ in range(20):
            book = Book(
                title=fake.catch_phrase(),
                author=rc(authors),
                genre=rc(genres)
            )
            db.session.add(book)
            books.append(book)

        db.session.commit()

        # Seed patrons
        patrons = []
        for _ in range(10):
            patron = Patron(
                name=fake.name(),
                email=fake.email()
            )
            db.session.add(patron)
            patrons.append(patron)

        db.session.commit()

        # Seed borrowings
        for _ in range(20):
            book = rc(books)
            patron = rc(patrons)
            
            
            borrow_date = fake.date_between(start_date="-1y", end_date="today")
            
            
            due_date = fake.date_between(start_date=borrow_date, end_date=(borrow_date + timedelta(days=30)))
            
            
            return_date = fake.random_element(elements=(None, fake.date_between(start_date=borrow_date, end_date=due_date)))
            
            borrowing = Borrowing(
                book=book,
                patron=patron,
                borrow_date=borrow_date,
                due_date=due_date,
                return_date=return_date
            )
            db.session.add(borrowing)

        db.session.commit()

        print("Seeding complete!")