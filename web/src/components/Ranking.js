import React, { useState, useEffect } from 'react';
import './Ranking.css';

// Importando os SVGs como componentes React
import { ReactComponent as CrownGold } from '../assets/crown-gold.svg';
import { ReactComponent as CrownSilver } from '../assets/crown-silver.svg';
import { ReactComponent as CrownBronze } from '../assets/crown-bronze.svg';
import { ReactComponent as KeyIcon } from '../assets/key.svg';

const Ranking = () => {
    const [mesas, setMesas] = useState([]);

    // Simulação de chamada ao backend
    useEffect(() => {
        // No mundo real, você faria uma chamada fetch() ou usaria axios aqui
        // Ex: fetch('/api/mesas').then(res => res.json()).then(data => setMesas(data));
        const mockData = [
            { id: 1, nome: 'MESA 11', chaves: 25 },
            { id: 2, nome: 'MESA 05', chaves: 42 },
            { id: 3, nome: 'MESA 08', chaves: 18 },
            { id: 4, nome: 'MESA 02', chaves: 33 },
            { id: 5, nome: 'MESA 15', chaves: 10 },
            { id: 6, nome: 'MESA 01', chaves: 0 },
            { id: 7, nome: 'MESA 03', chaves: 5 },
        ];

        // Ordenando os dados para o ranking
        const sortedData = mockData.sort((a, b) => b.chaves - a.chaves);
        setMesas(sortedData);
    }, []);

    const topThree = mesas.slice(0, 3);
    const otherMesas = mesas.slice(3);

    const getCrown = (index) => {
        if (index === 0) return <CrownGold className="crown-icon" />;
        if (index === 1) return <CrownSilver className="crown-icon" />;
        if (index === 2) return <CrownBronze className="crown-icon" />;
        return null;
    };

    return (
        <div className="ranking-container">
            <div className="header">
                <h1>GRAVATA DOS NOIVOS</h1>
                <h2>RANKING</h2>
            </div>

            <div className="top-three">
                {topThree.map((mesa, index) => (
                    <div key={mesa.id} className={`podium podium-${index + 1}`}>
                        {getCrown(index)}
                        <div className="keyhole"></div>
                        <div className="mesa-tag-top">{mesa.nome}</div>
                    </div>
                ))}
            </div>

            <div className="ranking-list">
                {otherMesas.map((mesa) => (
                    <div key={mesa.id} className="mesa-row">
                        <span>{mesa.nome}</span>
                        <div className="keys">
                            <KeyIcon className="key-icon" />
                            <span>{mesa.chaves}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="footer-logo">
                <span>JB</span>
            </div>
        </div>
    );
};

export default Ranking;