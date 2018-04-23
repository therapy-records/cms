import React from 'react';
import PropTypes from 'prop-types';
import './Quotes.css';

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

  onAddQuote = () => {
    this.setState({
      items: [...this.state.items, {}]
    });
  }

  componentWillMount() {
    if (this.props.input.value &&
        this.props.input.value.length > 0) {
      this.setState({
        items: [...this.props.input.value]
      });
    }
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
                <input
                  value={i.copy}
                  type='text'
                  placeholder={i.copy || 'Amazing performance!'}
                  onChange={(e) => this.handleInputChange(e, index, 'copy')}
                />
                <input
                  value={i.author}
                  type='text'
                  placeholder={i.author || 'Joe Bloggs'}
                  onChange={(e) => this.handleInputChange(e, index, 'author')}
                />
              </li>
            )
          })}
        </ul>
        <button onClick={this.onAddQuote}
                className='btn-sm'
                style={{ width: 'auto' }}
        >Add another quote</button>
      </div>
    )
  }

}

Quotes.propTypes = {
  input: PropTypes.object.isRequired
}

export default Quotes;
