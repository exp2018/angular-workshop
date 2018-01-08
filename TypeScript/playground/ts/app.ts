(function(exports) {
    let CONTACTS = [
        { id: "1", firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
        { id: "2", firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
        { id: "3", firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
        { id: "4", firstName: "John", lastName: "Doe", email: "john@gmail.com" },
        { id: "5", firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
    ];

	class ContactsService {
        static _contactId = 5;

        private contacts

        constructor(contacts) {
            this.contacts = [...CONTACTS]
        }

		getAll() {
			return this.contacts;
		}
		
		getById(id) {
			return this.findById(id);
		}
		
		remove(id) {
			let ind = this.findIndexById(id);
			if( ind>=0 )
                this.contacts.splice(ind,1);
		}
		
		private findById(contactId) {
			return this.contacts.find(function(row){
				return row.id == contactId;
			})
		}
		
		private findIndexById(contactId) {
			let contact = this.findById(contactId);
			if( !contact ) return -1;
			
			return this.contacts.indexOf(contact);
		}
		
		update(contact) {
			let ind = this.findIndexById(contact.id);
			if( ind<0 ) return null;
			
			this.contacts.splice( ind, 1, contact );
			
			return contact.id;
		}
		
		add(contact) {
			contact.id = ++ContactsService._contactId;
			
			this.contacts.push( contact );
			
			return contact.id;
		}
	}
	
	function Controller(contactsService) {
		this.contactsService = contactsService;
		
		this.drawContactsList = function() {
			let contacts = this.contactsService.getAll();
			
			let html = '<ul>'
			for( let ind in contacts ) {
				let contact = contacts[ind];
				html += 
					"<li class='item" + ( this.selectedId==contact.id ? ' active' : '' ) + "'>" + 
						"<a href='#' onclick='ctrl.select(event, " + contact.id + ")'>" + contact.firstName + ' ' + contact.lastName.toUpperCase() + "</a>" +
						"<a href='#' onclick='ctrl.remove(event, " + contact.id + ")' class='remove' title='Remove'><span class='glyphicon glyphicon-remove-sign'></span></a>" +
					"</li>";
			}
			html += '</ul>'
			
			let contactsListContainer = document.getElementById('contactsListContainer');
			contactsListContainer.innerHTML = html;
		}
		
		this.select = function(event, contactId) {
			this.selectedId = contactId;
			 
			this.drawContactsList();
			this.drawViewDetails(contactId);
			
			event.preventDefault();
			return false;
		}
		
		this.drawViewDetails = function(contactId) {
			let contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
			let contact = this.contactsService.getById(contactId);
			contactsDetailsContainer.innerHTML = 
				'<label>First Name: </label><b>' + contact.firstName + '</b><br/>' +
				'<label>Last Name: </label><b>' + contact.lastName + '</b><br/>' +
				'<label>email: </label><b>' + contact.email + '</b><br/>' +
				'<label></label><a href="#" class="text-danger" onclick="ctrl.edit(event,' + contact.id + ')"><span class="glyphicon glyphicon-edit"></span>Edit</a><br/>';
		}
		
		this.clearDetails = function() {
			let contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
			contactsDetailsContainer.innerHTML = '';
		}
		
		this.remove = function(event, clientId) {
			if( this.selectedId==clientId )
				this.clearDetails();
				
			this.contactsService.remove(clientId);
			this.drawContactsList();
			
			event.preventDefault();
			return false;
		}
		
		this.add = function(event) {
			this.editMode = 'add';
			
			this.selectedId = null;
			
			this.drawContactsList();
			this.drawEditDetails(null); // add new contact
			
			event.preventDefault();
			return false;
		}
		
		this.edit = function(event, clientId) {
			this.editMode = 'edit';
			
			this.drawEditDetails(clientId);
			
			event.preventDefault();
			return false;
		}
		
		this.drawEditDetails = function(contactId) {
			
			let contact = !contactId ? {id:'', firstName:'', lastName:'', email:''} : this.contactsService.getById(contactId);
			
			let contactsDetailsContainer = document.getElementById('contactsDetailsContainer');
			contactsDetailsContainer.innerHTML = 
				'<form name="editContactForm" onsubmit="ctrl.submit(event)">' +
					'<input name="id" type="hidden" value="' + contact.id + '">' +
					'<label>First Name: </label><input name="firstName" value="' + contact.firstName + '"><br/>' +
					'<label>Last Name: </label><input name="lastName" value="' + contact.lastName + '"><br/>' +
					'<label>email: </label><input name="email" value="' + contact.email + '"><br/>' +
					'<label></label><input type="submit" class="btn btn-danger" value="' + ( !contactId ? 'Add' : 'Save' ) + '"/>' +
					'<a href="#" class="text-danger" onclick="ctrl.cancelEdit(event)">Cancel</a>' +
				'</form>';
			
			let firstNameInput = document.editContactForm.firstName;	
			firstNameInput.focus();
			firstNameInput.select();
		}
		
		this.cancelEdit = function(event) {
			if( this.editMode == 'edit') 
				this.drawViewDetails( this.selectedId );
			else
				this.clearDetails();
			
			event.preventDefault();
			return false;
		}
		
		this.submit = function(event) {
			event.preventDefault();
			
			let fomValid = this.validate();
			if( !fomValid ) return;
			
			this.save();
			
			return false;
		}
		
		this.validate = function() {
			let res = false;
			let form = document.editContactForm;
			
			if( !form.firstName.value )
				alert('First name is mandatory');
			else if( !form.lastName.value )
				alert('Last name is mandatory');
			else if( form.email.value && !(/[0-9a-z_\-.]+@[0-9a-z_\-.]{2,}\.[0-9a-z_\-.]{2,}/img).test(form.email.value) )
				alert('Invalid email');
			else
				res = true;
			
			return res;
		}
		
		this.save = function() {
			let form = document.editContactForm;
			
			let client = {
					id: form.id.value,
					firstName: form.firstName.value,
					lastName: form.lastName.value,
					email: form.email.value
				}
			
			let contactId;
			if( this.editMode == 'add' )
				contactId = this.contactsService.add(client);
			else
				contactId = this.contactsService.update(client);
				
			this.selectedId = contactId;
			this.drawContactsList();
			this.drawViewDetails( this.selectedId );
		}
	}
	
	function bootstrap() {
		let contactsService = new ContactsService(CONTACTS);
		let controller = new Controller(contactsService);
		
		exports.ctrl = controller
		
		controller.drawContactsList()
	}
	
	bootstrap();
})( window );