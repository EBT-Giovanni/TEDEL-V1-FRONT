import React from 'react';
import OrdenGastosPorOperador from '../components/evidenciasOperador/OrdenGastosPorOperador'

const VistaViaticosOperador = () => {

    return (

        <div>

            <h3 className='mb-4 text-center'>Entregas</h3>

            {/* TARJETAS PARA MOSTRAR ORDENES */}

            <OrdenGastosPorOperador/>

        </div>

    )

}

export default VistaViaticosOperador