import App from "../App"
import Home from "../pages/Home"
import Authors from "../pages/Authors"
import Genres from "../pages/Genres"
import Patrons from "../pages/Patrons"
import AuthorsBooksPage from "../pages/AuthorBooksPage"
import GenresAuthorsPage from "../pages/GenresAuthorsPage"
import BookDetailsPage from "../pages/BookDetailsPage"
import PatronDetailsPage from "../pages/PatronDetailsPage"



const routes = [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: "/authors",
                element: <Authors/>
            },
            {
                path: "/genres",
                element: <Genres/>
            },
            {
                path: "/patrons",
                element: <Patrons/>
            },
            {
                path: "/authors/:authorId/books",
                element: <AuthorsBooksPage/>
            },
            {
                path: "/genres/:genreId/authors",
                element: <GenresAuthorsPage/>
            },
            {
                path: "/genres/:genreId/authors/:authorId/books",
                element: <AuthorsBooksPage/>
            },
            {
                path: "/authors/:authorId/books/:bookId",
                element: <BookDetailsPage/>
            },
            {
                path: "/books/:bookId",
                element: <BookDetailsPage/>
            },
            {
                path: "/patrons/:patronId",
                element: <PatronDetailsPage/>
            }
        ]
    }
]


export default routes