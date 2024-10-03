import PropTypes from "prop-types";
import { Link } from "react-scroll";

const SideMenu = ({ menu }) => (
    <nav className="mainmenu-nav">
        <ul className="mainmenu list-group">
            {menu?.map((nav) => (
                <li key={nav.id} className="nav-item">
                    <a
                        activeClass="active"
                        className="nav-link smoth-animation"
                        href={`http://localhost:3000/${nav.path}`}
                       
                    >
                        {nav?.icon && <i className={nav.icon} />}
                        {nav.text}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);

SideMenu.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SideMenu;
