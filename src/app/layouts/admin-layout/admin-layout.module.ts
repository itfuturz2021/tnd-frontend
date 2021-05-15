import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }         from '../../pages/dashboard/dashboard.component';
import { UserComponent }              from '../../pages/user/user.component';
import { TableComponent }             from '../../pages/table/table.component';
import { FormsComponent }             from '../../pages/forms/forms.component';
import { RegisterComponent}           from '../../pages/register/register.component';
import { LoginComponent }             from '../../pages/login/login.component';
import { NewsComponent }              from '../../pages/news/news.component';
import { CategoryComponent }          from '../../pages/category/category.component';
import { OffersComponent }            from '../../pages/offers/offers.component';
// import { BannerComponent }            from '../../pages/banner/banner.component';
import { EventsComponent }            from '../../pages/events/events.component';
import { SuccessComponent }           from '../../pages/success/success.component';
import { BusinessCategoryComponent }  from '../../pages/business-category/business-category.component';
// import { FeaturedComponent }           from '../../pages/featured/featured.component';
import { MembershipComponent }           from '../../pages/membership/membership.component';
// import { InquiryComponent }           from '../../pages/inquiry/inquiry.component';
import { NotifyComponent }            from '../../pages/notify/notify.component';
import { EpaperComponent }            from '../../pages/epaper/epaper.component';
import { SubcategoryComponent }       from '../../pages/subcategory/subcategory.component';
import { MastercategoryComponent }       from '../../pages/mastercategory/mastercategory.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RichTextEditorAllModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    FormsComponent,
    LoginComponent,
    RegisterComponent,
    NewsComponent,
    // InquiryComponent,
    CategoryComponent,
    OffersComponent,
    NotifyComponent,
    // BannerComponent,
    EventsComponent,
    MembershipComponent,
    SuccessComponent,
    // FeaturedComponent,
    BusinessCategoryComponent,
    MastercategoryComponent,
    SubcategoryComponent,
    EpaperComponent,
  ]
})

export class AdminLayoutModule {}
