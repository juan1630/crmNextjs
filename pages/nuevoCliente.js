import React, { useState } from 'react'
import Layout from '../components/Layout';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const NUEVO_CLIENTE = gql `
    mutation nuevloCliente($input : ClienteInput){
        nuevoCliente(input: $input){
            id
            nombre
            apellido
            email
            telefono
        }
    }
`;

const OBTENER_CLIENTES_USUARIO = gql `
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

const nuevoCliente = () => {

    const router = useRouter();

    const [mensaje, guardarMensaje ] = useState(null);
    // de esta forma se leen los datos de manera mas optima

    const [nuevoCliente] = useMutation( NUEVO_CLIENTE, {
        update( cache, { data: {nuevoCliente} } ) {
            //obtenerclientesVendedor
            // obtener el objeto que queremos
            const { obtenerClientesVendedor  } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });

            //reescribimos el cahce, el cache nunca se debe de modificar
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: { obtenerClientesVendedor  : [ ... obtenerClientesVendedor, nuevoCliente] }
            })
        }
    } );

    const formik = useFormik({ 
        // se inicializa el hook de formik
        initialValues: {
            nombre:'',
            apellido:'',
            empresa:'',
            email:'',
            telefono:''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('El nombre es obligatorio'),
            apellido: Yup.string()
                .required('El apellido es requerido'),
            empresa: Yup.string()
                .required('La empresa es requerida'),
            email: Yup.string()
                    .email('El email no es valido')
                    .required('El email es requerido')
                    
            //terminan las validaciones
        
        }),
        onSubmit: async valores => {
            try {
                const { nombre, apellido, empresa, telefono, email } = valores;
                //llenamos los valores del input de los mutations
                const {data } = await nuevoCliente({
                    variables:{
                        input:{
                            nombre,
                            apellido,
                            email,
                            telefono,
                            empresa
                        }
                    }
                });

                console.log( data.nuevoCliente);
                if( data.nuevoCliente){
                    router.push('/');
                    // redireccionar hacia los clientes
                }

            } catch (error) {
                console.log(error);
                guardarMensaje( error.message.replace("GraphQL error: ", "")  );

                setTimeout(()=>{ 
                    guardarMensaje(null);
                }, 2000 )
            }
        }
    })


    const mostrarMensaje = () => {
        return(
            <div>
                <p className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto" >
                    {mensaje}
                </p>
            </div>
        )
    }


    return (
    

            <Layout  className="mt-4"  >
                <h1 className="text-2xl text-gray-800 font-light mb-3">    Nuevo cliente </h1>

              { mensaje && mostrarMensaje() }  
            <div  className="flex justify-center mt-5" >
                <div  className="w-full max-w-lg"  >
                    <form  onSubmit={ formik.handleSubmit }  className="bg-white shadow-md px-8 mb-4"  >
                        <div  className="mb-4" >
                            <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="nombre">
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
                        
                        { formik.touched.nombre &&  formik.errors.nombre  ? (
                                <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                    <p className="font-bold"  > Error  </p>
                                <p>  { formik.errors.nombre} </p>
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
                               onBlur={ formik.handleBlur  }
                               onChange={ formik.handleChange }
                               value={ formik.values.apellido }
                            />
                        </div>
                        
                        { formik.touched.apellido &&  formik.errors.apellido  ? (
                                <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                    <p className="font-bold"  > Error  </p>
                                <p>  { formik.errors.apellido} </p>
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
                               onBlur={ formik.handleBlur  }
                               onChange={ formik.handleChange }
                               value={ formik.values.empresa }
                            />
                        </div>
                        
                        { formik.touched.empresa &&  formik.errors.empresa  ? (
                                <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                    <p className="font-bold"  > Error  </p>
                                <p>  { formik.errors.empresa} </p>
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
                          onBlur={ formik.handleBlur  }
                           onChange={ formik.handleChange }
                           value={ formik.values.email }
                           />
                       </div>
                      
                        { formik.touched.email &&  formik.errors.email  ? (
                                <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                    <p className="font-bold"  > Error  </p>
                                <p>  { formik.errors.email} </p>
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
                          onBlur={ formik.handleBlur  }
                           onChange={ formik.handleChange }
                           value={ formik.values.telefono }
                           />
                       </div>
                      
                 

                        <input type="submit" 
                            className="bg-gray-800 w-full mt-2 text-white uppercase font-bold hove:bg/gray-900"
                            value="registrar cliente"
                        />
                    </form>
                </div>
            </div>

            </Layout>

    )
}


export default nuevoCliente