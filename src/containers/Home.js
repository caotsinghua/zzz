import React, { PureComponent } from 'react';
import './home.less';

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.input = React.createRef();
        this.input2 = React.createRef();
    }

    componentDidMount() {
        console.log('ref input');
        console.log(this.input);
        console.log(this.input2);
        this.input.current.focus();
    }

    render() {
        return (
            <div className="home-page">
                <h1 className="red">home</h1>
                <input ref={this.input} />
                <input ref={this.input2} />
            </div>
        );
    }
}

export default Home;
