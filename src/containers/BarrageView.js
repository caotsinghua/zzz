import React from 'react';
import Barrage from './Barrage';

class BarrageView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            barrages: [
                {
                    text: 'hello',
                    time: 1,
                    speed: 1,
                    fontSize: '26px',
                },
                {
                    text: 'hi',
                    time: 1.2,
                    speed: 2,
                    fontSize: '36px',
                    color: '#f00',
                },
                {
                    text: 'hi',
                    time: 2.1,
                    speed: 3,
                    color: '#ff0',
                    fontSize: '20px',
                },
            ],
        };

        this.sendBarrage = this.sendBarrage.bind(this);
        this.inputText = React.createRef();
        this.inputColor = React.createRef();
        this.videoRef = React.createRef();
    }
    sendBarrage() {
        const inputText = this.inputText.current;
        const inputColor = this.inputColor.current;
        const time = this.video.currentTime;
        const barrage = {
            text: inputText.value,
            color: inputColor.value,
            time,
            speed: 2,
        };
        this.setState({
            barrages: this.state.barrages.concat(barrage),
        });
        inputText.value = '';
    }
    componentDidMount() {
        this.video = this.videoRef.current;
    }
    render() {
        const { barrages } = this.state;

        return (
            <div className="danmu-view">
                <h1>barrage</h1>
                <Barrage
                    src="http://www.w3school.com.cn/i/movie.ogg"
                    width="500"
                    height="300"
                    data={barrages}
                    className="barrage"
                    ref={this.videoRef}
                />
                <div className="send-barrage">
                    <input type="text" placeholder="输入弹幕" ref={this.inputText} />
                    <input type="color" ref={this.inputColor} />
                    <a className="button" onClick={this.sendBarrage}>
                        发射
                    </a>
                </div>
            </div>
        );
    }
}

export default BarrageView;
