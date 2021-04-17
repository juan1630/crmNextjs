import React, {useState, useEffect} from 'react';
import Select from 'react-select';

const AsignarCliente = () => {
    
    const clientes = [
        { id:1, nombre:'Juan'},
        { id:2, nombre:'Jose'},
        { id:2, nombre:'Jose Juan'},
    ]


    const [cliente, setCliente] = useState([]);

    useEffect(() =>{
        console.log(cliente)
    }, [cliente])


    const seleccionarCliente  = cliente => {
        setCliente(cliente);
    }


    return ( 

        
        <>
        <p className="mt-2  my-2 bg-white border-l-4 border-gray-800" > 1.- Asigna un cliente al pedido</p>
        <Select
            className="mt-3 "
            options={clientes}
            isMulti={true}
            onChange={(option) => seleccionarCliente(option) }
            getOptionValue={ (opciones) => opciones.id }
            getOptionLabel={ opciones => opciones.label }
            placeholder="Selecciones el cliente"
            noOptionsMessage={ ()=> "No hay clientes" }
    />

    </>


     );
}
 
export default AsignarCliente;