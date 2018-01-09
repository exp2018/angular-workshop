
    let CONTACTS: Contacts = [
        { id: 1, firstName: "Max", lastName: "Smith", email: "max@gmail.com" },
        { id: 2, firstName: "Chris", lastName: "Raches", email: "chris@gmail.com" },
        { id: 3, firstName: "Michael", lastName: "Alloy", email: "michael@gmail.com" },
        { id: 4, firstName: "John", lastName: "Doe", email: "john@gmail.com" },
        { id: 5, firstName: "Jenny", lastName: "Doe", email: "jenny@gmail.com" }
    ]

    export class ContactsService {
        static _contactId = 5

        private contacts: Contacts

        constructor() {
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