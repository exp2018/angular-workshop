import { ContactsService } from './contact.service';
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, Params } from '@angular/router'
import 'rxjs/add/operator/map'

@Component({
    selector: 'contact-list',
    template: `
        <ul>
                <li *ngFor="let contact of contacts" class='item' [class.active]="selectedId==contact.id"> 
                    <a [routerLink]="['/contacts', contact.id]">{{contact.firstName}} {{contact.lastName | uppercase}}</a>
                    <a href='#' (click)='remove(contact); false' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>
                </li>
        </ul>
    `
})
export class ContactListComponent implements OnInit {
    contacts: Contacts

    selectedId: number

    constructor( 
        private contactService: ContactsService,
        private route: ActivatedRoute,
        private router: Router 
    ) {}

    ngOnInit() {
        this
            .contactService
            .getAll()
            .subscribe(
                data => { this.contacts = data },
                error =>  alert( error )
            )
        
            this
                .route
                .params
                .map( (params: Params ) => +params['id'] )
                .subscribe( contactId => this.selectedId = contactId )
    }

    remove(contact: Contact): void {
        this.contactService.remove(contact.id)
        this.selectedId = 0
        this.router.navigate('/contacts')
    }
}