import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import GastosOperador from './GastosOperador';
import MainDashboardView from '../components/dashboard/MainDashboardView';
import MenuOperadores from './MenuOperadores';

export const Dashboard = () => {

  //VALIDAR SI MOSTRAR TABLA O NO

  const [showTabla, setShowTabla] = useState(false);

  const [showOp, setShowOp] = useState(false)

  // ===============================================
  // DATOS PARA COOKIES
  // ===============================================

  useEffect(() => {

    setTimeout(() => {

      const perfil = Cookies.get('perfil');console.log(perfil)
  
      if(perfil === "Operador"){
  
        setShowOp(true);
  
      }else if(perfil === "Admin" || perfil === "Gerencia" || perfil === "SISTEMAS"){

        setShowTabla(true);

      }else{

        setShowTabla(false)

      }

    }, "2000");



  }, []);

  return (

    <div>

      {

        showTabla ?

        <MainDashboardView/>

        :

        <h3 className='mb-4 text-center'>Bienvenido a TEDEL TMS</h3>

      }

      {

        showOp ?

        // <GastosOperador/>
        <MenuOperadores/>

        :

        null

      }

    </div>

  )
}
