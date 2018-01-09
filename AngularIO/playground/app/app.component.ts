import { ContactsService } from './contact.service';
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'my-app',
    template: `
        <ul>
                <li *ngFor="let contact of contacts" class='item' [class.active]="selected==contact"> 
                    <a href='#' (click)='select(contact)'>{{contact.firstName}} {{contact.lastName.toUpperCase()}}</a>
                    <a href='#' (click)='remove(contact)' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
                </li>
        </ul>
        <contact-details [contact]="selected"></contact-details>
        <pre>{{selected | json}}</pre>
    `
})
export class AppComponent implements OnInit {
    contacts: Contacts
    selected: Contact

    constructor(private contactService: ContactsService) {}

    ngOnInit() {
        this.contacts = this.contactService.getAll()
    }

    select(contact: Contact) {
        this.selected = contact
    }

    remove(contact: Contact): void {
        this.contactService.remove(contact.id)
    }
}