import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { PictureInterpolation } from './PictureInterpolation'

const copyText = text => {
  var textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('Copy')
  textArea.remove()
}

export class CopyableText extends React.Component {
  state = {
    clicked: false,
  }

  handleOnMouseDown = evt => {
    const text = evt.target.textContent
    copyText(text)
    document.addEventListener('mouseup', this.handleOnMouseUp)
    this.setState({ clicked: true })
  }

  handleOnMouseUp = () => {
    document.removeEventListener('mouseup', this.handleOnMouseUp)
    this.setState({ clicked: false })
  }

  render() {
    const { clicked } = this.state
    return (
      <span
        style={{
          cursor: 'pointer',
          color: !clicked ? 'white' : 'black',
          backgroundColor: !clicked ? 'silver' : 'white',
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: !clicked ? 'silver' : 'black',
        }}
        onClick={this.handleOnClick}
        onMouseDown={this.handleOnMouseDown}
        onMouseUp={this.handleOnMouseUp}
      >
        {!clicked ? this.props.children : 'Copying to clipboard!'}
      </span>
    )
  }
}

@withRouter
export class Bio extends React.Component {
  render() {
    return (
      <div className="section flex flex-row">
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
            Worked as a Data Scientist/Engineer at{' '}
            <a href="https://www.accurat.it/" target="_blank" rel="noopener noreferrer">
              {' '}
              Accurat
            </a>
            , contributor to the{' '}
            <a href="https://github.com/accurat/" target="_blank" rel="noopener noreferrer">
              data-juggler and ackeras
            </a>{' '}
            libraries.
          </div>
          <div className="mv2 mh2">
            Currently starting a MPhil. at <a href="https://www.tinbergen.nl/home">Tinbergen</a> in
            economics but open to some freelance work now and then.
          </div>
          <div className="mv2 mh2">
            Programming mostly in Python, R and Typescript. Interested in Clojure, Julia and Prolog.
          </div>
          <div className="mv5 mh2">
            Below you can find, first some of my exploration with algorithms and programming in
            general, and then some blogpost, reflection, reading-list and whatnot. <br />
            On the right a couple of experiments with canvas rendering and interpolation between bw
            pictures, first with linear 2d interpolation, then with quaternions. Still a work in
            progress.
          </div>
          {/* Footer */}
          <div className="mh2 absolute bottom-0 pa2 bg bg-white bt b--light-gray">
            If you need more info email me,
            <CopyableText>andreatitton96@gmail.com</CopyableText>, check{' '}
            <a href="https://github.com/nofishLikeIan" target="_blank" rel="noopener noreferrer">
              my github account
            </a>{' '}
            or have a look at my{' '}
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
              CV
            </a>
            , yet another evil PDF. <br />
            Just as a disclaimer, this website will be desktop only and a constant work in progress
            because I cannot be bothered.
          </div>
          <div className="mh2 mv5 w-100">
            Route around the website, <Link to="/algoplayground">the algo playground</Link>, the{' '}
            <Link to="/blog">blog posts</Link>, an explorable{' '}
            <a
              href="https://mandelbrot-gen-ian.netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mandelbrot set implementation
            </a>{' '}
            with generators, my{' '}
            <a
              href="https://github.com/NoFishLikeIan/read-this/blob/master/README.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              reading list
            </a>
            , and more coming_soon_tm.
          </div>
        </div>
        {<PictureInterpolation className="w-50 h-100 relative tc ma3 pa3" />}
      </div>
    )
  }
}
