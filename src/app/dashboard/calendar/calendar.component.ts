import {Component, OnInit, AfterContentChecked, AfterViewInit, OnChanges} from '@angular/core';
import { Milestone } from '../../model/milestone';
import { MilestoneStoreService } from '../../service/milestone-store.service';
import { Observable } from 'rxjs/Observable';
import {Calendar, CalendarMaker} from '../../model/calendar';
import { CalendarcolorService } from '../../service/calendarcolor.service'
import * as $ from 'jquery';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit, AfterViewInit, OnChanges, AfterContentChecked {
  public milestonelist = this.msStore.milestones;
  public calendarMilestone;
  public displayMilestoneName = '';
  public curr_month: Calendar;
  public today = new Date();


  getName() {
    this.displayMilestoneName = this.msStore.calendarMilestoneName;
  }
  //
  ngAfterContentChecked() {
    this.getName();
  }

  constructor(public msStore: MilestoneStoreService,
              public calService: CalendarcolorService,
              public calColor: CalendarcolorService) { }

  updateCalendar(ms) {
    this.calColor.update_days_to_work(this.msStore.calendarMilestone, 0);
    console.log
  }

  ngOnInit() {
    if (this.displayMilestoneName !== null) {
      this.calendarMilestone = this.msStore.calendarMilestone;
    } else {
      console.log('wrong in init calendar component');
    }
    this.curr_month = new CalendarMaker(this.today.getMonth(), []);

    const d = new Date();
    // this.getColor(d);
    // this.get_this_month();
  }

  ngOnChanges() {
    if (this.displayMilestoneName !== null) {
      this.calendarMilestone = this.msStore.calendarMilestone;
    }
  }

  prev_month() {
    this.calService.update_days_to_work(this.calendarMilestone, -1);
  }

  next_month() {
    this.calService.update_days_to_work(this.calendarMilestone, +1);
  }

 ngAfterViewInit() {
  $(function() {
    function c(month) {
      calendarHeader();
      var dayWeekday = h();
      var counter = 0;
      var u = false;
      l.empty();
      while (!u) {
        if (s[counter] == dayWeekday[0].weekday) {
          u = true;
        } else {
          l.append('<div class= "blank"></div>');
          counter++;
        }
      }
      for (var c = 0; c < 42 - counter; c++) {
        if (c >= dayWeekday.length) {
          l.append('<div class="blank"></div>');
        } else {
          var v = dayWeekday[c].day;
          var b = dayWeekday[c].weekday;
          var m = g(new Date(t, n - 1, v)) ? '<div class="today" "month">' : "<div>";
          // var monthClass = String(month);
          //adding divs of each day
          l.append("<div id = '" + v  + "'"+ "class = " + b + ">" + v + "</div>");
        }
      }
      var y = o[n - 1];
      a
        .css({"background-color": "SteelBlue ",
              "padding-bottom": 0 + "px"
      })
        .find("h1")
        .text(i[n - 1] + " " + t);
      f.find("div").css("color", "SteelBlue ");
      // l.find(".today").css("background-color", "pink");
      d();
    }

    function h() {
      var dayWeekday = [];
      for (var r = 1; r < daysInMonth(t, n) + 1; r++) {
        dayWeekday.push({day: r, weekday: s[daysOfWeek(t, n, r)]});
      }
      return dayWeekday;
    }

    function calendarHeader() {
      f.empty();
      for (var e = 0; e < 7; e++) {
        f.append("<div>" + s[e].substring(0, 3) + "</div>");
      }
    }

    function d() {
      var t;
      var n = $("#calendar").css("width", e + "px");
      n
        .find((t = "#calendar_weekdays, #calendar_content"))
        .css("width", e + "px")
        .find("div")
        .css({
          display: 'flex',
          width: (e / 7) - 30 + "px",
          "padding-left": 30 + "px",
          height: (e / 7)  + "px",
          "line-height": (e / 7)  + "px"
        });
      n
        .find("#calendar_header")
        .css({height: e * (1 / 7) + "px"})
        .find('i[class^="icon-chevron"]')
        .css("line-height", e * (1 / 7) + "px");
    }

    function daysInMonth(e, t) {
      return new Date(e, t, 0).getDate();
    }

    //0-6 per week
    function daysOfWeek(e, t, n){
      return new Date(e, t - 1, n).getDay();
    }

    function g(e) {
      return y(new Date()) == y(e);
    }

    function y(e) {
      return e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate();
    }

    function b() {
      var e = new Date();
      t = e.getFullYear();
      n = e.getMonth() + 1;
    }

    var e = 480;
    var t = 2013;
    var n = 9;
    var r = [];
    var i = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER"
    ];
    var s = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    var o = [
      "#16a085",
      "#1abc9c",
      "#c0392b",
      "#27ae60",
      "#FF6860",
      "#f39c12",
      "#f1c40f",
      "#e67e22",
      "#2ecc71",
      "#e74c3c",
      "#d35400",
      "#2c3e50"
    ];
    var u = $("#calendar");
    var a = u.find("#calendar_header");
    var f = u.find("#calendar_weekdays");
    var l = u.find("#calendar_content");
    var month = new Date().getMonth();
    var monthParam = Number(month) + 1;
    b();
    c(monthParam);
    a.find('i[class^="icon-chevron"]').on("click", function () {
      var e = $(this);
      var r = function (e) {
        n = e == "next" ? n + 1 : n - 1;
        if (n < 1) {
          n = 12;
          t--;
        } else if (n > 12) {
          n = 1;
          t++;
        }
        c(month);
      };
      if (e.attr("class").indexOf("left") != -1) {
        r("previous");
      } else {
        r("next");
      }
    });
    });
  }
}
