import Holidays from "date-holidays";
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import db from "../../config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { MenuItem } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
// import DatePicker from "react-date-picker";
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
        <section className="addKurs">
            <h1>Erstelle einen neuen Kurs</h1>
            <article className="newCourse__inputCon">
                <div>
                    <TextField
                        id="outlined-required"
                        label="Kursname:"
                        color="secondary"
                        onChange={(e) => setKursname(e.target.value)}
                    />
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Startdatum:"
                            inputFormat="dd.MM.yyyy"
                            onChange={setDate}
                            color="secondary"
                            value={date}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div>
                    <Select
                        id="demo-simple-select-helper"
                        value={kursform}
                        color="secondary"
                        onChange={(e) => setKursform(e.target.value)}
                    >
                        <MenuItem value="Fullstack Vollzeit">
                            Fullstack Vollzeit
                        </MenuItem>
                        <MenuItem value="Frontend Teilzeit">
                            Frontend Teilzeit
                        </MenuItem>
                        <MenuItem value="UX/UI Teilzeit">
                            UX/UI Teilzeit
                        </MenuItem>
                    </Select>
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
