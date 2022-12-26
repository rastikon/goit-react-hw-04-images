import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, closeModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  const handleBackdrop = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdrop}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
}

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') this.props.closeModal();
//   };

//   handleBackdrop = e => {
//     if (e.target === e.currentTarget) this.props.closeModal();
//   };

//   render() {
//     const { children } = this.props;

//     return createPortal(
//       <div className="Overlay" onClick={this.handleBackdrop}>
//         <div className="Modal">{children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }
