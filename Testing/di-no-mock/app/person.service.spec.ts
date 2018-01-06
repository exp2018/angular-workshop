import {inject, TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {Person} from './person'
import {PersonService} from './person.service'
import {LoadPersonsService} from './load-persons.service'

describe('PersonService', () => {
    beforeAll( () => TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() ) )

    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [
                PersonService,
                LoadPersonsService
            ]
        })
    })
    
    it('must have 2 persons', inject([PersonService], (personService) => {
        let persons = personService.getAll();
        expect(persons.length).toBe(5)
    }))
    it('1st person id should 1')
})