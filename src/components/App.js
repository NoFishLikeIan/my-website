import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Bio } from './Bio'
import { VizSection } from './viz/VizSection'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Bio} />
          <Route exact path="/algoplayground" component={VizSection} />
        </div>
      </Router>
    )
  }
}
