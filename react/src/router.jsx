import { Children } from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import UserForm from "./views/UserForm";
import Users from "./views/Users";
import Demande from "./views/Demande";
import TypeConge from "./views/TypeConge";
import Contrat from "./views/Contrat";
import ContratForm from "./views/ContratForm";
import Profile from "./views/Profile";


const router = createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to="/users"/>
            },
            {
                path:'/dashboard',
                element:<Dashboard/>
            },
            {
                path:'/users',
                element:<Users/>
            },
            {
                path:'/users/new',
                element:<UserForm key="userCreate"/>
            },
            {
                path:'/users/:id',
                element:<UserForm key="userUpdate"/>
            },
            {
                path:'/demande',
                element:<Demande/>
            },
            {
                path:'/conge',
                element:<TypeConge/>
            },
            {
                path:'/contrat',
                element:<Contrat/>
            },
            {
                path:'/contrat/new',
                element:<ContratForm key="contratCreate"/>
            },
            {
                path:'/contrat/:id',
                element:<ContratForm key="contratUpdate"/>
            },
            {
                path:'/profile',
                element:<Profile/>
            },

        ]
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children:[
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/signup',
                element:<Signup/>
            },
        ]
    },
    {
        path:'*',
        element:<NotFound/>
    },
])

export default router;