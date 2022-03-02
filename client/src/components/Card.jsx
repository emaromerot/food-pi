import React from "react";
import { Link } from "react-router-dom";
import Detail from "./Detail";
import style from "../style/card.module.css"


export default function Card ({ name, image, diets, types, id }) {
  
  let Dietas=  diets.length &&  diets.filter( (e,p) => {
      return diets.indexOf(e) === p 
  })

 
    return (
        <div className={style.cardContainer}  > 
            <h2 >{name}</h2> 
            <img src={image} alt="imagen no encontrada" width="100px" height="100px"/>
            <h4> TIPO DE DIETA: {Dietas + " , " }</h4>
            <h4> ID:  {id}</h4>
            <h4> {types} </h4>
        </div>
        
    )


}