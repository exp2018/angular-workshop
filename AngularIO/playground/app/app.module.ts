import { FormsModule }              from '@angular/forms';
import { ContactDetailsComponent }  from './Contacts/contact-details.component';
import { NgModule }                 from '@angular/core'
import { HttpModule }               from '@angular/http'
import { BrowserModule }            from '@angular/platform-browser'
import { AppComponent }             from './app.component'
import { ContactsService }          from './Contacts/contact.service'
import { ContactListComponent }     from './Contacts/contact-list.component';
import { EmailValidator }           from './email-validator.directive';
import { AboutComponent }           from './About/about.component'
import { RouterModule, Route, Routes } from '@angular/router'
import { ContactsComponent }        from './Contacts/contacts.component';

const routes: Routes = [
  { path: 'contacts',       component: ContactsComponent },
  { path: 'about',          component: AboutComponent }
]

@NgModule({
  imports:      [ BrowserModule, 
                  FormsModule,
                  HttpModule, 
                  RouterModule.forRoot(routes, { useHash: true }) ],
  declarations: [ AppComponent, ContactsComponent, ContactDetailsComponent, ContactListComponent, EmailValidator, AboutComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ContactsService]
})
export class AppModule {}