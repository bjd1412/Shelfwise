import App from "../App"
import Home from "../pages/Home"
import Authors from "../pages/Authors"
import Genres from "../pages/Genres"
import Patrons from "../pages/Patrons"
import AuthorsBooksPage from "../pages/AuthorBooksPage"



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
        ]
    }
]


export default routes