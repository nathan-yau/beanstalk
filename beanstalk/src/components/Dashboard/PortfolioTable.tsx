import {TableRow, TableHeader, TableCell, TableColumn, ChangesCell} from "./PortfolioTable.styles";

export default function PortfolioTable({holdingData}: {holdingData: any}) {
    return (
    <TableRow>
          <TableHeader>
                <TableCell width={"20%"} style={{textAlign: "unset"}}>Symbol</TableCell>
                <TableCell width={"10%"}>Shares</TableCell>
                <TableCell width={"30%"}>Changes</TableCell>
                <TableCell width={"25%"}>Profit/Loss</TableCell>
                <TableCell width={"3%"} style={{textAlign: "right", transform: "translateX(50%)"}}></TableCell>
          </TableHeader>
            {holdingData.map((holding: any) => {
                {console.log(holding.symbol)}
                return (
                    <TableColumn style={{height: "50px"}}>
                        <TableCell width={"20%"} style={{textAlign: "unset"}}>{holding.symbol}</TableCell>
                        <TableCell width={"10%"}>{holding.shares}</TableCell>
                        <ChangesCell changes={holding.priceDelta}>
                            <TableCell width={"unset"}>{holding.priceDelta}</TableCell>
                            {/* <TableCell width={"unset"} style={{fontSize: "0.75rem"}}>{holding.percentageDelta}</TableCell> */}
                        </ChangesCell>
                        <TableCell width={"25%"} style={{color: holding.priceDelta > 0? "green": holding.priceDelta === "0.00"? "grey": "red"}}>{holding.totalPLinBase}</TableCell>
                        <TableCell width={"3%"} style={{textAlign: "right", transform: "translateX(50%)"}}>
                          <div style={{display: "flex", justifyContent: "right"}}>
                              <img src="icons/dot-instrumentcard.svg" width={'15px'}></img>
                          </div>
                        </TableCell>
                    </TableColumn>
                )
            })}
    </TableRow>
    )}
          {/* {holdingData? 
          holdingData.map((holding, index) => {
            const isDetailsDisplayed = displayDetails[index];
            return (
              <>
                <div style={{display: "flex",  border: "1px solid grey",  margin: "0.2em 0em", justifyContent: "center", alignItems: "center"}} onClick={()=> {setDisplayDetails((prevState) => ({...prevState, [index]: !isDetailsDisplayed,}))}}>
                  <span style={{fontSize: "1rem", fontWeight: 600, flexBasis: "20%"}}>{holding.symbol}</span>
                  <span style={{flexBasis: "10%", textAlign: "center"}}>{holding.shares}</span>
                  <div style={{display: "flex", flexDirection: "column", flexBasis: "30%", alignItems: "center"}}>
                    <span>{holding.priceDelta}</span>
                    <span>{holding.percentageDelta}</span>
                  </div>
                  <span style={{flexBasis: "25%", textAlign: "center"}}>{holding.totalPLinBase}</span>
                </div>
                {/* {isDetailsDisplayed && (
                <div style={{display: "flex",  border: "1px solid black", alignContent: "center", textAlign: "left"}}>
                  <span style={{margin: "0.5rem 0rem 0 0.5rem"}}>Cost: {holding.cost}</span>
                </div>
                )} */}
            // )
        //   })
        //   : null} */}
    