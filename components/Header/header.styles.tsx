import styled from 'styled-components';

export const HeaderContainer = styled.header`
  height: 50px;
  font-size: 1em;
  width: 100%;
  top: 0;
  left: 0;
  padding: 0 64px;

  z-index: 100;

  display: flex;
  justify-content: flex-end;
  gap: 30px;
  align-items: center;
  position: fixed;

  background-color: #eee;
`;

export const UserMenuStyles = styled.div`
  display: flex;
`;

interface IUserHeader {
  className: string;
}
export const UserHeader = styled.div<IUserHeader>`
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  cursor: pointer;
  padding: 0.3em;

  transition: 0.3s cubic-bezier(0.77, 0, 0.175, 1);
  &:hover {
    background-color: #ccc;
  }

  &.active {
    background-color: #ccc;
  }
`;

export const UserPicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 32px;
  height: 32px;

  background-color: #fff;
  border: 2px solid #180081;
  border-radius: 50%;

  i {
    margin-top: 5px;
    font-size: 25px;
  }
`;

interface ICoord {
  w: number;
}
export const ListStyles = styled.ul<ICoord>`
  width: ${(props) => props.w}px;
  /* height: 300px; */
  padding: 1em 0;
  background-color: #eee;
  position: fixed;
`;

export const ListItem = styled.li`
  width: 100%;
  display: flex;
  padding: 0.5em;
`;
