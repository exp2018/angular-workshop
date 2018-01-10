import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

@Injectable()
export class ContactsService {
	static _contactId = 10;
		
	constructor(private http: Http) {}

	getAll() {
		return this
			.http
			.get('contacts.json')
			.map((res: Response) => {
				let data: Contacts = this.extractData(res) as Contacts
				 
				data.map((val) => { ContactsService._contactId = Math.max(val.id, ContactsService._contactId) })
				ContactsService._contactId++;
				 
				return data;
			})
			.catch(this.handleError)
	}
	
	getById(id: number) {
		return this.findById(id);
	}
	
	remove(id: number) {
		let ind = this.findIndexById(id);
		if( ind>=0 )
			this.CONTACTS.splice(ind, 1);
	}
	
	update(contact: Contact) {
		let ind = this.findIndexById(contact.id);
		if( ind<0 ) return null;
		
		this.CONTACTS.splice( ind, 1, contact );
		
		return contact.id;
	}
	
	add(contact: Contact) {
		contact.id = ContactsService._contactId++;
		
		this.CONTACTS.push( contact );
		
		return contact.id;
	}
	
	private findById(contactId: number): Contact {
		return this.CONTACTS.find(row => row.id == contactId )
	}
	
	private findIndexById(contactId: number) {
		let contact = this.findById(contactId);
		if( !contact ) return -1;
		
		return this.CONTACTS.indexOf(contact);
	}

	private extractData(res: Response): Object {
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let body = res.json();
		return body || { };
	}
	
	private handleError (error: any) {
		// In a real world app, we might send the error to remote logging infrastructure
		let errMsg = error.message || error.status + ' ' + error.statusText + ': ' + error.url || 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
}