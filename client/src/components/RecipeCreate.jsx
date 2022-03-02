import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { diets, postRecipe } from "../actions";
import style from "../style/recipeCreate.module.css"

 function validate (input){

    let error={};

    if(!input.name){
        error.name= "SE REQUIERE NOMBRE"
    }
    else if (!/[a-zA-Z]{4}/.test(input.name)) {
             error.name = 'EL NOMBRE DEBE TENER AL MENOS 4 CARACTERES'}
    
     if (!input.summary) {
            error.summary = 'El resumen de la receta es requerido';
     } else if (input.summary.length < 10 || input.summary.length > 500) {
            error.summary = 'EL resumen debe tener entre 10 y 500 caracteres';
                     }  
    if (!input.puntuacion) {
                error.puntuacion = 'Puntuacion Requerida';
     } else if (isNaN(input.puntuacion) || input.puntuacion < 0 || input.puntuacion > 100) {
                  error.puntuacion = 'Debe ser un numero del 0 al 100';
                            } 
    
    if (!input.nivelDeComidaSaludable) {
              error.nivelDeComidaSaludable = 'Nivel de comida saludable requerido';
         } else if (isNaN(input.nivelDeComidaSaludable) || input.nivelDeComidaSaludable < 0 || input.nivelDeComidaSaludable > 100) {
                     error.nivelDeComidaSaludable = 'Debe ser un numero del 0 al 100';
                                     }                        
                            
    if (!input.pasoAPaso) {
              error.pasoAPaso = "Instrucciones requeridas";
                           } else if (input.pasoAPaso.length < 10) {
                     error.pasoAPaso = 'Las instrucciones debe tener mas de 10 caracteres';}    

     if (input.image !== "" && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
                                error.image = "La imagen debe ser una URL";}
                                                     

    return error;

}







export default function RecipeCreate (){

    const dispatch= useDispatch()
    const dietas= useSelector((state)=>state.diets);
    const history= useHistory()
    const [error, setError]= useState({})


    const [input,setInput]=useState({
        name: '',
        summary: '',
        puntuacion: '',
        nivelDeComidaSaludable: '',
        image: '',
        pasoAPaso: '',
        diets: []
    })



    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }        
    
    function handleSubmit(e){
        e.preventDefault()
        if(input.name.length>=4&&
            input.summary.length>=10&&
            input.puntuacion >=1&& 
            input.puntuacion <=100&&
            input.nivelDeComidaSaludable>=1&&
            input.nivelDeComidaSaludable<=100&&
            input.pasoAPaso.length>=10&&
            input.diets.length>=1
            
            ){
                    dispatch(postRecipe(input))
                alert("receta creada")
                setInput({
                        name: '',
                        summary: '',
                        puntuacion: '',
                        nivelDeComidaSaludable: '',
                        image: '',
                    pasoAPaso: '',
                    diets: []
                })
                
                history.push("/home") 
            } else {
                alert("revisa todos los campos")
            }
    }
             
     //en el handleS agarra el arrlego diets me trae lo que habia      
    function handleSelect(e){
                setInput({
                    ...input,
                    diets:[...input.diets, e.target.value]
                     })}
                            

    function handleDelete(e){
                setInput({
                    ...input,
                    diets: input.diets.filter(d =>d !==e)
                })



    }                 

            useEffect(()=>{
                        dispatch(diets())
                
                    }, [] );        



    return(
        <div className={style.container} >
            <Link to="/home">
                <button> HOME </button>
            </Link>

           <h1> CREAR RECETA   </h1>

           <form onSubmit={(e)=> handleSubmit(e)}   >
               <div>
                   <label> Nombre: </label>

                   <input type="text" defaultValue={input.name} name="name"  onChange={(e)=> handleChange(e)}   />

                        {error.name && (
                            <p  className={style.error} >  {error.name} </p>
                        )}
               </div>

                <div>
                      <label > Resumen</label>
                      <input type="text" defaultValue={input.summary} name="summary" onChange={(e)=>handleChange(e)} />      

                       {error.summary &&(
                           <p className={style.error}> {error.summary} </p>
                       )}     

                </div> 
                <div>
                        <label> Puntuacion: </label>
                        <input type="number" defaultValue={input.puntuacion} name="puntuacion" onChange={(e)=>handleChange(e) } min="0" max="100"   />
                        {error.puntuacion &&(
                            <p className={style.error}>  {error.puntuacion} </p>
                        )}


                </div>


                <div>
                        <label> Nivel de comida saludable: </label>    
                        <input type="number" defaultValue={input.nivelDeComidaSaludable} name="nivelDeComidaSaludable" onChange={(e)=> handleChange(e)} min="0" max="100" ></input>    
                    
                            {error.nivelDeComidaSaludable &&(
                                <p className={style.error}> {error.nivelDeComidaSaludable} </p>
                            )}
                    
                    
                </div>

                <div>
                        <label> Paso A Paso </label>
                        <input type="text" defaultValue={input.pasoAPaso} name="pasoAPaso" onChange={(e)=> handleChange(e)} />

                            {error.pasoAPaso &&(
                                <p className={style.error}> {error.pasoAPaso} </p>
                            )}    
                    
                    
                    
                </div>   

        
                <div>
                        <label >Imagen: </label>
                        <input type="url" name="image" defaultValue={input.image} onChange={(e)=>handleChange(e)} />
                                
                           {error.image && (
                               <p className={style.error}> {error.image} </p>
                           )}     
                    
                    
                </div>

                   <div>
                            <label > Tipos de dietas </label>

                            <select onChange={(e)=> handleSelect(e)} >
                                {dietas.map((d) =>(
                                    <option defaultValue={d.name}> {d.name} </option>
                                
                                ))}


                            </select>
                             <ul><li> {input.diets.map(e=> e +",")}  </li></ul>       

                   </div>


                <div>
                    <button type="submit" disabled={!(input.name&&
                                                      input.summary)} onClick={(e)=> handleSubmit(e) }  >  crear </button>
                </div>


           </form>

                        {input.diets.map(e=>
                            <div> 
                                <p> {e} </p>
                                <button onClick={()=>handleDelete(e)} > x </button>



                            </div>)}

        </div>            
    )
} 