import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik} from 'formik';
import * as Yup from 'yup';
import {  gql, useMutation} from '@apollo/client';
import { useRouter } from 'next/router';

const AUTENTICAR_USUARIO = gql  `
mutation autenticarUsuario (  $input: AutenticarInput ){
    autenticarUsuario( input : $input ) {
      token
    }
  }
  `

const Login = () => {

    // mutsation para el login 
    const [autenticarUsuario  ] = useMutation( AUTENTICAR_USUARIO );

    // rputin
    const router = useRouter();
    // mesaje 
    const [ mensaje, guardarMensaje] = useState(null)

    const formik = useFormik({
        // valores iniciales 
        initialValues: {
            email: '',
            password:''
        },
        validationSchema:Yup.object({
            email: Yup.string()
                    .email('El email no es valido')
                    .required('Él email es requerido'),
            password: Yup.string()
                            .required('La contraseña es requerida')
        }),
        onSubmit: async valores => {

            const { email, password } = valores;

            try {
                
                const { data } = await autenticarUsuario({

                    variables: { 
                        input: {
                            email,
                            password
                        }
                    }
                });


                // console.log(data);
                guardarMensaje('Autenticando...');

                // guardar en el localstorage 

                const { token } = data.autenticarUsuario;
                localStorage.setItem('token', token);

                setTimeout( ()=> {
                    guardarMensaje(null);
                    router.push('/');
                }, 1500 )

                //redireccionarl a clientes


            } catch (error) {
                guardarMensaje(error.message.replace('GraphQL error:', '') )
                // console.log( error );
                setTimeout( ()=> {
                    guardarMensaje(null)
                }, 2500 )
            }

        }

        // fin del formik
    })

    const mostrarMensaje = (  ) => {
        return ( 
            <div className="bg-white py-2 px-2 font-light text-center max-w-sm mx-auto"  >
                <p> { mensaje } </p>
            </div>
        )
    }

    return (  
        <>
        <Layout>
            { mensaje && mostrarMensaje() }
            <h1 className="text-center text-2xl text-white font-light"> Login </h1>
            <div className="flex justify-center mt-5" >
                <div className="w-full max-w-sm" >
                    <form  
                    className="bg-white rounded shadow-md px-8 pb-6 pt-6 mb-4"
                    onSubmit={ formik.handleSubmit }
                    >

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

                       <div>
                           <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="password">
                                Password: 
                           </label>
                           <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                           id="password"
                           type="password"
                           placeholder="Password Usuario"
                           onBlur={ formik.handleBlur }
                           onChange={ formik.handleChange  }
                           value={ formik.values.password }
                           />
                       </div>

                       { formik.touched.password &&  formik.errors.password  ? (
                            <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                <p className="font-bold"  > Error  </p>
                            <p>  { formik.errors.password} </p>
                        </div>
                       ): null }

                            <input 
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            />


                    </form>
                </div>
            </div>
        </Layout>
        </>
    );
}
 
export default Login;