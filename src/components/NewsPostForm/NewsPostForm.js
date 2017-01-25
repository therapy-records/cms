import React from 'react'
import './NewsPostForm.scss'

export const NewsPostForm = () => (
  <div>
  <h2>New news post</h2>
    <form>

      <label>Title</label>
      <br/>
      <input type="text" placeholder="Hello world" />

      <br/>

      <label>Sub heading</label>
      <br/>
      <input type="text" placeholder="From Earth" />

      <br/>

      <label>Main content</label>
      <br/>
      <textarea></textarea>

      <br/>

      <button>Submit</button>
    </form>
  </div>
)

export default NewsPostForm
