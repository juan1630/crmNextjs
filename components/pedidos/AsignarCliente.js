import React, {useState, useEffect, useContext} from 'react';
import { gql, useQuery } from '@apollo/client'
import PedidoContext from '../../context/PedidoContext';

// select 
import Select from 'react-select';

const OBTENER_CLIENTES =  gql `
query obtenerClientesVendedor {
    obtenerClientesVendedor {
      nombre,
      apellido,
      empresa,
      email,
      id
    }
}
`;

const AsignarCliente = () => {
    
    
    const [cliente, setCliente] = useState([]);

    
    const  { data, loading } = useQuery( OBTENER_CLIENTES );


    // cuando se agrega un cliente al state 
    const pedidoContext = useContext(PedidoContext)
    const { agregaCliente  } = pedidoContext;


    
    
    // resultados de a consulta
    
    useEffect(() =>{
        // console.log(cliente)
        agregaCliente(cliente)
    }, [cliente])
    
    
    const seleccionarCliente  = cliente => {
        setCliente(cliente);
    }
    

    if( loading ) return null
    // de la data de la resuesta obtenemos los clientes 
    const {obtenerClientesVendedor} = data;

    return ( 

        
        <>
            <p className="mt-2 pl-3  my-2 bg-white border-l-4 bg-white border-gray-800 text-gray-900 font-bold" > 1.- Asigna un cliente al pedido</p>
                <Select
                    className="mt-3 "
                    options={obtenerClientesVendedor}
                    isMulti={true}
                    onChange={(option) => seleccionarCliente(option) }
                    getOptionValue={ (opciones) => opciones.id }
                    getOptionLabel={ opciones => opciones.nombre }
                    placeholder="Selecciones el cliente"
                    noOptionsMessage={ ()=> "No hay clientes" }
                    />

        </>


     );
}
 
export default AsignarCliente;