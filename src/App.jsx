import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Books from './features/books/Books'
import BooksForm from './features/books/BooksForm'

function App() {

  return (
   <Router>
    <div className='bg-dark-subtle' style={{minHeight: '100vh'}}>
      <Routes>
        <Route path='/' element={<Books />}/>
        <Route path='/addBooks' element={<BooksForm />}/>
      </Routes>
    </div>
   </Router>
  )
}

export default App
