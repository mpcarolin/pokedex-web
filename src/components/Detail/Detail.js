import React, { Component } from 'react';
import style from './Detail.css'
import Types from '../../enums/types.js'

class Detail extends Component {
  state = {
  }

  render() {
    const id = this.props.match.params.id
    return (
      <div className="detail-root">
        { "ID = "  + id }
      </div>
    )
  }
}

export default Detail;