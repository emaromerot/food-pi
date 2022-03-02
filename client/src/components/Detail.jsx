import React from "react";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../actions";
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import style from "../style/detail.module.css"


export default function Detail (props){

    
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    }, [dispatch] )

    const myRecipe= useSelector((state)=> state.details)

    const diets = myRecipe.length > 0 && myRecipe[0].diets.map(diet => diet);

    let Dietas=  diets.length &&  diets.filter( (e,p) => {
        return diets.indexOf(e) === p 
    })
     

    return (
        <div className={style.detail} >
            {
                myRecipe.length>0 ?
                <div>
                    <h1> {myRecipe[0].name} </h1>
                    <h3> ID: {myRecipe[0].id} </h3>
                    <img src={myRecipe[0].img? myRecipe[0].img : myRecipe[0].image }/>
                    <p> Resumen: { myRecipe[0].summary } </p>
                    <p> Instrucciones: {myRecipe[0].pasoAPaso } </p>
                    <h3> Puntuacion: {myRecipe[0].puntuacion }  </h3>
                    <h3> Nivel de comida Saludable: {myRecipe[0].nivelDeComidaSaludable}  </h3>
                    <h3> Tipo de Dieta: {Dietas +" , "} </h3>
                    <Link to="/home">
                    <button> Home </button>
                </Link>

                </div>: <div>
                    <p> cargando</p>



                </div>

                
                
            } 


        </div> 
    )


}