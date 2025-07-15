import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/dashboard">📋 Tasks</Link>
      <Link to="/reminders">⏰ Reminders</Link>
      <Link to="/charts">📊 Charts</Link>
    </aside>
  );
}

export default Sidebar;
