import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    { title: 'Dashboard', icon: 'nb-home', link: '/dashboard', home: true },
    {
        title: 'Items',
        icon: 'fa fa-shopping-basket',
        link: '/dashboard/items'
    },{
        title: 'Store',
        icon: 'fa fa-shopping-basket',
        link: '/store'
    },{
        title: 'Search',
        icon: 'fa fa-shopping-basket',
        link: '/search'
    }
];
