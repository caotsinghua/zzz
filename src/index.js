import React, { Fragment } from 'react';
import { render } from 'react-dom';
import Home from './containers/Home';

render(
    <Fragment>
        <Home />
    </Fragment>,
    document.querySelector('#root'),
);
