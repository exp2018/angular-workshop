import { NgModule }             from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContactsComponent }    from './contacts/contacts.component'
import { AboutComponent }       from './about/about.component'
import { FailComponent }        from './fail/fail.component';

const routes: Routes = [
    { path: 'contacts/:id',   component: ContactsComponent },
    { path: 'contacts',       component: ContactsComponent },
    { path: 'about',          component: AboutComponent },
    { path: '',               redirectTo: '/contacts', pathMatch: 'full' },
    { path: '**',             component: FailComponent }
  ]

  @NgModule({
    imports:      [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports:      [ RouterModule ]
  })
  export class AppRoutingModule {}