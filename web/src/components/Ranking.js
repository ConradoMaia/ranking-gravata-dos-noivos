import React, { useState, useEffect } from 'react';
import './Ranking.css';

import { ReactComponent as KeyIcon } from '../assets/key.svg';
import { ReactComponent as KeyholeIcon } from '../assets/keyhole-icon.svg';

const Ranking = () => {
    const [mesas, setMesas] = useState([]);
    const totalKeys = 1000;

    useEffect(() => {
        const backendUrl = 'http://localhost:3001/ranking'; 

        const fetchRankingData = async () => {
            try {
                const response = await fetch(backendUrl);
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                setMesas(data);
            } catch (error) {
                console.error("Houve um problema ao buscar os dados do ranking:", error);
            }
        };

        fetchRankingData();

        const intervalId = setInterval(fetchRankingData, 10000);

        return () => clearInterval(intervalId);

    }, []);

    const winnerMesa = mesas[0];

    const urlLogoJB = "https://i.imgur.com/H0lljWw.png";
    const urlFechadura = "https://i.imgur.com/roNFBG5.png";
    const urlChave = "https://i.imgur.com/UlRQH5U.png";

    return (
        <div className="outer-panel">
            <div className="ranking-container">
                <div className="header">
                    <h1>GRAVATA DOS NOIVOS</h1>
                    <h2>RANKING</h2>
                </div>

                {winnerMesa && (
                    <div className="winner-podium">
                        <img src={urlFechadura} alt="Fechadura Vencedor" className="winner-image" onError={(e) => e.target.style.display='none'} />
                        <KeyholeIcon className="keyhole-icon-winner fallback-icon" />
                        <div className="mesa-tag-winner">{winnerMesa.nome}</div>
                    </div>
                )}

                <div className="ranking-list">
                    {mesas.map((mesa) => {
                        const percentage = totalKeys > 0 ? (mesa.chaves / totalKeys) * 100 : 0;
                        return (
                            <div key={mesa.id} className="mesa-row">
                                <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                                <div className="mesa-content">
                                    <span>{mesa.nome}</span>
                                    <div className="keys">
                                        <img src={urlChave} alt="Ícone Chave" className="key-image-icon" onError={(e) => e.target.style.display='none'} />
                                        <KeyIcon className="key-icon fallback-icon" />
                                        <span>{mesa.chaves}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <img src={urlLogoJB} alt="Logo JB" className="footer-logo" onError={(e) => e.target.style.display='none'} />
                <div className="footer-logo-fallback fallback-icon">JB</div>

            </div>
        </div>
    );
};

export default Ranking;