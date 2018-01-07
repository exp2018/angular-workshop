import { NgModule }       from '@angular/core'
import { BrowserModule }  from '@angular/platform-browser'
import { HttpModule }     from '@angular/http';
import { FormsModule }     from '@angular/forms';
import { AppComponent }   from './app.component'
import { ContactsListComponent } from "./contacts-list.component"
import { ContactDetailsComponent } from "./contact-details.component"
import { ContactsService } from "./contact.service"
import { EmailValidator } from "./email-validator.directive"

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, ContactsListComponent, ContactDetailsComponent, EmailValidator ],
  bootstrap:    [ AppComponent ],
  providers:    [ ContactsService ]
})
export class AppModule {}