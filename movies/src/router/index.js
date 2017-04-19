import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'


import movies from '@/components/movies'

Vue.use(Router)
Vue.use(VueResource);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'movies',
            component: movies
        }
    ]
})
