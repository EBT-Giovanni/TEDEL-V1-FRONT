import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENTES
import Tabla from '../components/Tabla';
import TractorComentarios from '../components/tractores/TractorComentarios';
import TractorConfidencial from '../components/tractores/TractorConfidencial';
import TractorPlacas from '../components/tractores/TractorPlacas';
import TractorDocumentos from '../components/tractores/TractorDocumentos';
import TractorSeguros from '../components/tractores/TractorSeguros';

//ICONS
import {BsPencil, BsImageFill} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdAddCircle} from 'react-icons/md';
import {HiOutlineEye} from 'react-icons/hi';
import CrearTractor from '../components/tractores/modales/CrearTractor';
import EditarTractor from '../components/tractores/modales/EditarTractor';

const Tractores = () => {

    // ===============================================
    // SEGMENTO PARA MOSTRAR CLIENTES
    // ===============================================

    const [data, setData] = useState([]);

    const [token, setToken] = useState('');

    //TRAER DATOS PARA MOSTRAR TRACTORES

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/tractores`,{
        
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

    //COLUMNAS PARA LA TABLA

    const columns = [

        {
            name: 'Marca',
            selector: row => row.marca,
            sortable: true
        },
        {
            name: 'Modelo',
            selector: row => row.modelo,
            sortable: true
        },
        {
            name: 'Numero Economico',
            selector: row => row.numero_economico,
            sortable: true
        },
        {
            name: 'Estatus',
            selector: row => row.estatus,
            sortable: true
        },
        {
            name: '',
            selector: row => <button className='btn btn-outline-secondary' onClick={() => handleImg(row.foto_ruta)}><BsImageFill/></button>,
            sortable: true,
            width: "80px"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className='btn btn-outline-info' onClick={() => handleInfo(row.id, row.numero_economico)}><HiOutlineEye/></button>
                    <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditarTractor" onClick={() => handleEditTractor(row.id)}><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDeleteTractor(row.id, row.foto_ruta)}><RiDeleteBinFill/></button>
                </div>
                
            ),
            width: "125px"
            
        },

    ]

    // ===============================================
    // SEGMENTO PARA MOSTRAR IMAGEN DEL TRACTOR
    // ===============================================

    const [imgTractor, setImgTractor] = useState('');

    const handleImg = (ruta) => {

        const file = ruta.split("/")[2];

        const file2 = file.split("%");

        const finalFile = file2[0]+"%25"+file2[1];

        setImgTractor(`${baseURL}fotos/tractores/${finalFile}`);

        document.getElementById("btnImgModal").click();

    }

    // ===============================================
    // SEGMENTO PARA CREAR TRACTOR
    // ===============================================
    
    //TRAER ESTATUS DE TRACTORES

    const [estatusTractor, setEstatusTractor] = useState('');

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/estatusTractor`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let status = result.data.result;

                status.unshift({id: "", estatus: "Seleccione el estatus"});
        
                setEstatusTractor(status);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    const activo = [

        {id: "", estado: "Seleccione Estado"},
        {id: "1", estado: "Activo"},
        {id: "0", estado: "Inactivo"}

    ];

    // ===============================================
    // SEGMENTO PARA EDITAR TRACTORES
    // ===============================================

    const [formValues, setFormValues] = useState({

        rel_estatus: "1",
        numero_economico: "",
        anio: "2023",
        marca: "",
        modelo: "",
        color: "",
        permiso_sct: "",
        foto_ruta: "",
        odometro: "",
        activo: ""

    });

    // ===============================================
    // FUNCION PARA BUSCAR TRACTOR POR ID
    // ===============================================

    const handleEditTractor = (id) => {

        axios.get(`${baseURL}api/tractor/id/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success === true)
            {
                let formTemp = result.data.result;
      
                formTemp[0]["archivoActual"] = formTemp[0]["foto_ruta"];

                document.getElementById("selecEstadoTractor").value = formTemp[0]["activo"];

                setFormValues(formTemp[0]);

            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR ARCHIVO
    // ===============================================

    const handleDeleteTractor = (id, ruta) => {

        Swal.fire({
            title: 'Estas seguro de borrar este tractor?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
            }).then((result) => {
    
                if(result.isConfirmed) {
    
                    const data = { path: ruta };
                    
                    fetch(`${baseURL}api/tractor/delete/${id}`, {
                            
                        method: "DELETE", 
                        headers: {
                            "Content-Type": "application/json",
                            "access-token": token
                        },
                        body: JSON.stringify(data),
    
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        
                        if(data.success === true){
    
                            
                            Swal.fire({
                            icon: 'success',
                            title: 'Se ha eliminado correctamente!',
                            })
                            .then(() => {
                    
                                window.location.reload(false);
                    
                            })
    
                        }
    
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
    
                }
    
            })

    }

    // ===============================================
    // SEGMENTO PARA MOSTRAR INFO ADICIONAL DE LOS CLIENTES
    // ===============================================

    const [tractor, setTractor] = useState('');

    const [idTractor, setIdTractor] = useState(0);

    const handleInfo = (id, name) => {

        setTractor(name);

        setIdTractor(id);

    }

    // ===============================================
    // ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormValues({ ...formValues, [name]: val });

    }

    const handleChangeImg = (event) => {

        setFormValues({ ...formValues, ["foto_ruta"]: event.target.files[0]})

    }

    return (

        <div>
            
            <h3 className='mb-4'>Tractores</h3>

            <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearTractor">
                <MdAddCircle/> Agregar Tractor
            </button>

            <Tabla columns = {columns} data = {data}/>

            {/* MODAL PARA CREAR TRACTOR */}

            <CrearTractor 
                data = {formValues} 
                onChange = {handleChange}
                onChangeImg = {handleChangeImg}
            />

            {/* MODAL PARA EDITAR TRACTOR */}

            <EditarTractor 
                data = {formValues} 
                onChange = {handleChange}
                onChangeImg = {handleChangeImg}
            />

            <h3 className='text-center mt-4'>{tractor}</h3> 

            <ul className="nav nav-tabs nav-justified mt-4" id="myTabTractor" role="tablist">

                <li className="nav-item" role="presentation">

                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#tabTractorComentarios" type="button" role="tab" aria-controls="home" aria-selected="true"><p className="h5">Comentarios</p></button>

                </li>

                <li className="nav-item" role="presentation">

                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#tabTractorConfidencial" type="button" role="tab" aria-controls="profile" aria-selected="false"><p className="h5">Confidencial</p></button>

                </li>

                <li className="nav-item" role="presentation">

                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#tabTractorDocumentos" type="button" role="tab" aria-controls="contact" aria-selected="false"><p className="h5">Documentos</p></button>

                </li>

                <li className="nav-item" role="presentation">

                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#tabTractorPlacas" type="button" role="tab" aria-controls="contact" aria-selected="false"><p className="h5">Placas</p></button>

                </li>

                <li className="nav-item" role="presentation">

                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#tabTractorSeguros" type="button" role="tab" aria-controls="contact" aria-selected="false"><p className="h5">Seguro</p></button>

                </li>

            </ul>

            <div className="tab-content" id="myTabContentClientes">

                <div className="tab-pane fade show active" id="tabTractorComentarios" role="tabpanel" aria-labelledby="home-tab">

                    <TractorComentarios idTractor={idTractor}/>

                </div>

                <div className="tab-pane fade" id="tabTractorConfidencial" role="tabpanel" aria-labelledby="profile-tab">

                    <TractorConfidencial idTractor = {idTractor}/>

                </div>

                <div className="tab-pane fade" id="tabTractorDocumentos" role="tabpanel" aria-labelledby="contact-tab">

                    <TractorDocumentos idTractor = {idTractor}/>

                </div>

                <div className="tab-pane fade" id="tabTractorPlacas" role="tabpanel" aria-labelledby="contact-tab">

                    <TractorPlacas idTractor = {idTractor}/>

                </div>

                <div className="tab-pane fade" id="tabTractorSeguros" role="tabpanel" aria-labelledby="contact-tab">

                    <TractorSeguros idTractor = {idTractor}/>

                </div>

            </div>

            <button 
                type="button"
                id="btnImgModal"
                data-bs-toggle="modal" 
                data-bs-target="#staticBackdrop"
                style={{"display":"none"}}>
            </button>
            
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"   aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel"></h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <img src={imgTractor} width="100%"/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
                </div>
            </div>
            </div>

        </div>

    );

}

export default Tractores;
