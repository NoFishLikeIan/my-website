import React from 'react'
import { Link } from 'react-router-dom'

import backArrow from '../../../public/assets/left-arrow.svg'

export class BlogHeader extends React.Component {
  render() {
    return (
      <div className="w-100 bb b-black h3 pa2 flex flex-row">
        <Link to="/">
          <img src={backArrow} className="w1" />
        </Link>
        <div className="mh5">Blog posts</div>
      </div>
    )
  }
}
