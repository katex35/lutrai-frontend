import { useState, useEffect, useRef } from 'react'
import './App.css'
import logo from '/logo1.png'
import animation from '/animation.mp4'

function App() {
  const [activeFeature, setActiveFeature] = useState('simple')
  const earnSectionRef = useRef(null)
  const borrowSectionRef = useRef(null)
  const membersSectionRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Eğer element görünür hale geldiyse
          if (entry.isIntersecting) {
            console.log('Element görünür oldu:', entry.target);
            entry.target.classList.add('visible');
          }
        });
      },
      {
        root: null, // viewport'u kullan
        threshold: 0.2, // elemanın %20'si görünür olduğunda tetikle
        rootMargin: '0px' // viewport sınırlarını kullan
      }
    );

    // Gözlemlenecek elementler
    const sections = [
      earnSectionRef.current,
      borrowSectionRef.current,
      membersSectionRef.current,
      footerRef.current
    ];

    // Her bir elementi gözleme al
    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    // Cleanup
    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="LutrAI Logo" className="logo" />
          <span className="brand-name">LutrAI</span>
          <span className="alpha-tag">ALPHA</span>
          <button className="nav-button">Get in the water</button>
        </div>
        <div className="nav-right">
          <button className="nav-button">Resources</button>
          <button className="launch-button">Launch App</button>
        </div>
      </nav>

      <main className="main-content">
        <div className="left-content">
          <h1 className="main-title">
            Intelligent loans,<br />
            decentralized future
          </h1>
          <p className="subtitle">
            LutrAI is the AI behind smarter<br />
            DeFi decisions.
          </p>
          <div className="feature-tags">
            <span className="tag">Intelligence</span>
            <span className="tag">Efficiency</span>
            <span className="tag">Innovation</span>
          </div>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Total Treasury</span>
              <span className="stat-value">$6,521,521,555</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Profit</span>
              <span className="stat-value">$6,521,521,555</span>
            </div>
          </div>
        </div>
        <div className="right-content">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="animation"
            style={{
              background: 'transparent',
              backgroundColor: 'transparent',
              mixBlendMode: 'plus-lighter'
            }}
          >
            <source 
              src={animation} 
              type="video/mp4" 
              style={{ 
                background: 'transparent',
                backgroundColor: 'transparent'
              }} 
            />
          </video>
        </div>
      </main>

      <section ref={membersSectionRef} className="members-section scroll-animation">
        <h2 className="trusted-title">Trusted by</h2>
        
        {/* İlk satır */}
        <div className="members-row">
          {[...Array(50)].map((_, i) => {
            const companies = ['gauntlet', 'index', 'instadapp', 'ledger', 'summer-fi', 
              'superform', 'swissborg', 'usual', 'defi-saver', 'ethena'];
            const companyIndex = i % companies.length;
            return (
              <div key={`row1-${i}`} className={`member-box ${i % companies.length === 1 ? 'active' : ''}`}>
                <img 
                  src={`/company/${companies[companyIndex]}-360x360.webp`} 
                  alt={`${companies[companyIndex].charAt(0).toUpperCase() + companies[companyIndex].slice(1).replace('-', ' ')} Logo`} 
                />
              </div>
            );
          })}
        </div>

        {/* İkinci satır */}
        <div className="members-row">
          {[...Array(50)].map((_, i) => {
            const companies = ['angle', 'ether.fi_', 'origami', 'b-protocol', 'centrifuge',
              'sky', 'binance', 'spark', 'moonwell'];
            const companyIndex = i % companies.length;
            return (
              <div key={`row2-${i}`} className={`member-box ${i % companies.length === 3 ? 'active' : ''}`}>
                <img 
                  src={`/company/${companies[companyIndex]}-360x360.webp`} 
                  alt={`${companies[companyIndex].charAt(0).toUpperCase() + companies[companyIndex].slice(1).replace('-', ' ')} Logo`} 
                />
              </div>
            );
          })}
        </div>
      </section>

      <section ref={earnSectionRef} className="earn-section scroll-animation">
        <div className="panels-panel">
          <div className="card-content">
            <div className="card-head">
              <div className="card-head-left">
                <h3 className="card-head-title">Earn</h3>
                <h4 className="card-head-subtitle">Put your crypto to work</h4>
              </div>
              <a 
                href="https://app.morpho.org" 
                target="_blank" 
                className="rounded-button"
              >
                <span className="button-labels">
                  <span className="button-label">Earn</span>
                  <span className="button-label">Earn</span>
                </span>
                <div className="animated-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13.0625 6.93579L6.93424 13.0641"></path>
                    <path d="M6.93587 6.93571H13.0641V13.064"></path>
                  </svg>
                </div>
              </a>
            </div>

            <div className="card-body">
              {[
                { title: 'Simple', content: 'Deposit and start earning.' },
                { title: 'Optimized', content: 'Vaults continuously optimize allocations.' },
                { title: 'Tailored', content: 'Select a strategy that fits on your risk level.' },
                { title: 'Non-custodial', content: 'Deposit in trustless smart contracts.' }
              ].map((item) => (
                <button 
                  key={item.title}
                  className="card-part"
                  onMouseEnter={() => setActiveFeature(item.title.toLowerCase())}
                >
                  <div className="card-part-header">
                    <h5 className="card-part-title">{item.title}</h5>
                    <div className="animated-plus">
                      <div className="plus-bar"></div>
                      <div className="plus-bar"></div>
                    </div>
                  </div>
                  <p className="card-part-content">{item.content}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="panel-media">
            <div className="panel-media-background"></div>
            {[
              'simple',
              'optimized',
              'tailored',
              'noncustodial'
            ].map((feature) => (
              <picture 
                key={feature}
                className={`panel-media-part ${activeFeature === feature ? 'active' : ''}`}
              >
                <img 
                  src={`/dashboard-${feature}.webp`}
                  alt=""
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center center',
                    maxWidth: '86%',
                    maxHeight: '86%'
                  }}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </picture>
            ))}
          </div>
        </div>
      </section>

      <section ref={borrowSectionRef} className="borrow-section scroll-animation">
        <div className="panels-panel">
          <div className="panel-media">
            <div className="panel-media-background"></div>
            {[
              'lowcosts',
              'collateralization',
              'marketrates',
              'zerofees'
            ].map((feature) => (
              <picture 
                key={feature}
                className={`panel-media-part ${activeFeature === feature ? 'active' : ''}`}
              >
                <img 
                  src={`/dashboard-${feature}.webp`}
                  alt=""
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center center',
                    maxWidth: '86%',
                    maxHeight: '86%'
                  }}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </picture>
            ))}
          </div>

          <div className="card-content">
            <div className="card-head">
              <div className="card-head-left">
                <h3 className="card-head-title">Borrow</h3>
                <h4 className="card-head-subtitle">Provide collateral to borrow any asset</h4>
              </div>
              <a 
                href="https://app.morpho.org" 
                target="_blank" 
                className="rounded-button"
              >
                <span className="button-labels">
                  <span className="button-label">Borrow</span>
                  <span className="button-label">Borrow</span>
                </span>
                <div className="animated-arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13.0625 6.93579L6.93424 13.0641"></path>
                    <path d="M6.93587 6.93571H13.0641V13.064"></path>
                  </svg>
                </div>
              </a>
            </div>

            <div className="card-body">
              {[
                { title: 'Low costs', content: 'Competitive borrowing rates across all markets.' },
                { title: 'Higher collateralization factors', content: 'Get more value from your collateral.' },
                { title: 'Per market rates', content: 'Choose the most efficient market for your needs.' },
                { title: 'Zero fees', content: 'No additional fees on top of market rates.' }
              ].map((item) => (
                <button 
                  key={item.title}
                  className="card-part"
                  onMouseEnter={() => setActiveFeature(item.title.toLowerCase().replace(/\s+/g, ''))}
                >
                  <div className="card-part-header">
                    <h5 className="card-part-title">{item.title}</h5>
                    <div className="animated-plus">
                      <div className="plus-bar"></div>
                      <div className="plus-bar"></div>
                    </div>
                  </div>
                  <p className="card-part-content">{item.content}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer ref={footerRef} className="footer scroll-animation">
        <div className="footer-content">
          <div className="footer-links">
            <div className="footer-column">
              <h3>Resources</h3>
              <a href="#" className="footer-link">Documentation</a>
              <a href="#" className="footer-link">Research</a>
              <a href="#" className="footer-link">GitHub</a>
              <a href="#" className="footer-link">Brand Kit</a>
              <a href="#" className="footer-link">Audits</a>
            </div>

            <div className="footer-column">
              <h3>Data & Analytics</h3>
              <a href="#" className="footer-link">Block Analitica</a>
              <a href="#" className="footer-link">Dune</a>
              <a href="#" className="footer-link">Token Terminal</a>
              <a href="#" className="footer-link">DeFi Llama</a>
            </div>

            <div className="footer-column">
              <h3>Community</h3>
              <a href="#" className="footer-link">Twitter</a>
              <a href="#" className="footer-link">Farcaster</a>
              <a href="#" className="footer-link">Discord</a>
              <a href="#" className="footer-link">Mirror</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <img src="/LUTRAI.png" alt="LUTRAI" className="footer-logo" />
        </div>
      </footer>
    </div>
  )
}

export default App
