import React, { PureComponent } from 'react';
import './barrage-input.less';

class BarrageInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showSetting: false,
        };
    }

    render() {
        return (
            <div className="barrage-input-wrap">
                <div className="input-bar">
                    <div className="setting">
                        <span className="setting-btn">
                            <i className="fa fa-font" />
                        </span>
                        <div className="setting-content">
                            <span>设置内容</span>
                        </div>
                    </div>
                    <input type="text" className="input" />
                </div>
                <a className="send-button">发送</a>
            </div>
        );
    }
}

export default BarrageInput;
