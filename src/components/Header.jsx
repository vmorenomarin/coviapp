import React from "react";

export const Header = () => {
  return (
    <header className="text-center text-danger bg-dark p-4 mb-5">
      <div className="fs-1 fw-bold">
        <i className="fa fa-viruses"></i>
        Covid Tracker
      </div>
      <p>
        API by{" "}
        <a
          href="https://.covid19api.com/"
          className="text-white"
          target="_blank"
          rel="noreferrer"
        >
          Covid19 API
        </a>
      </p>
    </header>
  );
};
