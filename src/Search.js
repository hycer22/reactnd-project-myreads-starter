import React, {Component} from 'react';
import BookInfo from './BookInfo';
import {Link} from 'react-router-dom';


class Search extends Component {

  render() {
    return(
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.props.query}
                onChange={(evt) => this.props.updateQuery(evt.target.value)}
              />
            </div>
          </div>

          <div className="search-books-results">
            {this.props.hasResults ? (
              <ol className="books-grid">
                {this.props.searchedBooks
                  // display only books not on the shelves
                  .filter((book) => book.shelf === "none")
                  .map((book) =>
                  <li><BookInfo book={book} onUpdateList={this.props.onUpdateList} key={book.id} /></li>
                )}
              </ol>
            ) : (
              <p>No Search Results</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Search;
