import React from 'react';
import BarrageWrap from './BarrageWrap';
import BarrageInput from '../components/BarrageInput';

const uid = 4;
class BarrageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barrageText: '',
            barrageColor: '#000000',
            barrages: [
                {
                    id: 1,
                    text: 'hello',
                    time: 1,
                    speed: 1,
                    fontSize: '26px',
                },
                {
                    id: 2,
                    text: 'hi',
                    time: 1.2,
                    speed: 2,
                    fontSize: '36px',
                    color: '#f00',
                },
                {
                    id: 3,
                    text: 'hi',
                    time: 2.1,
                    speed: 3,
                    color: '#ff0',
                    fontSize: '20px',
                },
            ],
        };

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.video = this.videoRef.current;
    }

    render() {
        const { barrages } = this.state;

        return (
            <div className="danmu-view">
                <BarrageWrap
                    src={require('../assets/test-video.mp4')}
                    width="500"
                    height="300"
                    data={barrages}
                    className="barrage"
                    ref={this.videoRef}
                />
                <BarrageInput />
            </div>
        );
    }
}

export default BarrageView;
