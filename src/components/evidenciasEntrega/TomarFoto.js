import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Swal from 'sweetalert2';
import {FiUpload} from 'react-icons/fi';
import axios from 'axios';
import { baseURL } from '../../config/config';
import Cookies from 'js-cookie';

const TomarFoto = ({idOrden, refresh}) => {

    const webcamRef = useRef(null);

    const [isCameraActive, setCameraActive] = useState(true);

    const [fotoEvidencia, setFotoEvidencia] = useState(null);

    // ===============================================
    // FUNCION PARA ACTIVAR LA CAMARA
    // ===============================================

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        // Hacer algo con la imagen, como mostrarla en un <img> o enviarla al servidor

        setFotoEvidencia(imageSrc)

        setCameraActive(false);
    }, [webcamRef]);

    // ===============================================
    // FUNCION PARA TOMAR OTRA FOTO
    // ===============================================
      
    const reiniciarFoto = () => {

      setCameraActive(true);

      setFotoEvidencia(null);

    };

    // ===============================================
    // FUNCION PARA CONVERTIR LA IMAGEN
    // ===============================================

    const dataURItoBlob = (dataURI) => {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }

    // ===============================================
    // FUNCION PARA SUBMIT
    // ===============================================

    const handleSubmit = async () => {

      const token = Cookies.get('jwtoken');

      if(fotoEvidencia === null){

        Swal.fire({
          icon: 'warning',
          title: 'Tome una foto para continuar!',
        })

        return;

      }

      const url = baseURL+"api/crear/evidencia/entrega";

      const blob = await dataURItoBlob(fotoEvidencia);

      const formData = new FormData();

      formData.append('ruta', blob);
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

        <div>
          {isCameraActive && (
            <Webcam
              audio={false}
              ref={webcamRef}
              width='100%'
              height={200}
              screenshotFormat="image/jpeg"
            />
          )}
          {fotoEvidencia !== null ? <img src={fotoEvidencia} /> : null}
          {isCameraActive && 
            <div className="row justify-content-center align-items-center px-2">
              <button className='btn btn-secondary' onClick={capture}>
                Tomar foto
              </button>
            </div>
          }
          {
            isCameraActive === false ?
            <div className="row justify-content-center align-items-center mt-2 p-2">
              <button className='btn btn-secondary' onClick={reiniciarFoto}>
                Tomar otra foto
              </button>
            </div>
            :
            null
          }

          <div className='d-flex justify-content-center'>
            <button type="button" className="btn btn-primary mt-2" onClick={handleSubmit}><FiUpload/> Subir Evidencia</button>
          </div>
          
        </div>

    )

}

export default TomarFoto