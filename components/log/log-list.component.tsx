import { useEffect, useState } from 'react';

import { Table } from 'react-bootstrap';
import { Tr } from 'components/clients/clients.styles';

import { IStudent } from './log-list.interfaces';

const LogList = () => {
  const [userList, setUserList] = useState<IStudent[]>([]);

  const getLogs = async () => {
    let login = sessionStorage.getItem('login');
    let password = sessionStorage.getItem('password');

    const res = await fetch('/api/getLogRecognition', {
      method: 'POST',
      body: JSON.stringify({ login, password, limit: '30', offset: 0 }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((result) => result.json());

    if (res.status === 'success') {
      setUserList(res.logs);
    }
  };

  return (
    <div>
      <LogUsersList users={userList} />

      {userList.length > 0 && <LogUsersList users={userList} />}
    </div>
  );
};

function LogUsersList({ users }: { users: IStudent[] }) {
  return (
    <div>
      <Table striped borderless hover responsive size='lg'>
        <tbody>
          {users.map((item, i) => {
            return (
              <Tr key={`${item.id}-${i}`}>
                <td style={{ cursor: 'pointer', height: 40, width: 80 }}></td>

                <td>{item.id}</td>
                <td>{item.FIO}</td>

                <td>{item.title_terminal}</td>
                <td>{item.maskState}</td>
                <td>{item.id_terminal}</td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default LogList;
