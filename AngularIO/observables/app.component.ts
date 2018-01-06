
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'

@Component({
    selector: 'my-app',
    template: `
        Counter: <span id="counter"></span><br/>
        <br/>

        <button id="add" value="+1">+</button>
        <button id="sub" value="-1">-</button>
    `
})
export class AppComponent implements OnInit {
    ngOnInit() {
        let addBtn = document.getElementById('add')
        let subBtn = document.getElementById('sub')

        let counter = document.getElementById('counter')

        let increment$ = Observable.fromEvent(addBtn, 'click')
        let decrement$ = Observable.fromEvent(subBtn, 'click')

        let clicks$ = Observable.merge(increment$, decrement$)
            .map( (event: any) => parseInt(event.target.value) )

        let totals$ = clicks$
            .scan((total, value) => total + value, 0 )

        // totals$.subscribe((deviation: number)=> console.log(deviation) )

        totals$.subscribe( total => counter.innerHTML = total.toString() )
    }
}