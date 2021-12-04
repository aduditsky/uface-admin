import { IUser } from 'context/global';
import { useEffect, useRef, useState } from 'react';
import {
  ListStyles,
  UserHeader,
  UserMenuStyles,
  UserPicture,
} from './header.styles';

//interfaces

interface IProps {
  user: IUser | null;
}

const UserMenu = ({ user }: IProps) => {
  const headUser = useRef<HTMLDivElement | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const [x, setX] = useState<number | undefined>(
    headUser.current?.getBoundingClientRect().right
  );
  const [y, setY] = useState<number | undefined>(
    headUser.current?.getBoundingClientRect().bottom
  );

  useEffect(() => {
    setX(headUser.current?.getBoundingClientRect().right);
    setY(headUser.current?.getBoundingClientRect().bottom);
  }, [isOpen]);

  console.log({ x, y });

  return (
    user && (
      <UserMenuStyles>
        <UserHeader
          ref={headUser}
          onClick={() => {
            setOpen(!isOpen);
          }}
        >
          <UserPicture>
            {user.image ? (
              <img src={user.image} alt='Фото' />
            ) : (
              <i className='fas fa-user'></i>
            )}
          </UserPicture>

          <span>{user.login}</span>

          {isOpen ? (
            <i className='fas fa-chevron-up'></i>
          ) : (
            <i className='fas fa-chevron-down'></i>
          )}
        </UserHeader>
        {isOpen && <MenuList t={y} l={x} />}
      </UserMenuStyles>
    )
  );
};

interface IList {
  t: number | undefined;
  l: number | undefined;
}
function MenuList({ t, l }: IList) {
  return <ListStyles w={230} t={t} l={l}></ListStyles>;
}

export default UserMenu;
