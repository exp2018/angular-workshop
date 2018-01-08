declare interface Array<T> {
	find(f: (T) => boolean ): T
}

interface ContactEditFormElement extends HTMLFormElement {
    contactId: HTMLInputElement
    firstName: HTMLInputElement
    lastName: HTMLInputElement
    email: HTMLInputElement
}

interface Document { editContactForm?: ContactEditFormElement }

(function(exports) {
    let CONTACTS: Contacts = [
        { id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
        { id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
        { id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
        { id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
        { id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
    ]

    interface Contact {
        id: number
        firstName: string
        lastName: string
        email: string
    }

    type Contacts = Contact[]

    enum EditMode {
        EDIT,
        VIEW,
        ADD
    }

	class ContactsService {
        static _contactId = 5

        private contacts: Contacts

        constructor(contacts: Contacts) {
            this.contacts = [...CONTACTS]
        }

		getAll(): Contacts {
			return this.contacts
		}
		
		getById(id: number): Contact {
			return this.findById(id)
		}
		
		remove(id: number): void {
			let ind = this.findIndexById(id)
			if( ind>=0 )
                this.contacts.splice(ind,1)
		}
		
		private findById(contactId: number): Contact {
			return this.contacts.find(function(row){
				return row.id == contactId
			})
		}
		
		private findIndexById(contactId: number): number {
			let contact = this.findById(contactId)
			if( !contact ) return -1
			
			return this.contacts.indexOf(contact)
		}
		
		update(contact: Contact): number {
			let ind = this.findIndexById(contact.id)
			if( ind<0 ) return null
			
			this.contacts.splice( ind, 1, contact )
			
			return contact.id
		}
		
		add(contact: Contact): number {
			contact.id = ++ContactsService._contactId
			
			this.contacts.push( contact )
			
			return contact.id
		}
	}
	
	class Controller {
        private selectedId: number = -1
        private editMode: EditMode

		constructor(private contactsService: ContactsService) {}
		
		drawContactsList(): void {
			let contacts = this.contactsService.getAll()
			
			let html = '<ul>'
			for( let ind in contacts ) {
				let contact = contacts[ind]
				html += 
					"<li class='item" + ( this.selectedId==contact.id ? ' active' : '' ) + "'>" + 
						"<a href='#' onclick='ctrl.select(event, " + contact.id + ")'>" + contact.firstName + ' ' + contact.lastName.toUpperCase() + "</a>" +
						"<a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>" +
					"</li>"
			}
			html += '</ul>'
			
			let contactsListContainer = document.getElementById('contactsListContainer')
			contactsListContainer.innerHTML = html
		}
		
		select(event: Event, contactId: number): boolean {
			this.selectedId = contactId
			 
			this.drawContactsList()
			this.drawViewDetails(contactId)
			
			event.preventDefault()
			return false
		}
		
		drawViewDetails(contactId: number): void {
			let contactsDetailsContainer = document.getElementById('contactsDetailsContainer')
			let contact = this.contactsService.getById(contactId)
			contactsDetailsContainer.innerHTML = 
				'<label>First Name: </label><b>' + contact.firstName + '</b><br/>' +
				'<label>Last Name: </label><b>' + contact.lastName + '</b><br/>' +
				'<label>email: </label><b>' + contact.email + '</b><br/>' +
				'<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>'
		}
		
		clearDetails(): void {
			let contactsDetailsContainer = document.getElementById('contactsDetailsContainer')
			contactsDetailsContainer.innerHTML = ''
		}
		
		remove(event: Event, clientId: number): boolean {
			if( this.selectedId==clientId )
				this.clearDetails()
				
			this.contactsService.remove(clientId)
			this.drawContactsList()
			
			event.preventDefault()
			return false
		}
		
		add(event: Event): boolean {
			this.editMode = EditMode.ADD
			
			this.selectedId = null
			
			this.drawContactsList()
			this.drawEditDetails(null) // add new contact
			
			event.preventDefault()
			return false
		}
		
		edit(event: Event, clientId: number): boolean {
			this.editMode = EditMode.EDIT
			
			this.drawEditDetails(clientId)
			
			event.preventDefault()
			return false
		}
		
		drawEditDetails(contactId: number): void {
			
			let contact = !contactId ? {id:'', firstName:'', lastName:'', email:''} : this.contactsService.getById(contactId)
			
			let contactsDetailsContainer = document.getElementById('contactsDetailsContainer')
			contactsDetailsContainer.innerHTML = 
				'<form name="editContactForm" onsubmit="ctrl.submit(event)">' +
					'<input name="id" type="hidden" value="' + contact.id + '">' +
					'<label>First Name: </label><input name="firstName" value="' + contact.firstName + '"><br/>' +
					'<label>Last Name: </label><input name="lastName" value="' + contact.lastName + '"><br/>' +
					'<label>email: </label><input name="email" value="' + contact.email + '"><br/>' +
					'<label></label><input type="submit" class="btn btn-danger" value="' + ( !contactId ? 'Add' : 'Save' ) + '"/>' +
					'<a href="#" class="text-danger" onclick="ctrl.cancelEdit(event)">Cancel</a>' +
				'</form>'
			
            let firstNameInput = document.editContactForm.firstName
			firstNameInput.focus()
			firstNameInput.select()
		}
		
		cancelEdit(event: Event): boolean {
			if( this.editMode == EditMode.EDIT) 
				this.drawViewDetails( this.selectedId )
			else
				this.clearDetails()
			
			event.preventDefault()
			return false
		}
		
		submit(event: Event): boolean {
			event.preventDefault()
			
			let fomValid = this.validate()
			if( !fomValid ) return
			
			this.save()
			
			return false
		}
		
		validate(): boolean {
			let res = false
			let form = document.editContactForm
			
			if( !form.firstName.value )
				alert('First name is mandatory')
			else if( !form.lastName.value )
				alert('Last name is mandatory')
			else if( form.email.value && !(/[0-9a-z_\-.]+@[0-9a-z_\-.]{2,}\.[0-9a-z_\-.]{2,}/img).test(form.email.value) )
				alert('Invalid email')
			else
				res = true
			
			return res
		}
		
		save() {
			let form = document.editContactForm
			
			let client = {
					id: form.id.value,
					firstName: form.firstName.value,
					lastName: form.lastName.value,
					email: form.email.value
				}
			
			let contactId
			if( this.editMode == EditMode.ADD )
				contactId = this.contactsService.add(client)
			else
				contactId = this.contactsService.update(client)
				
			this.selectedId = contactId
			this.drawContactsList()
			this.drawViewDetails( this.selectedId )
		}
	}
	
	function bootstrap() {
		let contactsService = new ContactsService(CONTACTS)
		let controller = new Controller(contactsService)
		
		exports['ctrl'] = controller
		
		controller.drawContactsList()
	}
	
	bootstrap()
})( window )