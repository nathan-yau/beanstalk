import Guest from './GuestHome';
import {HomeContainer} from './Home.styles';

const Home = ({authorized}: {authorized: boolean}) => {
  
  return (
    <HomeContainer>
      <Guest></Guest>
    </HomeContainer>
  );
};

export default Home;