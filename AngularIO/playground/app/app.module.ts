import { AppRoutingModule }         from './app-routing.module';
import { FormsModule }              from '@angular/forms';
import { ContactDetailsComponent }  from './contacts/contact-details.component';
import { NgModule }                 from '@angular/core'
import { HttpModule }               from '@angular/http'
import { BrowserModule }            from '@angular/platform-browser'
import { AppComponent }             from './app.component'
import { ContactsService }          from './contacts/contact.service'
import { ContactListComponent }     from './contacts/contact-list.component';
import { EmailValidator }           from './email-validator.directive';
import { AboutComponent }           from './about/about.component'
import { ContactsComponent }        from './contacts/contacts.component';
import { FailComponent }            from './fail/fail.component';



@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, AppRoutingModule ],
  declarations: [ AppComponent, ContactsComponent, ContactDetailsComponent, ContactListComponent, EmailValidator, AboutComponent, FailComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ContactsService]
})
export class AppModule {}