import axios from "axios"

export function getRecipes (){
    return async function(dispatch){
        var json= await axios.get ("http://localhost:3001/recipes",{

        });

        return dispatch({
            type: "GET_RECIPES",
            payload: json.data
        })
    }

}

export function getRecipesName(name) {
    return async function (dispatch) {
        try {
            let recipes = await axios.get('http://localhost:3001/recipes?name=' + name)
            return dispatch({
                type: 'GET_RECIPES_NAME',
                payload: recipes.data
            })
        } catch (error) {
            console.log(alert('No se encontró la receta que busca'));
        }
    }
}




export  function filtroAlfabeto(payload){
    return{
        type:"FILTRO_ALFABETO",
        payload
    }
}

export function filtroPuntuacion(payload){
    return{
        type:"FILTRO_PUNTUACION",
        payload
    }
}
export function filtroDieta(payload){
    return{
        type: "FILTRO_DIETA",
        payload
    }
}

export function diets(){
    return async function (dispatch){
        let diets= await axios.get("http://localhost:3001/types",{

        });
        console.log("prueba", diets)
        
        return dispatch({
            type: "DIETS",
            payload: diets.data
        })

        
    }
}

export function postRecipe(payload){
    return async function(dispatch){
        
        const response = await axios.post("http://localhost:3001/recipes", payload);
        return dispatch({type: 'POST_RECIPE', payload: response.data});
    }
}
export const getDetail = (id) => {
    return async (dispatch) => {
        try{
            const json = await axios.get(`http://localhost:3001/recipes/` + id);
            return dispatch ({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (err) {
            alert('EL ID NO SE ENCONTRO');
        }
    }
}