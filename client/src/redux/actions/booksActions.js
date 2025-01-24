import { setBooks, setBookDetails, setBooksError, setBooksStatus } from "../reducers/booksSlice";

export const fetchAuthorBooks = (authorId) => (dispatch) => {

    dispatch(setBooksStatus("loading"))
    dispatch(setBooks([]))

    fetch(`/authors/${authorId}/books`)
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to fetch books")
        }
        return res.json()
    })
    .then( books => {
        dispatch(setBooksStatus("succeeded"))
        dispatch(setBooks(books))
    })
    .catch(error => {
        setBooksError(error.toString())
        setBooksStatus("failed")
    })

}

export const fetchGenreAuthorBooks = (genreId, authorId) => (dispatch) => {
    dispatch(setBooksStatus("loading"))
    dispatch(setBooks([]))

    fetch(`/genres/${genreId}/authors/${authorId}/books`)
    .then(res => {
        if(!res.ok) {
            throw new Error("Failed to fetch books for author in genre")
        }
        return res.json()
    })
    .then(books => {
        dispatch(setBooks(books))
        dispatch(setBooksStatus('succeeded'))
    })
    .catch(error => {
        dispatch(setBooksError(error.toString()))
        dispatch(setBooksStatus('failed'))
    })
}

export const fetchBookDetails = (bookId) => (dispatch) => {
    dispatch(setBooksStatus("loading"))
    dispatch(setBooks([]))

    fetch(`/books/${bookId}`)
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to fetch books")
        }
        return res.json()
    })
    .then( book => {
        dispatch(setBooksStatus("succeeded"))
        dispatch(setBookDetails(book))
    })
    .catch(error => {
        setBooksError(error.toString())
        setBooksStatus("failed")
    })

}

export const fetchBooks = () => (dispatch) => {
    dispatch(setBooksStatus("loading"))
    dispatch(setBooks([]))

    fetch("/books")
    .then(res => {
        if(!res.ok){
            throw new Error("Failed to fetch books")
        }
        return res.json()
    })
    .then(books => {
        dispatch(setBooksStatus("succeeded"))
        dispatch(setBooks(books))
    })
    .catch(error => {
        dispatch(setBooksStatus("failed"))
        dispatch(setBooksError(error.toString()))
    })
}

export const createBook = (bookData) => (dispatch, getState) => {
    dispatch(setBooksStatus("loading"));  

    
    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("summary", bookData.summary);
    formData.append("author_id", bookData.authorId);  
    formData.append("genre_id", bookData.genreId);    

    fetch("/books", {
        method: "POST",
        body: formData,  
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to create book");
            }
            return res.json();
        })
        .then((newBook) => {
            dispatch(setBooksStatus("succeeded"));
            const currentBooks = getState().books.books
            dispatch(setBooks([...currentBooks, newBook]));  
        })
        .catch((error) => {
            dispatch(setBooksError(error.toString()));
            dispatch(setBooksStatus("failed"));
        });
};

export const updateBook = (bookId, updatedData) => (dispatch) => {
    dispatch(setBooksStatus("loading"));  

    
    const formData = new FormData();
    formData.append("title", updatedData.title);
    formData.append("summary", updatedData.summary);
    formData.append("author_id", updatedData.authorId);
    formData.append("genre_id", updatedData.genreId);


    fetch(`/books/${bookId}`, {
        method: "PATCH",
        body: formData,  
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to update book");
        }
        return res.json();
    })
    .then((updatedBook) => {
        dispatch(setBooksStatus("succeeded"));  

       
        dispatch(setBookDetails(updatedBook));

        
        dispatch(setBooks((prevBooks) => 
            prevBooks.map((book) => 
                book.id === updatedBook.id ? updatedBook : book
            )
        ));
    })
    .catch((error) => {
        dispatch(setBooksError(error.toString()));  
        dispatch(setBooksStatus("failed")); 
    });
};