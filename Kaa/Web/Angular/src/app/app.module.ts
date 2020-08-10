import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {BsModalModule} from 'ng2-bs3-modal';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserService } from './Service/user.service';
import { CookieService } from './Service/cookie.service';
import { HashService } from './Service/hash.service';

import { AppComponent } from './app.component';
import { CompanyComponent } from './company.component';
import { CatalogComponent } from './catalog/catalog.component';
import { RegistrComponent } from './registr/registr.component';
import { HeaderComponent } from './header/header.component';
import { LichniyKabComponent } from './lichniy-kab/lichniy-kab.component';

import { HttpService } from './Service/http.service';
import { ScriptService } from './Service/script.service';
import { KorzinaComponent } from './korzina/korzina.component';
import { UsersettingsComponent } from './lichniy-kab/tabs/usersettings/usersettings.component';
import { UserdataComponent } from './lichniy-kab/tabs/userdata/userdata.component';
import { TovarinfoComponent } from './tovarinfo/tovarinfo.component';
import {AccessBuhGuard} from "./Guards/AccessBuhGusrd";
import {AuthGuard} from "./Guards/AuthGuard";
import { BuhComponent } from './buh/buh.component';
import {NgxPaginationModule} from "ngx-pagination";
import {LoginComponent} from "./Login/login.component";
import { AlertComponent } from './Alert/alert/alert.component';
import {AlertService} from "./Service/alert.service";
import { SelectComponent } from './select/select.component';
import { AvatarComponent } from './lichniy-kab/tabs/avatar/avatar.component';
import { ModalComponent } from './modal/modal.component';
const appRoutes: Routes = [
{path: '', component: CatalogComponent},
{path: 'company', component: CompanyComponent },
{path: 'catalog', component: CatalogComponent},
{path: 'registr', component: RegistrComponent},
{path: 'login', component: LoginComponent},
{path: 'profile/:tab', component: LichniyKabComponent, canActivate: [AuthGuard]},
{path: 'korzina', component: KorzinaComponent, canActivate: [AuthGuard]},
{path: 'tovarinfo/:id', component: TovarinfoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    CatalogComponent,
    RegistrComponent,
    LoginComponent,
    HeaderComponent,
    LichniyKabComponent,
    KorzinaComponent,
    UsersettingsComponent,
    UserdataComponent,
    TovarinfoComponent,
    BuhComponent,
    AlertComponent,
    SelectComponent,
    AvatarComponent,
    ModalComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        FormsModule,
        BsModalModule,
        NgxPaginationModule,
        ReactiveFormsModule,
    ],

  providers: [
    AuthGuard,
    AccessBuhGuard,
    CookieService,
    UserService,
    HashService,
    HttpService,
    ScriptService,
    AlertService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
