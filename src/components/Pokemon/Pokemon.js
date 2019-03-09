
import './Pokemon.css'
import Types from 'enums/types.js'
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Helper from './Helper.js'

import { CSS_COLORS } from 'store/pokemon.js'
import api from 'store/api.js'

const Card = (props) => {
  const {name, id, icon, types} = props.element
  const bgColor = CSS_COLORS[types[0]]
  const firstColor = CSS_COLORS[types[0]]
  const secondColor = CSS_COLORS[types[1]]

  const myStyle = {
    "backgroundColor": bgColor,
    "backgroundImage": `linear-gradient(to right, ${firstColor}, ${firstColor}, ${secondColor || firstColor})`
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
      "backgroundColor": color
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
    pokemon: []
  }

  constructor () {
    super()
    api.getPokemonPreviews().then(previews => {
      this.setState({
        pokemon: previews
      })
    }) 
  }

  updateFilter = ({text, type}) => {
    const newText =  (text !== undefined) ? text : this.state.filterText
    const newType = Helper.notEmpty(type) ? type : this.state.filterType
    this.setState(prev => ({
      filterText: newText,
      filterType: newType,
    }))
  }

  filteredResults (text, type) {
    if (!text && !type) return this.state.pokemon

    const matches = poke => Helper.matches(poke, text, type)
  
    return this.state.pokemon.filter(matches)
  }

  render () {
    const results = this.filteredResults(this.state.filterText, this.state.filterType)
    return (
      <div className="pokemon-root">
        <FilterBar onChange={this.updateFilter}/>
        <CardList elements={results} />
      </div>
    )
  }
}

export default Pokemon;
