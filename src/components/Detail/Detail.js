import React, { Component } from 'react';
import style from './Detail.css'
import Types from 'enums/types.js'

const PokemonHighlights = ({id}) => {
  const img = require("assets/images/detail_" + id + ".png")
  return (
    <div className="top-detail">
      <img src={img} className="portrait" />
      <h1></h1>
    </div>
  )
}

class Detail extends Component {
  state = { }

  render() {
    const id = this.props.match.params.id
    const portraitImg = require("assets/images/detail_" + id + ".png")
    return (
      <div className="detail-root">
        <i 
          onClick={this.props.history.goBack} 
          className="detail-back fas fa-arrow-left" 
        />
        <PokemonHighlights id={id} />
      </div>
    )
  }
}

export default Detail;