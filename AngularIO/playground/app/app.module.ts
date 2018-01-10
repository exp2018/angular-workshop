import { FormsModule }              from '@angular/forms';
import { ContactDetailsComponent }  from './contact-details.component';
import { NgModule }                 from '@angular/core'
import { HttpModule }               from '@angular/http'
import { BrowserModule }            from '@angular/platform-browser'
import { AppComponent }             from './app.component'
import { ContactsService }          from './contact.service'
import { ContactListComponent }     from './contact-list.component';
import { EmailValidator }           from './email-validator.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, ContactDetailsComponent, ContactListComponent, EmailValidator ],
  bootstrap:    [ AppComponent ],
  providers:    [ContactsService]
})
export class AppModule {}