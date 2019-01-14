import React from 'react'
import { Select } from '@accurat/react-components'
import { BoidsChase } from './BoidsChase'

const possibleSelections = ['Boids Chase', 'Deselected']

const selectViz = {
  'Boids Chase': BoidsChase,
}

const VizComponent = ({ name }) => {
  if (!name || name === 'Deselected') {
    return <div className="selectAViz pa4">Select a viz</div>
  }
  const ComponentViz = selectViz[name]
  return <ComponentViz />
}

const Corpus = ({ name }) => {
  return (
    <div className="selectAViz pa4">
      {!name || name === 'Deselected' ? (
        <>Read left</>
      ) : name === 'Boids Chase' ? (
        <>
          A simple implementation of the boids alogrithm in the{' '}
          <a href="https://natureofcode.com/">Nature of Code</a>
        </>
      ) : null}
    </div>
  )
}

export default class App extends React.Component {
  state = { selectedViz: 'Deselected', selection: 0 }

  changeSelection = name => () => {
    this.setState({ selectedViz: name, selection: this.state.selection + 1 })
  }

  render() {
    const { selectedViz, selection } = this.state

    return (
      <div>
        <div className="section">This is a me</div>
        <div className="section">
          <div className="ba b-grey flex flex-row">
            <VizComponent name={selectedViz} key={selection} />
            <div className="w-50 bl b--darkgray pa2">
              <Select className="bn select" label={selectedViz}>
                {possibleSelections.map((s, i) => (
                  <div key={i} className="options" onClick={this.changeSelection(s)}>
                    {' '}
                    {s}{' '}
                  </div>
                ))}
              </Select>
              <Corpus name={selectedViz} />
            </div>
          </div>
        </div>
        <div className="section">Viz</div>
      </div>
    )
  }
}
