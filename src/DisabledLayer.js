import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class DisabledLayer extends Component {
  render() {
    if (!this.props.show) {
      return null
    }

    return (
      <div className='DisabledLayer'
           onClick={() => false}/>
    )
  }
}

DisabledLayer.propTypes = {
  show: PropTypes.bool.isRequired
}
