import React from 'react';
import Layout  from '../components/Layout';
import { useFormik  } from 'formik'
import  * as Yup from 'yup';  
import  { useMutation, gql  } from '@apollo/client';


// const  QUERY = gql `
// query obtenerProdudctos {
//     obtenerProducots{
//       id
//       nombre
//       precio
//       existencia
//     }
//   }
//   `;


const NUEVA_CUENTA = gql `
mutation nuevoUsuario( $input : UsuarioInput ){
    nuevoUsuario(input: $input){
      id
      name
      email
      lastName
    }
  }`

const NuevaCuenta = () => {
    
    //obtener productos del graphql 

    // data es como se accede a la info
    // const { data, loading, error } = useQuery(QUERY)

    // console.log(data );
    // console.log( loading );
    // console.log( error ); 
    // // validacion del formulario 


    // mutation para crear nuevos usuarios 
    
    const [ nuevoUsuario ] = useMutation( NUEVA_CUENTA );

    const formik = useFormik({
        // valores inidciales del formulario
        // el handlechnage nos permite sobreescribir los valores 
        // del formulario
        initialValues: {
            nombre:'',
            apellido : '',
            email:'',
            password:''
        },
        // yup por defecto previene el submit
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            apellido: Yup.string().required('El apellido es obligatorio'),
            email: Yup.string()
                    .email('El email es obligatorio')
                    .required('El email es obligatorio'),
            password: Yup.string()
                    .required('La contraseña es obligatoria')
                    .min(6,'La contraseña debe de ser almenos de 6 caracteres')
        }),
        onSubmit: async valores => {
            console.log( valores );
            const { nombre, apellido , email, password } =  valores;
            try {
             const  {data } = await  nuevoUsuario({
                      variables : {
                          input: {
                           name: nombre,
                           lastName : apellido,
                            email,
                            password
                          }
                      }
                  });
                  console.log( data);
            } catch (error) {
                console.log( error ); 
            } 
        }
    });
    
    console.log(  formik );

    return (  
        <>
        <Layout>
            <h1 className="text-center text-2xl text-white font-light"> Crear nueva cuenta  </h1>
            <div className="flex justify-center mt-5" >
                <div className="w-full max-w-sm" >


                    <form 
                        onSubmit={ formik.handleSubmit }
                    className="bg-white rounded shadow-md px-8 pb-6 pt-6 mb-4" >

                    <div  className="mb-4" >
                           <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="nombre">
                                Nombre: 
                           </label>
                           <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                           id="nombre"
                           type="nombre"
                           placeholder="Nombre del usuario"
                           value={ formik.values.nombre }
                           onChange={ formik.handleChange }
                           onBlur={ formik.handleBlur }
                           />

                       </div>
                        
                        { formik.touched.nombre && formik.errors.nombre  ? (
                            <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                <p className="font-bold"  > Error  </p>
                                <p>  { formik.errors.nombre} </p>
                            </div>
                        ) : null  }

                       <div  className="mb-4" >
                           <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="apellido">
                                Apellido: 
                           </label>

                           <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                           id="apellido"
                           type="apellido"
                           placeholder="Apellido del usuario"
                           value={ formik.values.apellido }
                           onChange={ formik.handleChange }
                           onBlur={ formik.handleBlur }
                           />
                       </div>
                            {
                                formik.touched.apellido && formik.errors.apellido ? (
                                    <div className="my-2 bg-red-200 text-black border-l-4 border-red-500 text-red-700 p-4"  >
                                        <p className="font-bold" >  Error  </p>
                                        <p> { formik.errors.apellido }  </p>
                                    </div>
                                ): null

                            }

                       <div  className="mb-4" >
                           <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="email">
                                Email: 
                           </label>
                           <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                           id="email"
                           type="email"
                           placeholder="Email Usuario"
                           value={ formik.values.email }
                           onChange={formik.handleChange}
                           onBlur={  formik.handleBlur }

                           />
                       </div>

                            {
                                formik.touched.email && formik.errors.email ? (
                                    <div className="my-2 bg-red-200 text-black border-l-4 border-red-500 text-red-700 p-4"  >
                                        <p className="font-bold" > Error  </p>
                                        <p className="" > { formik.errors.email } </p>
                                    </div>
                                ): null 
                            }
                       <div>
                           <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="password">
                                Password: 
                           </label>
                           <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                           id="password"
                           type="password"
                           placeholder="Password Usuario"
                           value={  formik.values.password }
                           onChange={ formik.handleChange}
                           onBlur= {formik.handleBlur}

                           />
                       </div>
                            { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-200 text-black border-l-4 border-red-500 text-red-700 p-4" > 
                                    <p className="font-bold" > Error  </p>
                                    <p> { formik.errors.password  } </p>
                                </div>
                            ) : null  
                            }
                            <input 
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                value="Crear cuenta"
                            />


                    </form>
                </div>
            </div>
        </Layout>
        {/* formik nos ayuda en leer los datos del formulario y yup nos da un schema de la validacion */}

        </>
   );
}
 
export default NuevaCuenta;