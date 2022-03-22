import { useGlobalContext } from 'context/global';
import { useRouter } from 'next/router';
import { HeaderContainer } from './header.styles';
import UserMenu from './userMenu.component';

const HeaderComponents = () => {
  const router = useRouter();
  const { user } = useGlobalContext();

  // console.log({ user });

  return user?.status === 'success' && router.pathname !== '/login' ? (
    <HeaderContainer>
      <UserMenu user={user} />
    </HeaderContainer>
  ) : (
    <></>
  );
};

export default HeaderComponents;
