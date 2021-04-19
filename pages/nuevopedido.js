import React, {useState, useEffect}  from 'react'
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarPedidos from '../components/pedidos/AsignarPedidos';


const nuevopedido = () => {

   
    return (
        <div>
            <Layout>

                <h2 className="text-2xl text-gray-800 font-light " > Crear nuevo pedido </h2>

                    <AsignarCliente className="mt-2" />

                    <AsignarPedidos className="mt-2" />

            </Layout>
        </div>
    )
}

// asignar pedidos en realidad es asignar productos 

export default nuevopedido;