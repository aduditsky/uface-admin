import { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from '@mui/x-data-grid';

import { IStudent } from './log-list.interfaces';

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

const LogGrid = () => {
  const [userList, setUserList] = useState<IStudent[]>([]);

  //Примитивный роутинг
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState<number>(0);
  const [maxUsers, setMaxUsers] = useState(0);
  const [columns, setColumns] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState<number>(20);

  const getLogs = async () => {
    let login = sessionStorage.getItem('login');
    let password = sessionStorage.getItem('password');

    const res = await fetch('/api/getLogRecognition', {
      method: 'POST',
      body: JSON.stringify({ login, password, limit, offset }),
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
      (item: any) => item.keyTable === 'log_identify'
    );

    const formated = getFormatedColumn(filteredColumn);
    setColumns(formated);

    if (res.status === 'success') {
      setUserList(res.logs);
      setMaxUsers(res.allcnt || 20);
    }
  };

  useEffect(() => {
    getLogs();
  }, [offset, limit]);

  return (
    <div>
      <h1>Последние проходы</h1>
      <div style={{ height: '80vh' }}>
        <DataGrid
          rows={userList}
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
};

export default LogGrid;
