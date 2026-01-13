import React from 'react';

const BackgroundTurtle = () => {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '200px',
            height: '200px',
            backgroundColor: 'red',
            zIndex: 9999,
            transform: 'translate(-50%, -50%)',
            border: '5px solid yellow'
        }}>
            TURTLE DEBUG
        </div>
    );
};

export default BackgroundTurtle;
