import { useEffect, useState } from 'react';

function Navbar() {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [isLight]);

  return (
    <div className="navbar shadow-sm bg-primary text-primary-content">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl lg:text-3xl">Momentum</a>
      </div>

      <div className="navbar-end">
        <label className="swap swap-flip text-4xl lg:text-6xl">
          <input
            type="checkbox"
            checked={isLight}
            onChange={(e) => setIsLight(e.target.checked)}
          />

          <div className="swap-on">🌞</div>
          <div className="swap-off">🌚</div>
        </label>
      </div>
    </div>
  );
}

export default Navbar;
