import db from "../../config/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

import "react-sweet-progress/lib/style.css";
import { useEffect, useState } from "react";
import DashboardOneKurs from "./DashboardOneKurs";
import { NavLink } from "react-router-dom";
const DashboardKurse = () => {
    const [kurse, setKurse] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "kurse"));
        onSnapshot(q, (querySnapshot) => {
            setKurse(querySnapshot.docs.map((d) => d.data()));
        });
    }, []);
    return (
        <article className="dashboardKurse">
            <h2>Aktuelle Kurse</h2>
            {kurse.map((kurs, key) => {
                const day = kurs.days.filter(
                    (kursDay) =>
                        kursDay.date === new Date().toLocaleDateString()
                );
                let isToday;
                if (day.length <= 0) {
                    isToday = 0;
                } else {
                    isToday = day[0].day;
                }
                return (
                    <DashboardOneKurs
                        key={key}
                        title={kurs.title}
                        end={kurs.end}
                        day={isToday}
                    />
                );
            })}

            <NavLink href="/addkurs" className="btn">
                +
            </NavLink>
        </article>
    );
};

export default DashboardKurse;
