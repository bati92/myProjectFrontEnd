import { useEffect, useState } from "react";
import Logo from "@components/logo";
import SideMenu from "@components/menu/side-menu";
import AuthorProfile from "@components/author-profile";
import sideMenuData from "../../../data/general/menu-02.json";
import sideMenuDataLogout from "../../../data/general/menu-02_1.json";
import helpMenuData from "../../../data/general/menu-03.json";
import axios from "axios";

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [auth, setAuth] = useState({
        name: "",
        first_name: "",
        last_name: "",
        mobile: "",
        code: "",
        role: "4",
        agent_id: "1",
        nationality: "",
        email: "",
        password: "",
    });
    const [logo, setLogoSrc] = useState("");

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
          
        }

        const fetchLogo = async () => {
            try {
                const result = await axios.get(`${apiBaseUrl}/about-us`);
                setLogoSrc(
                    `${apiBaseUrl}/assets/images/setting/${result.data.setting.logo}`
                );
            } catch (error) {
         
                
            }
        };
        fetchLogo();
    }, []);

    return (
        <div className="d-none d-lg-block">
            <div className="header-area left-header-style d-flex">
                <Logo logo={logo} />
                <div className="sidebar-nav-wrapper">
                    {isAuthenticated ? (
                        <SideMenu menu={sideMenuData} />
                    ) : (
                        <SideMenu menu={sideMenuDataLogout} />
                    )}

                    {isAuthenticated ? <SideMenu menu={helpMenuData} /> : null}
                </div>
                {isAuthenticated ? (
                    <AuthorProfile
                        name={auth.name}
                        image={auth.image}
                        balance={auth.balance}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default Header;
