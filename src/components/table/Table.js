import Holidays from "date-holidays";
import { useState } from "react";
import DatePicker from "react-date-picker";

import TableContent from "./TableContent";
let hd = new Holidays("DE", "NW");

const Table = () => {
    let datesCollection = [];
    const [date, setDate] = useState(new Date());
    let kurstage = 1;
    let i = 0;
    //! Solange kurstage kleiner gleich 110 ist soll er hochgehen
    while (kurstage <= 110) {
        let newDate = new Date(date.getTime() + i * 1000 * 60 * 60 * 24);
        datesCollection.push({
            //! kursTag
            day: kurstage,
            //! das date timestamp
            date: newDate,
            //! date tt.mm.yyyy
            showDate: `${newDate.getDate()}.${
                newDate.getMonth() + 1
            }.${newDate.getFullYear()}`,
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
    return (
        <section className="table">
            <article className="table__datepicker">
                <h2>Startdatum: </h2>
                <DatePicker onChange={setDate} value={date} clearIcon={null} />
            </article>
            <article className="table__header">
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
            {datesCollection.map((date, key) => {
                return (
                    <TableContent
                        key={key}
                        showDate={date.showDate}
                        weekDay={date.weekDay}
                        isHoliday={date.isHoliday}
                        day={date.day}
                        date={date.date}
                    />
                );
            })}
        </section>
    );
};

export default Table;
