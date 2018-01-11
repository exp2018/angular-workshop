import { ContactDetailsComponent } from './contact-details.component';
import { Component, ViewChild } from '@angular/core'
import { Observable }               from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise'
import { DialogService } from '../dialog.service';

@Component({
    selector: 'contacts',
    template: `
        <contact-list></contact-list>
        <contact-details></contact-details>
    `
})
export class ContactsComponent {
    @ViewChild(ContactDetailsComponent)
    private contactDetailsComponent: ContactDetailsComponent

    constructor (
        private dialogService: DialogService
    ) {}

    canDeactivate(): Observable<boolean> | boolean {
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        if ( ! this.contactDetailsComponent.editMode )
            return true
        
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        let p: Promise<boolean> = this.dialogService.confirm('Discard changes?')
        let o = Observable.fromPromise(p)
        return o
    }
}