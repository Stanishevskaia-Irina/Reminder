import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';

import { NguiDatetimePickerModule } from '@ngui/datetime-picker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NguiDatetimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
