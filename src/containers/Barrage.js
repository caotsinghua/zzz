import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BarrageItem from './BarrageItem';
import './barrage.less';

const BarrageWrap = React.forwardRef(function(props, ref) {
    const { src, width, height, data } = props;
    const [canvasRef] = useState(React.createRef());
    const [videoRef] = useState(React.createRef());
    let isPaused = true; //不能在事件中调用set
    function setPause(bool) {
        isPaused = bool;
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const video = videoRef.current;
        const barrages = data.map(item => new BarrageItem(ctx, item));
        /**video事件监听 */
        video.addEventListener('play', () => {
            console.log('on-play');
            setPause(false);
            start(); //弹幕渲染开始
        });

        video.addEventListener('pause', () => {
            console.log('onpause');
            setPause(true);
        });
        video.addEventListener('ended', () => {
            setPause(true);
            //播放结束，初始化弹幕状态
            barrages.forEach(barrage => {
                barrage.hasInit = false;
                barrage.hasShowed = false;
            });
        });
        function clear() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        function renderBarrage() {
            const currentTime = video.currentTime; // 获取视频当前时间

            barrages.forEach(barrage => {
                if (!barrage.hasShowed && currentTime >= barrage.time) {
                    if (!barrage.hasInit) barrage.init();
                    barrage.x -= barrage.speed; //改变位置
                    barrage.render();
                    if (barrage.x < -barrage.width) {
                        barrage.hasShowed = true; //渲染完毕，之后不再出现
                    }
                }
            });
        }

        function start() {
            clear();
            // 渲染弹幕
            renderBarrage();
            if (!isPaused) {
                // 如果没有暂停，则定时执行main
                requestAnimationFrame(start);
            }
        }
    });

    return (
        <div className="barrage-wrap">
            <canvas ref={canvasRef} width={width} height={height} />
            <video
                src={src}
                ref={el => {
                    videoRef.current = el;
                    ref.current = el;
                }}
                controls
                width={width}
                height={height}
            />
        </div>
    );
});

BarrageWrap.defaultProps = {
    width: 400,
    height: 200,
    data: [],
};

BarrageWrap.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.array,
};

export default BarrageWrap;
