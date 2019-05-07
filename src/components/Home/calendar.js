import '../../../node_modules/jquery/dist/jquery.min.js';
import React, {Component} from 'react';
import moment from 'moment';

export default class Calendar extends React.Component {
  state = {
    dateContext: moment(),
    today: moment(new Date()),
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
  dayToday = this.state.dateContext.date();

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

  onSelectChange = (e, data) => {
    this.setMonth(data);
  }

  SelectList = (props) => {
    let popup = props.data.map((data) => {
      return (
        <div key={data}>
          <a href="#" onClick={(e) => {this.onSelectChange(e, data)}}>
          {data}
          </a>
        </div>
      );
    });

    return (
      <div className="month-popup">
      {popup}
      </div>
    );
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
      this.setState({
        showMonthPopup: !this.state.showMonthPopup
      });
  }

  monthNav = () => {
    return (
      <li className="calendar-month"
      >
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

    let monthsRow = this.months.map((month, monthCheck) => {
      return (
        <li key={month} className="calendar-month">{month} </li>

      )
    });

    let dayToday = this.dayToday;
    return (
      <div className="row" id="Body">
      <div className="medium-12 columns">

      <div className="calendar disable-selection" id="calendar">

        <div className="left-side">
          <div className="current-day text-center">
            <h1 className="calendar-left-side-day">{dayToday}</h1>
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
              <span className="fa fa-plus-circle cursor-pointer add-event-day-field-btn"></span>
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

         <div className="calendar-month-list" >
           <ul className="calendar-month" >
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
