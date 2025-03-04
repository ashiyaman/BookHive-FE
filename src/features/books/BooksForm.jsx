import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { addBookAsync } from './bookSlice'

const BooksForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title || !author || !genre){
            alert('Please enter all details')
            return
        }
        const bookData = {
            title: title,
            author: author,
            genre: genre
        }
        if(bookData){
            dispatch(addBookAsync(bookData))
            navigate('/')
        }
    }

    return (
        <main className='container py-4'>
            <h1 className='text-primary text-center'>Add Books</h1>
            <form className='my-4' onSubmit={(e) => handleSubmit(e)}>
                <input type='text' required placeholder='Title' onChange={(e) => setTitle(e.target.value)} className='form-control'/><br/>
                <input type='text' required placeholder='Author' onChange={(e) => setAuthor(e.target.value)} className='form-control'/><br/>
                <input type='text' required placeholder='Genre' onChange={(e) => setGenre(e.target.value)} className='form-control'/><br/>
                <input type='submit' value='Add Book' className='btn btn-outline-primary fw-semibold my-3'/>
            </form>
        </main>
    )
}

export default BooksForm