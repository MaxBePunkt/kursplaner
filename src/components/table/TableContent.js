const TableContent = (props) => {
    var days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    return (
        <article
            className={
                props.weekDay === 6 ||
                props.weekDay === 0 ||
                (props.isHoliday !== false &&
                    props.isHoliday[0].type === "public")
                    ? "table__content table__content--frei"
                    : props.date.getFullYear() === new Date().getFullYear() &&
                      props.date.getMonth() === new Date().getMonth() &&
                      props.date.getDate() === new Date().getDate()
                    ? "table__content table__content--today"
                    : "table__content"
            }
        >
            {/* Wochentag */}
            <div>
                <p>{days[props.weekDay]}</p>
            </div>

            {/* Datum */}
            <div>
                <p>{props.showDate}</p>
            </div>

            {/* Tag */}
            <div>
                <p>
                    {props.weekDay === 6 ||
                    props.weekDay === 0 ||
                    (props.isHoliday !== false &&
                        props.isHoliday[0].type === "public")
                        ? ""
                        : props.day}
                </p>
            </div>

            {/* UE */}
            <div>
                <p>
                    {props.weekDay === 6 ||
                    props.weekDay === 0 ||
                    props.isHoliday !== false
                        ? ""
                        : "11"}
                </p>
            </div>

            {/* Modul */}
            <div>
                {props.isHoliday !== false &&
                props.isHoliday[0].type === "public" ? (
                    props.isHoliday[0].name
                ) : props.weekDay === 6 ? (
                    ""
                ) : props.weekDay === 0 ? (
                    ""
                ) : (
                    <select name="" id="">
                        <option value="Intro Tag">Intro Tag</option>
                        <option value="WebDev Essentials">
                            WebDev Essentials
                        </option>
                        <option value="HTML/CSS Einführung">
                            HTML/CSS Einführung
                        </option>
                        <option value="Terminal/Git">Terminal/Git</option>
                        <option value="HTML/CSS Vertiefung">
                            HTML/CSS Vertiefung
                        </option>
                        <option value="JS Einführung">JS Einführung</option>
                        <option value="Plus Skill">Plus Skill</option>
                        <option value="HTML/CSS Framework: Bootstrap">
                            HTML/CSS Framework: Bootstrap
                        </option>
                        <option value="APIs">APIs</option>
                        <option value="JS Framework: React JS">
                            JS Framework: React JS
                        </option>
                        <option value="Abschlussarbeit">Abschlussarbeit</option>
                        <option value="Bewerbungscoaching">
                            Bewerbungscoaching
                        </option>
                        <option value="Node.js">Node.js</option>
                        <option value="JS">JS</option>
                        <option value="JS">JS</option>
                        <option value="JS">JS</option>
                    </select>
                )}
            </div>

            {/* Inhalt */}
            <div>
                {props.isHoliday ? (
                    ""
                ) : props.weekDay === 6 ? (
                    ""
                ) : props.weekDay === 0 ? (
                    ""
                ) : (
                    <input type="text" name="" id="" />
                )}
            </div>

            {/* Übungen */}
            <div>
                <p>Übungen</p>
            </div>

            {/* ToDo's */}
            <div>
                <p>ToDo's</p>
            </div>
        </article>
    );
};

export default TableContent;
