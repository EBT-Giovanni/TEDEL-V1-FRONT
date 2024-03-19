import { useNavigate } from "react-router-dom";
import { Menu } from 'antd';
import {TbTruckLoading} from 'react-icons/tb';
import {FaUsers, FaTractor, FaRoute} from 'react-icons/fa';
import {BsTruck} from 'react-icons/bs';
import {HiUserGroup} from 'react-icons/hi';
import {GiNotebook} from 'react-icons/gi';
import {BiEditAlt} from 'react-icons/bi';
import {AiFillEye} from 'react-icons/ai';
import {IoMdArrowDropright} from 'react-icons/io';

const MenuLogistica = () => {

    const navigate = useNavigate();

    return (

      <div>

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
              key: 'cat_destinos',
              icon: <IoMdArrowDropright className='fs-4'/>,
              label: 'Destinos',
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

          ]}
      />

      </div>

    )

}

export default MenuLogistica