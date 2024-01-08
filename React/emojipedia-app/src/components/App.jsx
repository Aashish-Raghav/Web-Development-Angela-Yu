import React from "react";
import emojis from "../emojipedia"
import Header from "./Header";
import Card from "./Card";

function createCard(emoji){
    return (

        <Card 
            key = {emoji.id}
            icon={emoji.emoji}
            name={emoji.name}
            detail={emoji.meaning}
        />
    )
}

function App(){
    return(
        <div>
            <Header />
            <div className = "cards">
                {emojis.map(createCard)}
            </div>
        </div>
    );
}

export default App;