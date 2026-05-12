import './App.css'
import { CardSidebar } from './CardSidebar'
import Cards from './Cards'
import { RemoveCardByIdBox } from './RemoveCardByIdBox'
import { SelectedCardPanel } from './SelectedCardPanel'
import { SessionSimulator } from './SessionSimulator'

function App() {
  return (
    <>
      <SessionSimulator />
      <main className="page-main">
        <CardSidebar />
        <div className="page-main__column">
          <SelectedCardPanel />
          <Cards />
        </div>
      </main>
      <RemoveCardByIdBox />
    </>
  )
}

export default App
