import { useState, useEffect, useRef } from 'react'
import { Button } from 'primereact/button'
import ChartComponent from './components/Chart'
import DummiPage from './components/DummiPage'
import WSSDataDisplay, { type WebSocketData } from './components/WSSDataDisplay'
import RESTDataDisplay from './components/RESTDataDisplay'
import { checkServerHealth, createWebSocketConnection, closeWebSocketConnection } from './api'
import { config } from './config'
import './App.css'

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
      const data = await checkServerHealth()
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
      closeWebSocketConnection(wsRef.current)
      wsRef.current = null
      setWsConnected(false)
      setWsData(null)
    } else {
      // Подключаемся к WebSocket
      const ws = createWebSocketConnection(config.wsUrl, {
        onOpen: () => {
          setWsConnected(true)
        },
        onMessage: (message) => {
          if (message.type === 'data' && message.data) {
            setWsData(message.data as WebSocketData)
          } else if (message.type === 'welcome') {
            setServerResponse(`WebSocket: ${message.message}`)
          }
        },
        onError: () => {
          setServerResponse('WebSocket connection error')
          setWsConnected(false)
        },
        onClose: () => {
          setWsConnected(false)
          setWsData(null)
          wsRef.current = null
        }
      })
      wsRef.current = ws
    }
  }

  // Очистка при размонтировании компонента
  useEffect(() => {
    return () => {
      closeWebSocketConnection(wsRef.current)
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
      <RESTDataDisplay data={serverResponse} />
      <WSSDataDisplay data={wsData} isConnected={wsConnected} />
      <div style={{height: '50px'}}>
        
      </div>
      {isDummiPage ? <DummiPage /> : <ChartComponent />}
    </div>
  )
}

export default App
