
import { Component } from '@angular/core'

@Component({
    selector: 'failed404',
    template: `
        <h1>Upsss! Something went wrong!</h1>
        <div class='about'>
            We can't find the page you've typed
        </div>
    `
})
export class FailComponent {}