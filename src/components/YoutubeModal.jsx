import React, { useEffect } from 'react';
import Modal from 'react-modal';
import YoutubePlayer from './YoutubePlayer';
import '../styles/modal.scss';

Modal.setAppElement('#root');

const YoutubeModal = ({ isOpen, onClose, videoKey }) => {
    useEffect(() => {
        if (isOpen) {
            console.log(videoKey)
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && videoKey) {
            const handleResize = () => window.dispatchEvent(new Event('resize'));
            const timer = setTimeout(handleResize, 100);
    
            return () => clearTimeout(timer);
        }
    }, [isOpen, videoKey]);
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="YouTube Video Modal"
            className="modal"
            overlayClassName="overlay"
        >
            <button onClick={onClose} className="close-button">X</button>
            {videoKey ? (
                <YoutubePlayer videoKey={videoKey} />
            ) : (<p>No video available.</p>
            )}
        </Modal>
    );
};

export default YoutubeModal