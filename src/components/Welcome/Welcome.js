import React, { Component } from 'react';
import style from './Welcome.css'

import logo from "../../assets/images/pokedex_dark.svg"

const NavLinks = (props) => {
  return (
    <ul className="nav-link-container">
      { 
        props.links.map(link => <span key={ link.name }>
                                  <i className={ link.icon } />
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
    let cls = "sidebar-btn fas fa-bars "
    return cls + (this.state.clicked ? "fa-rotate-90" : "")
  }

  render () {
    return (
      <button className={ this.getClass() }
              onClick={ this.handleClick } />
    ) 
  }
}

const Sidebar = (props) => {
  if (!props.visible) return <i />
  return (
    <div className="sidebar"> 
        <ul>
          { 
            props.links.map(link => <span key={ link.name }>
                                      <i className={ link.icon } />
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
      { name: "Home", icon: "fa fa-home" },
      { name: "Pokémon", icon: "É" }
    ],
    showSidebar: false,
  }

  render() {
    return (
      <div className="welcome-root">
        <div className="nav-bar">
          <SimpleButton handleClick={() => this.setState(prev => ({showSidebar: !prev.showSidebar}))} />
          <img className="vertical-align site-logo" src={logo} height="50px" />
          <h1 className="nav-title">My Pokédex!</h1>
          <NavLinks links={this.state.links} />
        </div>
        <Sidebar visible={this.state.showSidebar} links={this.state.links} />
      </div>
    );
  }
}

export default Welcome;
