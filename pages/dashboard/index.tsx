import { useEffect, useState } from 'react';
import type { GetServerSideProps, NextApiRequest, NextPage } from 'next';
import VisitorsTable from 'components/clients/clients.components';

//context
import { IUser, useGlobalContext } from 'context/global';

//styles
import { DashboardBody } from 'styles/dashboard.styles';

//components
import StatsComponents from 'components/Stats/stats.components';
import LogList from 'components/log/log-list.component';
import { Table } from 'react-bootstrap';
import { IStudent } from 'components/log/log-list.interfaces';
import { Tr } from 'components/clients/clients.styles';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Moment from 'react-moment';
import Link from 'next/link';

//interfaces
interface IProps {}

const LastEntered = styled.div`
  border: 1px solid #333;
  border-radius: 25px;
  padding: 30px;
`;

const DashboardPage: NextPage = ({}: IProps) => {
  //Временная мера
  const { setUser } = useGlobalContext();

  useEffect(() => {
    if (window) {
      //@ts-ignore
      if (sessionStorage.getItem('user')?.length > 0) {
        //@ts-ignore
        const user = JSON.parse(sessionStorage.getItem('user'));
        setUser(user);
      }
    }
  }, []);

  return (
    <DashboardBody>
      {/* <StatsComponents /> */}
      <h1>Главная</h1>

      <h2>Последние вошедшие</h2>
      <LogStudentsMonitoring />
    </DashboardBody>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const uid = await loadIdToken(req as NextApiRequest);

  // if (!uid) {
  //   res.setHeader("location", "/auth");
  //   res.statusCode = 302;
  //   res.end();
  // }

  return { props: {} };
};

function LogStudentsMonitoring({}) {
  const [users, setUsers] = useState<IStudent[]>([]);

  const { status, data, error, isFetching } = useQuery(
    'lastEntered',
    async () => {
      let login = sessionStorage.getItem('login');
      let password = sessionStorage.getItem('password');
      const res = await fetch('/api/getLogRecognition', {
        method: 'POST',
        body: JSON.stringify({ login, password, limit: '5', offset: 0 }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((result) => result.json());
      setUsers(res.logs);
    },
    {
      // Refetch the data every second
      refetchInterval: 5000,
    }
  );

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <span>Error: {error.message}</span>;

  return (
    <div>
      <LastEntered>
        <h2>Последний вход</h2>
        <div>{users[0].FIO}</div>
        <div>{users[0].title_terminal}</div>
        <div>
          <Moment date={users[0].dt_log} format='DD.MM.YYYY HH:mm:ss' />
        </div>
      </LastEntered>
      <h3>Последние вошедшие:</h3>
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
      <Link href={`/logs`} passHref>
        <a>Посмотреть всех</a>
      </Link>
    </div>
  );
}

export default DashboardPage;
