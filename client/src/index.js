import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bulma/css/bulma.css'
import 'css/index.css';

import Dashboard from 'js/pages/Dashboard';
import Github from 'js/pages/Github';
import Discord from 'js/pages/Discord';

const root = document.getElementById('root');

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={Dashboard} />
      <Route path='/discord' component={Discord} />
      <Route path='/github' component={Github} />
    </div>
  </Router>,
  root);