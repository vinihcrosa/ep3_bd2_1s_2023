import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'jogadorbrancas',
        headerName: 'Jogador Brancas',
        width: 150,
        editable: false,
    },
    {
        field: 'versus',
        headerName: 'X',
        description: 'Essa coluna não é filtrável',
        sortable: false,
        width: 10,
        valueGetter: () => 'X',
    },
    {
        field: 'jogadorpretas',
        headerName: 'Jogador Pretas',
        width: 150,
        editable: false,
    },
    {
        field: 'arbitro',
        headerName: 'Árbitro',
        width: 150,
        editable: false,
    },
    {
        field: 'hotel',
        headerName: 'Hotel',
        width: 160,
        editable: false,
    },
    {
        field: 'lugar',
        headerName: 'Lugar',
        flex: 0.4,
        editable: false,
    },
    {
        field: 'hora',
        headerName: 'Hora',
        editable: false,
    },
  ];

export default function Table({ rows }: any) {
    return (
    <DataGrid
    rows={rows}
    columns={columns}
    initialState={{
        pagination: {
        paginationModel: {
            pageSize: 5,
        },
        },
    }}
    pageSizeOptions={[5]}
    checkboxSelection
    disableRowSelectionOnClick
    />
    )
}