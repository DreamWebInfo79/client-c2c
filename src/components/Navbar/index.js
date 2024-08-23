import React from "react";
import "./index.css";

export default function Navbar() {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="brand">
            <div className="brand-logo">
              <a href="https://www.carwale.com/" title="CarWale">
                <img
                  width={136}
                  alt="CarWale"
                  src="https://imgd.aeplcdn.com/0x0/cw/static/icons/new-header/logo.svg"
                  title="CarWale"
                />
              </a>
            </div>
          </div>
          <nav className="nav">
            <ul>
              <li>
                <div className="nav-item">NEW CARS</div>
              </li>
              <li>
                <div className="nav-item">USED CARS</div>
              </li>
              <li>
                <div className="nav-item">REVIEWS & NEWS</div>
              </li>
            </ul>
          </nav>
          <div className="search">
            <div className="search-container" title="Search">
              <div className="search-box">
                <div className="search-input-container" tabIndex="-1">
                  <div className="search-input-wrapper">
                    <div>
                      <input
                        type="text"
                        placeholder="Search"
                        aria-label="Input field"
                        className="search-input"
                      />
                      <div className="search-icon">
                        <svg
                          aria-hidden="true"
                          fill="currentcolor"
                          focusable="false"
                          role="img"
                          tabIndex="-1"
                          viewBox="0 0 16 16"
                          style={{ width: "20px", height: "20px" }}
                        >
                          <path d="M6.55 13.05a6.5 6.5 0 116.5-6.5 6.42 6.42 0 01-6.5 6.5zm0-12a5.5 5.5 0 000 11 5.43 5.43 0 005.5-5.5 5.51 5.51 0 00-5.5-5.5zm9.13 14.64a.54.54 0 000-.78l-4.14-4.14s-.19.22-.41.43-.37.35-.37.35l4.14 4.14a.56.56 0 00.78 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="location" title="Location">
              <span className="location-badge" />
              <div>
                <svg
                  aria-hidden="true"
                  fill="currentcolor"
                  focusable="false"
                  role="img"
                  tabIndex="-1"
                  viewBox="0 0 16 16"
                  style={{ width: "24px", height: "24px" }}
                >
                  <path d="M8 16a1 1 0 01-.74-.33c-1-1.06-4-4.92-4.86-8.56-.5-2.64.31-4.86 2.22-6.11a6.08 6.08 0 017.76 0c1.92 1.25 2.72 3.47 2.22 6.11-.87 3.64-3.88 7.5-4.86 8.56A1 1 0 018 16zm0-15a5.08 5.08 0 00-3.16 1.07C3.13 2.7 2.41 4.47 2.87 6.8c.83 3.42 3.65 7.1 4.76 8.27 1.11-1.17 3.93-4.85 4.76-8.27.5-2.33-.26-4.1-1.97-5.73A5.08 5.08 0 008 1zM8 9a2 2 0 112-2 2 2 0 01-2 2zm0-3a1 1 0 101 1 1 1 0 00-1-1z" />
                </svg>
              </div>
            </div>
            <div className="language-icon" title="Language">
              <svg
                aria-hidden="true"
                fill="currentcolor"
                focusable="false"
                role="img"
                tabIndex="-1"
                viewBox="0 0 16 16"
                style={{ width: "24px", height: "24px" }}
              >
                <path d="M6.89 12H9.11a.52.52 0 00.5-.37l.58-1.63h1.69a.5.5 0 00.49-.67l-3-8a.5.5 0 00-.94 0l-3 8a.5.5 0 00.06.47.49.49 0 00.43.2h1.69l.58 1.63a.52.52 0 00.5.37zM8 2.52l1.31 3.48H6.69L8 2.52zm-1.14 4.5h2.28l.62 1.73H6.24l.62-1.73zM15 15H1a1 1 0 000 2h14a1 1 0 000-2z" />
              </svg>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
