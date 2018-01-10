import { Component } from '@angular/core'

@Component({
    selector: 'contacts',
    template: `
        <contact-list [(selected)]="selected"></contact-list>
        <contact-details [(contact)]="selected"></contact-details>
    `
})
export class ContactsComponent {
    selected: Contact
}