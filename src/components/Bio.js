import React from 'react'

export class Bio extends React.Component {
  render() {
    return (
      <div className="section">
        <div className="w-50 h-100 relative">
          <div className="mv2 mh2">
            A self-deprecating website for a guy interested in Mathematics, Economics and
            Programming.
          </div>
          <div className="mv2 mh2">
            Graduated in Finance and Economics, thesis on Forecasting Inflation using VARs. You can
            read it{' '}
            <a href="/thesis.pdf" target="_blank" rel="noopener noreferrer">
              {' '}
              here
            </a>
            , but careful it is a evil PDF format.
          </div>
          <div className="mv2 mh2">
            Currently working as a Data Scientist at{' '}
            <a href="https://www.accurat.it/" target="_blank" rel="noopener noreferrer">
              {' '}
              Accurat
            </a>
            , contributor to the{' '}
            <a href="https://github.com/accurat/" target="_blank" rel="noopener noreferrer">
              @accurat/react-components and ackeras
            </a>{' '}
            libraries.
          </div>
          <div className="mv2 mh2">
            Programming mostly in Python, R and Typescript. Interested in Clojure, Julia and Lua.
          </div>
          <div className="mv5 mh2">
            Below you can find, first some of my exploration with algorithms and programming in
            general, and then some blogpost, reflection, reading-list and whatnot.
          </div>
          <div className="mh2 absolute bottom-0 pa2 bg bg-white bt b--light-gray">
            If you need more info email me, andrea.titton@accurat.it and have a look at my{' '}
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
              CV
            </a>
            , yet another evil PDF. <br />
            Just as a disclaimer, this website will be desktop only and a constant work in progress
            because I cannot be bothered.
          </div>
        </div>
      </div>
    )
  }
}
