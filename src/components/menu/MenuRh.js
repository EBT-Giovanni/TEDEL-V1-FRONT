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
import { Menu } from 'antd';

const MenuRh = () => {

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
              key: 'operadores',
              icon: <GiSteeringWheel className='fs-4'/>,
              label: 'Operadores'
            },

          ]}
        />

    )

}

export default MenuRh