import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler() {
      this.saveLocalReminders();
    }

  public dateTime: string;
  public description: string;
  public date1: any;
  public arrReminders: Array<any> = [];

  ngOnInit() {
    this.arrReminders = JSON.parse(localStorage.getItem('reminders'));
  }

  addReminder() {
    let stringDateTime = this.dateTime.toString();
    this.arrReminders.push({
      'dateTime' : this.dateTime,
      'description' : this.description,
      'stringDateTime' : stringDateTime,
      'isEditable': false
    });
    this.clearInputFields();
    this.arrReminders.sort(this.compareDateTime);
  }

  clearInputFields() {
    this.description = '';
    this.date1 = '';
  }

  compareDateTime (a, b) {
    return new Date(a.stringDateTime).getTime() - new Date(b.stringDateTime).getTime();
  }

  deleteReminder(index) {
    this.arrReminders.splice(index, 1);
  }

  saveLocalReminders() {
    let localReminders = JSON.stringify(this.arrReminders);
    localStorage.setItem('reminders', localReminders);
  }
}
