import { useEffect } from 'react';
import Link from 'next/link';

//Context
import { useGlobalContext } from 'context/global';

//Componenets
import PersonalInfo from 'components/Forms/personal.component';

//Styles
import { DashboardBody } from 'styles/dashboard.styles';

const personal = () => {
  //Временная мера
  const { setUser } = useGlobalContext();
  useEffect(() => {
    if (window) {
      if (sessionStorage.getItem('user')?.length > 0) {
        const user = JSON.parse(sessionStorage.getItem('user'));
        setUser(user);
      }
    }
  }, []);

  return (
    <DashboardBody>
      <Link href='/dashboard'>
        <a>Вернуться в Dashboard</a>
      </Link>
      <PersonalInfo />
    </DashboardBody>
  );
};

export default personal;
