import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import DanmuView from '../containers/DanmuView';

render(
    <Fragment>
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/danmu" exact render={DanmuView} />
            </Switch>
        </HashRouter>
    </Fragment>,
    document.querySelector('#root'),
);
