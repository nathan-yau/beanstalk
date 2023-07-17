import { Container, ContainerRow, Heading, ToggleDiv, SwitchDiv, Switch, DailyBalance, DailyChanges, LastUpdate, PlaceholderText } from "./DailyPerformance.styles";
import { useState } from 'react';


export default function DailyPerformance({baseCurrency, currentCapital, capitalChange, percentageChange, lastUpdate}: {baseCurrency: string, currentCapital: string, capitalChange: string, percentageChange: string, lastUpdate: string}) {
    const [displayValue, setDisplayValue] = useState(true);

    return (
        <Container>
            <ContainerRow>
                <Heading>Daily Performance ({baseCurrency})</Heading>
                <ToggleDiv>
                    <Heading>{displayValue? "$": `%`}</Heading>
                    <SwitchDiv className="form-check form-switch">
                        <Switch className="form-check-input" type="checkbox" onChange={() => {setDisplayValue(!displayValue)}}/>
                    </SwitchDiv>
                </ToggleDiv>
            </ContainerRow>
            <ContainerRow>
                <DailyBalance>{currentCapital}</DailyBalance>
                <DailyChanges changes={capitalChange}> {displayValue? capitalChange: `${percentageChange}%`}</DailyChanges>
            </ContainerRow>
            <LastUpdate>{lastUpdate}</LastUpdate>
        </Container>
    );
}

export const DailyPerformanceSkeleton = () => {
    return (
        <Container style={{height: "100px"}}>
            <PlaceholderText style={{width: '50%', borderRadius: '5px', height: '20%'}}></PlaceholderText>
            <PlaceholderText style={{marginTop: '0.7em', borderRadius: '5px'}}></PlaceholderText>
            {/* <PlaceholderText style={{height: '10%'}}></PlaceholderText> */}
        </Container>
    );
}
