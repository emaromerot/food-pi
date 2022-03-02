import React from "react";
import { Link } from "react-router-dom";
import style from "../style/landingPage.module.css"

export default function LandingPage(){
    return (
        <div className={style.container} >
            <h1> BIENVENIDOS</h1>
            <Link to= "home">
                <button> INGRESAR</button>
            </Link>
        </div>
    )
}