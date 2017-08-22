import React from 'react';
import PropTypes from 'prop-types';
import './Quotes.scss';

const isEmptyObj = (obj) => {
  for (var x in obj) {
    if (obj.hasOwnProperty(x)) {
      return false;
    }
  }
  return true;
}

export class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {}, {}, {}
      ]
    };
  }

  handleInputChange = (ev, index, property) => {
    let quotes = [ ...this.state.items ];
    quotes[index][property] = ev.target.value;
    this.setState({ items: quotes });

    const filteredQuotes = quotes.filter((i) => {
      return !isEmptyObj(i);
    });

    this.props.input.onChange(filteredQuotes);
  }

  render() {
    const {
      items
    } = this.state;

    return (
      <div>
        <h5>Quotes</h5>
        <ul>
          {items.map((i, index) => {
            return (
              <li key={index} className='quotes-list-item'>
                <input type='text' placeholder='Quote' onChange={(e) => this.handleInputChange(e, index, 'copy')} />
                <input type='text' placeholder='Author' onChange={(e) => this.handleInputChange(e, index, 'author')} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

}

Quotes.propTypes = {
  input: PropTypes.object.isRequired
}

export default Quotes;
