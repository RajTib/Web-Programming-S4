import Card from "./components/Card"

const App = () => {
  return (
    <div className="card">
      <Card name="Raj" course="React" />
      <Card name="Tomas" course="Java" />
      <Card name="Kirday" course="HTML" />
      <Card name="Seo Bencho" course="CSS" />
    </div>
  )
}

export default App
