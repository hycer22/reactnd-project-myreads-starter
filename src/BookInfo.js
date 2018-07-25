import React, {Component} from 'react';

class BookInfo extends Component {
  render() {
    return(
      <div className="book">
        <div className="book-top">
          {/* to avoid errors when imagesLinks is empty */}
          {this.props.book.imageLinks && <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`
          }}></div>}
          <div className="book-shelf-changer">
            <select value={this.props.book.shelf} onChange={(evt) => this.props.onUpdateList(this.props.book, evt)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        {/* to avoid errors when authors is empty */}
        {this.props.book.authors && <div className="book-authors">{this.props.book.authors}</div>}
      </div>
    )
  }
}

export default BookInfo;
