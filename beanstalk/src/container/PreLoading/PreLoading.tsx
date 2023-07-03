import{PageContainer, Ball, Ballcontainer, Title, Typewriter, ErrorMessage} from './PreLoading.styles';

const PreLoading = ({severFailed}: {severFailed: boolean}) => {
    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                <PageContainer>
                    <Ballcontainer>
                        <Ball></Ball>
                    </Ballcontainer>
                    <Title>Beanstalk</Title>
                </PageContainer>
                {!severFailed && <Typewriter>LOADING...</Typewriter> }
                {severFailed && 
                <>
                    <ErrorMessage>Server failed to respond<br /> Please try again later</ErrorMessage>
                </>}
            </div>
        </>
    );
}

export default PreLoading;