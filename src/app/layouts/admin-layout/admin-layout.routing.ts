import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { FormsComponent } from '../../pages/forms/forms.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { LoginComponent } from '../../pages/login/login.component';
import { NewsComponent } from 'app/pages/news/news.component';
import { CategoryComponent } from 'app/pages/category/category.component';
import { OffersComponent } from 'app/pages/offers/offers.component';
import { BannerComponent } from 'app/pages/banner/banner.component';
import { EventsComponent } from 'app/pages/events/events.component';
import { SuccessComponent } from 'app/pages/success/success.component';
import { BusinessCategoryComponent } from 'app/pages/business-category/business-category.component';
import { FeaturedComponent } from 'app/pages/featured/featured.component';
import { MembershipComponent } from 'app/pages/membership/membership.component';
import { InquiryComponent }  from 'app/pages/inquiry/inquiry.component';
import { NotifyComponent } from 'app/pages/notify/notify.component';
import { EpaperComponent } from 'app/pages/epaper/epaper.component';
import { SubcategoryComponent} from 'app/pages/subcategory/subcategory.component';
import { MastercategoryComponent } from 'app/pages/mastercategory/mastercategory.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    // { path: 'login',          component: LoginComponent },
    // { path: 'forms',          component: FormsComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'news',           component: NewsComponent },
    { path: 'category',       component: CategoryComponent },
    { path: 'offers',         component: OffersComponent },
    // { path: 'banner',         component: BannerComponent },
    { path: 'events',         component: EventsComponent },
    { path: 'success',         component: SuccessComponent },
    // { path: 'featured',         component: FeaturedComponent },
    { path: 'membership',           component: MembershipComponent },
    // { path: 'business-category',    component:BusinessCategoryComponent },
    { path : 'mastercategory', component:MastercategoryComponent},
    { path: 'subcategory',    component:SubcategoryComponent },
    // { path: 'inquiry' ,             component : InquiryComponent},
    { path : 'notify' ,             component : NotifyComponent},
    { path : 'epaper',              component : EpaperComponent}
];
