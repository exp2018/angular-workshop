import { ContactsService } from './contact.service';
import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core'
import { NgForm } from '@angular/forms'

@Component({
    selector: 'contact-details',
    template: `
        <div id="contactsDetailsContainer" *ngIf="contact">
            <span *ngIf="!editMode">
                <label>First Name: </label><b>{{contact.firstName}}</b><br/>
                <label>Last Name: </label><b>{{contact.lastName}}</b><br/>
                <label>email: </label><b>{{contact.email}}</b><br/>
                <label></label><a href="#" class="text-danger" (click)="editMode=true"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>
            </span>
            <form *ngIf="editMode" name="editContactForm" #form="ngForm" (ngSubmit)="submit(form)">
                    <input name="id" type="hidden" [ngModel]="contact.id">
                    
                    <label>First Name: </label>
                    <input #inp required name="firstName" [ngModel]="contact.firstName"><br/>
                    <div class="alert alert-danger" role="alert" *ngIf="form.controls.firstName && !form.controls.firstName.pristine && !form.controls.firstName.valid">First name is required</div>
                    
                    <label>Last Name: </label>
                    <input name="lastName" [ngModel]="contact.lastName" required><br/>
                    <div class="alert alert-danger" role="alert" *ngIf="form.controls.lastName && !form.controls.lastName.pristine && !form.controls.lastName.valid">Last name is required</div>
                
                    <label>email: </label>
                    <input name="email" [ngModel]="contact.email" email><br/>
                    <div class="alert alert-danger" role="alert" *ngIf="form.controls.email && !form.controls.email.valid">Email is invalid</div>
                    
                    <label></label><input type="submit" class="btn btn-danger" [value]="( !contact.id ? 'Add' : 'Save' )" [disabled]="form.invalid || form.pristine"/>
                    <a href="#" class="text-danger" onclick="ctrl.cancelEdit(event)">Cancel</a>
                    <pre>{{form.controls.email.errors | json}}</pre>
			</form>
        </div>
    `
})
export class ContactDetailsComponent implements OnChanges {
    editMode = false

    @Input()
    contact: Contact

    @Output()
    contactChange = new EventEmitter<Contact>()

    constructor(private contactService: ContactsService) {}

    ngOnChanges(changes) {
        if(changes && changes.contact && changes.contact.currentValue!==changes.contact.previousValue)
            this.editMode = ( this.contact && this.contact.id === null )
    }

    submit(form: NgForm) {
        if( ! form.valid ) return

        this.contact = form.value
        this.contactService.update(this.contact)
        this.editMode = false

        this.contactChange.emit(this.contact);
    }
}