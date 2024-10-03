import { useEffect, useState } from 'react';
import Logo from "@components/logo";
import SideMenu from "@components/menu/side-menu";
import HelpMenu from "@components/menu/help-menu";
import AuthorProfile from "@components/author-profile";

// Demo Data

import headerData from "../../../data/general/header-02.json";
import sideMenuData from "../../../data/general/menu-02.json";
import sideMenuDataLogout from "../../../data/general/menu-02_1.json";
import helpMenuData from "../../../data/general/menu-03.json";
import axios from "axios";
const Header = () => {
    
const [isAuthenticated, setIsAuthenticated] = useState(false);
  /*
useEffect(() => {
  const checkAuth = async () => {
    try {
    
      const res = await axios.get(
        "http://localhost:8000/api/auth-check"
    );
     // const data = await res.json();
     console.log(res.data);
      setIsAuthenticated(res.data.authenticated);
    } catch (error) {
      console.error('Error checking authentication', error);
    }
  };
  checkAuth();
}, []);*/
        const [loading, setLoading] = useState(true);
        const [auth, setAuth] = useState({
          name: "",
          first_name: "",
          last_name: "",
          mobile: "",
          code: "",
          role: "4",
          agent_id:"1",
          nationality: "",
          email: "",
          password: "",
        
      });  
        const [logo, setLogoSrc] = useState('');
        
        
        useEffect(() => {
            const storedToken = localStorage.getItem("token");

            if (!storedToken) {
              setIsAuthenticated(false);
            } else {
               
            setIsAuthenticated(true);
                setLoading(false);
            }
            
            const fetchLogo = async () => {
              try {
                  const result = await axios.get(
                     "http://127.0.0.1:8000/api/about-us"
                  );
                  setLogoSrc( `http://localhost:8000/assets/images/setting/${result.data.setting.logo}`);
            
              
              } catch (error) {
                  console.log("Error fetching totals:", error);
              }
          };
          fetchLogo();
           }, []);

     
 
        
 
return (
  <div className="d-none d-lg-block">
      <div className="header-area left-header-style d-flex">
          <Logo logo={logo} />
          <div className="sidebar-nav-wrapper">
            {isAuthenticated ? (<SideMenu menu={sideMenuData} />  ) : (<SideMenu menu={sideMenuDataLogout} /> )}
            
            {isAuthenticated ? (<SideMenu menu={helpMenuData} />  ) : null}
          
            </div>
          {headerData?.author && (
              <AuthorProfile
                  name={headerData.author.name}
                  image={headerData.author.image}
                  balance={headerData.author.balance}
              />
          )}
      </div>
   </div>
);
};

export default Header;
