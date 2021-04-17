import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';


import { SELECCIONAR_PEDIDO, SELECCIONAR_CLIENTE, CANTIDAD_PRODUCTOS } from '../types';




 const PedidoState = ({children}) => {

    // state inicial de los pedidos 

    const initialState = {
        cliente: {},
        productos:[],
        total: 0
    }
                    
    // agregar una funcion  que modifica el state del cliente estarà

    const agregaCliente =  cliente => {
        // console.log(cliente)
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente

        })
        // se manda a llamar el pedido reeducer 
    }
    
    // el use reducer necesita la funcion que modifica el state y el valor inicial

    const [ state, dispatch  ] = useReducer(  PedidoReducer, initialState);

    return (
        <PedidoContext.Provider 
                value={{ 
                    agregaCliente
                }} >
                    { children }
        </PedidoContext.Provider>
    )
}

// el provider es de donde salen los datos
export default PedidoState;


