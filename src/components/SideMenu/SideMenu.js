import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";

const SideMenu = () => {
    return ReactDOM.createPortal((
        <div className={"menu"}>
            <NavLink to={"/"} exact>Meetings</NavLink>
            <NavLink to={"/archives"} exact>Archive</NavLink>
            <NavLink to={"/profile"} exact>Profile</NavLink>
        </div>
    ), document.getElementById("sideMenu"));
};

export default SideMenu;