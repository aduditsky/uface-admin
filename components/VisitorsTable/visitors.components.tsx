import { NavItem, Table } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import {
  CogButton,
  CogContainer,
  InputStyles,
  LabelStyles,
  OutData,
  SelectorContainer,
} from './visitors.styles';
import { ListStyles } from './visitors.styles';

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

console.log();
const VisitorsTable = () => {
  const [filtering, setFilter] = useState([
    { property: '', name: 'ФИО' },
    { property: '', name: 'Дата' },
    { property: '', name: 'Отдел' },
    { property: '', name: 'Устройство' },
    { property: '-none', name: 'Событие' },
    { property: '-none', name: 'Причина' },
    { property: '-none', name: 'Значение' },
    { property: '-none', name: 'Температура доступа' },
    { property: '-none', name: 'Тип доступа' },
    { property: '-none', name: 'Номера машины' },
    { property: '-none', name: 'Направление' },
  ]);

  const cog = useRef<HTMLDivElement | null>(null);
  const [isOpen, setOpen] = useState(false);

  const [dimensions, setDimensions] = useState<{
    x: number;
    y: number;
  }>({
    x: cog.current?.getBoundingClientRect().right || 0,
    y: cog.current?.getBoundingClientRect().bottom || 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = (): void => {
        setDimensions({
          x: cog.current?.getBoundingClientRect().right || 0,
          y: cog.current?.getBoundingClientRect().bottom || 0,
        });
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize);
      return (): void => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize);
      };
    }
  }, [isOpen, dimensions]);

  return (
    <>
      <CogContainer>
        <CogButton
          className={isOpen ? 'fa-solid fa-gear active' : 'fa-solid fa-gear'}
          ref={cog}
          onClick={() => {
            setOpen(!isOpen);
            setDimensions({
              x: cog.current?.getBoundingClientRect().right || 0,
              y: cog.current?.getBoundingClientRect().bottom || 0,
            });
          }}
        ></CogButton>
        {isOpen && (
          <ListStyles
            style={{ top: dimensions.y + 5, left: dimensions.x - 190 }}
            w={190}
          >
            {filtering.map((item, i) => (
              <SelectorContainer key={i}>
                <LabelStyles>{item.name}</LabelStyles>
                <InputStyles
                  type='checkbox'
                  checked={item.property === '' ? true : false}
                  onChange={() => {
                    const updatedList = filtering.map((filt) => {
                      if (filt.name === item.name) {
                        return {
                          ...filt,
                          property:
                            filtering[i].property === '-none' ? '' : '-none',
                        };
                      }
                      return filt;
                    });
                    setFilter(updatedList);
                  }}
                />
              </SelectorContainer>
            ))}
          </ListStyles>
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
        <OutData>Нет данных</OutData>
      )}
    </>
  );
};

export default VisitorsTable;
