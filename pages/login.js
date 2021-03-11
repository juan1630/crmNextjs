import React from 'react';
import Layout from '../components/Layout';

const Login = () => {
    return (  
        <>
        <Layout>
            <h1 className="text-center text-2xl text-white font-light"> Login </h1>
            <div className="flex justify-center mt-5" >
                <div className="w-full max-w-sm" >
                    <form  className="bg-white rounded shadow-md px-8 pb-6 pt-6 mb-4" >
                       <div  className="mb-4" >
                           <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="email">
                                Email: 
                           </label>
                           <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                           id="email"
                           type="email"
                           placeholder="Email Usuario"
                           />
                       </div>

                       <div>
                           <label className="block text-gray-700text-sm font-bold mb-2" htmlFor="password">
                                Password: 
                           </label>
                           <input  className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-thing focus:outline-none focus:shadown-outline "
                           id="password"
                           type="password"
                           placeholder="Password Usuario"
                           />
                       </div>

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