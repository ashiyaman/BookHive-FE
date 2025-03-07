import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { addBookAsync, updateBookAsync } from './bookSlice'

const BooksForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const book = useLocation().state

    const [title, setTitle] = useState(book ? book.title : '')

    const [author, setAuthor] = useState(book ? book.author : '')
    const [genre, setGenre] = useState(book ? book.genre : '')

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
            setTitle('')
            setAuthor('')
            setGenre('')
            navigate('/')
        }
    }

    const updateBookHandler = (bookData) => {
        const updatedBookData = {
            _id: bookData._id,
            title: title,
            author: author,
            genre: genre
        }

        if(updatedBookData){
            dispatch(updateBookAsync({bookId: updatedBookData._id, bookData: updatedBookData}))
            setTitle('')
            setAuthor('')
            setGenre('')
            navigate('/')
        }
        
    }

    return (
        <main className='container py-4'>
            <h1 className='text-primary text-center'>{book ? 'Update' : 'Add'} Books</h1>
            <form className='my-4' onSubmit={(e) => handleSubmit(e)}>
                <input type='text' 
                    required 
                    placeholder='Title' 
                    onChange={(e) => setTitle(e.target.value)} 
                    className='form-control' 
                    value={title}/><br/>
                <input type='text' 
                    required 
                    placeholder='Author' 
                    onChange={(e) => setAuthor(e.target.value)} 
                    className='form-control'
                    value={author}/><br/>
                <input type='text' 
                    required 
                    placeholder='Genre' 
                    onChange={(e) => setGenre(e.target.value)} 
                    className='form-control'
                    value={genre}/><br/>
                {book ? 
                    <input type='button' value='Update Book' onClick={() => updateBookHandler(book)} className='btn btn-outline-primary fw-semibold my-3'/>
                    :
                    <input type='submit' value='Add Book' className='btn btn-outline-primary fw-semibold my-3'/>
                }
            </form>
        </main>
    )
}

export default BooksForm