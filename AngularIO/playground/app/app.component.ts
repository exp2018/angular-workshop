import { Component } from '@angular/core'

@Component({
    selector: 'my-app',
    template: `
        <contact-list [(selected)]="selected"></contact-list>
        <contact-details [(contact)]="selected"></contact-details>
    `
})
export class AppComponent {
    selected: Contact
}