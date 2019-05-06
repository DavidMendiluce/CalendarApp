import '../../../node_modules/jquery/dist/jquery.min.js';
import React, {Component} from 'react';
import moment from 'moment';

export default class Calendar extends React.Component {
  state = {
    dateContext: moment(),
    today: moment(),
    showMonthPopup: false,
    showYearPopup: false
  }

  constructor(props) {
    super(props);
    this.width = props.width || "350px";
    this.style = props.style || {};
  }

  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  months = moment.monthsShort();


  year = () => {
    return this.state.dateContext.format("Y");
  }

  month = () => {
    return this.state.dateContext.format("MMMM");
  }

  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  }

  currentDate = () => {
    return this.state.dateContext.get("date");
  }

  currentDay = () => {
    return this.state.dateContext.format("D");
  }

  firstDayOfMonth = () => {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext).startOf('month').format('d');
    return firstDay;
  }

  setMonth = (month) => {
    let monthNo = this.months.indexOf(month);
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("month", monthNo);
    this.setState({
      dateContext: dateContext
    });
  }
  onChangeMonth = (e, data) => {
      this.setMonth(data)
  }

  monthNav = () => {
    return (
      <li className="calendar-month"
        onClick={(e)=> {this.onChangeMonth(e, this.month())}}>
        {this.month()}
      </li>
    );
  }


  render() {
    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <li key={day} className="calendar-week">{day} </li>
      )
    });

    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<li className="emptySlot">{""}</li>);
    }

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let className = (d == this.currentDay() ? "day current-day": "day");
      daysInMonth.push(
        <li key={d} className="calendar-days">
          {d}
        </li>
      )
    }

    let monthsRow = this.months.map((month) => {
      return (
        <li key={month} className="calendar-month">{month} </li>
      )
    });





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
            <div></div>
            <ul className="current-day-events-list">
              <li></li>
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
              <span className="fa fa-caret-right cursor-pointer calendar-change-year-slider-next"></span>
           </div>
         </div>

         <div className="calendar-month-list">
           <ul id="mes" className="calendar-month">
             {monthsRow}
           </ul>
          </div>
          <div className="calendar-week-list">
           <ul className="calendar-week">
             {weekdays}
           </ul>
          </div>
          <div className="calendar-day-list">
            <ul className="calendar-days">
              {daysInMonth}

            </ul>
      </div>
      </div>
      </div>
      </div>
      </div>

    );
  }
}
