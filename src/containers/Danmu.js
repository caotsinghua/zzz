/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Danmu(props) {
    const { src, width, height, data } = props;
    const [canvasRef, setCanvas] = useState(React.createRef());
    const [videoRef, setVideo] = useState(React.createRef());

    console.log(canvasRef);

    return (
        <div className="danmu-wrap">
            <video
                src={src}
                id="danmu-video"
                ref={videoRef}
                controls
                width={width}
                height={height}
            />
            <canvas id="danmu-canvas" ref={canvasRef} />
        </div>
    );
}
Danmu.defaultProps = {
    width: 400,
    height: 200,
    data: [],
};

Danmu.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.array,
};

export default Danmu;
