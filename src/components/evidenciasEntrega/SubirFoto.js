import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import {FiUpload} from 'react-icons/fi';

const SubirFoto = ({idOrden, refresh}) => {

    // ===============================================
    // FUNCION PARA ACTUALIZAR VALOR DEL USESTATE
    // ===============================================

    const [file, setFile] = useState(null);

    const handleChange = (event) => {

        const selectedFile = event.target.files[0];

        setFile(selectedFile);

    }

    // ===============================================
    // FUNCION PARA SUBMIT
    // ===============================================

    const handleSubmit = () => {

        const token = Cookies.get('jwtoken');

        if(file === null){

            Swal.fire({
                icon: 'warning',
                title: 'Seleccione una foto para continuar!',
            })
      
            return;

        }
        
        const url = baseURL+"api/crear/evidencia/entrega";

        const formData = new FormData();

        formData.append('ruta', file);
        formData.append('rel_orden', idOrden);

        axios.post(url, formData,{
    
            headers: {
            'Content-Type': 'multipart/form-data',
            "access-token": token
            } 
        
        })
        .then(result => {
        
            if(result.data.success === true)
            {
    
            Swal.fire({
                icon: 'success',
                title: 'Se ha guardado la evidencia!',
            }).then(() => {
    
                refresh(idOrden);
                document.getElementById('cerrarModalEvidenciaEntrega2').click();
    
            })
    
            }
        
        })
        .catch(error => {
        
            console.log(error)
        
        })

    }

    return (
        
        <div className='row'>

            {/* ARCHIVO */}

            <div className='col-12'>

                <span className="badge text-bg-secondary mb-2">Seleccionar Foto:</span>

                <input
                    className='form-control'
                    type="file"
                    name="ruta"
                    onChange={handleChange}
                />

            </div>

            <div className='col-12 d-flex justify-content-center mt-2'>
                <button type="button" className="btn btn-primary mt-2" onClick={handleSubmit}><FiUpload/> Subir Evidencia</button>
            </div>

        </div>

    )

}

export default SubirFoto