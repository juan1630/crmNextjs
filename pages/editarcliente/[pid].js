import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

import { useQuery, gql, useMutation  } from '@apollo/client';

import {  Form, Formik } from 'formik'
import * as Yup from 'yup';
import Swal from 'sweetalert2';



const OBTENER_CLIENTE = gql  `
query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
        nombre
        email
        apellido
        telefono
        empresa
    }
}
`;

const ACTUALIZAR_CLIENTE = gql  `
mutation actualizarProdcuto( $id: ID!, $input: ProductoInput ){
  	actualizarProdcuto( id: $id, input: $input ){
    nombre,
    existencia,
    precio
  }
}
`;  


const EditarClientes = () => {

    //obtener el id de la url 

    const router = useRouter();
    const { query: { pid }} = router;

    console.log( pid );
    
    // consultar para obtener cliente 

    const {data, loading , error} = useQuery(OBTENER_CLIENTE, { 
        variables: {
            id: pid
        }
    } );

    // actualizar cliente

    const [ actualizarCliente ] = useMutation( ACTUALIZAR_CLIENTE );

    // modificar la info del cliente 

    const actualizaClienteInfo = async valores  => {

        const { nombre, apellido, empresa, email, telefono} = valores;


        try {
            const { data, loading, error } = await actualizarCliente({
                variables:{
                    id: pid,
                    input: {
                        nombre,
                        apellido,
                        email,
                        empresa,
                        telefono
                    }

                }


            })

            // console.log( data);
            // swal de exito

                Swal.fire('Actualizado','Se actualizo el cliente', 'success' );

            //redireccionar a los clientes

            router.push('/')


        } catch (error) {
            console.log( error )
        }

    }

    //schema de validacion


    const schemaValidacion  =  Yup.object({
        nombre: Yup.string()
            .required('El nombre es obligatorio'),
        apellido: Yup.string()
            .required('El apellido es requerido'),
        empresa: Yup.string()
            .required('La empresa es requerida'),
        email: Yup.string()
                .email('El email no es valido')
                .required('El email es requerido')

    });


    if(loading)  return 'Cargando...'

    const {obtenerCliente } = data;

    return (

        <Layout>
              <h1 className="text-2xl text-gray-800 font-light mb-3">    Editar cliente </h1>

              <div  className="flex justify-center mt-5" >
                <div  className="w-full max-w-lg mt-9"  >
                    <Formik 
                    
                    validationSchema={ schemaValidacion }
                    enableReinitialize
                    initialValues={ obtenerCliente }
                    onSubmit={ (valores ) => {
                        // console.log('enviando agregar cliente')
                        // console.log( valores );
                        actualizaClienteInfo( valores );
                    }}
                    
                    >
                      {  props => {
                        //  console.log( props );   
                         return(

                            <form 
                    
                            onSubmit={ props.handleSubmit }  
                            
                            className="bg-white shadow-md px-8 mb-4 py-8"  >
                                <div  className="mb-4" >
                                    <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="nombre">
                                            Nombre: 
                                    </label>
                                    <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre del cliente"
                                       onBlur={ props.handleBlur  }
                                       onChange={ props.handleChange }
                                       value={ props.values.nombre }
                                    />
                                </div>
                                
                                { props.touched.nombre &&  props.errors.nombre  ? (
                                        <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                            <p className="font-bold"  > Error  </p>
                                        <p>  { props.errors.nombre} </p>
                                    </div>
                                ): null }
        
                                <div  className="mb-4" >
                                    <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="apellido">
                                            Apellido: 
                                    </label>
                                    <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                                    id="apellido"
                                    type="text"
                                    placeholder="Apellido del cliente"
                                       onBlur={ props.handleBlur  }
                                       onChange={ props.handleChange }
                                       value={ props.values.apellido }
                                    />
                                </div>
                                
                                { props.touched.apellido &&  props.errors.apellido  ? (
                                        <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                            <p className="font-bold"  > Error  </p>
                                        <p>  { props.errors.apellido} </p>
                                    </div>
                                ): null }
        
                                <div  className="mb-4" >
                                    <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="empresa">
                                            Empresa: 
                                    </label>
                                    <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                                    id="empresa"
                                    type="text"
                                    placeholder="Empresa del cliente"
                                       onBlur={ props.handleBlur  }
                                       onChange={ props.handleChange }
                                       value={ props.values.empresa }
                                    />
                                </div>
                                
                                { props.touched.empresa &&  props.errors.empresa  ? (
                                        <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                            <p className="font-bold"  > Error  </p>
                                        <p>  { props.errors.empresa} </p>
                                    </div>
                                ): null }
        
                            <div  className="mb-4" >
                                   <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="email">
                                        Email: 
                                   </label>
                                   <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                                   id="email"
                                   type="email"
                                   placeholder="Email Usuario"
                                  onBlur={ props.handleBlur  }
                                   onChange={ props.handleChange }
                                   value={ props.values.email }
                                   />
                               </div>
                              
                                { props.touched.email &&  props.errors.email  ? (
                                        <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                            <p className="font-bold"  > Error  </p>
                                        <p>  { props.errors.email} </p>
                                    </div>
                                ): null }
        
        
                                
                            <div  className="mb-4" >
                                   <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="telefono">
                                        Telefono: 
                                   </label>
                                   <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                                   id="telefono"
                                   type="phone"
                                   placeholder="Email Usuario"
                                  onBlur={ props.handleBlur  }
                                   onChange={ props.handleChange }
                                   value={ props.values.telefono }
                                   />
                               </div>
                              
                         
        
                                <input type="submit" 
                                    className="bg-gray-800 w-full py-3  mt-2 text-white uppercase font-bold hove:bg/gray-900"
                                    value="Editar cliente"
                                />
                            </form>
                         ) 
                      } }   
                   
                    </Formik>
                   
                </div>
            </div>

        </Layout>
    )
}



export default EditarClientes;