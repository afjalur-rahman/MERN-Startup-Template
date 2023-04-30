import React,{useState} from 'react'
import logo from '../images/logo.png';
import { Link,NavLink,useLocation,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector} from "react-redux";
import {unsetUserInfo} from "../features/userSlice"
import {removeToken,getToken} from "../services/localStorageServices"
const Sidebar = ({children}) => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

const navigate = useNavigate();
const dispatch = useDispatch();
const handleLogout = () => {
  dispatch(unsetUserInfo({name:"",email:"",isAdmin:""}))
  removeToken('token')
  localStorage.clear()
  navigate('/login')
}

      const userMenu = [
        {
          name: "Dashboard",
          path: "/",
          icon: "uil uil-estate",
        },
        {
          name: "Menu 1",
          path: "/menu1",
          icon: "uil uil-chart",
        },
        {
          name: "Menu 2",
          path: "/menu2",
          icon: "uil uil-plus-circle",
        },
        {
          name: "Menu 3",
          path: "/menu3",
          icon: "uil uil-plus-circle",
        }
      ];
      {/* 
      const adminMenu = [
        {
          name: "Dashboard",
          path: "/",
          icon: "uil uil-estate",
        },
        {
          name: "My Leads",
          path: "/all-lead",
          icon: "uil uil-chart",
        },
        {
          name: "All Leads",
          path: "/admin/all-lead",
          icon: "uil uil-chart-growth",
        },
        {
          name: "Add New Lead",
          path: "/add-new-lead",
          icon: "uil uil-plus-circle"
        },
        {
          name: "Add New Employee",
          path: "/admin/add-new-employee",
          icon: "uil uil-user-plus",
        }
      ];

      const user = useSelector(state=>state.user)
      const menuToBeRendered = user.isAdmin && token ? adminMenu : userMenu;
*/}

      

  return (
    <>
    <nav className={`${!collapsed && "close"}`}>
    <div className="logo-name">
        <div className="logo-image">
            <img src={`${logo}`} alt="" />
        </div>
        <span className="logo_name">Template</span>
    </div>

    <div className="menu-items">
        <ul className="nav-links">
          {/*
            {
                menuToBeRendered.map((item)=>{
                  const isActive = location.pathname === item.path;
                    return(
                        <li key={item.name} className={`${isActive && "active-menu-item"}`}>
                        <NavLink to={`${item.path}`}>
                            <i className={`${item.icon}`}></i>
                            <span className="link-name">{item.name}</span>
                        </NavLink>
                    </li>
                    );
                })
            }
            */}
            {
                userMenu.map((item)=>{
                  const isActive = location.pathname === item.path;
                    return(
                        <li key={item.name} className={`${isActive && "active-menu-item"}`}>
                        <NavLink to={`${item.path}`}>
                            <i className={`${item.icon}`}></i>
                            <span className="link-name">{item.name}</span>
                        </NavLink>
                    </li>
                    );
                })
            }
        </ul>
        <ul className="logout-mode">
            <li>
                <Link to="#" onClick={handleLogout}>
                    <i className="uil uil-signout"></i>
                    <span className="link-name">Logout</span>
                </Link>
            </li>
            {/*
            <li class="mode">
                <Link to="#">
                    <i className="uil uil-moon"></i>
                <span className="link-name">Dark Mode</span>
            </Link>

            <div className="mode-toggle" onClick={handleClick}>
              <span className="switch"></span>
            </div>
        </li>
        */}
        </ul>
    </div>
</nav>
<section className="dashboard">
          <div className="top">
                  {collapsed ? (
                        <i
                        className="uil uil-bars sidebar-toggle"
                          onClick={() =>{ setCollapsed(false)}}
                        ></i>
                      ) : (
                        <i
                          className="uil uil-bars sidebar-toggle"
                          onClick={() =>{setCollapsed(true)}}
                        ></i>
                      )}            
              <div className="search-box">
                  <i className="uil uil-search"></i>
                  <input type="text" placeholder="Search here..."/>
              </div>
              <div className='profile'>Username<i className='uil uil-user-circle' style={{fontSize:30,marginRight:10,marginLeft:10}}></i></div>  
          </div>
          <div className="dash-content">
           {children}
      </div>
    </section>
   </>
  );
}

export default Sidebar