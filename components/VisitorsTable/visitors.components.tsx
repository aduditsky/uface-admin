import { NavItem, Table } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import {
	CogButton,
	CogContainer,
	InputStyles,
	LabelStyles,
	SelectorContainer,
} from './visitors.styles';
import { ListStyles } from './visitors.styles';
const filtering = [
	{ property: '', name: 'Дата' },
	{ property: '', name: 'ФИО' },
	{ property: '', name: 'Отдел' },
	{ property: '', name: 'Устройство' },
	{ property: '-none', name: 'Событие' },
	{ property: '-none', name: 'Причина' },
	{ property: '-none', name: 'Значение' },
	{ property: '-none', name: 'Температура доступа' },
	{ property: '-none', name: 'Тип доступа' },
	{ property: '-none', name: 'Номера машины' },
	{ property: '-none', name: 'Направление' },
];
const visitorsTest = [
	{
		date: '28 Июн 2021 15:20:01',
		fio: 'none',
		department: 'none',
		device: 'none',
		event: 'none',
		reason: 'none',
		meaning: 'none',
		temperatureOfAccess: 'none',
		typeOfAccess: 'none',
		numberOfCar: 'none',
		direction: 'none1',
	},
	{
		date: '28 Июн 2021 15:20:01',
		fio: 'none',
		department: 'none',
		device: 'none',
		event: 'none',
		reason: 'none',
		meaning: 'none',
		temperatureOfAccess: 'none',
		typeOfAccess: 'none',
		numberOfCar: 'none',
		direction: 'none',
	},
	{
		date: '28 Июн 2021 15:20:01',
		fio: 'none',
		department: 'none',
		device: 'none',
		event: 'none',
		reason: 'none',
		meaning: 'none',
		temperatureOfAccess: 'none',
		typeOfAccess: 'none',
		numberOfCar: 'none',
		direction: 'none',
	},
	{
		date: '28 Июн 2021 15:20:01',
		fio: 'none',
		department: 'none',
		device: 'none',
		event: 'none',
		reason: 'none',
		meaning: 'none',
		temperatureOfAccess: 'none',
		typeOfAccess: 'none',
		numberOfCar: 'none',
		direction: 'none',
	},
];

console.log(filtering);
console.log();
const VisitorsTable = () => {
	const [reload, setReload] = useState(false);
	const checkBoxHandler = (x: number) => {
		setReload(!reload);
		console.log(filtering);
		if (filtering[x].property === '-none') {
			filtering[x].property = '';
		} else {
			filtering[x].property = '-none';
		}
	};
	const cog = useRef<HTMLDivElement | null>(null);
	const [x, setX] = useState<number | undefined>(
		cog.current?.getBoundingClientRect().right
	);
	const [y, setY] = useState<number | undefined>(
		cog.current?.getBoundingClientRect().bottom
	);
	const [isOpen, setOpen] = useState(false);
	useEffect(() => {
		setX(cog.current?.getBoundingClientRect().right);
		setY(cog.current?.getBoundingClientRect().bottom);
	}, [isOpen]);
	console.log(
		filtering.filter((item) => item.property !== '-none').length === 0
	);
	return (
		<>
			<CogContainer>
				<CogButton
					className={isOpen ? 'fa-solid fa-gear active' : 'fa-solid fa-gear'}
					ref={cog}
					onClick={() => {
						setOpen(!isOpen);
					}}
				></CogButton>
				{isOpen ? (
					<ListStyles l={x} t={y} w={190}>
						{filtering.map((item, i) => (
							<SelectorContainer key={i}>
								<LabelStyles>{item.name}</LabelStyles>
								<InputStyles
									type='checkbox'
									checked={item.property === '' ? true : false}
									onChange={() => checkBoxHandler(i)}
								/>
							</SelectorContainer>
						))}
					</ListStyles>
				) : (
					<></>
				)}
			</CogContainer>
			{filtering.filter((item) => item.property !== '-none').length !== 0 ? (
				<Table striped borderless hover responsive size='lg'>
					<thead>
						<tr>
							{filtering.map((item, key) => (
								<th className={'d' + item.property} key={key}>
									{item.name}
								</th>
							))}
						</tr>
					</thead>

					<tbody>
						{visitorsTest.map((item, key) => (
							<tr key={key}>
								<td className={'d' + filtering[0].property}>{item.date}</td>
								<td className={'d' + filtering[1].property}>{item.fio}</td>

								<td className={'d' + filtering[2].property}>
									{item.department}
								</td>
								<td className={'d' + filtering[3].property}>{item.device}</td>
								<td className={'d' + filtering[4].property}>{item.event}</td>
								<td className={'d' + filtering[5].property}>{item.reason}</td>
								<td className={'d' + filtering[6].property}>{item.meaning}</td>
								<td className={'d' + filtering[7].property}>
									{item.temperatureOfAccess}
								</td>
								<td className={'d' + filtering[8].property}>
									{item.typeOfAccess}
								</td>
								<td className={'d' + filtering[9].property}>
									{item.numberOfCar}
								</td>
								<td className={'d' + filtering[10].property}>
									{item.direction}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<div>Нет данных</div>
			)}
		</>
	);
};

export default VisitorsTable;
