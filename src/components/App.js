import React from 'react'
import { BoidsChase } from './BoidsChase'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className="section">This is a me</div>
        <div className="section">
          <BoidsChase />
        </div>
        <div className="section">Viz</div>
      </div>
    )
  }
}
