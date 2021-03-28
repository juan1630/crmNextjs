import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router'



const AGREGAR_PRODUCTO = gql `
mutation  nuevoProducto ($input: ProductoInput ){
        nuevoProducto ( input: $input ){
            nombre,
            existencia,
            precio
        }
   }
`;


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

 const nuevoProducto = () => {

    const router = useRouter();
    const [ mensaje, setMensaje ] = useState(null);

    const [ nuevoProducto ] = useMutation( AGREGAR_PRODUCTO , {
        update( cache,  { data: {nuevoProducto} } ){

            const { obetenerProducots } = cache.readQuery({ query: OBTENER_PRODUCTOS} )

            cache.writeQuery( {
                query: OBTENER_PRODUCTOS,
                data: {  obetenerProducots : [ ... obetenerProducots, nuevoProducto] }
            } )
        }
    } );
    

    const formik = useFormik({
        initialValues: {
            nombre:"",
            existencia:"",
            precio:""
        },
        validationSchema : Yup.object({
            nombre: Yup.string()
                .required('El nombre del producto es requerido'),
            existencia: Yup.number()
                .required('La existencia es requerida'),
            precio: Yup.number()
                .required('El precio es requerido')
        }),
        onSubmit: async valores => {
            
            // console.log( valores );

            try {
                const { nombre, existencia, precio } = valores;

                const { data }= await nuevoProducto ( {
                    variables: { 
                        input : {
                            nombre,
                            existencia,
                            precio
                        }
                    }
                });

                // console.log( data.nuevoProducto )
                if(data.nuevoProducto) {

                    router.push('/productos')
                }

            } catch (error) {

                setMensaje( error.message.replace("GraphQL error: ", "") );

                setTimeout( ()=> {
                    setMensaje(null)
                }, 2000 )
            }
        }
    })

    const mostrarMensaje = (mensaje) =>{

        return(
            <div>
                <p className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto" >
                    {mensaje}
                </p>
            </div>
        )
    }

    return (
        <div>
            <Layout>
            <h1  className="font-bold text-2xl" >
                Nuevo producto
            </h1>

            { mensaje && mostrarMensaje() }  
            <div  className="flex justify-center mt-5" >
                <div  className="w-full max-w-lg"  >
                    <form  onSubmit={ formik.handleSubmit }  className="bg-white shadow-md px-8 mb-4"  >
                    
                        <div  className="mb-4" >
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre: 
                            </label>
                            <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                            id="nombre"
                            type="text"
                            placeholder="Nombre del cliente"
                               onBlur={ formik.handleBlur  }
                               onChange={ formik.handleChange }
                               value={ formik.values.nombre }
                            />
                        </div>
                       
                        { formik.touched.nombre && formik.errors.nombre ? (
                             <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                             <p className="font-bold"  > Error  </p>
                                <p>  { formik.errors.nombre} </p>
                            </div>
                        ) : (null ) }

                        <div className="mb-4" >
                            <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia" >
                                Existencia
                            </label>
                            <input type="number" className="apperance-none shadow border rounded w-full py-2 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                                placeholder="Agrega la existencia del producto"
                                id="existencia"
                                onBlur={ formik.handleBlur }
                                onChange={ formik.handleChange }
                                value={ formik.values.existencia }
                            />
                        </div>

                        {
                            formik.touched.existencia && formik.errors.existencia ? (
                                <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                <p className="font-bold"  > Error  </p>
                                   <p>  { formik.errors.existencia} </p>
                               </div> 
                            ) : ( null)
                        }

                        
                        <div className="mb-4" >
                            <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio" >
                                Precio
                            </label>
                            <input type="number" className="apperance-none shadow border rounded w-full py-2 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                                placeholder="Agrega el precio del producto"
                                id="precio"
                                onBlur={ formik.handleBlur }
                                onChange={ formik.handleChange }
                                value={ formik.values.precio }

                            />
                        </div>

                            { formik.touched.precio && formik.errors.precio ? (
                                      <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                      <p className="font-bold"  > Error  </p>
                                         <p>  { formik.errors.existencia} </p>
                                     </div> 
                            ) : (null)}



                            <input type="submit"
                                className="bg-gray-800 text-white w-full uppercase mt-2 font-bold hover:bg/gray-900"
                                value="Agregar Producto"
                            />

                    </form>
                    
                </div>
            </div>
            </Layout>
           
        </div>
    )
}


export default nuevoProducto 