import React, { useState } from 'react'
import { Table } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomInput from '../../components/CustomInput';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const columns = [
    {
      title: 'SNo',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
const data1 = [];
for (let i = 0; i < 46; i++) {
    data1.push({
        key: i+1,
        name: `Edward King ${i}`,
        product: 32,
        status: `London, Park Lane no. ${i}`,
    });
}

function Notificaciones() {

  const [desc, setDesc] = useState();

  const handleDesc = (e) => {

    setDesc(e);

  }

  return (
    <div>
        <h3 className='mb-4'>Notificaciones</h3>

        <div>

          {/* FORMULARIO */}

          <form>

            <CustomInput type="text" label="Ingrese un titulo para la notificacion" />

            <select className='form-control py-3 mb-4'>

              <option>Seleccione una categoria</option>

            </select>

            <ReactQuill className='mb-2' theme="snow" value={desc} onChange={evt => {handleDesc(evt)}} />

            <Dragger {...props} className='mt-3'>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
              </p>
            </Dragger>

            <button type="submit" className='btn btn-success border-0 rounded-3 my-3 float-end'><AiOutlineCloudUpload/> Crear Notificacion</button>

          </form>

        </div>

        {/* TABLA PARA MOSTRAR NOTIFICACIONES */}

        <div>

          <h4 className='mb-3 mt-3'>Registros</h4>

          <div><Table columns={columns} dataSource={data1} /></div>

        </div>

    </div>
  )
}

export default Notificaciones