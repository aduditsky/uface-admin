import styled from 'styled-components';
export const CogContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
interface ICoord {
  w: number;
}
export const ListStyles = styled.ul<ICoord>`
  width: ${(props) => props.w}px;
  /* height: 300px; */
  padding: 1em 0;
  background-color: white;
  position: fixed;
  border: 1px solid lightgrey;
`;
export const SelectorContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const CogButton = styled.i`
  cursor: pointer;
  &.active {
    color: #2b2b94;
  }
`;

export const InputStyles = styled.input`
  transform: translateY(-50%);
  margin-right: 8px;
`;

export const LabelStyles = styled.label`
  user-select: none;
  font-size: 12px;
  margin-right: 8px;
`;

export const OutData = styled.div`
  width: 100%;
  padding: 1em;
  font-weight: bold;
  font-size: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Background = styled.div`
  background-color: grey;
  border-radius: 15px;
  min-height: 100px;
  min-width: 75px;
  position: fixed;
`;

export const Foreground = styled.img``;

export const PagginationStyles = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 5px;

  label {
    margin: 0;
  }

  div {
    cursor: pointer;
  }

  .paggy {
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    div {
      padding: 5px;
      line-height: 1;
    }
  }

  .current-offset {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  input {
    width: 40px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  .active {
    font-size: 1.2em;
    font-weight: bold;
  }

  button {
    border: none;
    padding: 0.6em 1em;
    background: none;
    box-shadow: none;
  }
`;
