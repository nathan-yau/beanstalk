import {useEffect} from 'react';
import { PulseOuterDiv, PulseInnerDiv, PulseText } from '../../components/SharedComponents/Animation';


export const Logout = ({authorized}: {authorized: boolean}) => {

    useEffect(() => {
        if (!authorized) {
            window.location.href = "/";
        } else {
            fetch('/api/logout', {
                method: 'GET',
                credentials: 'include',
            }).then(() => {
                window.location.href = "/";
            })
        }
    }, [])

    return (
        <PulseOuterDiv>
            <PulseInnerDiv></PulseInnerDiv>
            <PulseText>Logging out</PulseText>
        </PulseOuterDiv>
    )
}

export default Logout;