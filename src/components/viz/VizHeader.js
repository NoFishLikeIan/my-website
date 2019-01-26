import React from 'react'
import { Link } from 'react-router-dom'

import backArrow from '../../../public/assets/left-arrow.svg'

export class VizHeader extends React.Component {
  render() {
    return (
      <div className="w-100 bb b-black h3 pa2">
        <Link to="/">
          <img src={backArrow} className="w1" />
        </Link>
      </div>
    )
  }
}
