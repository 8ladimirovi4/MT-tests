import React from 'react'

interface RESTDataDisplayProps {
  data: string | null
}

const RESTDataDisplay: React.FC<RESTDataDisplayProps> = ({ data }) => {
  if (!data) {
    return null
  }

  return (
    <div style={{ 
      marginBottom: '20px', 
      padding: '10px', 
      backgroundColor: '#f5f5f5', 
      borderRadius: '4px',
      fontFamily: 'monospace',
      fontSize: '12px'
    }}>
      <strong>Server Response:</strong>
      <pre style={{ margin: '5px 0 0 0', whiteSpace: 'pre-wrap' }}>{data}</pre>
    </div>
  )
}

export default RESTDataDisplay

