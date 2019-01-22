import React from 'react'
import { Select } from '@accurat/react-components'
import { MiceProblem } from './MiceProblem'
import { BoidsChase } from './BoidsChase'
import { MiceWithBoids } from './MiceWithBoids'
import { Bio } from './Bio'
import { fibonacciGenerator } from '../lib/utils'

const possibleSelections = ['Boids Chase', 'Mice Problem', 'Mice Boids', 'Deselected']

const selectViz = {
  'Boids Chase': BoidsChase,
  'Mice Problem': MiceProblem,
  'Mice Boids': MiceWithBoids,
}

const VizComponent = ({ name, ...props }) => {
  if (!name || name === 'Deselected') {
    return <div className="selectAViz pa4">Select a viz</div>
  }
  const ComponentViz = selectViz[name]
  return <ComponentViz {...props} />
}

const Corpus = ({ name, miceFn, miceValue }) => {
  return (
    <div className="selectAViz pa4">
      {!name || name === 'Deselected' ? (
        <>Read left</>
      ) : name === 'Boids Chase' ? (
        <>
          A simple implementation of the boids alogrithm in the{' '}
          <a href="https://natureofcode.com/" target="_blank" rel="noopener noreferrer">
            Nature of Code
          </a>
          <br />
          <div className="mv4">
            The blue boids get initialized with as a maximum acceleration a percentage of the
            acceleration of the runner, i.e. the red boid and chaise him according to standard boids
            rule (see the reference above). The runner tries to avoid the chasers by finding the
            widest angle, from his point of view, formed by two chasers and seeking a point
            somewhere towards that direction. <br />
            Click on the visualization to spawn another chaser.
          </div>
        </>
      ) : name === 'Mice Problem' ? (
        <>Hello mice</>
      ) : (
        <div>
          <div>
            Looking for an equilibrium to the famouse{' '}
            <a
              href="http://mathworld.wolfram.com/MiceProblem.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              mice problem
            </a>
            .
          </div>
          <div className="mv3 flex-row flex w-100">
            <Select className="w4 mh2" scrollable label={miceValue}>
              {[...fibonacciGenerator(17)].map((n, i) => {
                return (
                  <div key={i} className="miceselect" onClick={miceFn(n)}>
                    {n}
                  </div>
                )
              })}
            </Select>{' '}
            mice follow chase each other in a clockwise manner.
          </div>
        </div>
      )}
    </div>
  )
}

export default class App extends React.Component {
  state = { selectedViz: 'Deselected', selection: 0, numberOfMice: 4 }

  changeSelection = name => () => {
    this.setState({
      selectedViz: name,
      selection: this.state.selection + 1,
    })
  }

  onDifferentMiceNumber = nOfMice => () => {
    if (!Number.parseInt(nOfMice)) return null
    this.setState({ numberOfMice: nOfMice })
  }

  render() {
    const { selectedViz, selection, numberOfMice } = this.state

    return (
      <div>
        <Bio />
        <div className="section">
          <div className="ba b-grey flex flex-row">
            <VizComponent
              name={selectedViz}
              key={`${selection}_${numberOfMice}`}
              numberOfSeekers={numberOfMice || 4}
            />
            <div className="w-50 bl b--darkgray pa2">
              <Select className="bn select" label={selectedViz}>
                {possibleSelections.map((s, i) => (
                  <div key={i} className="options" onClick={this.changeSelection(s)}>
                    {' '}
                    {s}{' '}
                  </div>
                ))}
              </Select>
              <Corpus
                name={selectedViz}
                miceValue={numberOfMice}
                miceFn={this.onDifferentMiceNumber}
              />
            </div>
          </div>
        </div>
        {/* <div className="section">Viz</div> */}
      </div>
    )
  }
}
