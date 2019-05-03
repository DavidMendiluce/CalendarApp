import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';
import {PostData} from '../../services/PostData';
import { confirmAlert } from 'react-confirm-alert';
import '../../styles/all.css';
import '../../bower/font-awesome/css/font-awesome.min.css';


class Home extends Component {

constructor(props) {
super(props);

this.state = {
data:[],
redirectToReferrer: false,
name:'',
};

this.logout = this.logout.bind(this);
}



logout(){
sessionStorage.setItem("userData",'');
sessionStorage.clear();
this.setState({redirectToReferrer: true});
}

render() {
if (this.state.redirectToReferrer) {
return (<Redirect to={'/login'}/>)
}


return (
<div className="row" id="Body">
<div className="medium-12 columns">

<div className="calendar disable-selection" id="calendar">
  <div className="left-side">
    <div className="current-day text-center">
      <h1 className="calendar-left-side-day"></h1>
      <div className="calendar-left-side-day-of-week"></div>
    </div>
    <div className="current-day-events">
      <div>Tareas por hacer:</div>
      <ul className="current-day-events-list">
        <li>alguna tarea</li>
      </ul>
      </div>
      <div className="add-event-day">
        <input type="text" className="add-event-day" placeholder="Create an Event" />
        <span class="fa fa-plus-circle cursor-pointer add-event-day-field-btn"></span>
    </div>
  </div>


  <div className="right-side">
    <div className="text-right calendar-change-year">
      <div className="calendar-change-year-slider">
        <span className="fa fa-caret-left cursor-pointer calendar-change-year-slider-prev"></span>
        <span className="calendar-current-year">2019</span>
        <span className="fa fa-caret-right cursor-pointer calendar-change-year-slider-next" id="addButton"></span>
     </div>
   </div>

   <div className="calendar-month-list">
     <ul className="calendar-month">
       <li>May</li>
     </ul>
    </div>
    <div className="calendar-week-list">
     <ul className="calendar-week">
       <li>Vie</li>
     </ul>
    </div>
    <div className="calendar-day-list">
      <ul className="calendar-days">
        <li data-day="01"></li>
        <li data-day="02"></li>

      </ul>
</div>
</div>
</div>
<a href="#" onClick={this.logout} className="logout">Logout</a>
</div>
</div>
);
}
}

export default Home;
