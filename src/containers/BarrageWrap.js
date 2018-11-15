import React, { PureComponent, Component } from 'react';
import Barrage from '../components/Barrage';
import './barrage.less';

class BarrageWrap extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.videoRef = React.createRef();
        this.state = {
            isPause: true,
            barrages: [],
        };
        this.clear = this.clear.bind(this);
        this.start = this.start.bind(this);
        this.renderBarrages = this.renderBarrages.bind(this);
        this.bindVideoEventListener = this.bindVideoEventListener.bind(this);
    }

    componentDidMount() {
        this.ctx = this.canvasRef.current.getContext('2d');
        this.video = this.videoRef.current;
        const { data } = this.props;
        const barrages = data.map(item => new Barrage(this.ctx, item));
        this.setState({ barrages });
        this.bindVideoEventListener();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.data.length === this.state.barrages.length) {
            return false;
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        // 如果弹幕更新了，执行此操作
        const { data } = nextProps;
        const { barrages } = this.state;
        const barragesNew = barrages.slice(0);

        if (data.length !== barrages.length) {
            data.forEach(d => {
                if (!barrages.some(b => b.id === d.id)) {
                    // 是新的弹幕，新建对象
                    console.log('更新');
                    barragesNew.push(new Barrage(this.ctx, d));
                }
            });
            this.setState({ barrages: barragesNew }, () => {
                console.log(this.state.barrages);
            });
        }
    }

    clear() {
        // 清除屏幕
        const { width, height } = this.ctx.canvas;
        this.ctx.clearRect(0, 0, width, height);
    }

    renderBarrages() {
        // 渲染一帧的弹幕
        const { currentTime } = this.video;
        const { barrages } = this.state;

        barrages.forEach(barrage => {
            if (!barrage.hasShowed && currentTime >= barrage.time) {
                // 当弹幕没有出现过且到其时间
                if (!barrage.hasInit) barrage.init(); // 初始化弹幕出现位置，颜色等
                barrage.x -= barrage.speed;
                barrage.render();
            }
        });
    }

    start() {
        this.clear();
        this.renderBarrages();
        if (!this.state.isPause) {
            // 如果视频正在播放，才渲染弹幕
            requestAnimationFrame(this.start); // 定时递归
        }
    }

    bindVideoEventListener() {
        this.video.addEventListener('play', e => {
            console.log('onplay');
            this.setState({ isPause: false });
            this.start();
        });

        this.video.addEventListener('pause', () => {
            console.log('paused');
            this.setState({ isPause: true });
        });
        this.video.addEventListener('ended', () => {
            console.log('ended');
            this.setState({ isPause: true });
        });

        this.video.addEventListener('seeking', e => {
            // 视频跳转
            const { currentTime } = e.target;
            const { barrages } = this.state;
            barrages.forEach(barrage => {
                // 如果视频地址小于弹幕的时间，弹幕重新设为初始状态
                if (currentTime <= barrage.time) barrage.reInitStatus();
            });
        });
    }

    render() {
        const { src, width, height, forwardRef } = this.props;
        return (
            <div className="barrage-wrap">
                <canvas ref={this.canvasRef} width={width} height={height} />
                <video
                    src={src}
                    ref={el => {
                        this.videoRef.current = el;
                        forwardRef.current = el;
                    }}
                    controls
                    width={width}
                    height={height}
                />
            </div>
        );
    }
}

const ForwardBarrageWrap = React.forwardRef((props, ref) => (
    <BarrageWrap {...props} forwardRef={ref} />
));

export default ForwardBarrageWrap;
