// src/app/routes.ts
import {PublicationsComponent} from './components/publications-show';
import {SigninComponent} from './components/signin';
import {SignupComponent} from './components/signup';

export default [
    {path: '/', component: PublicationsComponent, name: 'Publications'},
    {path: '/signin', component: SigninComponent, name: 'Signin'},
    {path: '/signup', component: SignupComponent, name: 'Signup'}
];
