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

export const UserHeader = styled.div`
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
  t: number | undefined;
  l: number | undefined;
  w: number | undefined;
}
export const ListStyles = styled.div<ICoord>`
  width: ${(props) => props.w}px;
  height: 300px;
  top: ${(props) => props.t}px;
  left: ${(props) => props.l - props.w}px;
  background-color: #eee;
  position: fixed;
`;
