import React from 'react';
import Select from 'react-select';

// graphql

import { gql, useQuery}  from '@apollo/client';


const OBTENER_PRODUCTOS = gql `
query obetenerProducots {
  obtenerProducots{
    nombre
    id
    existencia
    creado
    precio
  }
}
`;


 const AsignarPedidos = () => {


    const { data, loading, error } = useQuery(  OBTENER_PRODUCTOS );
    
    if( !data ) return null;


    const { obtenerProducots } = data;


    const seleccionarProducto = (producto) => {
        console.log(producto)
    }
    


    return (
        <>
            <p className="mt-2 pl-3  my-2 bg-white border-l-4 bg-white border-gray-800 text-gray-900 font-bold" > 2.- Selecciona y busca los productos </p>
                <Select
                    className="mt-3 "
                   options={ obtenerProducots  }
                    isMulti={true}
                    onChange={(option) => seleccionarProducto(option) }
                    getOptionValue={ (opciones) => opciones.id }
                    getOptionLabel={ opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles` }
                    placeholder="Selecciona el producto"
                    noOptionsMessage={ ()=> "No hay productos aun" }
                    />

        </>
    )
}



export default AsignarPedidos;
