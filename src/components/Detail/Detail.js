import React, { Component } from 'react';
import './Detail.css'
import Helper from './Helper.js'

import { CSS_COLORS } from 'store/pokemon.js'

let pokemon = []

const DetailBox = ({id, children}) => {
  const img = require("assets/images/detail_" + id + ".png")
  const species = pokemon[id - 1]
  return (
    <div className="card-container">
      <div className="portrait-container">
        <img alt={species.name} src={img} className="flex-item portrait" />
      </div>
      <div className="detail-name-container">
        <h1 className="detail-name">{species.name}</h1>
      </div>
      <div className="detail-item-container">
        {
          children.map((child, idx) => (
            <div key={idx}>
              {  (idx > 0) ? <hr className="detail-divider" /> : <i style={{"display": "none"}} /> }
              {child}
            </div>
          ))
        }
      </div>
    </div>
  )
}

const EntryText = ({description}) => {
  return (
    <div>
      <h3 className="detail-description">Seed Pokemon</h3>
      <p className="detail-description">{description}</p>
    </div>    
  )
}

const TypeBox = ({type}) => {
  return (
    <div 
      key={type}
      style={{"backgroundColor": CSS_COLORS[type]}} 
      className="detail-container type-box"
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
      <div className="stat-bar-key">{Helper.toPascalCase(name)}</div>
      <div className="stat-bar-value">
        <div className="stat-bar-value-meter" style={{"width": `${(value / 255) * 100}%`}}>
          {value}
        </div>
      </div>
    </div>
  )  
}

const Stats = ({stats}) => {
  return (
    <div className="detail-container column-container">
      <h3 className="detail-card-title">Stats</h3>
      {
        Object.keys(stats)
              .map(stat => <StatBar key={stat} name={stat} value={stats[stat]} />)
      }
    </div>
  )
}

const Ability = ({ability}) => {
  return (
    <div className="">
      <li style={{"marginRight": "5px"}} key={ability}>{ability}</li>
      <i className="info-q far fa-question-circle"></i> 
    </div>
  )  
}

const Abilities = ({abilities}) => {
  return (
    <div className="detail-container column-container">
      <h3 className="detail-card-title">Abilities</h3>
      <ul className="detail-abilities">
      {
        abilities.map(ability => <Ability key={ability} ability={ability} />)
      }
      </ul>
    </div>
  )
}

class Detail extends Component {
  state = { }

  render() {
    const id = this.props.match.params.id
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
            <EntryText description={pokemon[id - 1].description} />
            <Stats stats={pokemon[id - 1].stats} />
            <Abilities abilities={pokemon[id - 1].abilities} />
          </DetailBox>
        </div>
      </div>
    )
  }
}

export default Detail;