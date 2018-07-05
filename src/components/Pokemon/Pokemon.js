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

function scrollme (e) {
  console.log(e)
}

const CardList = (props) => {
  return (
    <div onScroll={scrollme} className="card-list">
    {
      props.elements.map(el => <Card key={el.id} element={el} />)
    }
    </div>
  ) 
}

const FilterBar = (props) => {
  return (
    <div className="filter-bar-container">
      <i style={{color: "var(--pokedex-grey)"}}className="fas fa-search" />
      <input className="filter-bar" 
             placeholder="Filter Pokemon..." 
             onChange={props.onChange} />
    </div>
  )
}

class Pokemon extends Component {
  state = {
    filterText: "",
    pokemon: pokemon
  }

  updateText = (e) => {
    const newText = e.target.value
    this.setState(prev => ({
      filterText: newText,
      pokemon: pokemon.filter(p => ((newText === "") || p.name.toLowerCase().includes(newText.toLowerCase())))
    }))
  }


  render() {
    return (
      <div className="pokemon-root">
        <FilterBar onChange={this.updateText}/>
        <CardList elements={this.state.pokemon} />
      </div>
    )
  }
}

export default Pokemon;
