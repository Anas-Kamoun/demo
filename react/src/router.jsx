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
import TypeConge from "./views/Conge";
import CongeForm from "./views/CongeForm";
import Contrat from "./views/Contrat";
import ContratForm from "./views/ContratForm";
import Profile from "./views/Profile";
import DemandeUser from "./views/DemandeUser";
import DemandeFromUser from "./views/DemandeFromUser"
import Poste from "./views/Poste"
import PosteForm from "./views/PosteForm"


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
                path:'/conge/new',
                element:<CongeForm key="congeCreate"/>
            },
            {
                path:'/conge/:id',
                element:<CongeForm key="congeUpdate"/>
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
            {
                path:'/demandeuser',
                element:<DemandeUser/>
            },
            {
                path:'/demandeuser/new',
                element:<DemandeFromUser/>
            },
            {
                path:'/demandeuser/:id',
                element:<DemandeFromUser key="DemandeUpdate"/>
            },
            {
                path:'/postes',
                element:<Poste/>
            },

            {
                path:'/poste/new',
                element:<PosteForm/>
            },
            {
                path:'/poste/:id',
                element:<PosteForm key="PosteUpdate"/>
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