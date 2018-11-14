import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import BarrageView from '../containers/BarrageView';
import './index.less';

render(
    <Fragment>
        <HashRouter>
            <Switch>
                <Route path="/" exact component={BarrageView} />
                <Route path="/barrage" exact component={BarrageView} />
            </Switch>
        </HashRouter>
    </Fragment>,
    document.querySelector('#root'),
);
