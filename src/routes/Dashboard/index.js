import React from 'react';
import { Link } from 'react-router-dom';
import Stats from './components/Stats';
import ImageUploadContainer from '../../components/FormElements/ImageUpload/ImageUploadContainer';
import './style.css';

const Dashboard = () => (
  <div className='container dashboard'>

    <h2>Welcome back <span className='wave'>👋</span></h2>

    <ImageUploadContainer
      minImageDimensions={{
        width: 400,
        height: 400
      }}
    />

    <div className='ctas'>
      <Link to='news/create' className='btn'>Create News</Link>
      <Link to='journalism/create' className='btn'>Create Journalism</Link>
      <Link to='press/create' className='btn'>Create Press</Link>
      <Link to='collaborators/create' className='btn'>Add Collaborator</Link>
      <Link to='gigs/create' className='btn'>Add Gig</Link>
    </div>

    <Stats />
  </div>
);

export default Dashboard;
