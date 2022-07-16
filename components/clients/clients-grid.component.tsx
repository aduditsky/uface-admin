import { Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import LoadingSpin from 'react-loading-spin';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from '@mui/x-data-grid';

//Context
import { useGlobalContext } from 'context/global';

//Components
import CogComponent from './cog.component';

//Styles
import { OutData, PagginationStyles, Tr } from './clients.styles';
import ModalEdit from 'components/modal-edit/modal-edit.component';
import styled from 'styled-components';

export interface IClient {
  dateborn: string;
  activated: any;
  email: string;
  fio: string;
  fname: string;
  lname: string;
  sname: string;
  id: string;
  personid: string;
  phone: string;
  phone_approve: any;
  role: string;
  photo: string;
  vuz_title: string;
  vuz_kod: string;
  role_title: string;
  role_kod: string;
  isCreate: boolean;
}

export interface IPhoto {
  base64: string;
  main: boolean;
  faceid: string;
}

const PanelStyles = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;

  padding: 10px 5px;

  button {
    border: none;
    padding: 0.3em 1em;
    color: #fff;
    box-shadow: 0 2px 4px rgb(138 149 158 / 20%);
    border-radius: 5px 30px 30px 30px;
    letter-spacing: 0.38px;
    background-color: #2c2c2c;
  }
`;

const PanelAndFilter = ({ canAddUser }: { canAddUser: boolean }) => {
  const { setEditUser } = useGlobalContext();

  return (
    <PanelStyles>
      {canAddUser && (
        <button
          type='button'
          onClick={() => {
            setEditUser({
              dateborn: '',
              activated: false,
              email: '',
              fio: '',
              fname: '',
              lname: '',
              sname: '',
              id: '',
              personid: '',
              phone: '',
              phone_approve: false,
              role: '',
              photo: '',
              vuz_title: '',
              vuz_kod: '',
              role_title: '',
              role_kod: '',
              isCreate: true,
            });
          }}
        >
          Создать пользователя
        </button>
      )}
    </PanelStyles>
  );
};

const VisitorsGrid = () => {
  const [filtering, setFilter] = useState([
    { property: '-none', name: 'Фото' },
    { property: '', name: 'ID' },
    { property: '', name: 'ФИО' },
    { property: '', name: 'E-Mail' },
    { property: '', name: 'Телефон' },
    { property: '-none', name: 'Персональный ID' },
    { property: '', name: 'Роль' },
    { property: '', name: 'Дата рождения' },
  ]);
  const [columns, setColumns] = useState<any[]>([]);

  //Примитивный роутинг
  const [limit, setLimit] = useState(20);
  const [pageSize, setPageSize] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);
  const [maxUsers, setMaxUsers] = useState(0);

  const [clients, setClients] = useState<IClient[]>([]);

  const { user, setEditUser } = useGlobalContext();

  const [canReadLogs, setCanReadLogs] = useState(false);
  const [canEditUser, setCanEditUser] = useState(false);
  const [canAddUser, setCanAddUser] = useState(false);

  // Алексей Давыдулин, [4 Jun 2022, 10:29:32 PM]:
  // 3 - это просмотр
  // 1 - добавление
  // 2 - редактироанте

  useEffect(() => {
    user?.roles.map((item) =>
      item.authorities.map((authItem) => {
        if (authItem.authority_kod === 'users') {
          // console.log({ authItem });
          setCanReadLogs(true);
          authItem.authority_fields.map((fieldItem) => {
            // console.log({ fieldItem });
            if (
              fieldItem.field_kod === 'ACTIV' &&
              fieldItem.field_value.includes('1')
            ) {
              setCanAddUser(true);
              setCanEditUser(true);
            }
            if (
              fieldItem.field_kod === 'ACTIV' &&
              fieldItem.field_value.includes('2')
            ) {
              setCanEditUser(true);
            }
          });
        }
      })
    );
  }, [user]);

  useEffect(() => {
    getFolks();
  }, [offset, limit]);

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

  //Получить список пользователей
  const getFolks = async () => {
    let login = sessionStorage.getItem('login');
    let password = sessionStorage.getItem('password');

    //20, 50, 100, 200, 500

    // const user = { login, password, limit, offset: offset * limit };
    const user = { login, password, limit: 5000, offset: 0 };
    const res = await fetch('/api/folks', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    const columnsReq = await fetch('/api/column-names', {
      method: 'POST',
      body: JSON.stringify({ login: user.login, password: user.password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const column = await columnsReq.json();
    const filteredColumn = column.filter(
      (item: any) => item.keyTable === 'folk'
    );

    console.log({ column });

    const formated = getFormatedColumn(filteredColumn);
    setColumns(formated);

    setClients(data.folks);
    setMaxUsers(data.allcnt);
  };

  return (
    <>
      <PanelAndFilter canAddUser={canAddUser} />
      <div style={{ height: '80vh' }}>
        <DataGrid
          rows={clients}
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
      <ModalEdit />
    </>
  );
};

export default VisitorsGrid;
