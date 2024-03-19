import React, {useState, useEffect} from 'react'
import ExportarOrdenes from '../ExportarOrdenes';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '../../config/config';
import Tabla from '../Tabla';
import TarifaKmView from './TarifaKmView';
import ExportarOrdenesPlantas from '../ExportarOrdenesPlantas';

// ICONOS




const MainDashboardView = () => {

    const [token, setToken] = useState('');

    // ===============================================
    // DATOS PARA LA TABLA
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {
  
        setToken(Cookies.get('jwtoken'));
      
        axios.get(`${baseURL}api/view/dashboard`,{
      
          method: "GET",
          headers: {"access-token": token}
      
        })
        .then(result => {
    
          if(result.data.success === true && result.data.result !== "Sin resultados")
          {
  
            setData(result.data.result);
  
          }else{
  
            setData([]);
  
          }
    
        })
        .catch(error => {
      
          console.log(error)
      
        })
    
    },[token]);

        // ===============================================
    // COLUMNAS PARA LA TABLA
    // =============================================== 

    const colums = [

        {
        name: 'Estado',
        selector: row => row.estatus,
        sortable: true,
        },
        {
        name: 'Num. Orden',
        selector: row => row.orden,
        sortable: true,
        },
        {
        name: 'Tipo Orden',
        selector: row => row.tipo_orden,
        sortable: true
        },
        {
        name: 'Cliente',
        selector: row => row.cliente,
        sortable: true
        },
        {
        name: 'Referencia',
        selector: row => row.referencia,
        sortable: true
        },
        {
        name: 'Origen',
        selector: row => row.origen,
        sortable: true,
        },
        {
        name: 'Fecha Cita',
        selector: row => row.fecha_cita,
        sortable: true
        },
        {
        name: 'Hora Cita',
        selector: row => row.hora_cita,
        //moment(row.fecha_salida).format('YYYY-MM-DD')
        sortable: true,
        },
        {
        name: 'Destino',
        selector: row => row.destino,
        sortable: true,
        },
        {
        name: 'Fecha Entrega',
        selector: row => row.fecha_entrega,
        sortable: true,
        },
        {
        name: 'Hora Entrega',
        selector: row => row.hora_entrega,
        sortable: true,
        },
        {
        name: 'Zona Origen',
        selector: row => row.rel_zona_origen,
        sortable: true,
        },
        {
        name: 'Zona Destino',
        selector: row => row.rel_zona_destino,
        sortable: true,
        },
        {
        name: 'KM',
        selector: row => row.km,
        sortable: true,
        },
        {
        name: 'Tarifa',
        selector: row => row.tarifa,
        sortable: true,
        },
        {
        name: 'Accesoriales',
        selector: row => row.accesoriales,
        sortable: true,
        },
        {
        name: 'Pista',
        selector: row => row.pistas,
        sortable: true,
        },
        {
        name: 'Tarifa',
        selector: row => row.tarifa,
        sortable: true,
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
        name: 'Placas',
        selector: row => row.placas,
        sortable: true,
        },
        {
        name: 'Temperatura',
        selector: row => row.temperatura,
        sortable: true,
        },
        {
        name: 'Fecha Salida',
        selector: row => row.fecha_inicio,
        sortable: true,
        },
        {
        name: 'Hora Salida',
        selector: row => row.hora_inicio,
        sortable: true,
        },
        {
          name: 'Fecha Llegada',
          selector: row => row.fecha_llegada,
          sortable: true,
          },
          {
          name: 'Hora Llegada',
          selector: row => row.hora_llegada,
          sortable: true,
          },
        {
        name: 'Fecha Entrega',
        selector: row => row.fecha_entregado,
        sortable: true,
        }

    ];

    // ===============================================
    // TABLA DEL DASHBOARD
    // ===============================================

    return (

        <div>

          <h3 className='mb-4 text-center'>Dashboard</h3>

          {/* SEGMENTO PARA KM Y TARIFA POR FECHA Y TRACTOR */}

          <div className='row'>

            <TarifaKmView/>

          </div>

          <hr/>
            
          {/* TABLA DASHBOARD */}

          <div className='row mt-4'>

            {/* BOTON PARA EXPORTAR DATOS DE ORDEN */}

            <div className='col-3'>
              <ExportarOrdenes/>
            </div>

            {/* BOTON PARA EXPORTAR REPORTE POR PLANTAS */}

            <div className='col-3'>
              <ExportarOrdenesPlantas/>
            </div>

            

            

            <Tabla columns = {colums} data = {data} />

          </div>

        </div>

    )

}

export default MainDashboardView