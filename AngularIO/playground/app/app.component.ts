import { Component } from '@angular/core'

@Component({
    selector: 'my-app',
    template: `
        <contact-list (onselected)="selected = $event"></contact-list>
        <contact-details [contact]="selected"></contact-details>
        <pre>{{null | json}}</pre>
    `
})
export class AppComponent {
    selected: Contact
}