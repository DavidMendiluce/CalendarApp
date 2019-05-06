import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';
import {PostData} from '../../services/PostData';
import { confirmAlert } from 'react-confirm-alert';
import './Home.css';
import '../../bower/font-awesome/css/font-awesome.min.css';
import Calendar from './calendar.js'


class Home extends Component {
constructor(props) {
super(props);

this.state = {
data:[],
redirectToReferrer: false,
name:'',
date: new Date()
};

this.logout = this.logout.bind(this);
}



logout(){
sessionStorage.setItem("userData",'');
sessionStorage.clear();
this.setState({redirectToReferrer: true});
}

calendar() {
  return window.location.href= '../components/Calendar/calendar.html';
}



render() {
if (this.state.redirectToReferrer) {
return (<Redirect to={'/login'}/>)
}


return (
  <div>
  <a href="#" onClick={this.logout} className="logout">Logout</a>
  <Calendar />
  </div>
);
}
}

export default Home;
