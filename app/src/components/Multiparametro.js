import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {info} from './data';


export const Multiparametro = () => {
  const columns = [
    {field: 'fecha',headerName: 'Fecha', width: 150},
    {field: 'ws',headerName: 'Velocidad del viento',width: 150},
    {field: 'wd',headerName: 'Dirección del viento',width: 150},
    {field: 'temp',headerName: 'Temperatura',width: 150},
    {field: 'rh',headerName: 'Humedad relativa',width: 150},
    {field: 'bp',headerName: 'Presión barométrica',width: 150},
    // {field: 'col7',headerName: 'Altura de nieve',width: 150}
  ];
  
  
  const [fechainicial, setFechainicial] = React.useState([null, null]);
  const [fechafinal, setFechafinal] = React.useState([null, null]);
  return (
    <div>
      <div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'es'}>
        <DatePicker
          label="Fecha inicial"
          value={fechainicial}
          onChange={(newValue) => {
            setFechainicial(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'es'}>
        <DatePicker
          label="Fecha final"
          value={fechafinal}
          onChange={(newValue) => {
            setFechafinal(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      </div>
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid rows={info} columns={columns} />
        </div>
    </div>
  )
}
