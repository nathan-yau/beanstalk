import { useState } from "react"
import {TableCell, TableColumn, TableRow, ChangesContainer, ChangesCell, ChangesText, ToolButton, ToolImage} from "./InstrumentCards.styles"
import InstrumentLineChart from "./InstrumentLineChart"
import { motion } from 'framer-motion';
import ConfirmationBox from '../../components/MessageBox/ConfirmationBox';

export default function InstrumentCards({instrumentInfo, animationEnabled, mode, loadingMarketInfo, authorized}: {instrumentInfo: any, animationEnabled: boolean, mode: string, loadingMarketInfo?: boolean, authorized: boolean}) {
    console.log(instrumentInfo)
    if (instrumentInfo.success === false) {
        return ("")
    } else {
        instrumentInfo = instrumentInfo.data.stockInfo
    }

    const [showValue, setShowValue] = useState(true)
    const [showConfirmationBox, setShowConfirmationBox] = useState(false)
    const [confirmationType, setConfirmationType] = useState("")
    const [toolOpenStates, setToolOpenStates] = useState(
        instrumentInfo.map(() => false)
      );
    

    const ToggleWatchlist = () => {
        setShowConfirmationBox(!showConfirmationBox)
        setConfirmationType("watchlist")
    }

    const TogglePortfolio = () => {
        setShowConfirmationBox(!showConfirmationBox)
        setConfirmationType("portfolio")
    }
    
    const toggleToolOpen = (index: number) => {
        const newToolOpenStates = [...toolOpenStates];
        newToolOpenStates[index] = !newToolOpenStates[index];
        for (let i = 0; i < newToolOpenStates.length; i++) {
            if (i !== index) {
                newToolOpenStates[i] = false;
            }
        }
        setToolOpenStates(newToolOpenStates);
    };

    return (
        <>
            {mode !== "search"?
            <TableRow>
                <TableColumn>
                    <TableCell width={"20%"} style={{textAlign: "unset"}}>Symbol</TableCell>
                    <TableCell width={"20%"}>Trend</TableCell>
                    <TableCell width={"24%"}>Price</TableCell>
                    <TableCell width={"20%"}>Changes</TableCell>
                    <TableCell width={"3%"} style={{transform: "translateX(50%)"}}></TableCell>
                </TableColumn>
            </TableRow>
            : 
            
            <div style={{fontWeight: "600", marginTop: "0.75rem"}}>
                <label>Search Result:</label>    
            </div>}
            <div style={{position: 'relative'}}>
            <motion.div initial={{ opacity: 0 }} animate={{opacity: 1.0 }} exit={{ opacity: 0}} transition={{ duration: 0.5 }}>
                { loadingMarketInfo? 
                    <div style={{fontWeight: "600", display: "flex", border: "1px solid grey", marginTop: "0.2rem", justifyContent: "center", alignItems: "center", position: "absolute", borderRadius: "5px", backgroundColor: "rgba(255,255,255,0.6)", height: "98%", zIndex: 3, width: "100%"}}>
                        <img src={`/icons/loading-validation.svg`} alt="" width={100} height={100} className='validated'></img>
                    </div> 
                : 
                null}
            </motion.div>
            {instrumentInfo.map((item: any, index: number) => {
                const chartData = {
                    name: item.symbol,
                    data: item.chartData
                }
                let filledColor: string[] =
                item.movement === "+" ? ['#1d8038', '#2B8E3F'] :
                item.movement === "-" ? ['#d32f2f', '#d32f2f'] :
                ['#b0aeae', '#b0aeae'];
                return(
                    <>
                    {toolOpenStates[index] && showConfirmationBox? <ConfirmationBox instrumentName={item.symbol} holding={item.portfolio} watchlist={item.watchlist} setShowConfirmationBox={setShowConfirmationBox} mode={confirmationType}></ConfirmationBox> : ""}
                    <TableRow style={{zIndex: 2}}>
                        <TableColumn style={{borderRadius: "5px"}}>
                            <TableCell width={"20%"} style={{textAlign: "unset"}}>{item.symbol}</TableCell>
                            <TableCell width={"20%"}>
                                <InstrumentLineChart chartData={[chartData]} chartColor={filledColor} animationEnabled={animationEnabled}></InstrumentLineChart>
                                </TableCell>
                            <TableCell width={"20%"} style={{textAlign: "right"}}>{item.currentPrice}</TableCell>
                            <TableCell width={"26%"}>
                                <ChangesContainer onClick={() => setShowValue(!showValue) }>
                                    <ChangesCell color={filledColor[0]}>
                                        <ChangesText>
                                                {showValue ?
                                                    <motion.div key="priceChange" initial={{ x: 0, y: -30, opacity: 0.2 }} animate={{ x: 0, y: 0, opacity: 1.0 }} exit={{ x: 0, y: -30, opacity: 0.2 }} transition={{ duration: 0.5 }}>
                                                        {item.movement}
                                                        {item.priceChange.replace("-", "")}
                                                    </motion.div>
                                                    :
                                                    <motion.div key="priceChangePercent" initial={{ x: 0, y: -30, opacity: 0.2 }} animate={{ x: 0, y: 0, opacity: 1.0 }} exit={{ x: 0, y: -30, opacity: 0.2 }} transition={{ duration: 0.5 }}>
                                                        {item.movement}
                                                        {item.priceChangePercent.replace("-", "")}%
                                                    </motion.div>
                                                }
                                        </ChangesText>
                                    </ChangesCell>
                                </ChangesContainer>
                            </TableCell>
                            <TableCell width={"3%"} style={{transform: "translateX(50%)"}}>
                                <ToolButton>
                                    <ToolImage src="icons/dot-instrumentcard.svg" width={'15px'} onClick={()=>{toggleToolOpen(index)}} style={{visibility: authorized? "visible": "hidden"}}></ToolImage>
                                </ToolButton>
                            </TableCell>
                        </TableColumn>
                    </TableRow>
                    {toolOpenStates[index] && authorized ? 
                        <motion.div initial={{ x: 15, y: -30, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1.0 }} exit={{ x: 5, y: -30, opacity: 0 }} transition={{ duration: 0.5 }}>
                            <TableColumn style={{borderRadius: "5px", margin: "-0.5em 0.5em 0.2em 0.5em", zIndex: 1, display: "flex",flexDirection: "row", justifyContent: "start", gap: "50px", padding: "0em 2.5em 0em 1em"}}>
                                <div style={{display: "flex", justifyContent: "space-between", gap: "5px", alignContent: "center", marginTop: "2px", textAlign: "center", padding: "0.2em"}} onClick={ToggleWatchlist}>
                                <img src={mode==="watchlist" || item.watchlist ? "icons/remove-logo.svg": "icons/add-logo.svg"} width={15}></img>
                                    <span style={{ fontSize: "0.80rem", fontWeight: "800", color: "#1c274c"}}>Watchlist</span>
                                </div>
                                <div style={{display: "flex", justifyContent: "space-between", gap: "5px", alignContent: "center", marginTop: "2px", textAlign: "center"}} onClick={TogglePortfolio}>
                                    <img src={item.portfolio? "icons/remove-logo.svg":"icons/add-logo.svg"} width={15}></img>
                                    <span style={{ fontSize: "0.80rem", fontWeight: "800", color: "#1c274c"}}>Portfolio</span>
                                </div>
                            </TableColumn>
                        </motion.div>
                    : ""}
                </>
            )
        })}
        </div>
    </>
    )
}