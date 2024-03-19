import React, { useState, useEffect } from 'react';
import { baseURL } from '../config/config';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tabla from '../components/Tabla';
import {CgAdd} from 'react-icons/cg';
import ModalCrearProformaLogistica from '../components/proformaLogistica/modales/ModalCrearProforma';
import TablaVistaProformasLogisticaAbiertas from '../components/proformaLogistica/TablaVistaProformasLogisticaAbiertas';

function ProformaLogisticaCreate() {
  //Token
  const [token, setToken] = useState('');

  //valores
  const [formValues, setFormValues] = useState({

    rel_orden: "",
    cerrado: "",
    remolque_num: "",
    remolque_tipo: "",
    remolque_placa: "",
    tractor_placa: "",
    tractor_anio: "",
    tractor_aseguradora: "",
    tractor_num_economico: "",
    tractor_SCT: "",
    operador_nombre: "",
    operador_rfc: "",
    operador_licencia: "",
    operador_direccion: "",
    operador_curp: "",
    fecha: "",
    folio: "",
    cliente_nombre: "",
    cliente_direccion: "",
    cliente_rfc: "",
    cliente_domfiscal: "",
    cliente_regimenfiscal: "",
    proveedor_nombre: "",
  });
  

  // ===============================================
  // COLUMNAS PARA LA TABLA DE CAJAS
  // ===============================================

  const columns = [

    {
        name: 'Orden',
        selector: row => row.orden,
        sortable: true
    },
    {
        name: 'Caja',
        selector: row => row.caja,
        sortable: true
    },
    {
        name: 'Proveedor',
        selector: row => row.proveedor,
        sortable: true
    },
    {
        name: 'Cliente',
        selector: row => row.cliente,
        sortable: true
    },
    {
        name: "",
        button: true,
        cell: (row) => (
          
            <div className="input-group">
              <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#modalCrearProformaLogistica"  onClick={() => handleSelect(row.orden)}><CgAdd/></button>
            </div>
          
        ),
    },

  ];

  // ===============================================
  // DATOS PARA LA TABLA
  // ===============================================

  const [data, setData] = useState([]);

  useEffect(() => {

      setToken(Cookies.get('jwtoken'));

      buscarPendientes()

  }, [token]);

// FUNCION PARA BUSCAR DATOS DE ORDENES PARA ASIGNAR PROFORMAS PENDIENTES

const buscarPendientes = async () => {

  setToken(Cookies.get('jwtoken'));

  const config = {

      headers: {
          "access-token": token
      },

  };

  const response = await axios.get(`${baseURL}api/ordenes/proformaLogistica`, config);

  if(response.data.success === true && response.data.result !== "Sin resultados"){

      setData(response.data.result);

  }else{

      setData([]);

  }

}
  // ===============================================
    // FUNCION PARA BUSCAR DATOS DE LA ORDEN
    // ===============================================

    const handleSelect = async (id) => {
      setToken(Cookies.get('jwtoken'));

      const config = {

          headers: {
              "access-token": token
          },
  
      };

      const response = await axios.get(`${baseURL}api/get/datos/proformasLogisticas/${id}`, config);

      console.log(response.data.result);
  
      if(response.data.success === true && response.data.result !== "Sin resultados"){

          let temp = response.data.result[0];

          temp["tractor_placa"] = "";
          temp["tractor_anio"] = "";
          temp["tractor_aseguradora"] = "";
          temp["tractor_num_economico"] = "";
          temp["tractor_SCT"] = "";
          temp["operador_nombre"] = "";
          temp["operador_curp"] = "";
          temp["operador_rfc"] = "";
          temp["operador_licencia"] = "";
          temp["operador_direccion"] = "";

          setFormValues(temp);

      }

  }

  const handleChange = (event) => {

    const val = event.target.value;
    const name = event.target.name;

    setFormValues({ ...formValues, [name]: val });

  }

  return (
    <div>
            
      <h3 className='mb-4'>Proforma</h3>

      <ul className="nav nav-tabs nav-justified mt-4" id="myTabProformaLogistica" role="tablist">

        <li className="nav-item" role="presentation">

            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#tabProformaLogisticaPendientes" type="button" role="tab" aria-controls="home" aria-selected="true"><p className="h5">Crear Proforma</p></button>

        </li>

        <li className="nav-item" role="presentation">

            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#tabProformaLogisticaAbiertas" type="button" role="tab" aria-controls="profile" aria-selected="false"><p className="h5">Abiertas</p></button>

        </li>

        <li className="nav-item" role="presentation">

            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#tabProformaLogisticaCerradas" type="button" role="tab" aria-controls="profile" aria-selected="false"><p className="h5">Cerradas</p></button>

        </li>

      </ul>

      <div className="tab-content" id="myTabContentClientes">

        {/* ORDENES PENDIENTES POR CREAR PROFORMA */}

        <div className="tab-pane fade show active" id="tabProformaLogisticaPendientes" role="tabpanel" aria-labelledby="home-tab">

            <div className='mt-4'>
                <Tabla columns = {columns} data = {data}/>
            </div>

        </div>

        {/* PROFORMAS ABIERTAS */}

        <div className="tab-pane fade" id="tabProformaLogisticaAbiertas" role="tabpanel" aria-labelledby="profile-tab">

            <div className='mt-4'>
                <TablaVistaProformasLogisticaAbiertas/>
            </div>

        </div>

        {/* PROFORMAS CERRADAS */}

        <div className="tab-pane fade" id="tabProformaLogisticaCerradas" role="tabpanel" aria-labelledby="profile-tab">

            <div className='mt-4'>
               {/*  <TablaVistaProforma/> */}
            </div>

        </div>

      </div>

      {/* MODAL PARA CREAR PROFORMA */}

      <ModalCrearProformaLogistica 
        data={formValues} 
        onChange={handleChange} 
        refresh={buscarPendientes}
      />

    </div>
  )
}

export default ProformaLogisticaCreate