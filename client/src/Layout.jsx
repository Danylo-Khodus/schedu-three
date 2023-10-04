import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";
import { UserContext } from './UserContext';
import { useContext} from "react";

export default function Layout() {

    const {userInfo} = useContext(UserContext);

    return(
        <div className={`body ${!userInfo ? 'no-info' : 'info'}`}>
            <Header/>
            <main className={`container padding ${!userInfo ? 'welcome' : ''}`}>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}