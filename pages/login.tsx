import type { NextPage } from 'next';
import styled from 'styled-components';
import LoginForm from '../components/Forms/login.component';
// import RegisterForm from '../components/Forms/register.component';

const PageContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: auto;
  margin-top: 200px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginPage: NextPage = () => {
  return (
    <PageContainer>
      <LoginForm />
    </PageContainer>
  );
};

export default LoginPage;
