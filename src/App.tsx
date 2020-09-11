import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.scss';
import { RootState } from './store/root-state';
import TodoContainer from './components/todo-container/TodoContainerComponent';


const mapStateToProps = ({ darkMode }: RootState) => {
  return {
    darkMode: darkMode,
  };
};

function App({ darkMode }: ReturnType<typeof mapStateToProps>) {
  return (
    <Router>
      <div className={ `app-root ${darkMode ? 'dark' : ''}` }>
        <header className="app-header">
          <div className="app-logo-container">
            <img src={logo}
                 className="app-logo"
                 alt="logo"
            />
          </div>
          <nav className="navigation-container">
            <ul className="navigation">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/todos">Todos</Link>
              </li>
              <li>
                <Link to="/other">Other</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/todos">
            <TodoContainer />
          </Route>
          <Route path="/other">
            <h1 className="text-center">OTHER PAGE</h1>
          </Route>
          <Route path="/">
            <h1 className="text-center">HOME PAGE</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default connect(
  mapStateToProps,
)(App)
