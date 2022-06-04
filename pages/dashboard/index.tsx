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

  display: flex;
  gap: 50px;
  width: fit-content;

  h2 {
    font-weight: bold;
  }

  .fio {
    font-weight: bold;
    font-size: 1.5em;
  }

  .terminal {
    font-size: 1em;

    .title {
      font-weight: bold;
    }
  }

  .date {
    margin-top: 10px;
    font-size: 0.89em;
  }
`;

const Container = styled.div`
  h2,
  h3 {
    margin: 10px;
    margin-top: 24px;
    font-weight: bold;
  }
`;

const DashboardPage: NextPage = ({}: IProps) => {
  //Временная мера
  const { user, setUser } = useGlobalContext();

  const [canReadLogs, setCanReadLogs] = useState(false);

  useEffect(() => {
    user?.roles.map((item) =>
      item.authorities.map((authItem) => {
        if (authItem.authority_kod === 'visitlog') {
          setCanReadLogs(true);
        }
      })
    );
  }, [user]);

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
      <h1 style={{ fontWeight: 'bold' }}>Главная</h1>

      {canReadLogs && (
        <>
          <LogStudentsMonitoring />
        </>
      )}
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
  if (status === 'error') return <span>Error: {error?.message}</span>;

  return (
    <Container>
      <div>
        <h2>Последний вход</h2>
        <LastEntered>
          <div>
            <div className='fio'>{users[0].FIO}</div>
            <div className='terminal'>
              <span className='title'>Устройство: </span>
              <span>{users[0].title_terminal}</span>
            </div>
            <div className='date'>
              <div>Дата входа:</div>
              <Moment date={users[0]?.dt_log} format='DD.MM.YYYY HH:mm:ss' />
            </div>
          </div>
        </LastEntered>
      </div>
      <div>
        <h3>Последние вошедшие:</h3>
        <Table striped borderless hover responsive size='lg'>
          <tbody>
            {users.map((item, i) => {
              return (
                <Tr key={`${item.id}-${i}`}>
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
      <Link href={`/logs`} passHref>
        <a>Посмотреть всех</a>
      </Link>
    </Container>
  );
}

export default DashboardPage;
