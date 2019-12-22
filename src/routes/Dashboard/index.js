import React from 'react';
import { Link } from 'react-router-dom';
import Stats from './components/Stats';
import './style.css';

export class Dashboard extends React.Component {
  // componentWillUnmount() {
  //   this.props.resetPromiseState();
  // }

  // componentDidMount() {
  //   const {
  //     newsArticles,
  //     journalismArticles,
  //     onFetchNewsArticles,
  //     onFetchJournalismArticles
  //   } = this.props;
  //   if (newsArticles === null) {
  //     onFetchNewsArticles();
  //   }

  //   if (journalismArticles === null) {
  //     onFetchJournalismArticles();
  //   }
  // }

  render() {

    return (
      <div className='container dashboard'>

        <h2>Welcome back <span className='wave'>👋</span></h2>
        <div className='ctas'>
          <Link to='news/create' className='btn'>Create News</Link>
          <Link to='journalism/create' className='btn'>Create Journalism</Link>
        </div>

        <Stats />
      </div>
    )
  }
}

export default Dashboard;
