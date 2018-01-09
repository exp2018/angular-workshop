
import { Component } from '@angular/core'

const CONTACTS: Contact[] = [
    { id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
    { id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
    { id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
    { id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
    { id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
  ];

@Component({
    selector: 'my-app',
    template: `
        <ul>
                <li *ngFor="let contact of contacts" class='item' [class.active]="selected==contact"> 
                    <a href='#' (click)='select(contact)'>{{contact.firstName}} {{contact.lastName.toUpperCase()}}</a>
                    <a href='#' onclick='ctrl.remove(event, 1)' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
                </li>
        </ul>
        <div id="contactsDetailsContainer">
        </div>
        <pre>{{selected | json}}</pre>
    `
})
export class AppComponent {
    contacts = CONTACTS
    selected: Contact

    select(contact: Contact) {
        this.selected = contact
    }
}