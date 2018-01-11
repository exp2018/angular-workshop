import { Component } from '@angular/core'

@Component({
    selector: 'contacts',
    template: `
        <contact-list [(selectedId)]="selectedId"></contact-list>
        <contact-details [(contactId)]="selectedId"></contact-details>
    `
})
export class ContactsComponent {
    selectedId: number
}