import { ContactsService } from './contact.service';
import { Component, Input } from '@angular/core'

@Component({
    selector: 'contact-details',
    template: `
        <div id="contactsDetailsContainer" *ngIf="contact">
            <label>First Name: </label><b>{{contact.firstName}}</b><br/>
            <label>Last Name: </label><b>{{contact.lastName}}</b><br/>
            <label>email: </label><b>{{contact.email}}</b><br/>
            <label></label><a href="#" class="text-danger" onclick="ctrl.edit(event, 1)"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
        </div>
    `
})
export class ContactDetailsComponent {
    @Input()
    contact: Contact

    constructor(private contactService: ContactsService) {}
}