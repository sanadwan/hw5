import React from 'react';
import MainSection from "../Components/MainSection";
import Sidebar from "../Components/Sidebar";

function Home(){
    return (
        <div>
            <div className="app-container">
                <div className="mainSection-container">
                    <MainSection/>
                </div>
                <div className="sidebar-container">
                    <Sidebar/>
                </div>
            </div>
        </div>
    );
}
export default Home;



