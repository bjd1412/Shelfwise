import App from "../App"
import Home from "../pages/Home"
import Authors from "../pages/Authors"



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
        ]
    }
]


export default routes