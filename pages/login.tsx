import type { NextPage } from 'next';
import RegisterForm from '../components/Forms/register.component';

const LoginPage: NextPage = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <div>
        <h2>Entry form</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default LoginPage;
