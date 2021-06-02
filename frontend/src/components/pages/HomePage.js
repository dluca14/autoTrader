import React from "react";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import SimpleChart from "../trading/SimpleChart";

function HomePage(props) {
    return(
       <Router>
           <Switch>
               <Route exact path='/'>
                                      <SimpleChart></SimpleChart>
               </Route>
               <Route path='/login' component={LoginPage}></Route>
               <Route path='/register' component={RegisterPage}></Route>
           </Switch>
       </Router>
    );
}

export default HomePage;