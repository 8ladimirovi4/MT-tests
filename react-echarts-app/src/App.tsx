import { useState } from 'react'
import ChartComponent from './components/Chart'
import DummiPage from './components/DummiPage'
import './App.css'

function App() {
  const [isDummiPage, setIsDummiPage] = useState(false)

  const handleDummiPage = () => {
    setIsDummiPage((prev)=> !prev)
  }
  return (
    <div className="app-container">
      <h1>Apache echarts</h1>
      <button onClick={handleDummiPage}>Toggle Page</button>
      {isDummiPage ? <DummiPage /> : <ChartComponent />}
    </div>
  )
}

export default App
