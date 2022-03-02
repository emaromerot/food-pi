import { diets } from "../actions"

const initialState = {
    recipes:[],
    filtradoDieta:[],
    diets:[],
    details:{}
}



function rootReducer(state=initialState, action) {
    switch (action.type){
        case "GET_RECIPES":
            return{
                ...state,
                recipes: action.payload,
                filtradoDieta:action.payload
    }

        case "FILTRO_ALFABETO":

        let sortX= action.payload=== "asc"?
        state.recipes.sort(function(a,b){
            if(a.name > b.name ){
                return 1
            }
            if (b.name > a.name){
                return -1
            }
            return 0;

        }):
        state.recipes.sort(function(a,b){
            if(a.name > b.name){
                return -1;
            }
            if(b.name > a.name){
                return 1;
            }
            return 0 ;


        })

        return{
            ...state,
            recipes: sortX

        }

        case "FILTRO_PUNTUACION":
            let sortY= action.payload === "min"?

            state.recipes.sort(function(a,b){
                if(a.puntuacion > b.puntuacion){
                    return 1
                }

                if(a.puntuacion < b.puntuacion){
                    return -1 
                }
                return 0
            }):

            state.recipes.sort(function(a,b){
                if(a.puntuacion >b.puntuacion ){
                    return -1
                }
                if(a.puntuacion < b.puntuacion){
                    return 1
                }
                return 0
            })

            return {
                ...state,
                recipes: sortY 
            }
    
        case "FILTRO_DIETA":
            let filDiets = state.filtradoDieta;
            // console.log(filDiets, "antes")
            filDiets = filDiets.filter((d) => {
                
                if(d.diets.includes(action.payload)){
                    
                    return d
                }
            
            });
            
            return {
                ...state,
                recipes: action.payload === "all" ? state.filtradoDieta : filDiets,
            };

        case "GET_RECIPES_NAME":
            return {
                ...state,
                recipes: action.payload
            }


        case "DIETS":
                return {
                    ...state,
                    diets: action.payload
                }
    
        case "POST_RECIPE":
                return {
                    ...state
                }    
        
        case "GET_DETAIL":
            return{
                ...state,
                details: action.payload
            }        

    default:
        return state;

    }


}



export default rootReducer;