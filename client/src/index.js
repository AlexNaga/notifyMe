import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Github from 'js/pages/Github';
import Layout from 'js/pages/Layout';
import Settings from 'js/pages/Settings';
import Slack from 'js/pages/Slack';

const root = document.getElementById('root');

ReactDOM.render(
    <Router>
        <div>
        <Route exact path="/" component={Layout} />
        <Route path="/settings" component={Settings} />
        <Route path="/github" component={Github} />        
        <Route path="/slack" component={Slack} />
        </div>
    </Router>,
    root);

// registerServiceWorker();