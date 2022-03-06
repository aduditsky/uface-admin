import { Key, useEffect, useState } from 'react';
import type { GetServerSideProps, NextApiRequest, NextPage } from 'next';
import CryptoJS from 'crypto-js';
import VisitorsTable from 'components/clients/clients.components';

//context
import { IUser, useGlobalContext } from 'context/global';

//styles
import { DashboardBody } from 'styles/dashboard.styles';

//components
import StatsComponents from 'components/Stats/stats.components';

//interfaces
interface IProps {}

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

  // // Encrypt
  // let ciphertext = CryptoJS.AES.encrypt(
  //   JSON.stringify(user),
  //   'secret key 123'
  // ).toString();

  // // Decrypt
  // let bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
  // bytes = CryptoJS.AES.decrypt(
  //   sessionStorage.getItem('user'),
  //   'secret key 123'
  // );
  // let originalText = bytes.toString(CryptoJS.enc.Utf8);

  // sessionStorage.setItem('user', ciphertext);

  return (
    <DashboardBody>
      <StatsComponents />
      <VisitorsTable />

      {/* <div>{`JSON: ` + JSON.stringify(user)}</div>
      <br />
      <div>{`Encrypt: ` + ciphertext}</div>
      <br />
      <div>{`Decrypt: ` + originalText}</div> */}
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

export default DashboardPage;
