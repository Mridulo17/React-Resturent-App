import React, { useReducer, useState } from "react";
import ModalText from "./ModalText";

const booksStore = [
  { id: 1, name: "english" },
  { id: 2, name: "Math" },
  { id: 3, name: "phisics" },
];
const reducer = (state, action) => {
  if (action.type === "ADD") {
    const allBooks = [...state.books, action.payload];
    return {
      ...state,
      books: allBooks,
      isModalOpen: true,
      modalText: "books added",
    };
  }
  if (action.type === "REMOVE") {
    const filteredBooks = [...state.books].filter(
      (book) => book.id !== action.payload
    );
    return {
      ...state,
      books: filteredBooks,
      isModalOpen: true,
      modalText: "books added",
    };
  }
};
const UseReducer = () => {
  //   const [books, setBooks] = useState(booksStore);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [modalText, setModalText] = useState("");
  const [bookState, dispatch] = useReducer(reducer, {
    books: booksStore,
    isModalOpen: false,
    modalText: "",
  });
  const [addBook, setAddBook] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { id: new Date().getTime().toString(), name: addBook };
    dispatch({ type: "ADD", payload: newBook });
    setAddBook("");
  };
  const removeBook = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  return (
    <div>
      <h3>Book List</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={addBook}
          onChange={(e) => {
            setAddBook(e.target.value);
          }}
        />
        <button type="submit">AddBook</button>
      </form>
      {bookState.isModalOpen && <ModalText modalText={bookState.modalText} />}
      {bookState.books.map((book) => {
        const { id, name } = book;
        return (
          <li key={id}>
            {name}
            <button
              onClick={() => {
                removeBook(id);
              }}
            >
              remove
            </button>
          </li>
        );
      })}
    </div>
  );
};

export default UseReducer;
