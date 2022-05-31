import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdPostAdd, MdOutlineSpaceDashboard } from "react-icons/md";
const SideNav = () => {
    let [toggleNav, setToggleNav] = useState(false);
    let toggleFunction = () => {
        setToggleNav(!toggleNav);
    };
    return (
        <section
            className="sideNav"
            style={{ width: toggleNav ? "80px" : "0" }}
        >
            <div onClick={toggleFunction}>
                <img
                    src="img/logo.svg"
                    alt=""
                    style={{
                        transform: toggleNav ? "rotate(0)" : "rotate(-360deg)",
                    }}
                />
            </div>

            <article className="sideNav__content">
                {/* Content here */}
                <NavLink
                    className={(navData) =>
                        navData.isActive ? "link link--active" : "link"
                    }
                    to="/"
                >
                    <MdOutlineSpaceDashboard />
                </NavLink>
                <NavLink
                    className={(navData) =>
                        navData.isActive ? "link link--active" : "link"
                    }
                    to="/addkurs"
                >
                    <MdPostAdd />
                </NavLink>
            </article>
        </section>
    );
};

export default SideNav;
