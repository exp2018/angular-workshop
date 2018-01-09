/// <reference path="Contacts.service.ts" />
/// <reference path="Controller.controller.ts" />

namespace MyApp {
	export function bootstrap() {
		let contactsService = new ContactsService()
		let controller = new Controller(contactsService)
		
		window['ctrl'] = controller
		
		controller.drawContactsList()
	}
}

MyApp.bootstrap()
