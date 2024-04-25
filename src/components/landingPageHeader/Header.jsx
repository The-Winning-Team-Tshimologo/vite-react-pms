import "./Header.css";
import { useNavigate } from "react-router";

function Header() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/SPSignup")
  }

  return (
    <>
      <div id="header" className="header">
        {/* <span className="flex-row"></span> */}
        <div>
          <img
            className="header__img"
            src="/src/assets/pms-logo.png"
            alt="pms logo"
          />
        </div>

        <span>
          <button className="header__btn" onClick={handleClick}>Join as Pro</button>
        </span>
      </div>
    </>
  );
}
export default Header;
