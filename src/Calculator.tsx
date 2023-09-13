import { useState } from 'react'

interface OperationFunctions {
    [symbol: string]: (a: number,b :number) => number
}

const Calculator: React.FC = () => {
    const [curr, setCurr] = useState<number>(0)
    const [op, setOp] = useState<string>("")
    const [store, setStore] = useState<number>(0)
    const [newCalculation, setNewCalculation] = useState<boolean>(true)

    const getNumFunction = (n: number) => () => {
        if(newCalculation) {
            setCurr(n)
            setNewCalculation(false)
            return
        }
        setCurr(curr * 10 + n)
    }

    const getOpFunction = (operation: string) => () => {
        setOp(operation)
        setStore(curr)
        setCurr(0)
        setNewCalculation(false)
    }

    const calculateResults = () => {
        const operations: OperationFunctions = {
            "+": (a: number, b: number): number => a+b,
            "-": (a: number, b: number): number => a-b,
            "*": (a: number, b: number): number => a*b,
            "/": (a: number, b: number): number => a/b,
        }

        if(op !== "") {
            var results = operations[op](curr, store)
            setCurr(results)
            setOp("")
        } else {
            setCurr(curr)
        }

        setStore(0)
        setNewCalculation(true)
    }

    const reset = () => {
        setCurr(0)
        if(store == 0) {
            setStore(0)
            setOp("")
            setNewCalculation(true)
        } 
    }

    return (
        <>
            <h1 className="mx-auto my-10 text-4xl">Calculator</h1>

            <div className="bg-blue-400 mx-auto w-1/2 px-10 rounded-lg">
                <div className="calc-screen">
                    <span>{curr}</span>
                </div>

                
                <div className="calc-key-container">
                    {
                        ["+", "-", "*", "/"].map(operation => 
                            <button className="calc-keys" onClick={getOpFunction(operation)}>{operation}</button>
                        )
                    }
                    <button className="calc-keys" onClick={calculateResults}>=</button>
        

                    {
                        Array.from(Array(10).keys()).map(n => <button className="calc-keys" onClick={getNumFunction(n)}>{n}</button>)
                    }

                    <button className="calc-keys col-start-5 hover:shadow-red-800" onClick={reset}>Reset</button>
                </div>        
            </div>
            
        </>
    )
}

export default Calculator