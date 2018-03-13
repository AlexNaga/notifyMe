import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Github from 'js/pages/Github';
import Index from 'js/pages/Index';
import Slack from 'js/pages/Slack';

const root = document.getElementById('root');

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Index} />
      <Route path="/github" component={Github} />
      <Route path="/slack" component={Slack} />
    </div>
  </Router>,
  root);

// registerServiceWorker();