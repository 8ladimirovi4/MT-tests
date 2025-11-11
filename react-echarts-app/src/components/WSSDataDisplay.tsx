import React from 'react'

export interface WebSocketData {
  id: number
  value: number
  temperature: string
  humidity: string
  pressure: string
  timestamp: string
  status: string
}

interface WSSDataDisplayProps {
  data: WebSocketData | null
  isConnected: boolean
}

const WSSDataDisplay: React.FC<WSSDataDisplayProps> = ({ data, isConnected }) => {
  if (!data) {
    return null
  }

  return (
    <div style={{ 
      marginBottom: '20px', 
      padding: '15px', 
      backgroundColor: isConnected ? '#e8f5e9' : '#fff3e0', 
      borderRadius: '4px',
      border: `2px solid ${isConnected ? '#4caf50' : '#ff9800'}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <strong style={{ fontSize: '16px' }}>WebSocket Data:</strong>
        <span style={{ 
          padding: '4px 8px', 
          borderRadius: '4px', 
          backgroundColor: isConnected ? '#4caf50' : '#ff9800',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '10px',
        fontFamily: 'monospace',
        fontSize: '14px'
      }}>
        <div><strong>ID:</strong> {data.id}</div>
        <div><strong>Value:</strong> {data.value}</div>
        <div><strong>Temperature:</strong> {data.temperature}°C</div>
        <div><strong>Humidity:</strong> {data.humidity}%</div>
        <div><strong>Pressure:</strong> {data.pressure} hPa</div>
        <div><strong>Status:</strong> {data.status}</div>
        <div style={{ gridColumn: '1 / -1' }}>
          <strong>Timestamp:</strong> {new Date(data.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  )
}

export default WSSDataDisplay

