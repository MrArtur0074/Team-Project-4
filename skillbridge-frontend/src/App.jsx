import './App.css';
import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    const handleLogin = (name) => {
        setIsLoggedIn(true);
        setUsername(name);
    };

    return (
        <div>
            <Header />
            <Search 
                onSearch={(query) => console.log("Searching:", query)} 
                isLoggedIn={isLoggedIn} 
                username={username} 
                onLogin={handleLogin}
            />
            <Footer />
        </div>
    );
}

export default App;
