
import { SELECCIONAR_PEDIDO, SELECCIONAR_CLIENTE, CANTIDAD_PRODUCTOS } from '../types';


//este archivo modifica el state de la aplicación

// el payload es la informacion que viene de afuera

export default (state, action  ) => {
    
    switch (action.type){

        case SELECCIONAR_CLIENTE :
            return {
                ...state,
                cliente: action.payload
            }

        default:
            return state;
    }
}

