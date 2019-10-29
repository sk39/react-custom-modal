import React, {Component} from 'react'
import Modal from 'react-custom-modal'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.dialog = React.createRef()
    this.showDialog = this.showDialog.bind(this)
    this.showDialogUp = this.showDialogUp.bind(this)
    this.showDialogLeft = this.showDialogLeft.bind(this)
    this.showOverlayUp = this.showOverlayUp.bind(this)
    this.showOverlayLeft = this.showOverlayLeft.bind(this)
  }

  showDialog() {
    setTimeout(()=>{
      this.dialog.current.show({
        component: <CustomDialog/>
      })
    },1000);
  }

  showDialogUp() {
    this.dialog.current.show({
      component: <CustomDialog/>,
      animation: 'slideUp'
    })
  }

  showDialogLeft() {
    this.dialog.current.show({
      component: <CustomDialog/>,
      animation: 'slideLeft'
    })
  }

  showOverlayUp() {
    this.dialog.current.show({
      component: <CustomDialog/>,
      animation: 'slideUp',
      full: true
    })
  }

  showOverlayLeft() {
    this.dialog.current.show({
      render: props => {
        return (
          <CustomDialog {...props}/>
        )
      },
      animation: 'slideLeft',
      full: true
    })
  }

  render() {
    return (
      <div>
        <button className='btn'
                onClick={this.showDialog}>
          Show Dialog
        </button>
        <button className='btn'
                onClick={this.showDialogUp}>
          Show Dialog (Slide Up)
        </button>
        <button className='btn'
                onClick={this.showDialogLeft}>
          Show Dialog (Slide Left)
        </button>
        <button className='btn'
                onClick={this.showOverlayUp}>
          Show Overlay (Slide UP)
        </button>
        <button className='btn'
                onClick={this.showOverlayLeft}>
          Show Overlay (Slide Left)
        </button>
        <Modal className='Custom'
               dialogClass='CustomDialog'
               ref={this.dialog}/>
      </div>
    )
  }
}

class CustomDialog extends Component {
  render() {
    const {close} = this.props
    return (
      <div>
        <div className='modal-header'>
          <span className='title'>Modal title</span>
          <button className='close-btn' onClick={close}>
            <span>&times;</span>
          </button>
        </div>
        <div className='modal-body'>
          <p>Modal body text goes here.</p>
        </div>
        <div className='modal-footer'>
          <button className='btn btn-secondary'
                  onClick={close}>
            Cancel
          </button>
          <button className='btn btn-primary'>Save</button>
        </div>
      </div>
    )
  }
}
