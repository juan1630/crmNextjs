import React, {useState, useEffect}  from 'react'
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';


const nuevopedido = () => {

   
    return (
        <div>
            <Layout>

                <h2 className="text-2xl text-gray-800 font-light " > Crear nuevo pedido </h2>

                    <AsignarCliente className="mt-2" />

            </Layout>
        </div>
    )
}


export default nuevopedido;