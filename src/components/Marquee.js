import React from 'react';

const Marquee = ({ text }) => {
    return (
        <div className="marquee-container">
            <div className="marquee-inner">
                <div className="marquee">
                    <span>{text}</span>
                </div>
                <div className="marquee">
                    <span>{text}</span>
                </div>
            </div>
        </div>
    );
};

export default Marquee;
