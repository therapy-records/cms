import React from 'react';

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
    let updatedQuotes = [ ...this.state.items ];
    updatedQuotes[index][property] = ev.target.value;
    this.setState({ items: updatedQuotes });
  }

  render() {
    const {
      items
    } = this.state;

    if (!items.length) {
      return null;
    }

    return (
      <div>
        <p>Quotes</p>
        <ul>
          {items.map((i, index) => {
            return (
              <li key={index}>
                <input type='text' placeholder='Quote' onChange={(e) => this.handleInputChange(e, index, 'quote')} />
                <input type='text' placeholder='Author' onChange={(e) => this.handleInputChange(e, index, 'author')} />
                <br />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

}

export default Quotes;
