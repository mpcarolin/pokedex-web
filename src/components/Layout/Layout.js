import React, { Component } from 'react';
import style from './Layout.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Pokemon from '../Pokemon/Pokemon.js';
import Detail from '../Detail/Detail.js'

import logo from "../../assets/images/pokedex_dark.svg"
import pikachu from "../../assets/icons/pokemon/regular/pikachu.png"
import pokeball from "../../assets/icons/pokeball/poke.png"
import hm from "../../assets/icons/hm/fighting.png"
import unknown from "../../assets/icons/pokemon/regular/unown.png"


// pages 
const pages = [
  { name: "Pokémon", icon: pikachu, route: "/", component: Pokemon },
  { name: "Moves", icon:  hm, route: "/moves", component: Pokemon },
  { name: "Items", icon: pokeball, route: "/items", component: Pokemon },
  { name: "About", icon: unknown, route: "/about", component: Pokemon },
  { name: "Detail", route: "/pokemon/:id", component: Detail },
]


const NavLink = (props) => {
  const navClass = "nav-link " + (props.isCurrent ? "selected" : "")
  return (
    <span className="nav-link-flex-container" key={ props.link.name }>
      <img width="50px" className="nav-link-icon" src={ props.link.icon} />
      <li className={navClass}>
        <Link className="router-link" to={props.link.route}>{ props.link.name }</Link>
      </li>
    </span>
  )
}

const NavLinks = (props) => {
  return (
    <ul className={ props.containerClass || "" }>
      { 
        props.links.filter(link => link.icon)
                   .map(link => <NavLink key={link.route} link={link} isCurrent={ link.route === props.currentPage }/>)
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

const routeMatches = (candidate, route) => {
  return (candidate === route) ||
         (candidate.replace(":")) 
}

// Navigation and router layout for application. Will render page content 
// within layout frame of the navigation components, depending on the
// URL routed to
class Layout extends Component {
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
      <Router>
        <div className="welcome-root">
          <div className="nav-bar">
            <button className="sidebar-btn fas fa-bars" onClick={ this.handleClick } />
            <img className="vertical-align site-logo" src={logo} height="50px" />
            <h1 className="nav-title">My Pokédex!</h1>
            <NavLinks links={pages} 
                      currentPage={this.state.currentPage}
                      containerClass="nav-link-desktop-container" />
          </div>
          <div className="spacer"> &nbsp; </div>
          <Sidebar handleClick={this.handleClick}
                   visible={this.state.showSidebar} 
                   currentPage={this.state.currentPage}
                   links={pages} />
          { 
            // render the exact matched component from the route
            pages.map(page => <Route exact key={page.route} path={page.route} component={page.component} />)
          }
        </div>
      </Router>
    );
  }
}

export default Layout;
