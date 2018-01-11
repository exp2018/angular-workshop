import { ContactsService } from './contact.service';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
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

    @Input()
    selectedId: number
    
    @Output()
    selectedIdChange= new EventEmitter<number>()

    constructor( 
        private contactService: ContactsService,
        private route: ActivatedRoute
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
                .subscribe( contactId => { 
                    this.selectedId = contactId
                    setTimeout(
                        () => this.selectedIdChange.emit(contactId)
                        , 1
                    )
                } )
    }

    remove(contact: Contact): void {
        this.contactService.remove(contact.id)
        this.selectedId = 0
        this.selectedIdChange.emit(0)
    }
}