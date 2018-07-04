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

const NavLink = (props) => {
  const navClass = "nav-link " + (props.isCurrent ? "selected" : "")
  return (
    <span className="nav-link-flex-container" key={ props.link.name }>
      <img width="50px" className="nav-link-icon" src={ props.link.icon} />
      <li className={navClass}>{ props.link.name }</li>
    </span>
  )
}

const NavLinks = (props) => {
  console.log(props)
  return (
    <ul className={ props.containerClass || "" }>
      { 
        props.links.map(link => <NavLink key={link.route} link={link} isCurrent={ link.route === props.currentPage }/>)
      }
    </ul>
  ) 
}

const Sidebar = (props) => {
  if (!props.visible) return <i style={{display: "none"}}/>
  return (
    <div className="sidebar"> 
        <i onClick={ props.handleClick } className="nav-icon far fa-times-circle"></i>
        <NavLinks currentPage={props.currentPage} links={props.links} containerClass="sidebar-ul" />
    </div>
  )  
}

class Welcome extends Component {
  state = {
    showSidebar: false,
    currentPage: "/pokemon"
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
          <NavLinks links={pages} 
                    currentPage={this.state.currentPage}
                    containerClass="nav-link-desktop-container" />
        </div>
        <Sidebar handleClick={this.handleClick}
                 visible={this.state.showSidebar} 
                 currentPage={this.state.currentPage}
                 links={pages} />
      </div>
    );
  }
}

export default Welcome;
