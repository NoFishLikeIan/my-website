import React from 'react'

import { BlogHeader } from './BlogHeader'
import { Post } from './Post'

export class BlogContainer extends React.Component {
  render() {
    return (
      <div className="section">
        <Post />
      </div>
    )
  }
}
