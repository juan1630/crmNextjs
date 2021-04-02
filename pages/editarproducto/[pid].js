import React from 'react';
import Layout from '../../components/Layout';
import { Formik  } from 'formik';
import * as Yup from 'yup';
import {  gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';


const OBTENER_PRODUCTO = gql `
query obtenerProducto ( $id: ID!) {
    obtenerProducto( id: $id  ){
      nombre,
      existencia,
      precio
    }
  }
`;

const ACTUALIZAR_PRODUCTO = gql `
mutation actualizarProdcuto( $id: ID!, $input: ProductoInput ){
    actualizarProdcuto( id: $id, input: $input ){
  nombre,
  existencia,
  precio
}
}
`;

 const EditarProductos = () => {


    const router = useRouter();
    
    // SACAMOS EL ID DE LA URL 
    
    const { query: { pid } } = router;
    
    const { data, loading, error } = useQuery( OBTENER_PRODUCTO , {
        variables: {
            id: pid
        }
    });
    
    const [actualizarProdcuto] = useMutation(ACTUALIZAR_PRODUCTO)


    const actualizarProductoForm =  async valores  => {
        console.log( valores );
        const { nombre, existencia, precio  } = valores;

        try {   

         const { data, loading, error } =   await actualizarProdcuto( {
             variables: {
                 id: pid,
                 input: {
                     nombre,
                     existencia,
                     precio
                 }
             }
         } );

         Swal.fire('Se actualizo el prodcuto', '', 'success')
         router.push('/productos')
         


        } catch (error) {
            console.log( error )
        }
    }


    
    
    
    
    const schemaValidacion  =  Yup.object({
        nombre: Yup.string()
                .required('El nombre es obligatorio'),
        existencia: Yup.number('Debe de ser  un numero')
                .required('La existencia es requerido'),
        precio: Yup.number('Un numero valido')
                .required('El precio es requerido'),
        
        
    });
    
    
        if( loading ) return 'Cargando...';
    
           const { obtenerProducto } = data ;
    
    
    return (
        <div>
            <Layout>
                <h1 className="font-bold text-2xl"  > Editar producto </h1>
                    <div className="flex justify-center" >
                        <Formik
                        validationSchema={ schemaValidacion }
                        enableReinitialize
                        initialValues={ obtenerProducto }
                        onSubmit={ (valores) =>  {
                            actualizarProductoForm(valores)
                        } }
                        >
                            {props =>  {
                                  return (
                                    <form  className="bg-white shadow-md px-8 mt-4  mb-4 w-full"  onSubmit={ props.handleSubmit } >
                                    <div className="mb-4" >
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                                Nombre: 
                                        </label>
        
                                        <input  className="shadow apperance-none border mt-2 rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
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
        
        
                                    <div className="mb-4" >
                                            <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia" >
                                                Existencia
                                            </label>
                                            <input type="number" className="apperance-none shadow border rounded w-full px-3 py-2 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                                                placeholder="Agrega la existencia del producto"
                                                id="existencia"
                                                onBlur={ props.handleBlur }
                                                onChange={ props.handleChange }
                                                value={ props.values.existencia }
                                            />
                                    </div>
                                        
                                    { props.touched.existencia &&  props.errors.existencia  ? (
                                        <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                            <p className="font-bold"  > Error  </p>
                                        <p>  { props.errors.existencia} </p>
                                    </div>
                                ): null }
        
                                     
                                <div className="mb-4" >
                                    <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio" >
                                        Precio
                                    </label>
                                    <input type="number" className="apperance-none shadow border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                                        placeholder="Agrega el precio del producto"
                                        id="precio"
                                        onBlur={ props.handleBlur }
                                        onChange={ props.handleChange }
                                        value={ props.values.precio }

                                        
        
                                    />
                                </div>


                                { props.touched.precio &&  props.errors.precio  ? (
                                        <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                            <p className="font-bold"  > Error  </p>
                                        <p>  { props.errors.precio} </p>
                                    </div>
                                ): null }
        
        
                                    <input type="submit"
                                        className="bg-gray-800 mb-4 py-2 text-white w-full uppercase mt-2 font-bold hover:bg/gray-900"
                                        value="Editar Producto"
                                    />
        
                                </form>
                                  )
                              }
                            }
                        </Formik>
                       
                    </div>
            </Layout>
        </div>
    )
}



export default EditarProductos;