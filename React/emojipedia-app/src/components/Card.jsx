import React from "react";

function Card(props){
    return(
        <div className = "card">
            <h1 class = "emoji">{props.icon}</h1>
            <h2 className="cardHeading">{props.name}</h2>
            <p className="details">{props.detail}</p>

        </div>
    );
}

export default Card;