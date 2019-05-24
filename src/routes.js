import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import Order from './views/nav1/orderList.vue'
import finish from './views/nav1/finishList.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'

import Page4 from './views/nav2/Page4.vue'
import Coffee from './views/nav2/coffeeList.vue'
import Drink from './views/nav2/drinkList.vue'
import Dessert from './views/nav2/dessertList.vue'

import FeedBack from './views/nav3/feedBack.vue'

import UserList from './views/nav4/userList.vue'

import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    // { path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '订单管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/order-list', component: Order, name: '未完成订单列表'},
            { path: '/finish-list', component: finish, name: '已完成订单列表'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商品管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/coffee', component: Coffee, name: '咖啡' },
            { path: '/drink', component: Drink, name: '饮料' },
            { path: '/dessert', component: Dessert, name: '甜品' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/feed-back', component: FeedBack, name: '反馈列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/user-list', component: UserList, name: '用户列表' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

// { path: '/table', component: Table, name: 'Table' },
// { path: '/form', component: Form, name: 'Form' },
// { path: '/user', component: user, name: '列表' },
// { path: '/page4', component: Page4, name: '页面4' },
// { path: '/page5', component: Page5, name: '页面5' },
// { path: '/page6', component: Page6, name: '反馈列表' },
export default routes;