import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineMobile } from "react-icons/ai";
import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import PincodeDrawer from "../PincodeDrawer/PincodeDrawer";
import pic from "../Images/medcode3.png"
 import {NavLink} from "react-router-dom"
 

const Navbar = () => {
  const navigate = useNavigate();
  const GoToHomePage = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        position: "sticky",
        top: "0px",
        zIndex: "1000",
        borderBottom: "1px solid #dfdfdf",
        height: "62px",
      }}
    >
      <div className={styles.navbar}>
        <div className={styles.imageDiv}>
          <img
            style={{ cursor: "pointer" }}
            onClick={GoToHomePage}
            src={pic}
            alt=""
          />
        </div>
        <div className={styles.LinkDiv}>
          <div style={{ display: "flex" }}>
            <PincodeDrawer />
            <MdKeyboardArrowDown className={styles.downArrowIcon} />
          </div>
        <div className={styles.links2}>
            <div className={styles.links2Icons}>
              <HiOutlineUser style={{ fontSize: "20px", marginRight: "5px" }} />
              <NavLink to = "/login">Login</NavLink>
            </div>
            <div className={styles.links2Icons}>
              {/* <HiOutlineUser style={{ fontSize: "20px", marginRight: "5px" }} /> */}
              <NavLink to = "/signup">SignUp</NavLink>
            </div>
            {/* <nav>
              <ul>
                <li><NavLink to = "/login">Login</NavLink></li>
                <li><NavLink to = "/signup">SignUp</NavLink></li>
              </ul>
            </nav> */}
            <div className={styles.links2Icons}>
              <BsCart2 style={{ fontSize: "20px", marginRight: "10px" }} />
              <a href="/cart" style={{ fontSize: "14px", fontWeight: "500" }}>
                Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
