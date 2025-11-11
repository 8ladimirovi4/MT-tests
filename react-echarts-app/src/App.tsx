import { useState, useEffect, useRef } from 'react'
import { Button } from 'primereact/button'
import ChartComponent from './components/Chart'
import DummiPage from './components/DummiPage'
import './App.css'

interface WebSocketData {
  id: number
  value: number
  temperature: string
  humidity: string
  pressure: string
  timestamp: string
  status: string
}

function App() {
  const [isDummiPage, setIsDummiPage] = useState(false)
  const [serverResponse, setServerResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [wsData, setWsData] = useState<WebSocketData | null>(null)
  const [wsConnected, setWsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  const handleDummiPage = () => {
    setIsDummiPage((prev)=> !prev)
  }

  const handleTestServer = async () => {
    setIsLoading(true)
    setServerResponse(null)
    try {
      const response = await fetch('/api/health')
      const data = await response.json()
      setServerResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setServerResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestWSS = () => {
    if (wsConnected && wsRef.current) {
      // Отключаемся от WebSocket
      wsRef.current.send(JSON.stringify({ type: 'stop' }))
      wsRef.current.close()
      wsRef.current = null
      setWsConnected(false)
      setWsData(null)
    } else {
      // Подключаемся к WebSocket
      const ws = new WebSocket('ws://localhost:3000')
      wsRef.current = ws

      ws.onopen = () => {
        console.log('WebSocket connected')
        setWsConnected(true)
        // Запрашиваем старт потока данных
        ws.send(JSON.stringify({ type: 'start' }))
      }

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          console.log('Received WebSocket message:', message)
          
          if (message.type === 'data' && message.data) {
            setWsData(message.data)
          } else if (message.type === 'welcome') {
            setServerResponse(`WebSocket: ${message.message}`)
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setServerResponse('WebSocket connection error')
        setWsConnected(false)
      }

      ws.onclose = () => {
        console.log('WebSocket disconnected')
        setWsConnected(false)
        setWsData(null)
        wsRef.current = null
      }
    }
  }

  // Очистка при размонтировании компонента
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return (
    <div className="app-container">
      <h1>Apache echarts</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <Button 
          label="Toggle Page" 
          icon="pi pi-arrows-h" 
          onClick={handleDummiPage}
          outlined
        />
        <Button 
          label={isLoading ? "Loading..." : "Test Server"} 
          icon="pi pi-send" 
          onClick={handleTestServer}
          disabled={isLoading}
          outlined
        />
        <Button 
          label={wsConnected ? "Disconnect WSS" : "Test WSS"} 
          icon={wsConnected ? "pi pi-times" : "pi pi-wifi"} 
          onClick={handleTestWSS}
          outlined
          severity={wsConnected ? "danger" : "success"}
        />
      </div>
      {serverResponse && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '10px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          <strong>Server Response:</strong>
          <pre style={{ margin: '5px 0 0 0', whiteSpace: 'pre-wrap' }}>{serverResponse}</pre>
        </div>
      )}
      {wsData && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          backgroundColor: wsConnected ? '#e8f5e9' : '#fff3e0', 
          borderRadius: '4px',
          border: `2px solid ${wsConnected ? '#4caf50' : '#ff9800'}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <strong style={{ fontSize: '16px' }}>WebSocket Data:</strong>
            <span style={{ 
              padding: '4px 8px', 
              borderRadius: '4px', 
              backgroundColor: wsConnected ? '#4caf50' : '#ff9800',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {wsConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '10px',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            <div><strong>ID:</strong> {wsData.id}</div>
            <div><strong>Value:</strong> {wsData.value}</div>
            <div><strong>Temperature:</strong> {wsData.temperature}°C</div>
            <div><strong>Humidity:</strong> {wsData.humidity}%</div>
            <div><strong>Pressure:</strong> {wsData.pressure} hPa</div>
            <div><strong>Status:</strong> {wsData.status}</div>
            <div style={{ gridColumn: '1 / -1' }}>
              <strong>Timestamp:</strong> {new Date(wsData.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      )}
      <div style={{height: '50px'}}>
        
      </div>
      {isDummiPage ? <DummiPage /> : <ChartComponent />}
    </div>
  )
}

export default App
