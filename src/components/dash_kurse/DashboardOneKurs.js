import { NavLink } from "react-router-dom";
import { Progress } from "react-sweet-progress";

const DashboardOneKurs = (props) => {
    return (
        <NavLink to={`/detailKurs/${props.title}`}>
            <div className="dashboardKurse__oneContainer">
                <img src="img/FS2104.svg" alt="FS2104" />
                <div className="dashboardKurse__oneContainer__title">
                    <h3>{props.title}</h3>
                    <p>Tag {props.day}/110</p>
                    <p>endet: {props.end}</p>
                </div>
                <Progress
                    type="circle"
                    percent={Math.ceil((props.day / 110) * 100)}
                    width="80%"
                    strokeWidth={5}
                    theme={{
                        active: {
                            trailColor: "var(--clr-dark)",
                            color: "var(--clr-accent-green)",
                        },
                    }}
                />
            </div>
        </NavLink>
    );
};

export default DashboardOneKurs;
