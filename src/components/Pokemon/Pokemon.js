import React, { Component } from 'react';
import style from './Pokemon.css'

let pokemon = [
  {
    name: "Bulbasaur",
    id: 1,
    icon: require("../../assets/icons/pokemon/regular/bulbasaur.png")
  },
  {
    name: "Ivysaur",
    id: 2,
    icon: require("../../assets/icons/pokemon/regular/ivysaur.png")
  },
  {
    name: "Ivysaur",
    id: 21,
    icon: require("../../assets/icons/pokemon/regular/ivysaur.png")
  },
  {
    name: "Ivysaur",
    id: 22,
    icon: require("../../assets/icons/pokemon/regular/ivysaur.png")
  },
  {
    name: "Ivysaur",
    id: 23,
    icon: require("../../assets/icons/pokemon/regular/ivysaur.png")
  },
  {
    name: "Venusaur",
    id: 3,
    icon: require("../../assets/icons/pokemon/regular/venusaur.png")
  },
  {
    name: "Venusaur",
    id: 34,
    icon: require("../../assets/icons/pokemon/regular/venusaur.png")
  },
  {
    name: "Venusaur",
    id: 35,
    icon: require("../../assets/icons/pokemon/regular/venusaur.png")
  },
  {
    name: "Venusaur",
    id: 356,
    icon: require("../../assets/icons/pokemon/regular/venusaur.png")
  },
]

const Card = ({element}) => {
  let {name, id, icon} = element
  return (
    <div className="card">  
      <img src={icon} alt={name} />
      <h3 className='card-id'>#{ id   }</h3>
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
  return (
    <div className="filter-bar-container">
      <i className="fas fa-search" />
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
      pokemon: pokemon.filter(p => ((newText === "") || p.name.includes(newText)))
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
