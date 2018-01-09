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
        <div id="contactsDetailsContainer" *ngIf="selected">
            <label>First Name: </label><b>{{selected.firstName}}</b><br/>
            <label>Last Name: </label><b>{{selected.lastName}}</b><br/>
            <label>email: </label><b>{{selected.email}}</b><br/>
            <label></label><a href="#" class="text-danger" onclick="ctrl.edit(event, 1)"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
        </div>
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