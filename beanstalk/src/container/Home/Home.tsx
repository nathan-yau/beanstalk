import React from 'react';
import Guest from './GuestHome';
import {HomeContainer} from './Home.styles';
const Home: React.FC = () => {

  return (
    <HomeContainer>
      <Guest></Guest>
    </HomeContainer>
  );
};

export default Home;