import React, { Component } from 'react';
import style from './Pokemon.css'
import Types from '../../enums/types.js'

// sample data for testing
let pokemon = [
  {
    name: "Bulbasaur",
    id: 1,
    icon: require("../../assets/icons/pokemon/regular/bulbasaur.png"),
    types: [Types.GRASS, Types.POISON]
  },
  {
    name: "Ivysaur",
    id: 2,
    icon: require("../../assets/icons/pokemon/regular/ivysaur.png"),
    types: [Types.GRASS, Types.POISON]
  },
  {
    name: "Venusaur",
    id: 3,
    icon: require("../../assets/icons/pokemon/regular/venusaur.png"),
    types: [Types.GRASS, Types.POISON]
  },
  {
    name: "Charmander",
    id: 4,
    icon: require("../../assets/icons/pokemon/regular/charmander.png"),
    types: [Types.FIRE]
  },
  {
    name: "Charmeleon",
    id: 5,
    icon: require("../../assets/icons/pokemon/regular/charmeleon.png"),
    types: [Types.FIRE]
  },
  {
    name: "Charizard",
    id: 6,
    icon: require("../../assets/icons/pokemon/regular/charizard.png"),
    types: [Types.FIRE, Types.FLYING]
  },
  {
    name: "Squirtle",
    id: 7,
    icon: require("../../assets/icons/pokemon/regular/squirtle.png"),
    types: [Types.WATER]
  },
]

// TODO: find somewhere else to put this
const CSS_COLORS = {
  [Types.GRASS]: "var(--color-grass)",
  [Types.WATER]: "var(--color-water)",
  [Types.POISON]: "var(--color-poison)",
  [Types.ELECTRIC]: "var(--color-electric)",
  [Types.FLYING]: "var(--color-flying)",
  [Types.FIRE]: "var(--color-fire)"
}

const Card = (props) => {
  const {name, id, icon, types} = props.element
  const bgColor = CSS_COLORS[types[0]]
  const myStyle = { "backgroundColor": bgColor }
  return (
    <div style={ myStyle } className="card">  
      <img src={ icon } alt={ name } />
      <h3 className='card-id'>#{ id }</h3>
      <h3>{ name }</h3>
    </div>
  ) 
}

const CardList = (props) => {
  return (
    <div className="card-list">
    {
      props.elements.map(el => <Card key={el.id} element={el} />)
    }
    </div>
  ) 
}

const FilterBar = (props) => {
  const placeholder = <option key="" value="" disabled>Type</option>
  const defaultType = <option key="any" value="any">Any</option>
  return (
    <div className="filter-bar-container">
      <i style={{color: "var(--pokedex-grey)"}}className="fas fa-search" />
      <input className="filter-bar" 
             placeholder="Filter Pokemon..." 
             onChange={ (e) => props.onChange({text: e.target.value}) } />
      <select defaultValue="" className="type-select" onChange={ (e) => props.onChange({type: e.target.value})} >
      {
        [placeholder, defaultType].concat(Object.values(Types).map(type =>
                  <option key={ type } value={ type }>
                    { type.charAt(0).toUpperCase() + type.slice(1) }
                  </option>
               ))
      }
      </select>
    </div>
  )
}


const matches = (p, text, type) => {
    let visible = true
    if (text && text.length > 0) {
      visible = p.name.toLowerCase().includes(text.toLowerCase())
    }

    if (type && (type !== "any")) {
      visible = visible && p.types.includes(type)
    }
    return visible
}

const notEmpty = (s) => (s && (s.length > 0))

class Pokemon extends Component {
  state = {
    filterText: "",
    filterType: "any",
    pokemon: pokemon
  }

  updateFilter = ({text, type}) => {
    let newText =  (text !== undefined) ? text : this.state.filterText
    let newType = notEmpty(type) ? type : this.state.filterType
    this.setState(prev => ({
      filterText: newText,
      filterType: newType,
      pokemon: pokemon.filter(poke => matches(poke, newText, newType))
    }))
  }

  render() {
    return (
      <div className="pokemon-root">
        <FilterBar onChange={this.updateFilter}/>
        <CardList elements={this.state.pokemon} />
      </div>
    )
  }
}

export default Pokemon;
