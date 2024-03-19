import DataTable from 'react-data-table-component';
import 'styled-components'
import { useState } from 'react';
import {FaFilter} from 'react-icons/fa'

const Tabla = (props) => {

    const {columns, data} = props;

    const [searchText, setSearchText] = useState("");

    const handleSearch = (event) => {
        setSearchText(event.target.value);
      };

    const filteredData = [...data].filter((item) =>
    Object.keys(item).some(
    (key) =>
        item[key] &&
        item[key]
        .toString()
        .toLowerCase()
        .includes(searchText.toLowerCase())
      )
    );

    const divStyle = {
      color: 'red',
      height: "35px",
      margin: "10px"
    };

    //=========================================================

    return (

        <div>

          <div className="container text-center">

            <div className="row">

              <div className="col"></div>
              <div className="col"></div>

              <div className="col">

                <div className="input-group mb-3 float-end">
                      
                  <span className="input-group-text" id="basic-addon1"><FaFilter/></span>

                  <input 
                  type="text" 
                  placeholder='Filtrar Datos'
                  className='form-control' 
                  onChange={handleSearch}
                  />

                </div>

              </div>

            </div>

          </div>

          <DataTable
          className='mb-4'
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          noDataComponent={<div style={divStyle}>No hay datos disponibles.</div>}
          responsive={true}
          />

        </div>

    );
};

export default Tabla;