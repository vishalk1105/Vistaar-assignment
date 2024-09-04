import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
function MainLayout({ children }) {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const onLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-100">
      <header className="d-flex justify-content-between bg-dark fixed-top text-white px-4 py-2 ">
        <div className="d-flex">
          <h3 className="me-5 align-self-center">Vistaar Assignment</h3>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <div className="align-self-center">Hello, {name}</div>
          <div className="" onClick={onLogoutClick} role="button">
            <div className="mb-0 align-self-center align-content-center">
              Log Out
            </div>
          </div>
        </div>
      </header>
      <div className="sidebarMainContentDiv">
        <main>{children}</main>
      </div>
      <footer className="footer d-flex bg-dark fixed-bottom text-white justify-content-center px-4 py-2">
        Vistaar Assignment
      </footer>
    </div>
  );
}

export default MainLayout;
