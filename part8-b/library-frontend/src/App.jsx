import { useState } from "react";
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Link, Route, Routes } from "react-router-dom";

const padding = {
  paddingRight: 5
}

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const ALL_BOOKS = gql`
query AllBooks {
  allBooks {
    title
    author
    published
  }
}
`

const App = () => {
  const result = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)

  if(result.loading || bookResult.loading){
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <Link style={padding} to='/'>authors</Link>
        <Link style={padding} to='/books'>books</Link>
        <Link style={padding} to='/addBook'>add book</Link>
      </div>
      <Routes>
        <Route path='/' element={<Authors authors={result.data.allAuthors}/>} />
        <Route path='/books' element={<Books books={bookResult.data.allBooks}/>} />
        <Route path='/addBook' element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
