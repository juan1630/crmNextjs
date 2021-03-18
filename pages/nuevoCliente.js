import React from 'react'
import Layout from '../components/Layout';
const nuevoCliente = () => {
    return (
    

            <Layout  className="mt-4"  >
                <h1 className="text-2xl text-gray-800 font-light mb-3">    Nuevo cliente </h1>
                
            <div  className="flex justify-center mt-5" >
                <div  className="w-full max-w-lg"  >
                    <form  className="bg-white shadow-md px-8 mb-4"  >
                        <div  className="mb-4" >
                            <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre: 
                            </label>
                            <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                            id="nombre"
                            type="text"
                            placeholder="Nombre del cliente"
                            //    onBlur={ formik.handleBlur  }
                            //    onChange={ formik.handleChange }
                            //    value={ formik.values.nombre }
                            />
                        </div>
                        
                        {/* { formik.touched.nombre &&  formik.errors.nombre  ? (
                                <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                    <p className="font-bold"  > Error  </p>
                                <p>  { formik.errors.nombre} </p>
                            </div>
                        ): null } */}

                        <div  className="mb-4" >
                            <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="apellido">
                                    Apellido: 
                            </label>
                            <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                            id="apellido"
                            type="text"
                            placeholder="Apellido del cliente"
                            //    onBlur={ formik.handleBlur  }
                            //    onChange={ formik.handleChange }
                            //    value={ formik.values.apellido }
                            />
                        </div>
                        
                        {/* { formik.touched.apellido &&  formik.errors.apellido  ? (
                                <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                    <p className="font-bold"  > Error  </p>
                                <p>  { formik.errors.apellido} </p>
                            </div>
                        ): null } */}

                        <div  className="mb-4" >
                            <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="empresa">
                                    Empresa: 
                            </label>
                            <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                            id="empresa"
                            type="text"
                            placeholder="Empresa del cliente"
                            //    onBlur={ formik.handleBlur  }
                            //    onChange={ formik.handleChange }
                            //    value={ formik.values.empresa }
                            />
                        </div>
                        
                        {/* { formik.touched.empresa &&  formik.errors.empresa  ? (
                                <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                    <p className="font-bold"  > Error  </p>
                                <p>  { formik.errors.empresa} </p>
                            </div>
                        ): null } */}

                    <div  className="mb-4" >
                           <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="email">
                                Email: 
                           </label>
                           <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                           id="email"
                           type="email"
                           placeholder="Email Usuario"
                        //   onBlur={ formik.handleBlur  }
                        //    onChange={ formik.handleChange }
                         //   value={ formik.values.email }
                           />
                       </div>
                      
                        {/* { formik.touched.email &&  formik.errors.email  ? (
                                <div className="my-2 bg-red-200 text-black border-l-4  border-red-500 text-red-700 p-4"  >
                                    <p className="font-bold"  > Error  </p>
                                <p>  { formik.errors.email} </p>
                            </div>
                        ): null } */}

                        <input type="submit" 
                            className="bg-gray-800 w-full mt-5 text-white uppercase font-bold hove:bg/gray-900"
                            value="registrar cliente"
                        />
                    </form>
                </div>
            </div>

            </Layout>

    )
}


export default nuevoCliente