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
  public tag: string;
  public date1: any;
  public arrReminders: Array<any> = [];
  public arrRemindersCopy: Array<any> = [];
  public arrTags: Array<string> = [];
  public visibility: boolean = false;
  public visibilityInSearch: boolean = true;
  public visibilityInTagSearch: boolean = true;
  // public arrDescriptionTag: Array<any> = [];
  public stringFromTags: string;
  public term1: string;
  public term2: string;
  public deleted = {};
  // public indexTag: number = 0;

  ngOnInit() {
    this.arrReminders = JSON.parse(localStorage.getItem('reminders'));
    // this.arrRemindersCopy = this.arrReminders;
    // this.arrDescriptionTag = JSON.parse(localStorage.getItem('descriptionTag'));


    setInterval (() => {
      for (let index = 0; index < this.arrReminders.length; index++) {
        if (new Date(this.arrReminders[index].stringDateTime).getTime() <= new Date().getTime()){
          this.arrReminders[index].isEnded = true;
        }
      }
    }, 1000);
  }

  addReminder() {
    let indexDescription: string = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    let stringDateTime = this.dateTime.toString();

    this.stringFromTags = this.arrTags.join(' ');
    this.stringFromTags = this.stringFromTags.toString();

    this.arrReminders.push({
      'idDescription' : indexDescription,
      'dateTime' : this.dateTime,
      'description' : this.description,
      'stringDateTime' : stringDateTime,
      'isEnded': false,
      'tags': this.stringFromTags
    });

    this.clearInputFields();
    this.arrReminders.sort(this.compareDateTime);
    // Object.assign(this.arrRemindersCopy, this.arrReminders);
    this.arrRemindersCopy = JSON.parse(JSON.stringify(this.arrReminders));
    this.visibility = true;
    this.arrTags.length = 0;
  }

  clearInputFields() {
    this.description = '';
    this.date1 = '';
  }

  clearInputTag() {
    this.tag = '';
  }

  compareDateTime(a, b) {
    return new Date(a.stringDateTime).getTime() - new Date(b.stringDateTime).getTime();
  }

  addTag() {
    this.visibility = false;
    this.arrTags.push(
      this.tag,
    );
    this.clearInputTag();
  }

  deleteReminder(index) {
    this.deleted = this.arrReminders.splice(index, 1);

    for (let m = 0; m < this.arrRemindersCopy.length; m++) {
      if (this.deleted[0]['idDescription'] === this.arrRemindersCopy[m]['idDescription']) {
        this.arrRemindersCopy.splice(m, 1);
      }
    }

    this.term1 = '';
    this.term2 = '';
    this.arrReminders = this.arrRemindersCopy;

    // this.arrRemindersCopy = this.arrReminders;
  }

  saveLocalReminders() {
    let localReminders = JSON.stringify(this.arrReminders);
    localStorage.setItem('reminders', localReminders);
  }

  deleteSearchText() {
    this.term1 = '';
    this.arrReminders = this.arrRemindersCopy;
  }

  deleteTagSearchText() {
    this.term2 = '';
    this.arrReminders = this.arrRemindersCopy;
  }

  searchOnDescription(searchText) {
    this.arrReminders = this.arrReminders.filter(function(item) {
      for (let property in item) {
        if (property === 'description') {
          return (item[property].toString().toLowerCase().includes(searchText.toLowerCase()));
        }
      }
    });
  }

  searchOnTags(searchText) {
    this.arrReminders = this.arrReminders.filter(function(item) {
      for (let property in item) {
        if (property === 'tags') {
          return (item[property].toString().toLowerCase().includes(searchText.toLowerCase()));
        }
      }
    });
  }

}
