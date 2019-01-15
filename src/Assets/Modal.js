import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { modalToggle } from "../Store/actions/uiActions";

class ModalC extends React.Component {
  constructor(props) {
    super(props);
  }
  toggle = () => {
    this.props.toggleModal();
  };
  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );
    return (
      <div>
        <Modal isOpen={this.props.modalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            {this.props.modalTitle}
          </ModalHeader>
          <ModalBody>{this.props.children}</ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalOpen: state.ui.modalOpen
  };
};
const mapDispatchToProps = dispatch => {
  return {
    toggleModal: () => {
      dispatch(modalToggle());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalC);
