import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import TasksView from '../views/TasksView.vue';
const routes = [
    { path: '/', name: 'login', component: LoginView },
    { path: '/tasks', name: 'tasks', component: TasksView, meta: { requiresAuth: true } },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
// Navigation guard to check for authentication
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.meta.requiresAuth && !token) {
        next('/');
    }
    else {
        next();
    }
});
export default router;
