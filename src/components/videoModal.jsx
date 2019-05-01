import React, { Component } from "react";
import ModalVideo from "react-modal-video";

class VideoModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.openModal = this.openModal.bind(this);
  }
  openModal() {
    this.setState({ isOpen: true });
  }
  render() {
    return (
      <div>
        <ModalVideo
          channel="youtube"
          autoplay={1}
          isOpen={this.state.isOpen}
          videoId={this.props.video}
          onClose={() => this.setState({ isOpen: false })}
        />
        <button className="button" onClick={this.openModal}>
          Trailer <i className="fa fa-play" />
        </button>
      </div>
    );
  }
}

export default VideoModal;
