import React from 'react'

import TarjetasMV from '../components/entregasOp/TarjetasMV';

const Entregas = () => {
    
    //===============================================================================

    return (

        <div>

            <h3 className='mb-4 text-center'>Entregas</h3>

            {/* TARJETAS PARA MOSTRAR MOVIMIENTOS VACIOS */}

            <TarjetasMV/>

        </div>

    );

}

export default Entregas;
