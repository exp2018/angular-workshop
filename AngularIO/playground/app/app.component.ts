import { Component } from '@angular/core'

@Component({
    selector: 'my-app',
    template: `
        <contact-list [selected]="selected" (onselected)="selected = $event"></contact-list>
        <contact-details [contact]="selected" (oncontact)="selected=$event"></contact-details>
        <pre>{{selected | json}}</pre>
    `
})
export class AppComponent {
    selected: Contact
}