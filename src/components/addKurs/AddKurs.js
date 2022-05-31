import Holidays from "date-holidays";
import { useState } from "react";
import DatePicker from "react-date-picker";
import db from "../../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { NavLink } from "react-router-dom";
// import { getFirestore } from "firebase/firestore";
let hd = new Holidays("DE", "NW");

const AddKurs = () => {
    let datesCollection = [];
    const [date, setDate] = useState(new Date());
    const [kursname, setKursname] = useState("");
    const [kursform, setKursform] = useState("Fullstack Vollzeit");
    let kurstage = 1;
    let i = 0;
    const addToDb = () => {
        //! Solange kurstage kleiner gleich 110 ist soll er hochgehen
        while (kurstage <= 110) {
            let newDate = new Date(date.getTime() + i * 1000 * 60 * 60 * 24);
            datesCollection.push({
                //! kursTag
                day: kurstage,
                //! das date timestamp
                date: newDate.toLocaleDateString(),
                //! date tt.mm.yyyy
                showDate: newDate.toLocaleDateString(),
                //! Feiertag? false oder Objekt mit Feiertag
                isHoliday: hd.isHoliday(new Date(newDate)),
                //! Wochentag 0-6 0=Sonntag
                weekDay: newDate.getDay(),
            });
            if (
                //! wenn WE oder ein public Feiertag ist
                //! dann soll er nur den Tag erhöhen
                newDate.getDay() === 6 ||
                newDate.getDay() === 0 ||
                (hd.isHoliday(new Date(newDate)) !== false &&
                    hd.isHoliday(new Date(newDate))[0].type === "public")
            ) {
                i++;
                //! ansonsten erhöhe Tag und Kurstag
            } else {
                i++;
                kurstage++;
            }
        }

        //! Add a new document in collection "kurse"
        const kurseDB = collection(db, "kurse");
        setDoc(doc(kurseDB, kursname), {
            title: kursname,
            start: datesCollection[0].date,
            end: datesCollection[datesCollection.length - 1].date,
            image: "",
            kursform: kursform,
            days: datesCollection,
        });
    };
    return (
        <section className="table">
            <h1>Erstelle einen neuen Kurs</h1>
            <article className="newCourse__inputCon">
                <div>
                    <p>Kursname:</p>
                    <input
                        type="text"
                        name="inputKursName"
                        id="inputKursName"
                        onChange={(e) => setKursname(e.target.value)}
                    />
                </div>
                <div className="table__datepicker">
                    <p>Startdatum: </p>
                    <DatePicker
                        onChange={setDate}
                        value={date}
                        clearIcon={null}
                    />
                </div>
                <div>
                    <p>Kursform:</p>
                    <select
                        name="inputKursform"
                        id="inputKursform"
                        onChange={(e) => setKursform(e.target.value)}
                    >
                        <option value="Fullstack Vollzeit">
                            Fullstack Vollzeit
                        </option>
                        <option value="Frontend Teilzeit">
                            Frontend Teilzeit
                        </option>
                        <option value="UX/UI Teilzeit">UX/UI Teilzeit</option>
                    </select>
                </div>
                <div>
                    <NavLink
                        to={`/detailKurs/${kursname}`}
                        className="btn"
                        onClick={addToDb}
                    >
                        erstellen
                    </NavLink>
                </div>
            </article>
        </section>
    );
};

export default AddKurs;
