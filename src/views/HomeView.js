import './HomeView.css';
import { Icon } from '@iconify/react';

function HomeView() {
  return (
    <main className="home-main">
      <section className="gui-section">
        <div className="edition-info">
          <h1 className="slogan-title">
            Precision when you need it.<br />
            Clean UI when you want it.
          </h1>
          <div className="cta">
            <a
              className="button active"
              href="https://github.com/gc-cff/cff-updates/releases/download/2.34/Loader.zip"
              download
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: 240, height: 40, fontSize: 18 }}
            >
              <span className="download-icon">
                <Icon icon="mdi:download" style={{ fontSize: 20 }} />
              </span>
              Download Loader
            </a>
          </div>
        </div>
        <div className="gui-perspective">
          <img src="./img/gui.png" alt="DD.CFF GUI" className="gui-img" />
        </div>
      </section>
    </main>
  );
}

export default HomeView;