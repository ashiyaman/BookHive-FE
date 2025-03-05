const BookList = ({books, onDelete, onUpdate}) => {
    return (
        <ul className='list-group'>
        {books.map(book => 
        {

            return (
                <li key={book._id} className='list-group-item-light d-flex justify-content-between my-2'>
                    <p>{book.title} - {book.author} - {book.genre} </p>
                    <div>
                        <button onClick={() => onUpdate(book)} className='btn btn-outline-success fw-semibold mx-2'>Edit</button>
                        <button onClick={() => onDelete(book._id)} className='btn btn-outline-danger fw-semibold'>Delete</button>
                    </div>                                
                </li>
            )
        }
       )}
    </ul>
    )
}

export default BookList