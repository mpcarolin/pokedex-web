import React, { Component } from 'react';
import style from './Detail.css'
import Types from '../../enums/types.js'

class Detail extends Component {
  state = {
  }

  render() {
    const id = this.props.match.params.id
    const portraitImg = require("../../assets/images/detail_" + id + ".png")
    return (
      <div className="detail-root">
        <div className="top-detail">
          <img src={portraitImg} 
               className="portrait" />
        </div>
      </div>
    )
  }
}

export default Detail;