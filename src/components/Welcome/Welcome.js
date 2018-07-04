import React, { Component } from 'react';
import style from './Welcome.css'

import logo from "../../assets/images/pokedex_dark.svg"
import pikachu from "../../assets/icons/pokemon/regular/pikachu.png"
import pokeball from "../../assets/icons/pokeball/poke.png"
import hm from "../../assets/icons/hm/fighting.png"
import unknown from "../../assets/icons/pokemon/regular/unown.png"

const NavLinks = (props) => {
  return (
    <ul className="nav-link-desktop-container">
      { 
        props.links.map(link => <span className="nav-link-flex-container" key={ link.name }>
                                  <img width="50px" className="nav-link-icon" src={link.icon} />
                                  <li className='nav-link'>{ link.name }</li>
                                </span>)
      }
    </ul>
  ) 
}

class SimpleButton extends Component {
  state = { clicked: false }

  handleClick = () => {
    this.setState(prev => ({ clicked: !prev.clicked }))
    if (this.props.handleClick) {
      this.props.handleClick()
    }
  }

  getClass = () => {
     return "sidebar-btn fas fa-bars "
  }

  render () {
    return (
      <button className={ this.getClass() }
              onClick={ this.handleClick } />
    ) 
  }
}

const Sidebar = (props) => {
  if (!props.visible) return <i style={{display: "none"}}/>
  return (
    <div className="sidebar"> 
        <i onClick={ props.handleClick } className="nav-icon far fa-times-circle"></i>
        <ul className="sidebar-ul">
          { 
            props.links.map(link => <span className='nav-link-flex-container' key={ link.name }>
                                      <img width="50px" className="nav-link-icon" src={link.icon} />
                                      <li className='nav-link'>{ link.name }</li>
                                    </span>)
          }
      </ul>
    </div>
  )  
}

class Welcome extends Component {
  state = {
    links: [
      { name: "Pokémon", icon: pikachu },
      { name: "Moves", icon:  hm },
      { name: "Items", icon: pokeball },
      { name: "About", icon: unknown }
    ],
    showSidebar: false,
  }

  handleClick = () => {
    this.setState(prev => ({
      showSidebar: !prev.showSidebar
    })) 
  }

  render() {
    return (
      <div className="welcome-root">
        <div className="nav-bar">
          <SimpleButton handleClick={this.handleClick} />
          <img className="vertical-align site-logo" src={logo} height="50px" />
          <h1 className="nav-title">My Pokédex!</h1>
          <NavLinks links={this.state.links} />
        </div>
        <Sidebar handleClick={this.handleClick}
                 visible={this.state.showSidebar} 
                 links={this.state.links} />
      </div>
    );
  }
}

export default Welcome;
