import * as React from 'react';
import { useGlobalContext } from 'context/global';
import { LeftMenuContainer } from './leftmenu.styles';

const LeftMenuComponent = () => {
  const { user } = useGlobalContext();
  return user?.status === 'success' ? (
    <LeftMenuContainer>Меню</LeftMenuContainer>
  ) : (
    <></>
  );
};

export default LeftMenuComponent;
