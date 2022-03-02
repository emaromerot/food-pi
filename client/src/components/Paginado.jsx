import React from "react";
import style from "../style/paginado.module.css"

export default function Paginado({recipePerPage,allRecipes,paginado}) {

    const pageNumber=[]

    for( let i=0; i<=Math.ceil(allRecipes/recipePerPage);i++){
        pageNumber.push(i + 1)
    }
    return(
        <nav>
            <ul className={style.paginado} >
                {pageNumber&&
                pageNumber.map(number=>(
                    <li className="number" key={number}>
                        <a onClick={()=>paginado(number)}> {number}</a>
                    </li>
                ))}
            </ul>


        </nav>
    )
}