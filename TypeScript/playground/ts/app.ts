import { ContactsService } from "./Contacts.service";
import { Controller } from "./Controller.controller";

export function bootstrap() {
	let contactsService = new ContactsService()
	let controller = new Controller(contactsService)
	
	window['ctrl'] = controller
	
	controller.drawContactsList()
}

bootstrap()
