import styled from 'styled-components';
export const CogContainer = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
`;
interface ICoord {
	t: number | undefined;
	l: number | undefined;
	w: number | undefined;
}
export const ListStyles = styled.ul<ICoord>`
	width: ${(props) => props.w}px;
	/* height: 300px; */
	padding: 1em 0;
	top: ${(props) => props.t}px;
	left: ${(props) => props.l - props.w}px;
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
