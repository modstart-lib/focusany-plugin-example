import {useState} from 'react'
import logo from '/logo.svg'
import './App.css'
import {Button} from "@arco-design/web-react";

function App() {
    const [count, setCount] = useState(0)
    return (
        <>
            <div className="text-center">
                <a href="https://react.dev" className="inline-block" target="_blank">
                    <img src={logo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <div className="text-2xl py-10">Vite + React + TailwindCSS + Arco</div>
            <div>
                <Button type="primary"
                        onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
            </div>
        </>
    )
}

export default App
