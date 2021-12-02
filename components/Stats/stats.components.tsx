import * as React from 'react';

//Components
import { StatsContainer } from './stats.styles';

//Interfaces
interface IProps {
  children: React.ReactNode;
}

const StatsComponents = ({ children }: IProps) => {
  return <StatsContainer></StatsContainer>;
};

export default StatsComponents;
