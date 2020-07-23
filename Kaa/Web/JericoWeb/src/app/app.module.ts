import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {BsModalModule} from 'ng2-bs3-modal';
import * as jquery from 'jquery';


import { FormsModule } from '@angular/forms';
import { UserService } from './Service/user.service';
import { CookieService } from './Service/cookie.service';
import { HashService } from './Service/hash.service';

import { AppComponent } from './app.component';
import { CompanyComponent } from './company.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ContactComponent } from './contact.component';
import { RegistrComponent } from './registr/registr.component';
import { HeaderComponent } from './header/header.component';
import { LichniyKabComponent } from './lichniy-kab/lichniy-kab.component';

import { HttpService } from './Service/http.service';
import { ScriptService } from './Service/script.service';
import { KorzinaComponent } from './korzina/korzina.component';
import { Header2Component } from './header2/header2.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { UserdataComponent } from './userdata/userdata.component';
import { TovarinfoComponent } from './tovarinfo/tovarinfo.component';
import {AccessBuhGuard} from "./Guards/AccessBuhGusrd";
import {AuthGuard} from "./Guards/AuthGuard";
import { BuhComponent } from './buh/buh.component';
import {NgxPaginationModule} from "ngx-pagination";
const appRoutes: Routes = [
{path: '', component: CatalogComponent},
{path: 'company', component: CompanyComponent },
{path: 'catalog', component: CatalogComponent},
{path: 'contact', component: ContactComponent},
{path: 'login', component: RegistrComponent},
{path: 'profile', component: LichniyKabComponent, canActivate: [AuthGuard]},
{path: 'korzina', component: KorzinaComponent, canActivate: [AuthGuard]},
{path: 'settings', component: UsersettingsComponent, canActivate: [AuthGuard]},
{path: 'data', component: UserdataComponent, canActivate: [AuthGuard]},
  {path: 'buh', component: BuhComponent, canActivate: [AccessBuhGuard] },
{path: 'tovarinfo/:id', component: TovarinfoComponent}
];

@NgModule({
  declarations: [
    AppComponent, CompanyComponent, CatalogComponent, ContactComponent, RegistrComponent, HeaderComponent, LichniyKabComponent, KorzinaComponent, Header2Component, UsersettingsComponent, UserdataComponent, TovarinfoComponent, BuhComponent
  ],
    imports: [
        BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule, BsModalModule, NgxPaginationModule
    ],

  providers: [
    AuthGuard,
    AccessBuhGuard,
    CookieService,
    UserService,
    HashService,
    HttpService,
    ScriptService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
