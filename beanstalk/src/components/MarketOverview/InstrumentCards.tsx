import { useState } from "react"
import {TableCell, TableColumn, TableRow, ChangesContainer, ChangesCell, ChangesText, ToolButton, ToolImage} from "./InstrumentCards.styles"
import InstrumentLineChart from "./InstrumentLineChart"
import { motion } from 'framer-motion';

export default function InstrumentCards({instrumentInfo, animationEnabled, searchMode}: {instrumentInfo: any, animationEnabled: boolean, searchMode?: boolean}) {
    const [showValue, setShowValue] = useState(true)

    if (instrumentInfo[0].success === false) {
        return ("")
    }
    return (
        <>
            {!searchMode?
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
            
            {instrumentInfo.map((item: any) => {
                const chartData = {
                    name: item.symbol,
                    data: item.chartData
                }
                let filledColor: string[] =
                    item.movement === "+" ? ['#1d8038', '#2B8E3F'] :
                    item.movement === "-" ? ['#d32f2f', '#d32f2f'] :
                    ['#efefef', '#efefef'];

                return(
                    <TableRow>
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
                                <ToolImage src="icons/dot-instrumentcard.svg" width={'15px'}></ToolImage>
                            </ToolButton>
                        </TableCell>
                    </TableColumn>
                </TableRow>
            )
        })}
    </>
    )
}