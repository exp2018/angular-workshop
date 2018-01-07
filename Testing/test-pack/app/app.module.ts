
import { NgModule }       from '@angular/core'
import { BrowserModule }  from '@angular/platform-browser'
import { HttpModule }     from '@angular/http';
import { RouterModule, Route }     from '@angular/router';
import { AppComponent }   from './app.component'
import { PersonsDetailsComponent } from './details.component'
import { GreeterComponent } from './greeter.component'
import { AboutComponent }   from './about.component'

let routes: Route[] = [
  {path: '',       component: PersonsDetailsComponent, pathMatch: "full" },
  {path: 'about',  component: AboutComponent},
  {path: '**',     redirectTo: "/" }
]

@NgModule({
  imports:      [ BrowserModule, HttpModule, RouterModule.forRoot(routes, {useHash: true}) ],
  declarations: [ AppComponent, GreeterComponent, PersonsDetailsComponent, AboutComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}