import { ContactDetailsComponent } from './contact-details.component';
import { NgModule }                 from '@angular/core'
import { BrowserModule }            from '@angular/platform-browser'
import { AppComponent }             from './app.component'
import { ContactsService }          from './contact.service'

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, ContactDetailsComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ContactsService]
})
export class AppModule {}