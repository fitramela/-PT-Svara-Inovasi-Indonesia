import { Link, useNavigate } from 'react-router-dom';
import "../cssPage/Sidebar.css"; // Custom CSS for styling

const Sidebar = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="sidebar">
      <button onClick={handleGoBack}>Go Back</button>
      <div className="page-links">
        <Link to="/">Home</Link>
        <Link to="/collected">Collected Pokemon</Link>
        <Link to="/page/2">Page 2</Link>
        <Link to="/page/3">Page 3</Link>
        {/* Add more links as needed */}
      </div>
    </div>
  );
};

export default Sidebar;
