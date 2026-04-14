import { useState } from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Card from './components/Card';
import 'index.css'
function App() {
  const [value, setValue] = useState(0);

  return (
    <div className="App">
      <NavBar />
      <div className="card-container">
        <Card title="Card 1" description="Description of Card 1" />
        <Card title="Card 2" description="Description of Card 2" />
        <Card title="Card 3" description="Description of Card 3" />
        <Card title="Card 4" description="Description of Card 4" />
      </div>

      <Footer />
    </div>
  )
}

export default App
