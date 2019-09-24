import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../src/Assests/styles/all.css';
import '../src/Assests/styles/animate.css';
import '../src/Assests/styles/bootstrap.min.css';
import '../src/Assests/styles/font-awesome.min.css';
import '../src/Assests/styles/introjs.css';
import '../src/Assests/styles/jplist-custom.css';
import '../src/Assests/styles/jquery.news-ticker.css';
// import '../src/Assests/styles/jquery-ui-1.10.4.custom.min.css';
import '../src/Assests/styles/main.css';
import '../src/Assests/styles/nestable.css';
import '../src/Assests/styles/pace.css';
import '../src/Assests/styles/style-responsive.css';
import '../src/Assests/styles/zabuto_calendar.min.css';
import '../src/Assests/styles/styles.css';
import '../src/Assests/styles/blueprint.css';
import '../src/Assests/styles/normalize.css';
import '../src/Assests/styles/blueprint-datetime.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"

import Login from '../src/Component/Main/UI/loginComponent/loginPage';
import ForgetPassword from '../src/Component/Main/UI/ForgetPassword/ForgetPassword';
import ChangePassword from '../src/Component/Main/UI/ChangePassword/ChangePassword';
import Firstlog from '../src/Component/Main/UI/FirstLog Component/Firstlog';
import NotFound from '../src/Component/Main/UI/UniqueComponents/Main';

const routing = (
    <Router>
      <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/fogetpass" component={ForgetPassword} />
        <Route exact path="/changepass" component={ChangePassword} />
        <Route exact path="/firstLog" component={Firstlog} />
        <Route component={NotFound} />
      </Switch>
      </div>
    </Router>
  )

ReactDOM.render( routing , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
