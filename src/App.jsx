import React, { useState, useEffect } from "react";
import cx from "classnames";
import Tabletop from "tabletop";
import "./App.scss";

const ensureUrl = (url) => {
  try {
    const validateUrl = new URL(url);
    return validateUrl.href;
  } catch {
    return `https://${url}`;
  }
};

function App() {
  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      Tabletop.init({
        key: process.env.GSPREADSHEET_ID,
        simpleSheet: true,
      }) // get data from Google Sheets
        .then((response) => {
          setData(response);
          setLastUpdate(new Date());
        })
        .catch((error) => console.warn(error));
    }, 10000); // update every 10 seconds
  }, []);

  return (
    <div className="App">
      <div className="alert alert-primary shadow-sm p-3 mb-5 d-flex align-items-center flex-wrap help-desk">
        <div className="room-info flex-grow-1">
          <h4>First time joining us or need help?</h4>
          <p>
            The <em>Junction Support Desk</em> is here to help!
          </p>
        </div>
        <div className="room-link">
          <a
            href={ensureUrl(process.env.JUNCTION_SUPPORT_URL)}
            className="btn btn-outline-primary"
            role="button"
            target="_PARENT"
          >
            Go to Support Desk
          </a>
        </div>
      </div>
      <h1 className="display-3 mb-3">Junction Rooms</h1>
      {data.map((item, i) => (
        // eslint-disable-next-line
        <div className="bg-white border rounded-3 shadow-sm p-3 mb-2 d-flex align-items-center flex-wrap room-list" key={`key-${i}`}>
          <div className="pe-5 room-info">
            <h4>{item.name}</h4>
            {item.leads === "" ? null : (
              <p>
                <small className="text-muted">Led by: </small>
                <strong>{item.leads}</strong>
              </p>
            )}
          </div>
          <div className="room-participants display-6">
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
              href={item.status === "CLOSED" ? "#" : ensureUrl(item.url)}
              className={cx("btn", "btn-primary", {
                "btn-danger disabled": item.status === "CLOSED",
                "btn-warning": item.status === "FULL",
              })}
              role="button"
              target="_PARENT"
            >
              Join {item.name}
            </a>
          </div>
        </div>
      ))}
      {data.length === 0 ? (
        <div className="d-flex align-items-center justify-content-center">
          <div>
            <div
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          </div>
          <div className="ms-2">Loading Junction room list...</div>
        </div>
      ) : (
        <p className="last-update fw-light">
          Last updated: {lastUpdate.toLocaleString()}
        </p>
      )}
    </div>
  );
}

export default App;
