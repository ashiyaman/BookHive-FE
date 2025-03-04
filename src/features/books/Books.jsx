import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchBooks, deleteBookAsync } from './bookSlice'
import BookList from './BookList'
import { Link } from 'react-router-dom'

const Books = () => {
    const dispatch = useDispatch()
    const {books, status, error} = useSelector(state => state.books)

    useEffect(() => {
        dispatch(fetchBooks())
    }, [books])

    const deleteBookHandler = (bookId) => {
        dispatch(deleteBookAsync(bookId))
    }

    return (
        <main className='container py-4'>
            <Link className='btn btn-primary fw-semibold text-light' to='/addBooks'>Add Book</Link>
            <h1 className='text-primary text-center'>Books</h1>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {books && 
                <BookList books={books} onDelete={deleteBookHandler} />
               
            }
        </main>
    )
}

export default Books