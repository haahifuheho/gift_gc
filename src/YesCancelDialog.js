import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./YesCancelDialog.css";

class YesCancelDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: props.showDialog };
  }

  handleClose = () => {
    this.setState({ show: false });
    this.props.setShowDialog(false);
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Launch dialog
        </Button>

        <Modal className="YesCancelDialog" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header className="Modal-Header" closeButton>
            <Modal.Title className="Modal-Title">Yes/Cancel Dialog</Modal.Title>
          </Modal.Header>
          <Modal.Body className="Modal-Body">Are you sure?</Modal.Body>
          <Modal.Footer className="Modal-Footer">
            <Button className="Button Button-secondary" variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button className="Button Button-primary" variant="primary" onClick={() => {this.props.onYesClick(); this.handleClose();}}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default YesCancelDialog;