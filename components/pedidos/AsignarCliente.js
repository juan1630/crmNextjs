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
    
        <Select
            options={clientes}
            isMulti={true}
            onChange={(option) => seleccionarCliente(option) }
            getOptionValue={ (opciones) => opciones.id }
            getOptionLabel={ opciones => opciones.label }
            placeholder="Selecciones el cliente"
            noOptionsMessage={ ()=> "No hay clientes" }
    />


     );
}
 
export default AsignarCliente;