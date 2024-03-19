import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENTES
import Tabla from '../components/Tabla';

//ICONOS
import {CgAdd} from 'react-icons/cg';
import ModalCrearProforma from '../components/proforma/modales/ModalCrearProforma';
import TablaVistaProforma from '../components/proforma/TablaVistaProforma';
import TablaVistaProformasAbiertas from '../components/proforma/TablaVistaProformasAbiertas';

const ProformaCreate = () => {

    const [token, setToken] = useState('');

    // ===============================================
    // FORM VALUE PARA FORMULARIO
    // ===============================================

    const [formValues, setFormValues] = useState({

        rel_orden: "", 
        cliente: "", 
        origen_razon_social: "",
        origen_rfc: "",
        origen_direccion: "",
        destino_razon_social: "",
        destino_rfc: "",
        destino_direccion: "",
        distancia_recorrida: "",
        flete_internacional: "",
        pais_de_carga: "",
        entrada_salida: "",
        tractor_placas: "",
        tractor_anio: "",
        tractor_aseguradora: "",
        tractor_no_economico: "",
        tractor_permiso_sct: "",
        caja_numero: "",
        caja_placas: "",
        caja_tipo: "",
        operador_nombre: "",
        operador_rfc: "",
        operador_curp: "",
        operador_licencia: "",
        operador_direccion: "",
        mercancia_tipo: "",
        mercancia_peso: "",
        mercancia_cantidad: "",
        mercancia_fraccion_arancelaria: "",

    });

    // ===============================================
    // SEGMENTO PARA TRAER ORDENES PENDIENTES
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        buscarPendientes();
    
    },[token])

    // FUNCION PARA BUSCAR DATOS DE ORDENES PARA ASIGNAR PROFORMAS PENDIENTES

    const buscarPendientes = async () => {

        setToken(Cookies.get('jwtoken'));

        const config = {

            headers: {
                "access-token": token
            },
    
        };

        const response = await axios.get(`${baseURL}api/get/view/proformas`, config);
    
        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result);

        }else{

            setData([]);

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA
    // ===============================================

    const columns = [

        {
            name: 'Num. Orden',
            selector: row => row.orden,
            sortable: true,
        },
        {
            name: 'Cliente',
            selector: row => row.cliente,
            sortable: true
        },
        {
            name: 'Tractor',
            selector: row => row.tractor,
            sortable: true,
        },
        {
            name: 'Chofer',
            selector: row => row.chofer,
            sortable: true,
        },
        {
            name: 'Caja',
            selector: row => row.caja,
            sortable: true,
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                  <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#modalCrearProforma" onClick={() => handleSelect(row.orden)}><CgAdd/></button>
                </div>
             
            ),
            
        },

    ];

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

        const response = await axios.get(`${baseURL}api/get/datos/proformas/${id}`, config);

        console.log(response.data.result);
    
        if(response.data.success === true && response.data.result !== "Sin resultados"){

            let temp = response.data.result[0];

            temp["flete_internacional"] = "";
            temp["entrada_salida"] = "";
            temp["pais_de_carga"] = "";
            temp["mercancia_cantidad"] = "";
            temp["mercancia_fraccion_arancelaria"] = "";

            setFormValues(temp);

        }

    }

    // ===============================================
    // FUNCION PARA ACTUALIZAR EL FORMULARIO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormValues({ ...formValues, [name]: val})

    }

    // ===============================================
    // RETURN
    // ===============================================

    return (

        <div>

            <h3 className='mb-4'>Proformas</h3>

            <ul className="nav nav-tabs nav-justified mt-4" id="myTabClientes" role="tablist">

                <li className="nav-item" role="presentation">

                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#tabProformaPendientes" type="button" role="tab" aria-controls="home" aria-selected="true"><p className="h5">Crear Proforma</p></button>

                </li>

                <li className="nav-item" role="presentation">

                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#tabProformasAbiertas" type="button" role="tab" aria-controls="profile" aria-selected="false"><p className="h5">Abiertas</p></button>

                </li>

                <li className="nav-item" role="presentation">

                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#tabProformasCerradas" type="button" role="tab" aria-controls="profile" aria-selected="false"><p className="h5">Cerradas</p></button>

                </li>

            </ul>

            <div className="tab-content" id="myTabContentClientes">

                {/* ORDENES PENDIENTES POR CREAR PROFORMA */}

                <div className="tab-pane fade show active" id="tabProformaPendientes" role="tabpanel" aria-labelledby="home-tab">

                    <div className='mt-4'>
                        <Tabla columns = {columns} data = {data}/>
                    </div>

                </div>

                {/* PROFORMAS ABIERTAS */}

                <div className="tab-pane fade" id="tabProformasAbiertas" role="tabpanel" aria-labelledby="profile-tab">

                    <div className='mt-4'>
                        <TablaVistaProformasAbiertas/>
                    </div>

                </div>

                {/* PROFORMAS CERRADAS */}

                <div className="tab-pane fade" id="tabProformasCerradas" role="tabpanel" aria-labelledby="profile-tab">

                    <div className='mt-4'>
                        <TablaVistaProforma/>
                    </div>

                </div>

            </div>

            {/* MODAL PARA CREAR PROFORMA */}

            <ModalCrearProforma data={formValues} onChange={handleChange} refresh={buscarPendientes}/>

        </div>

    )

}

export default ProformaCreate