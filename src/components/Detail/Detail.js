import React, { Component } from 'react';
import style from './Detail.css'
import Types from 'enums/types.js'
import Helper from './Helper.js'

import {pokemon, CSS_COLORS} from 'store/pokemon.js'

const PokemonHighlights = ({id}) => {
  const img = require("assets/images/detail_" + id + ".png")
  const species = pokemon[id - 1]
  return (
    <div className="detail-card detail-container">
      <div className="portrait-container">
        <img src={img} className="flex-item portrait" />
      </div>
      <div className="detail-name-container">
        <h1 className="detail-name">{species.name}</h1>
      </div>
      <div className="detail-text-container">
        <p className="detail-description">{species.description}</p>
      </div>
    </div>
  )
}

const TypeBox = ({type}) => {
  return (
    <span 
      key={type}
      style={{"backgroundColor": CSS_COLORS[type]}} 
      className="type-box"
    >
      {type}
    </span>
  )
}

const PokemonTypes = ({species}) => {
  return (
    <div className="detail-card detail-type-container">
      <h2 className="detail-card-title">Types</h2>
      {
        species.types.map(type => <TypeBox type={type} />)
      }
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
        <div className="detail-top-sliver">
          <i 
            onClick={this.props.history.goBack} 
            className="detail-back fas fa-arrow-left" 
          />
          <h1 className="detail-id">
            {"#" + Helper.getPaddedNumber(id, 3)}
          </h1>
        </div>
        <PokemonHighlights id={id} />
        <PokemonTypes species={pokemon[id]} />
      </div>
    )
  }
}

export default Detail;