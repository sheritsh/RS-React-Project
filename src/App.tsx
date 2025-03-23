import { CountryList } from './components/CountryList';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>React Performance</h1>
      </header>
      <main>
        <CountryList />
      </main>
    </div>
  );
}

export default App;
