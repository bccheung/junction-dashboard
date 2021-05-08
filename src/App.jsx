import React, { useState, useEffect } from "react";
import cx from "classnames";
import Tabletop from "tabletop";
import "./App.scss";

function App() {
  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      Tabletop.init({
        key: process.env.GSPREADSHEET_ID,
        simpleSheet: true,
      })
        .then((response) => {
          setData(response);
          setLastUpdate(new Date());
        })
        .catch((error) => console.warn(error));
    }, 10000);
  }, []);

  return (
    <div className="App">
      {data.map((item, i) => (
        // eslint-disable-next-line
        <div className="border shadow-sm p-3 mb-2 d-flex align-items-center flex-wrap room-list" key={`key-${i}`}>
          <div className="pe-5 room-info">
            <h4>{item.name}</h4>
            <p>
              <small className="text-muted">Led by: </small>
              <strong>{item.leads}</strong>
            </p>
          </div>
          <div className="room-participants display-5">
            {item.status === "CLOSED" ? (
              <p className="text-danger">Closed</p>
            ) : item.status === "FULL" ? (
              <p className="text-warning">Full</p>
            ) : (
              <p className="text-success">{`${item.current_participants}/${item.full_cap}`}</p>
            )}
          </div>
          <div className="room-link">
            <a
              href={`https://${item.url}`}
              className={cx("btn", "btn-success", {
                "btn-danger disabled": item.status === "CLOSED",
                "btn-warning": item.status === "FULL",
              })}
              role="button"
            >
              Go to {item.name}
            </a>
          </div>
        </div>
      ))}
      {data.length === 0 ? null : (
        <p className="fw-light">
          <small>Last updated: {lastUpdate.toLocaleString()}</small>
        </p>
      )}
    </div>
  );
}

export default App;
