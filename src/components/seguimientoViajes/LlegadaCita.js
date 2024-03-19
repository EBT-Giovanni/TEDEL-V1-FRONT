import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { baseURL } from '../../config/config';
import Cookies from 'js-cookie';

const LlegadaCita = ({tiempos, idOrden, refresh}) => {

    // ===============================================
    // FUNCION PARA FORMATEAR LA FECHA
    // ===============================================

    const formatoFecha = (date) => {

        // Crear un objeto Date a partir de la cadena original
        const fecha = new Date(date);

        // Extraer año, mes y día
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // El mes es 0-indexed, así que se suma 1
        const día = String(fecha.getDate()).padStart(2, '0');

        // Formatear la fecha en 'yyyy-mm-dd'
        const fechaFormateada = `${año}-${mes}-${día}`;

        return fechaFormateada;

    }

    // ===============================================
    // FUNCION PARA SUBMIT
    // ===============================================

    const handleSubmit =  () => {

        Swal.fire({
            title: 'Esta seguro de marcar llegada?',
            //text: "Esta accion no podra ser revertida!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, marcar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
                const url = `${baseURL}api/update/despacho/tiempo`;

                // Obtener la fecha actual
                const date = new Date();
                
                // Formatear la fecha como YYYY-MM-DD
                const formattedDate = date.toISOString().slice(0, 10);
                
                // Formatear la hora como HH:MM:SS
                const formattedTime = date.toTimeString().slice(0, 8);

                let data = {...tiempos}

                // FORMATEAR FECHA DE SALIDA

                data.fecha_inicio_transito = formatoFecha(data.fecha_inicio_transito);

                // FECHA DE LLEGADA

                data.fecha_llegada_cliente = formattedDate;
                data.hora_llegada_cliente = formattedTime;console.log(data)

                axios.put(url, data,{
        
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

    return (

        <>
    
            <button 
                className='btn btn-primary mb-3'
                onClick={handleSubmit}
            >
                Llegue a Cita
            </button>

        </>
        
    )

}

export default LlegadaCita
