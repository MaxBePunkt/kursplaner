import { useState } from "react";

const SideNav = () => {
    let [toggleNav, setToggleNav] = useState(false);
    let toggleFunction = () => {
        setToggleNav(!toggleNav);
    };
    return (
        <section
            className="sideNav"
            style={{ right: toggleNav ? "0" : "-300px" }}
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

            <article className="sideNav__content">{/* Content here */}</article>
        </section>
    );
};

export default SideNav;
