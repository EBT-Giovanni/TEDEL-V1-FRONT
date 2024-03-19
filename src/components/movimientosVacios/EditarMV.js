import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//ICONS
import {BiSave} from 'react-icons/bi';

function EditarMV(props) {

  const [token, setToken] = useState('');

  // ===============================================
  // SECCION PARA CARGAR LOS DESTINOS 
  // ===============================================

  const [rutas, setRutas] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/get/rutas/vacios`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", origen: "Seleccione Ruta", destino: '', clave: ''});
        
                setRutas(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

  // ===============================================
  // SECCION PARA CARGAR LOS ESTATUS 
  // ===============================================

  const [status, setStatus] = useState([]);

  useEffect(() => {

      setToken(Cookies.get('jwtoken'));
      
      axios.get(`${baseURL}api/estatusOrdenes`,{
      
          method: "GET",
          headers: {"access-token": token}
      
      })
      .then(result => {
  
          if(result.data.success == true)
          {
              let des = result.data.result;

              des.unshift({id: "", estatus: "Seleccione Estado"});
      
              setStatus(des);
          }
  
      })
      .catch(error => {
      
          console.log(error)
      
      })
  
  },[token]);
  
  // ===============================================
  // SEGMENTO PARA SUBMIT
  // ===============================================

  const urlEdit = `${baseURL}api/update/movimiento/vacio`;

  const handleSubmit = (event) => {

    event.preventDefault();

    const token = Cookies.get('jwtoken');

    let validar = true;

    Object.entries(props.data).forEach(entry => {

        const [key,value] = entry;

        if(value === "" || value === null){
          
          Swal.fire({
            icon: 'warning',
            title: 'No pueden ir campos vacios!',
          })

          validar = false;

          return;

        }

    });

    if(validar){

      axios.put(urlEdit, props.data,{

      headers: {
        "access-token": token
      } 
    
      })
      .then(result => {
  
        if(result.data.success === true)
        {
  
          Swal.fire({
            icon: 'success',
            title: 'Se ha editado correctamente!',
          }).then(() => {
  
            window.location.reload(false);
  
          })
  
        }
    
      })
      .catch(error => {
    
        console.log(error)
    
      })

    }

  }

  // ===============================================
  // MODAL PARA EDITAR MV
  // ===============================================

  return (

    <div>

      <div className="modal fade" id="modalEditarMV" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

        <div className="modal-dialog">

          <div className="modal-content">

            <form onSubmit={handleSubmit}>

              <div className="modal-header">

                <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>

                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

              </div>

              <div className="modal-body">

                <div className='row'>

                  {/* RUTA */}

                  <div className='col-12 mb-3'>

                    <span className="badge text-bg-secondary mb-2">Ruta:</span>

                    <select
                        key="origenRuta"
                        id="selectOrigenEditMV"
                        name="rel_ruta"
                        className="form-select"
                        onChange={props.onChange}>

                        {rutas.map((op) => (
                            <option key={op.id} value={op.id}>{`${op.origen} a ${op.destino}`}</option>
                        ))}
                        
                    </select>

                  </div>

                  {/* DESTINO */}

                  {/* <div className='col-12 mb-3'>

                      <span className="badge text-bg-secondary mb-2">Destino:</span>

                      <select
                          id="selectDestinoEditMV"
                          key="rutaEditMV"
                          name="rel_destino"
                          className="form-select"
                          onChange={props.onChange}>

                          {destinos.map((op) => (
                              <option key={op.id} value={op.id}>{op.ciudad}</option>
                          ))}
                          
                      </select>

                  </div> */}

                  {/* ESTATUS */}

                  <div className='col-12'>

                    <span className="badge text-bg-secondary mb-2">Estatus:</span>

                    <select
                        id="estadoSelectMV"
                        key="estadoMV"
                        name="estado"
                        className="form-select"
                        onChange={props.onChange}>

                      {status.map((op) => (
                          <option key={op.id} value={op.id}>{op.estatus}</option>
                      ))}
                        
                    </select>

                  </div>

                </div>

              </div>

              <div className="modal-footer">
                  
                <button type="submit" className='btn btn-primary float-end'><BiSave/> Guardar</button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  )
  
}

export default EditarMV