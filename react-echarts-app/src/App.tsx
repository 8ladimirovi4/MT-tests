import { useState } from 'react'
import { Button } from 'primereact/button'
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
      <Button 
        label="Toggle Page" 
        icon="pi pi-arrows-h" 
        onClick={handleDummiPage}
        outlined
      />
      <div style={{height: '50px'}}>
        
      </div>
      {isDummiPage ? <DummiPage /> : <ChartComponent />}
    </div>
  )
}

export default App
