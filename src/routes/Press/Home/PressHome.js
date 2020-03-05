import React from 'react';
import { Link } from 'react-router-dom';
import QueryContainer from '../../../containers/QueryContainer';
import { GET_PRESS } from '../../../queries';

const PressHome = () => {

  return (
    <div className='container'>

      <QueryContainer
        query={GET_PRESS}
        entityName='press'
        render={(queryData) => (
          <div>

          <div className='heading-with-btns'>

            <div>
              <h2>Press 📢</h2>
            </div>

            <div className='action-btns'>
              <Link to='press/create' className='btn'>Create</Link>
            </div>
          </div>

            <ul>
              {queryData.map((pressArticle) => (
                <li key={pressArticle._id}>
                  <p>{pressArticle.author}</p>
                  <p>{pressArticle.copy}</p>
                  <p>{pressArticle.externalLink}</p>
                  <Link to={`press/${pressArticle._id}`} className='btn'>view</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      />

    </div>
  )
}

export default PressHome;
