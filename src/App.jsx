import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Reminders from './pages/Reminders'; // ⏰ New
import Settings from './pages/Settings';   // ⚙️ New
import CompletedTasks from './pages/CompletedTasks';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reminders" element={<Reminders />} />  {/* ⏰ */}
        <Route path="/settings" element={<Settings />} />     {/* ⚙️ */}
        <Route path="/completed" element={<CompletedTasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
