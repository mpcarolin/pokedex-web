import React, { Component } from 'react';
import style from './Layout.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Pokemon from 'components/Pokemon/Pokemon.js';
import Detail from 'components/Detail/Detail.js'

import logo from "assets/images/pokedex_dark.svg"
import pikachu from "assets/icons/pokemon/regular/pikachu.png"
import pokeball from "assets/icons/pokeball/poke.png"
import hm from "assets/icons/hm/fighting.png"
import unknown from "assets/icons/pokemon/regular/unown.png"

import Helper from "util/SwipeHelper.js"

// pages 
const pages = [
  { name: "Pokémon", icon: pikachu, route: "/", component: Pokemon },
  { name: "Moves", icon:  hm, route: "/moves", component: Pokemon },
  { name: "Items", icon: pokeball, route: "/items", component: Pokemon },
  { name: "About", icon: unknown, route: "/about", component: Pokemon },
  { name: "Detail", route: "/pokemon/:id", component: Detail },
]

const SITE_NAME ="My Pokédex"

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
  //if (!props.visible) return <i style={{display: "none"}}/>
  const getClass = () => {
    if (props.visible === null) return "sidebar hidden-sidebar"
    return `sidebar ${props.visible ? "side-open" : "side-closed"}`
  }
  return (
    <div className={getClass()}
         onTouchStart={props.touchStartHandler}
         onTouchMove={props.moveHandler}
    > 
        <i onClick={props.handleClick} className="nav-icon far fa-times-circle"></i>
        <NavLinks currentPage={props.currentPage} links={props.links} containerClass="sidebar-ul" />
    </div>
  )  
}

// Navigation and router layout for application. Will render page content 
// within layout frame of the navigation components, depending on the
// URL routed to
class Layout extends Component {
  state = {
    showSidebar: null,
    currentPage: "/pokemon",
    sideSwipeProps: null, 
    rootSwipeProps: null
  }

  handleClick = () => {
    this.setState(prev => ({
      showSidebar: !prev.showSidebar
    })) 
  }

  //TODO: make a component out of this that wraps around sidebar.
  handleTouchMove = (evt) => {
    let props = this.state.sideSwipeProps
    if (!props) return
    let direction = Helper.getSwipeDirection(evt, props.xDown, props.yDown)
    if (direction === Helper.SWIPE_DIR.LEFT && this.state.showSidebar) {
      this.handleClick() 
    }
    this.setState({
      swipeProps: null
    })
  }

  handleTouchStart = (evt) => {
    const props = Helper.getSwipeProps(evt)
    this.setState({
      sideSwipeProps: props
    })
  }

  _isPeekSwipe = (x) => {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return parseInt(x) <= (width / 3.6)
  }

  handleRootMove = (evt) => {
    let props = this.state.rootSwipeProps
    if (!props) return
    let direction = Helper.getSwipeDirection(evt, props.xDown, props.yDown)
    if (!this.state.showSidebar && 
        (direction === Helper.SWIPE_DIR.RIGHT) &&
        this._isPeekSwipe(props.xDown)) {
      this.handleClick() 
    }
    this.setState({
      rootSwipeProps: null
    })
  }

  handleRootStart = (evt) => {
    const props = Helper.getSwipeProps(evt)
    this.setState({
      rootSwipeProps: props
    })
  }

  render() {
    return (
      <Router>
        <div className="welcome-root"
             onTouchStart={this.handleRootStart}
             onTouchMove={this.handleRootMove}
        >
          <div className="nav-bar">
            <button className="sidebar-btn fas fa-bars" onClick={ this.handleClick } />
            <img className="vertical-align site-logo" src={logo} height="50px" />
            <h1 className="nav-title">{SITE_NAME}</h1>
            <NavLinks links={pages} 
                      currentPage={this.state.currentPage}
                      containerClass="nav-link-desktop-container" />
          </div>
          <div className="spacer"> &nbsp; </div>
          <Sidebar handleClick={this.handleClick}
                   visible={this.state.showSidebar} 
                   touchStartHandler={this.handleTouchStart}
                   moveHandler={this.handleTouchMove}
                   currentPage={this.state.currentPage}
                   links={pages} />
          { 
            // render the exact matched component from the route
            pages.map(page => <Route exact key={page.route} 
                                           path={page.route} 
                                           component={page.component} />)
          }
        </div>
      </Router>
    );
  }
}

export default Layout;
