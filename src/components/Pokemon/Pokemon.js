
import style from './Pokemon.css'
import Types from 'enums/types.js'
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Helper from './Helper.js'

import {pokemon, CSS_COLORS} from 'store/pokemon.js'

const Card = (props) => {
  const {name, id, icon, types} = props.element
  const bgColor = CSS_COLORS[types[0]]
  const myStyle = { 
    "backgroundColor": bgColor,
  }
  let secondTypeCSS = {}
  if (types[1]) {
    secondTypeCSS["backgroundColor"] = CSS_COLORS[types[1]]
  }

  return (
    <Link className="router-link" to={"/pokemon/" + id}>
      <div style={ myStyle } className="card">  
        <img src={ icon } alt={ name } />
        <h3 className='card-id'>#{ id }</h3>
        <h3>{ name }</h3>
      </div>
    </Link>
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

class FilterBar extends Component {
  state = { 
    type: "any"
  }

  onTypeChange = (e) => {
    const type = e.target.value
    this.props.onChange({type})
    this.setState({type})
  }

  selectStyle = () => {
    const color = CSS_COLORS[this.state.type]
    return {
      "backgroundColor": CSS_COLORS[this.state.type]  
    }
  }

  render () {
    const placeholder = <option key="" value="" disabled>Type</option>
    const defaultType = <option key="any" value="any">Any</option>
    return (
      <div className="filter-bar-container">
        <i style={{color: "var(--pokedex-grey)"}}className="fas fa-search" />
        <input className="filter-bar" 
               placeholder="Filter Pokemon..." 
               type="search"
               onChange={ (e) => this.props.onChange({text: e.target.value}) } />
        <select defaultValue="" 
                style={ this.selectStyle() } 
                className="type-select" 
                onChange={ this.onTypeChange }>
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
}

class Pokemon extends Component {
  state = {
    filterText: "",
    filterType: "any",
    pokemon: pokemon
  }

  updateFilter = ({text, type}) => {
    let newText =  (text !== undefined) ? text : this.state.filterText
    let newType = Helper.notEmpty(type) ? type : this.state.filterType
    this.setState(prev => ({
      filterText: newText,
      filterType: newType,
      pokemon: pokemon.filter(poke => Helper.matches(poke, newText, newType))
    }))
  }

  render () {
    return (
      <div className="pokemon-root">
        <FilterBar onChange={this.updateFilter}/>
        <CardList elements={this.state.pokemon} />
      </div>
    )
  }
}

export default Pokemon;
