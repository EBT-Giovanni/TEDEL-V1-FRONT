import { useNavigate } from "react-router-dom";
import {AiOutlineUser, AiOutlineDashboard, AiOutlineFolderOpen, AiFillEye} from 'react-icons/ai';
import {IoMdArrowDropright} from 'react-icons/io';
import {BsTruck} from 'react-icons/bs';
import {FaRoute, FaTractor, FaRoad, FaUsers} from 'react-icons/fa';
import {RiBookMarkLine} from 'react-icons/ri';
import {HiUserGroup} from 'react-icons/hi';
import {GiSteeringWheel, GiReceiveMoney} from 'react-icons/gi';
import {TbReportSearch} from 'react-icons/tb';
import {MdOutlineCreate} from 'react-icons/md';
import {SiReadthedocs} from 'react-icons/si';
import {TbTruckLoading} from 'react-icons/tb';
import {GiNotebook} from 'react-icons/gi';
import {BiEditAlt} from 'react-icons/bi';
import {MdAttachMoney} from 'react-icons/md';
import { FaMoneyCheckAlt  } from "react-icons/fa";
import { Menu } from 'antd';

const MenuAdmin = () => {

    const navigate = useNavigate();

    return (

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick = {({key}) => {

              if(key === 'signout'){
                navigate("/")

              }else{
                navigate(key)
              }

          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4'/>,
              label: 'Dashboard',
            }, 
            {
              key: 'logistica',
              icon: <FaRoad className='fs-4'/>,
              label: 'Logistica',
              children: [
                {
                  key: 'proveedores_logistica',
                  icon: <FaUsers className='fs-4'/>,
                  label: 'Proveedores',
                },
                {
                  key: 'cajas_logistica',
                  icon: <BsTruck className='fs-4'/>,
                  label: 'Cajas',
                },
                {
                  key: 'cajas_activas',
                  icon: <TbTruckLoading className='fs-4'/>,
                  label: 'Cajas Activas'
                },
                {
                  key: 'tractores_logistica',
                  icon: <FaTractor className='fs-4'/>,
                  label: 'Tractores',
                },
                {
                  key: 'clientes_logistica',
                  icon: <HiUserGroup className='fs-4'/>,
                  label: 'Clientes',
                },
                {
                  key: 'rutas_logistica',
                  icon: <FaRoute className='fs-4'/>,
                  label: 'Rutas',
                },
                {
                  key: 'ordenes_logistica',
                  icon: <GiNotebook className='fs-4'/>,
                  label: 'Ordenes',
                },
                {
                  key: 'proforma_logistica_create',
                  icon: <BiEditAlt className='fs-4'/>,
                  label: 'Crear Proforma',
                },
                {
                  key: 'proforma_logistica_view',
                  icon: <AiFillEye className='fs-4'/>,
                  label: 'Ver Proforma',
                },
              ],
            },
            {
              key: 'ordenes',
              icon: <AiOutlineFolderOpen className='fs-4'/>,
              label: 'Ordenes'
            },
            {
              key: 'ordenes_facturas',
              icon: <FaMoneyCheckAlt    className='fs-4'/>,
              label: 'Facturas Ordenes'
            },
            {
              key: 'despacho',
              icon: <TbReportSearch className='fs-4'/>,
              label: 'Despacho'
            },
            {
              key: 'biaticos',
              icon: <GiReceiveMoney className='fs-4'/>,
              label: 'Viaticos'
            },
            {
              key: 'saldos',
              icon: <MdAttachMoney className='fs-4'/>,
              label: 'Saldos'
            },
            {
              key: 'proforma',
              icon: <SiReadthedocs className='fs-4'/>,
              label: 'Proformas',
              children: [
                {
                  key: 'proforma_create',
                  icon: <MdOutlineCreate className='fs-4'/>,
                  label: 'Crear',
                },
                {
                  key: 'proforma_view',
                  icon: <AiFillEye className='fs-4'/>,
                  label: 'Ver',
                },
              ],
            },
            {
              key: 'clientes',
              icon: <HiUserGroup className='fs-4'/>,
              label: 'Clientes'
            },
            {
              key: 'rutas',
              icon: <FaRoute className='fs-4'/>,
              label: 'Rutas'
            },
            {
              key: 'tractores',
              icon: <FaTractor className='fs-4'/>,
              label: 'Tractores'
            },
            {
              key: 'operadores',
              icon: <GiSteeringWheel className='fs-4'/>,
              label: 'Operadores'
            },
            {
              key: 'cajas',
              icon: <BsTruck className='fs-4'/>,
              label: 'Cajas'
            },
            {
              key: 'catalago',
              icon: <RiBookMarkLine className='fs-4'/>,
              label: 'Catalago Op',
              children: [
                {
                  key: 'estatus_caja',
                  icon: <IoMdArrowDropright className='fs-4'/>,
                  label: 'Estatus Caja',
                },
                {
                  key: 'estatus_operador',
                  icon: <IoMdArrowDropright className='fs-4'/>,
                  label: 'Estatus Operador',
                },
                {
                  key: 'estatus_orden',
                  icon: <IoMdArrowDropright className='fs-4'/>,
                  label: 'Estatus Orden',
                },
                {
                  key: 'estatus_tractores',
                  icon: <IoMdArrowDropright className='fs-4'/>,
                  label: 'Estatus Tractores',
                },
                {
                  key: 'licencias',
                  icon: <IoMdArrowDropright className='fs-4'/>,
                  label: 'Licencias',
                },
                {
                  key: 'documentos',
                  icon: <IoMdArrowDropright className='fs-4'/>,
                  label: 'Documentos',
                },
                {
                  key: 'tipo_rutas',
                  icon: <IoMdArrowDropright className='fs-4'/>,
                  label: 'Tipos Rutas',
                },
                {
                  key: 'cat_destinos',
                  icon: <IoMdArrowDropright className='fs-4'/>,
                  label: 'Destinos',
                },
                {
                  key: 'direcciones',
                  icon: <IoMdArrowDropright className='fs-4'/>,
                  label: 'Direcciones',
                },
              ],
            },
            {
              key: 'usuarios',
              icon: <AiOutlineUser className='fs-4'/>,
              label: 'Usuarios'
            },

          ]}
        />

    );

}

export default MenuAdmin;
