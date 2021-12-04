import { useGlobalContext } from 'context/global';
import { HeaderContainer } from './header.styles';
import UserMenu from './userMenu.component';

const HeaderComponents = () => {
  const { user } = useGlobalContext();

  console.log({ user });

  return user?.status === 'success' ? (
    <HeaderContainer>
      <UserMenu user={user} />
    </HeaderContainer>
  ) : (
    <></>
  );
};

export default HeaderComponents;
