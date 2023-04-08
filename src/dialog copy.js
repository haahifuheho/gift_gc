import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class YesCancelDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  handleClose = () => {
    this.setState({ show: false });
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

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Yes/Cancel Dialog</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default YesCancelDialog;