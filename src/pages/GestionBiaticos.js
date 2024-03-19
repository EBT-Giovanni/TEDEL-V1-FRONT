import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

// ICONS
import OrdenesAbiertas from '../components/gestionBiaticos/OrdenesAbiertas';
import OrdenesCerradas from '../components/gestionBiaticos/OrdenesCerradas';
import ReporteViaticos from '../components/gestionBiaticos/ReporteViaticos';
import ModalComprobanteViaticos from '../components/gestionBiaticos/ModalComprobanteViaticos';

const GestionBiaticos = () => {

    // ===============================================
    // SEGMENTO PARA TRAER ORDENES
    // ===============================================
    
    return (

        <div>

            <h3 className='mb-4'>Gestion De Viaticos</h3>

            <ReporteViaticos/>

            <ModalComprobanteViaticos/>

            <OrdenesAbiertas/>

        </div>

    )

}

export default GestionBiaticos