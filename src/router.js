import { createRouter, createWebHashHistory } from 'vue-router'
import store from './store'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Main from './pages/Main.vue'


const Profile = () => import('./pages/Profile.vue')
const Play = () => import('./pages/Play.vue')

const router = createRouter({
    history: createWebHashHistory(),
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: Main,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/main',
            component: Main,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/play',
            name: 'play',
            component: Play
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['auth/isLoggedIn']()) {
            next();
        } else {
            store.dispatch('auth/logout')
            next('/login');
        }
    } else {
        next();
    }
})

export default router;