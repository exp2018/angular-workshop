
/// <reference path="Contacts.service.ts" />
/// <reference path="Contacts.controller.ts" />

function bootstrap(): void {
	var contactsService = new ContactsService();
	var controller = new ContactsController(contactsService);
	
	(<any> window).ctrl = controller
	
	controller.drawContactsList()
}

bootstrap();