import CreateProduct from './components/ExampleComponent.vue';
import page1 from './components/page1.vue';
import page2 from './components/page2.vue';
import page3 from './components/page3.vue';

 
export const routes = [
    {
        name: 'page1',
        path: '/page1',
        component: page1
    },
    {
        name: 'page2',
        path: '/page2',
        component: page2
    },    {
        name: 'page3',
        path: '/page3',
        component: page3
    },
    {
        name: 'test',
        path: '/test',
        component: CreateProduct
    },
];