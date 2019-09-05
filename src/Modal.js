import React, {Component} from 'react'
import Portal from './Portal'
import DisabledLayer from './DisabledLayer'
import PropTypes from 'prop-types'

export default class Modal extends Component {

  closeDelayTime = 250

  constructor(props) {
    super(props)
    this.state = {show: false, closing: false, component: null}
    this.close = this.close.bind(this)
    this.closeImmediate = this.closeImmediate.bind(this)
  }

  show(options) {
    clearTimeout(this.closeTimer)

    let props = {
      close: this.close,
      closeImmediate: this.closeImmediate
    }
    let component = options.render
      ? options.render(props)
      : React.cloneElement(options.component, props)

    this.setState({
      component,
      show: true,
      closing: false
    })
    this.options = options
  }

  close() {
    this.setState({
      show: false,
      closing: true
    })

    this.closeTimer = setTimeout(() => {
      this.setState({
        closing: false,
        component: null
      })
    }, this.closeDelayTime)
  }

  closeImmediate() {
    clearTimeout(this.closeTimer)
    this.setState({
      show: false,
      closing: false,
      component: null
    })
  }

  render() {
    const {show, closing, component} = this.state
    if (!show && !closing) {
      return null
    }

    const {full, animation} = this.options
    let _modalClassList = [
      'Modal',
      this.props.className || '',
      full ? 'full' : '',
      closing ? 'closing' : ''
    ]

    let _dialogClassList = [
      'ModalDialog',
      animation || '',
      this.props.dialogClass || '',
      closing ? 'closing' : ''
    ]

    return (
      <Portal>
        <div className={_modalClassList.join(' ')}>
          <DisabledLayer show/>
          <div className='ModalWrapper'>
            <div className={_dialogClassList.join(' ')}>
              {component}
            </div>
          </div>
        </div>
      </Portal>
    )
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  dialogClass: PropTypes.string
}
