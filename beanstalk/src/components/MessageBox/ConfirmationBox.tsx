const ConfirmationBox = ({instrumentName, setShowConfirmationBox, mode}: {instrumentName: string, setShowConfirmationBox: Function, mode: string}) => {

    const cancelAction = () => {
        setShowConfirmationBox(false);
    }

    return (
        <>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "fixed", backgroundColor: "rgba(231, 233, 245, 0.95)", borderRadius: "0.5em", padding: "20px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", zIndex: "4", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", height: "250px"}}>
            <img src="/icons/loading-validation.svg" width="100px" height="100px" style={{marginBottom: "20px"}}></img>
            <span style={{fontSize: "1.5rem", fontWeight: "600"}}>{instrumentName}</span>
            <span style={{fontSize: "1rem", fontWeight: "600"}}>Confirm to add to {mode}</span>
            <div style={{display: "flex", justifyContent: "space-evenly", width: "100%", margin: "20px 0px"}}>
                <button>Confirm</button>
                <button onClick={cancelAction}>Cancel</button>
            </div>
        </div>
        </>
    );
}

export default ConfirmationBox;