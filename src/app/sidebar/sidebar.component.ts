import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',           title: 'Dashboard',           icon:'ni-tv-2 text-primary',          class: '' },
    { path: '/table',               title: 'Directory Listing',   icon:'ni-bullet-list-67 text-red',    class: '' },
    { path: '/register',            title: 'Register',            icon:'ni-key-25 text-info',           class: '' },
    // { path: '/forms',               title: 'Form',                icon:'ni-circle-08 text-pink',        class: '' },
    // { path: '/news',                title: 'News',                icon:'ni-circle-08 text-pink',        class: '' },
    { path: '/category',            title: 'News Category',       icon:'ni-circle-08 text-pink',        class: '' },
    { path: '/offers',              title: 'Offers',              icon:'ni-circle-08 text-pink',        class: '' },
    // { path: '/banner',              title: 'Banners',             icon:'ni-circle-08 text-pink',        class: '' },
    { path: '/events',              title: 'Event',               icon:'ni-circle-08 text-pink',        class: '' },
    { path: '/success',             title: 'Success Story',       icon:'ni-circle-08 text-pink',        class: '' },
    // { path: '/featured',            title: 'Featured News',       icon:'ni-circle-08 text-pink',        class: '' },
    { path: '/membership',          title: 'Membership',          icon:'ni-circle-08 text-pink',        class: '' },
    // { path: '/business-category',   title: 'Business Category',   icon:'ni-circle-08 text-pink',        class: '' },
    { path: '/mastercategory',   title: 'Master-Category',   icon:'ni-circle-08 text-pink',        class: '' },
    { path: '/subcategory',   title: 'Sub-Category',   icon:'ni-circle-08 text-pink',        class: '' },
    // { path: '/inquiry',             title: 'Inquiry Forms',       icon:'ni-circle-08 text-pink',        class: '' },
    { path: '/notify',              title: 'Notify All',          icon:'ni-circle-08 text-pink',        class: '' },
    { path: '/epaper',              title: 'E-Paper',             icon:'ni-circle-08 text-pink',        class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
