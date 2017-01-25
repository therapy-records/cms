import React from 'react'

const mockData = [
  {
    title: 'title A'
  },
  {
    title: 'title B'
  },
  {
    title: 'title C'
  }
];

export const News = () => {
  return (
    <div>
      <h2>News</h2>
        {mockData.map((d) => {
          return <li key={d.title}>{d.title}</li>
        })}
    </div>
  )
}

export default News
