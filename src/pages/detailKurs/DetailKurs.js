import { useParams } from "react-router-dom";
import db from "../../config/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import KursContent from "../../components/addKurs/KursContent";
import { Progress } from "react-sweet-progress";
import { BiLoaderCircle } from "react-icons/bi";

const DetailKurs = () => {
    let { id } = useParams();
    const [kurs, setKurs] = useState([]);
    const [loading, setLoading] = useState(true);
    let day;
    let isToday;
    if (!loading) {
        day = kurs[0].days.filter(
            (kursDay) => kursDay.date === new Date().toLocaleDateString()
        );

        if (day.length <= 0) {
            isToday = 0;
        } else {
            isToday = day[0].day;
        }
    }

    useEffect(() => {
        const q = query(collection(db, "kurse"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            setKurs(
                querySnapshot.docs
                    .map((d) => d.data())
                    .filter((kurse) => kurse.title === id)
            );
            setLoading(false);
        });
    }, [loading, id]);
    return (
        <section className="detailKurs">
            {!loading && (
                <>
                    <article className="detailKurs__infos">
                        <div>
                            <h1>{kurs[0].title}</h1>
                            <p>Start: {kurs[0].start}</p>
                            <p>end: {kurs[0].end}</p>
                        </div>

                        <Progress
                            type="circle"
                            percent={Math.ceil((isToday / 110) * 100)}
                            width="20vw"
                            strokeWidth={5}
                            theme={{
                                active: {
                                    trailColor: "var(--clr-dark)",
                                    color: "var(--clr-accent-green)",
                                },
                            }}
                        />
                    </article>
                    <article className="detailKurs__header">
                        <div></div>
                        <div>
                            <h2>Datum</h2>
                        </div>
                        <div>
                            <h2>Tag</h2>
                        </div>
                        <div>
                            <h2>UE</h2>
                        </div>
                        <div>
                            <h2>Modul</h2>
                        </div>
                        <div>
                            <h2>Inhalt</h2>
                        </div>
                        <div>
                            <h2>Übungen</h2>
                        </div>
                        <div>
                            <h2>ToDo's</h2>
                        </div>
                    </article>
                    {kurs[0].days.map((day, key) => {
                        return (
                            <KursContent
                                key={key}
                                showDate={day.showDate}
                                weekDay={day.weekDay}
                                isHoliday={day.isHoliday}
                                day={day.day}
                                date={day.date}
                            />
                        );
                    })}
                </>
            )}

            {loading && (
                <div className="loading-Div">
                    <h2>
                        <BiLoaderCircle className="circle" />
                    </h2>
                </div>
            )}
        </section>
    );
};

export default DetailKurs;
