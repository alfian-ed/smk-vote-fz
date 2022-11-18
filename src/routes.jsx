import { createHashRouter } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import AlternativeLogin from "./features/AlternativeLogin";
import App from "./features/App";
import { ErrorPage } from "./features/ErrorPages";
import HalHasil from "./features/Hal-Hasil";
import Login from "./features/Login";
import Menu from "./features/Menu";
import Voting from "./features/Voting";
import Sukses from "./features/Sukses";
// import Voting from "./features/Voting";
import VotingPramuka from "./features/VotingPramuka";


const routes = createHashRouter([
    {
        path: '/',
        element: 
            <AuthProvider isProtected={true}>
                <App />
            </AuthProvider>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Menu />
            },
            {
                path: '/voting/:id',
                element: 
                    <Voting />
            },
            {
                path: '/sukses',
                element: 
                    <Sukses />
            },
            {
                path: '/vote/:id',
                element: <Voting />
            },
            {
                path: '/vote/:id/success',
                element: <Sukses />
            }
        ]
    },
    {
        path: '/login',
        element: 
            <AuthProvider>
                <Login/>
            </AuthProvider>
    },
    {
        path: '/login/alt',
        element: 
            <AuthProvider>
                <AlternativeLogin />
            </AuthProvider>
    },
    {
        path: '/dev/votingpramuka',
        element: 
            <AuthProvider>
                <VotingPramuka />
            </AuthProvider>
    },
    // {
    //     path: '/voting6',
    //     element: 
    //         <AuthProvider>
    //             <VotingOsis6 />
    //         </AuthProvider>
    // },
    {
        path: '/dev/hasil',
        element: 
            <AuthProvider>
                <HalHasil />
            </AuthProvider>
    }
])

export default routes