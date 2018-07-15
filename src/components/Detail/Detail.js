import React, { Component } from 'react';
import style from './Detail.css'
import Types from 'enums/types.js'
import Helper from './Helper.js'

import {pokemon, CSS_COLORS} from 'store/pokemon.js'

const DetailBox = ({id, children}) => {
  const img = require("assets/images/detail_" + id + ".png")
  const species = pokemon[id - 1]
  return (
    <div className="card-container">
      <div className="portrait-container">
        <img src={img} className="flex-item portrait" />
      </div>
      <div className="detail-name-container">
        <h1 className="detail-name">{species.name}</h1>
      </div>
      <div className="detail-text-container">
        <h3 className="detail-description">Seed Pokemon</h3>
        <p className="detail-description">{species.description}</p>
        {
          children.map((child, idx) => (
            <div key={idx}>
              <hr className="detail-divider" />  
              {child}
            </div>
          ))
        }
      </div>
    </div>
  )
}

const TypeBox = ({type}) => {
  return (
    <div 
      key={type}
      style={{"backgroundColor": CSS_COLORS[type]}} 
      className="type-box"
    >
      {type}
    </div>
  )
}

const PokemonTypes = ({species}) => {
  return (
    <div className="detail-container">
      <h3 className="detail-card-title">Types</h3>
      <div className="row-container">
      {
        species.types.map(type => <TypeBox key={type} type={type} />)
      }
      </div>
    </div>
  ) 
}

const StatBar = ({name, value}) => {
  return (
    <div className="stat-bar">
      <h5>{name}</h5>
    </div>
  )  
}

const Stats = ({stats}) => {
  return (
    <div className="detail-container">
      <h3 className="detail-card-title">Stats</h3>
      {
        Object.keys(stats)
              .map(stat => <StatBar key={stat} name={stat} value={stats[stat]} />)
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
        <div className="detail-card">
          <DetailBox id={id}>
            <PokemonTypes species={pokemon[id - 1]} />
            <Stats stats={pokemon[id - 1].stats} />
          </DetailBox>
        </div>
      </div>
    )
  }
}

export default Detail;