import { useState } from 'react';
import Link from 'next/link';

//Context
import { useGlobalContext } from 'context/global';

//Styles
import {
  Button,
  LeftMenuContainer,
  LeftMenuListStyles,
  ListItemStyles,
  Logo,
} from './leftmenu.styles';

const LeftMenuComponent = () => {
  const { user } = useGlobalContext();

  const [isOpen, setOpen] = useState<boolean>(false);

  return user?.status === 'success' ? (
    <LeftMenuContainer open={isOpen}>
      <Logo open={isOpen}>
        <Link href='/dashboard'>
          <a>
            <img src='/images/tsu_logo.jpg' />{' '}
            <span className={isOpen ? 'active' : ''}>Админ-панель</span>
          </a>
        </Link>
      </Logo>
      <Button
        type='button'
        onClick={() => {
          setOpen(!isOpen);
        }}
        width={40}
      >
        <i
          className={`fas fa-chevron-right`}
          style={
            isOpen
              ? {
                  transform: 'rotate(180deg)',
                  transition: '0.3s ease',
                  color: 'white',
                }
              : { transition: '0.3s ease', color: 'white' }
          }
        ></i>
      </Button>
      <LeftMenuListStyles>
        <ListItemStyles>
          <i className='fas fa-address-book'></i>{' '}
          <span className={isOpen ? 'active' : ''}>Отделы и сотрудники</span>
        </ListItemStyles>
        <ListItemStyles>
          <i className='fas fa-desktop'></i>{' '}
          <span className={isOpen ? 'active' : ''}>Устройства</span>
        </ListItemStyles>
      </LeftMenuListStyles>
    </LeftMenuContainer>
  ) : (
    <></>
  );
};

export default LeftMenuComponent;
