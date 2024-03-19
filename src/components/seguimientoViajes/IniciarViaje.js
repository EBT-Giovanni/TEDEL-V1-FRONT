import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { baseURL } from '../../config/config';
import Cookies from 'js-cookie';

const IniciarViaje = ({tiempos, idOrden, refresh}) => {

    // ===============================================
    // FUNCION PARA SUBMIT
    // ===============================================

    const handleSubmit = async () => {

        Swal.fire({
            title: 'Esta seguro de iniciar el viaje?',
            //text: "Esta accion no podra ser revertida!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, iniciar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
                const url = `${baseURL}api/create/despacho/tiempo`;

                // Obtener la fecha actual
                const date = new Date();
                
                // Formatear la fecha como YYYY-MM-DD
                const formattedDate = date.toISOString().slice(0, 10);
                
                // Formatear la hora como HH:MM:SS
                const formattedTime = date.toTimeString().slice(0, 8);

                let data = {...tiempos}

                data.fecha_inicio_transito = formattedDate;
                data.hora_inicio_transito = formattedTime;

                axios.post(url, data,{
        
                    headers: {
                        "access-token": Cookies.get('jwtoken')
                    } 
            
                })
                .then(result => {console.log(result)
            
                    if(result.data.success === true)
                    {

                        refresh(data.rel_despacho);
                
                    }
            
                })
                .catch(error => {
            
                    console.log(error)
            
                })
      
            }
            
        })

    }

    // ======================================

    return (

        <>
    
            <button 
                className='btn btn-primary mb-3'
                onClick={handleSubmit}
            >
                Iniciar Viaje
            </button>

        </>

    )

}

export default IniciarViaje