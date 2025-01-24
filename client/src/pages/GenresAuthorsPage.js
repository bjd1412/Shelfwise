import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchGenresAuthor } from "../redux/actions/genresAction"
import List from "../components/List"


function GenresAuthorsPage() {
    const dispatch = useDispatch()
    const {authors, status} = useSelector(state => state.authors)
    const {genreId } = useParams()

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchGenresAuthor(genreId))
        }     
    }, [dispatch, genreId, status])

    return (
        <div>
            <h3>Authors</h3>
            <List items={authors} getDisplayText={author => author.name } getLink={author => `/genres/${genreId}/authors/${author.id}/books`}/>
        </div>
    )
}

export default GenresAuthorsPage