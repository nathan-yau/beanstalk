import { useState } from 'react';

const ConfirmationBox = ({instrumentName, setShowConfirmationBox, holding, watchlist, mode}: {instrumentName: string, setShowConfirmationBox: Function, watchlist: boolean, holding: boolean, mode: string}) => {
    const [image, setImage] = useState("loading-validation.svg")
    const action = mode === "watchlist" && watchlist || mode === "portfolio" && holding ? "remove": "add"
    const [message, setMessage] = useState(action === "remove"? `Remove from ${mode}`: `Add to ${mode}`)

    const portfolioAction = () => {
        if (action === "remove") {
            fetch(`/api/holdings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    instrumentName: instrumentName,
                    action: action
                })
            })
            .then(res => res.json())
            .then(data => {
                setImage(data.success ? "success-watchlist.svg": "error.svg")
                setMessage(data.success ? `Success`: `Error`)
                setTimeout(() => {
                    window.location.reload()}, 1000)
            })}
        if (action === "add") {
            return
        }
    }

    const watchlistAction = () => {
        fetch(`/api/watchlists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                instrumentName: instrumentName,
                action: action
            })
        })
        .then(res => res.json())
        .then(data => {
            setImage(data.success ? "success-watchlist.svg": "error.svg")
            setMessage(data.success ? `Success`: `Error`)
            setTimeout(() => {
                window.location.reload()}, 1000)
        })}

    const confirmAction = () => {
        if (mode === "portfolio") {
            return (portfolioAction())
        }
        if (mode === "watchlist") {
            return (watchlistAction())
        }
    }


    const cancelAction = () => {
        setShowConfirmationBox(false);
    }


    return (
        <>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "fixed", backgroundColor: "rgba(231, 233, 245, 0.95)", borderRadius: "0.5em", padding: "20px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", zIndex: "4", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", height: "300px"}}>
            <img src={`/icons/${image}`} width="100px" height="100px" style={{margin: "20px"}}></img>
            <span style={{fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.75rem"}}>{instrumentName}</span>
            <span style={{fontSize: "1rem", fontWeight: "600"}}>{message}</span>
            <div style={{display: "flex", justifyContent: "space-evenly", width: "100%", margin: "20px 0px"}}>
                <button onClick={() => {confirmAction()}} className="btn btn-success">Confirm</button>
                <button onClick={cancelAction} className="btn btn-danger">Cancel</button>
            </div>
        </div>
        </>
    );
}

export default ConfirmationBox;