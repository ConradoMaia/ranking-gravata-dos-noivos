import React, { useState, useEffect } from 'react';
import { Trophy, Key } from 'lucide-react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');

  .ranking-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-image: url('https://i.imgur.com/8ynDUPR.jpeg');
    background-size: cover;
    background-position: center;
    font-family: 'Cinzel', serif;
  }

  .content-wrapper {
    max-width: 42rem;
    width: 100%;
  }

  .main-card {
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(4px);
    border-radius: 1.5rem;
    padding: 2rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  .title {
    font-size: 1.875rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2rem;
    color: #1f2937;
    font-family: 'Cinzel', serif;
  }

  .subtitle {
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2rem;
    color: #374151;
    font-family: 'Cinzel', serif;
  }

  .winner-section {
    display: flex;
    justify-content: center;
    margin-bottom: 2.5rem;
  }

  .winner-container {
    text-align: center;
    position: relative;
  }

  .trophy-icon {
    width: 5rem;
    height: 5rem;
    color: #eab308;
    margin: 0 auto 0.5rem;
  }

  .crown-badge {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    background-color: #eab308;
    border-radius: 50%;
    padding: 0.25rem;
  }

  .crown-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
    fill: currentColor;
  }

  .winner-name-badge {
    background-color: #dbeafe;
    border-radius: 9999px;
    padding: 0.5rem 1.5rem;
    display: inline-block;
  }

  .winner-name {
    color: #1e40af;
    font-weight: 600;
    font-family: 'Cinzel', serif;
  }

  .tables-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .table-item {
    position: relative;
  }

  .table-card {
    background-color: #eff6ff;
    border-radius: 1rem;
    padding: 1rem;
    border: 2px solid #bfdbfe;
    overflow: hidden;
    position: relative;
  }

  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: linear-gradient(to right, #bfdbfe, #93c5fd);
    opacity: 0.5;
    transition: width 1s ease-in-out;
  }

  .table-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .table-name {
    color: #374151;
    font-weight: 600;
    font-size: 1.125rem;
    font-family: 'Cinzel', serif;
  }

  .keys-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .key-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #ca8a04;
  }

  .keys-number {
    color: #1f2937;
    font-weight: 700;
    font-size: 1.25rem;
  }

  .total-info {
    margin-top: 2rem;
    text-align: center;
    color: #4b5563;
    font-size: 0.875rem;
    font-family: 'Cinzel', serif;
  }

  .brand-signature {
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
    font-size: 1.875rem;
    font-weight: 700;
    color: #93c5fd;
    font-family: 'Cinzel', serif;
  }

  .loading-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('https://i.imgur.com/8ynDUPR.jpeg');
    background-size: cover;
    background-position: center;
  }

  .loading-text {
    color: white;
    font-size: 1.5rem;
    font-family: 'Cinzel', serif;
  }
`;

const Ranking = () => {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalChaves = 1000;

  useEffect(() => {
    // MOCK DATA - REMOVER QUANDO INTEGRAR COM BACKEND
    const mockData = [
      { id: 1, nome: 'Mesa 11', chavesVendidas: 250 },
      { id: 2, nome: 'Mesa 7', chavesVendidas: 180 },
      { id: 3, nome: 'Mesa 3', chavesVendidas: 150 },
      { id: 4, nome: 'Mesa 15', chavesVendidas: 120 },
      { id: 5, nome: 'Mesa 9', chavesVendidas: 95 },
    ];
    
    setTimeout(() => {
      setMesas(mockData.sort((a, b) => b.chavesVendidas - a.chavesVendidas));
      setLoading(false);
    }, 1000);
  }, []);

  const getProgressPercentage = (chavesVendidas) => {
    return (chavesVendidas / totalChaves) * 100;
  };

  const vencedor = mesas.length > 0 ? mesas[0] : null;

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="loading-screen">
          <div className="loading-text">Carregando...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="ranking-container">
        <div className="content-wrapper">
          <div className="main-card">
            <h1 className="title">GRAVATA DOS NOIVOS</h1>
            <h2 className="subtitle">RANKING</h2>

            {vencedor && (
              <div className="winner-section">
                <div className="winner-container">
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <Trophy className="trophy-icon" />
                    <div className="crown-badge">
                      <svg className="crown-icon" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div className="winner-name-badge">
                    <p className="winner-name">{vencedor.nome}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="tables-list">
              {mesas.map((mesa, index) => (
                <div key={mesa.id} className="table-item">
                  <div className="table-card">
                    <div 
                      className="progress-bar"
                      style={{ width: `${getProgressPercentage(mesa.chavesVendidas)}%` }}
                    />
                    <div className="table-content">
                      <span className="table-name">{mesa.nome}</span>
                      <div className="keys-container">
                        <Key className="key-icon" />
                        <span className="keys-number">{mesa.chavesVendidas}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="total-info">
              <p>Total de chaves: {totalChaves}</p>
            </div>

            <div className="brand-signature">JB</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ranking;