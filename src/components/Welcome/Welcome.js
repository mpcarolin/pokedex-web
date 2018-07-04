import React, { Component } from 'react';
import style from './Welcome.css'

import logo from "../../assets/images/pokedex_dark.svg"
import pikachu from "../../assets/icons/pokemon/regular/pikachu.png"
import pokeball from "../../assets/icons/pokeball/poke.png"
import hm from "../../assets/icons/hm/fighting.png"
import unknown from "../../assets/icons/pokemon/regular/unown.png"

const pages = [
  { name: "Pokémon", icon: pikachu, route: "/pokemon" },
  { name: "Moves", icon:  hm, route: "/moves" },
  { name: "Items", icon: pokeball, route: "/items" },
  { name: "About", icon: unknown, route: "/about" } 
]

const NavLinks = (props) => {
  return (
    <ul className={ props.containerClass || "" }>
      { 
        props.links.map(link => <span className="nav-link-flex-container" key={ link.name }>
                                  <img width="50px" className="nav-link-icon" src={link.icon} />
                                  <li className='nav-link'>{ link.name }</li>
                                </span>)
      }
    </ul>
  ) 
}

const Sidebar = (props) => {
  if (!props.visible) return <i style={{display: "none"}}/>
  return (
    <div className="sidebar"> 
        <i onClick={ props.handleClick } className="nav-icon far fa-times-circle"></i>
        <NavLinks links={props.links} containerClass="sidebar-ul" />
    </div>
  )  
}

class Welcome extends Component {
  state = {
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
          <button className="sidebar-btn fas fa-bars" onClick={ this.handleClick } />
          <img className="vertical-align site-logo" src={logo} height="50px" />
          <h1 className="nav-title">My Pokédex!</h1>
          <NavLinks links={pages} containerClass="nav-link-desktop-container" />
        </div>
        <Sidebar handleClick={this.handleClick}
                 visible={this.state.showSidebar} 
                 links={pages} />
      </div>
    );
  }
}

export default Welcome;
