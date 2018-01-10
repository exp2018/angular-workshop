import { ContactsService } from './contact.service';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core'

@Component({
    selector: 'contact-list',
    template: `
        <ul>
                <li *ngFor="let contact of contacts" class='item' [class.active]="selected==contact"> 
                    <a href='#' (click)='select(contact)'>{{contact.firstName}} {{contact.lastName | uppercase}}</a>
                    <a href='#' (click)='remove(contact)' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
                </li>
        </ul>
    `
})
export class ContactListComponent implements OnInit {
    contacts: Contacts

    @Input()
    selected: Contact
    
    @Output()
    onselected: EventEmitter<Contact> = new EventEmitter<Contact>()

    constructor(private contactService: ContactsService) {}

    ngOnInit() {
        this.contacts = this.contactService.getAll()
    }

    select(contact: Contact) {
        this.selected = contact
        this.onselected.emit(contact)
    }

    remove(contact: Contact): void {
        this.contactService.remove(contact.id)
        this.selected = null
        this.onselected.emit(null)
    }
}