import React, {Component} from 'react';
import BookInfo from './BookInfo';
import {Link} from 'react-router-dom';

class ListBooks extends Component {

  render() {
    const shelfTitles = ["Currently Reading", "Want to Read", "Read"];
    const shelfTypes = ["currentlyReading", "wantToRead", "read"];

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {shelfTitles.map((shelfTitle, index) => (
          <div className="list-books-content">
            <div key={index} className="bookshelf">
              <h2 className="bookshelf-title">{shelfTitles[index]}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books
                    .filter((book) => book.shelf === shelfTypes[index])
                    .map((book) => (
                    <li><BookInfo book={book} onUpdateList={this.props.onUpdateList} key={book.id} /></li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ))}
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;
