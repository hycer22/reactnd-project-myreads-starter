import React from 'react';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import Search from './Search';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';


class BooksApp extends React.Component {

  state = {
    books: [],
    searchedBooks: [],
    query: "",
    hasResults: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  };

  onUpdateList = (book, evt) => {
    // book shelf page is refreshed when a book is moved to another shelf or deleted
    BooksAPI.update(book, evt.target.value).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({books});
        console.log(books);
        // search result page is refreshed when a book is moved to a shelf
        if (this.state.searchedBooks.length) {
          BooksAPI.search(this.state.query).then((searchedBooks) => {
            this.setBookStatus(searchedBooks);
            console.log(searchedBooks)
          });
        };
      });
    });
  };

  updateQuery = (query) => {
    this.setState({query});
    BooksAPI.search(query).then((searchedBooks) => {
      // make sure books is not null -> solve the issue when input field is empty and the user backspace
      searchedBooks ? (
        // make sure books.length is not null -> solve the issue when inputs do not match any search terms
        (searchedBooks.length) ? (
          this.setBookStatus(searchedBooks),
          this.setState({hasResults: true})
        ) : (
          this.setState({searchedBooks: []}),
          this.setState({hasResults: false})
        )
      ) : (
        this.setState({searchedBooks: []}),
        this.setState({hasResults: false})
      )
    });
  }

  // shelf status of searched books is set to none unless they've already appeared on one of the shelves
  setBookStatus = (searchedBooks) => {
    searchedBooks.map(searchedBook => searchedBook.shelf = "none");
    searchedBooks.map(searchedBook => (
      this.state.books.map(book => {
        if (searchedBook.id === book.id) {
          searchedBook.shelf = book.shelf
        }
      })
    ));
    this.setState({searchedBooks});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" render={() => (
            <ListBooks books={this.state.books} onUpdateList={this.onUpdateList} />
          )}/>
          <Route path="/search" render={() => (
            <Search
              searchedBooks={this.state.searchedBooks}
              query={this.state.query}
              updateQuery={this.updateQuery}
              hasResults={this.state.hasResults}
              onUpdateList={this.onUpdateList} />
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
