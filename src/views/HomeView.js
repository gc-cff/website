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
            <button className="button active" style={{ width: 240, height: 40 }}>
              <Icon icon="mdi:download" />
              Download Loader
            </button>
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