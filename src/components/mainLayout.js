import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import profileImg from '../img/anonymous.webp';
import tedelLogo from '../img/tedellogo.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '../config/config';
import { Layout } from 'antd';
import React, { useState, useEffect } from 'react'
import MenuAdmin from './menu/MenuAdmin';
import MenuOperador from './menu/MenuOperador';
import MenuFacturacion from './menu/MenuFacturacion';
import MenuLogistica from './menu/MenuLogistica';
import MenuRh from './menu/MenuRh';
import MenuTemperaturas from './menu/MenuTemperaturas';
const { Header, Sider, Content } = Layout;


const MainLayout = () => {

  //FUNCION PARA LIMPIAR COOCKIES

  const cleanCookies = () => {

    Cookies.remove('jwtoken');
    Cookies.remove('perfil');
    Cookies.remove('eval');
    Cookies.remove('idUser');

  }

  const [collapsed, setCollapsed] = useState(false);

  //OBTENER EL NOMBRE DEL USUARIO

  const [email, setEmail] = useState('');

  const [name, setName] = useState('');

  const [token, setToken] = useState('');

  const [showMenuAdmin, setShowMenuAdmin] = useState(false);

  const [showMenuOperador, setShowMenuOperador] = useState(false);

  const [showMenuFacturacion, setShowMenuFacturacion] = useState(false);

  const [showMenuLogistica, setShowMenuLogistica] = useState(false);

  const [showMenuRh, setShowMenuRh] = useState(false);

  const [showTemperatura, setShowMenuTemperatura] = useState(false);

  useEffect(() => {

    setEmail(Cookies.get('eval'));

    const fetchUserType = async () => {

      try{

        setToken(Cookies.get('jwtoken'));
  
        const config = {
  
          headers: {"access-token": token},
  
        };

        if(email !== ''){

          const response = await axios.get(`${baseURL}api/usuario/email/${email}`, config);
  
          if(response.data.success === true && response.data.result !== "Sin resultados"){
    
            setName(response.data.result[0]["name"]);
  
            //GUARDAR EL PERFIL EN UNA COOKIE

            let perfil = response.data.result[0]["perfil"];
  
            Cookies.set('perfil', perfil)

            if(perfil === "Admin" || perfil === "Gerencia"){

              Cookies.set('idUser', response.data.result[0]["idUser"])


            }else{

              Cookies.set('idUser', response.data.result[0]["idRelUser"])

            }

            console.log(response.data.result[0]["perfil"])
  
            // VALIDAR EL PERFIL PARA SABER QUE MENU MOSTRAR
  
            if(response.data.result[0]["perfil"] === "Admin" || response.data.result[0]["perfil"] === "SISTEMAS"){
  
              setShowMenuAdmin(true);
  
            }else if(response.data.result[0]["perfil"] === "Gerencia"){
  
              setShowMenuAdmin(true);
  
            }else if(response.data.result[0]["perfil"] === "Operador"){
  
              setShowMenuOperador(true);
  
            }else if(response.data.result[0]["perfil"] === "Facturacion"){

              setShowMenuFacturacion(true);

            }else if(response.data.result[0]["perfil"] === "Logistica"){

              setShowMenuLogistica(true)

            }else if(response.data.result[0]["perfil"] === "RH"){

              setShowMenuRh(true)

            }else if(response.data.result[0]["perfil"] === "Temperaturas"){

              setShowMenuTemperatura(true);

            }
    
          }

        }

      }
      catch(e){

        //console.log(e);

      }

    };

    fetchUserType();

  }, [email]);

  //==============================================================

  return (

    <Layout>

      <Sider trigger={null} collapsible collapsed={collapsed}>

        <div className="logo pt-1">

          <img src={tedelLogo} width="200px"/>

        </div>

        {

          // MOSTRAR MENU DE ADMIN

          showMenuAdmin ?

          <MenuAdmin />

          :

          //MOSTRAR MENU DE OPERADOR

          showMenuOperador ?

          <MenuOperador />

          :

          // MOSTRAR MENU DE FACTURACION

          showMenuFacturacion ?

          <MenuFacturacion/>

          : 

          // MOSTRAR MENU DE LOGISTICA

          showMenuLogistica ?

          <MenuLogistica/>

          :

          // MOSTRAR MENU DE LOGISTICA

          showMenuRh ?

          <MenuRh/>

          :

          // MOSTRAR MENU DE TEMPERATURA

          showTemperatura ? 

          <MenuTemperaturas/>

          :

          null

        }

      </Sider>

      <Layout className="site-layout">
        <Header
          className='d-flex justify-content-between ps-1 pe-5'
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}

          <div className='d-flex gap-4 align-items-center text-white'>

            {/* NOTIFICACIONES */}

            {/* <div className='position-relative'>
              <IoMdNotifications className='fs-4'/>
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span>
            </div> */}

            <div className='d-flex gap-3 align-items-center dropdown'>

              {/* FOTO DE PERFIL */}

              <div>
                <img className='img-thumbnail ' src={profileImg} style={{width: "50px", height: "50px"}}/>
              </div>

              {/* NOMBRE Y CORREO DE USUARIO */}

              <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown">
                <h5 className='mb-0'>{name}</h5>
                <p className='mb-0'>{email}</p>
              </div>

              {/* MENU PARA LOG OUT */}

              <div className='dropdown-menu'>
                <li><a className="dropdown-item py-1 mb-1" style={{ height: "auto", lineHeight: "20px"}} href="/" onClick={() => cleanCookies()}>Salir</a></li>
                {/* <li><a className="dropdown-item py-1 mb-1" style={{ height: "auto", lineHeight: "20px"}} href="#">Link 2</a></li>
                <li><a className="dropdown-item py-1 mb-1" style={{ height: "auto", lineHeight: "20px"}} href="#">Link 3</a></li> */}
              </div>

            </div>

          </div>

        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

// TE QUEDASTE EN EL MINUTO 40 DEL VIDEO