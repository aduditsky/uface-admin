// getTerminals
import { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from '@mui/x-data-grid';

import { Table } from 'react-bootstrap';
import { Tr } from 'components/clients/clients.styles';

import { useQuery } from 'react-query';

interface ITerminal {
  id: string;
  ip: string;
  linked: string;
  port: string;
  primary: string;
  state: string;
}

let stateColumn: any[] = [];
const getFormatedColumn = (filteredColumn: any[]) => {
  filteredColumn.map((cs: any) => {
    stateColumn.push({
      field: cs.key.toLowerCase(),
      headerName: cs.nameColumn,
      width: 150,
      // hide: true,
    });
  });

  return stateColumn;
};

export default function TerminalsGrid() {
  const [columns, setColumns] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState<number>(20);

  const { status, data, error, isFetching } = useQuery(
    'terminals',
    async () => {
      let login = sessionStorage.getItem('login');
      let password = sessionStorage.getItem('password');

      const res = await fetch('/api/getTerminals', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((result) => result.json());

      const columnsReq = await fetch('/api/column-names', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const column = await columnsReq.json();
      const filteredColumn = column.filter(
        (item: any) => item.keyTable === 'terminals'
      );

      const formated = getFormatedColumn(filteredColumn);
      setColumns(formated);

      return res.terms;
    },
    {
      // Refetch the data every second
      refetchInterval: 5000,
    }
  );

  console.log({ status, data });

  if (status === 'loading') return <h1>Loading...</h1>;
  //@ts-ignore
  if (status === 'error') return <span>Error: {error?.message}</span>;

  return (
    <div>
      <h1>Список терминалов</h1>
      <div style={{ height: '80vh' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // getRowId={(row) => row.id}

          // node_modules/@mui/x-data-grid/DataGrid/useDataGridProps.d.ts; Строчка 3, значение 100 изменить на 500
          // node_modules/@mui/x-data-grid/DataGrid/useDataGridProps.js; Строчка 19, значение 100 изменить на 500
          rowsPerPageOptions={[20, 50, 100, 200, 500]}
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
}
