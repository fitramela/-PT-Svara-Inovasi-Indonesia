import { Link, useNavigate } from 'react-router-dom';
import "../cssPage/Sidebar.css"; 

const Sidebar = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div className="sidebar">
      <button onClick={handleGoBack}>Go Back</button>
      <div className="page-links">
        <Link to="/">Home</Link>
        <Link to="/collected">Collected Pokemon</Link>
      </div>
    </div>
  );
};

export default Sidebar;
