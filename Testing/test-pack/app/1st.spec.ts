// import {inject, addProviders} from '@angular/core/testing'

describe('1st tests', () => {
    it('true is true', 
        () => expect(true).toEqual(true)
    )
    
    it('null is not the same thing as undefined',
        () => expect(null).not.toEqual(undefined)
    )
})

// xdescribe('Future test',  () => {
//     it('Will check the future')
// })