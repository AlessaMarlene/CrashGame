import './App.css';
import { HistoryProvider } from './Components/Context/HistoryContext';
import { UsersProvider } from './Components/Context/UsersContext';
import Game from './Components/Game/Game';

function App() {
  return (
    <UsersProvider>
      <HistoryProvider>
        <Game/>
      </HistoryProvider>
    </UsersProvider>
  );
}

export default App;
