import Guest from './GuestHome';
import {HomeContainer} from './Home.styles';

const Home = ({authorized, nextUpdate}: {authorized: boolean, nextUpdate: number}) => {
  
  return (
    <HomeContainer>
      <Guest authorized={authorized} nextUpdate={nextUpdate}></Guest>
    </HomeContainer>
  );
};

export default Home;