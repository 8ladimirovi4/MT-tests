import './App.css'
import { AuthPanel } from './AuthPanel'
import { CardSidebar } from './CardSidebar'
import Cards from './Cards'
import { RemoveCardByIdBox } from './RemoveCardByIdBox'
import { SelectedCardPanel } from './SelectedCardPanel'

function App() {
  return (
    <>
      <AuthPanel />
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
