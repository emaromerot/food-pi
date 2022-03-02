import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { diets, getRecipes } from "../actions";
import {filtroAlfabeto, filtroPuntuacion,filtroDieta} from "../actions"
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import style from "../style/home.module.css"


export default function Home(){
    const dispatch= useDispatch()
    const allRecipes= useSelector((state)=> state.recipes)
    const [currentPage,setCurrenPage]= useState(1)
    const [recipePerPage,setRecipePerPage]= useState(9)
    const indexOfLastRecipes= currentPage * recipePerPage
    const indexFirstRecipe = indexOfLastRecipes - recipePerPage
    const [orden, setOrden]= useState("")
    const currentRecipes= allRecipes.slice(indexFirstRecipe,indexOfLastRecipes)

    const paginado = (pageNumber)=>{
        setCurrenPage(pageNumber)
    }    

    useEffect(()=>{
        dispatch(getRecipes());

    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(filtroAlfabeto(e.target.value))
        setCurrenPage(1);
        setOrden(`ordenado ${e.target.value}`)
    }

    function handlePun(e){
        e.preventDefault();
        dispatch(filtroPuntuacion(e.target.value))
        setCurrenPage(1);
        setOrden(`orden ${e.target.value}`)
    }

    function handleDiets(e){
        dispatch(filtroDieta(e.target.value));



    }


   


    return (
        <div className={style.homeContainer} >
            <Link to="/recipes"> <button> CREAR RECETA</button> </Link>
            <h1> RECETAS </h1>
            <button onClick={e=> {handleClick(e)}}> cargar recetas  </button>
    

            <div   >
                <select onChange={e=> handleSort(e)} className={style.alfabeto} >
                    <option value="asc" >A-Z</option>
                    <option value="des">Z-A</option>      
                 </select>
                 <select onChange={handlePun} className={style.puntaje}>
                     <option value="min" > -puntaje </option>
                     <option value="max">  +puntaje</option>
                 </select>
                 <select onChange={handleDiets} className={style.type} >
                     <option value="all" className={style.type}> Todas las recetas </option>
                     <option value="gluten free">gluten free</option>
                     <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
                     <option value="vegan">vegan</option>
                     <option value="pescatarian">pescatarian</option>
                     <option value="paleolithic">paleolithic</option>
                     <option value="primal">primal</option>
                     <option value="fodmap friendly">fodmap friendly</option>
                     <option value="dairy free">dairy free</option>
                     <option value="whole 30">whole 30</option>

                 </select>
                    <Paginado
                    recipePerPage={recipePerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                    />
                    <SearchBar/>
                <div className={style.card}>    
                {currentRecipes?.map((e,i)=>{
                    
                    return(
                        <div className="card" key={i}>
                           <Link to={"/detail/"+ e.id}>
                            <Card name={e.name} image={e.image} diets={e.diets}  id={e.id} types={e.dishTypes}  />
                        </Link>  </div>
                    )
                })}</div>

                    <Paginado
                    recipePerPage={recipePerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                    />

            </div>

        </div>
    )

    

}