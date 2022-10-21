import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.modalToggle();
    }
  };

  handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.modalToggle();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={this.props.largeUrl} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}
