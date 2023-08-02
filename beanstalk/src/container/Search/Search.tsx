import HomeSearchBar from "../../components/HomeSearchBar/HomeSearchBar"
import {HomeContainer} from '../Home/Home.styles';

const Search = ({authorized, nextUpdate}: {authorized: boolean, nextUpdate: number}) => {
    return (
    <>
    <HomeContainer>
        <HomeSearchBar authorized={authorized} nextUpdate={nextUpdate}></HomeSearchBar>
    </HomeContainer>
    </>
    )
}

export default Search;