import React, { useState, useEffect } from 'react';
import './RelogioAnalogico.css';

const RelogioAnalogico = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const id_timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(id_timer);
        };
    }, []);

    const horas = time.getHours() % 12;
    const minutos = time.getMinutes();
    const segundos = time.getSeconds();

    const graus_horas = (horas * 30) + (minutos * 0.5);
    const graus_minutos = minutos * 6;
    const graus_segundos = segundos * 6;

    const tamanho_relogio = 300;
    const centroX = tamanho_relogio / 2;
    const centroY = tamanho_relogio / 2;
    const comp_pont_seg = tamanho_relogio / 2 - 10;
    const segundosX = centroX + comp_pont_seg * Math.sin(graus_segundos * Math.PI / 180);
    const segundosY = centroY - comp_pont_seg * Math.cos(graus_segundos * Math.PI / 180);
    const distancia = 1.5;
    const solX = centroX + (tamanho_relogio / 2 * distancia) * Math.sin(graus_segundos * Math.PI / 180);
    const solY = centroY - (tamanho_relogio / 2 * distancia) * Math.cos(graus_segundos * Math.PI / 180);

    return (
        <div style={{ position: 'relative', width: tamanho_relogio, height: tamanho_relogio }}>
            <div
                className="sol"
                style={{
                    position: 'absolute',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'yellow',
                    left: `${solX}px`,
                    top: `${solY}px`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 30px 10px gold',
                    transition: 'left 0.5s linear, top 0.5s linear',
                    zIndex: 10,
                }}
            />
            <div className="relogio" style={{ width: tamanho_relogio, height: tamanho_relogio }}>
                <div className="marcacoes">
                    {[...Array(12)].map((_, i) => {
                        const angle = i * 30;
                        const x = centroX + (tamanho_relogio / 2 - 20) * Math.sin(angle * Math.PI / 180);
                        const y = centroY - (tamanho_relogio / 2 - 20) * Math.cos(angle * Math.PI / 180);
                        return (
                            <div
                                key={i}
                                className="numero"
                                style={{
                                    left: `${x}px`,
                                    top: `${y}px`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                {i === 0 ? 12 : i}
                            </div>
                        );
                    })}
                </div>
                <div className="ponteiro horas" style={{ transform: `rotate(${graus_horas}deg)` }} />
                <div className="ponteiro minutos" style={{ transform: `rotate(${graus_minutos}deg)` }} />
                <div className="ponteiro segundos" style={{ transform: `rotate(${graus_segundos}deg)` }} />
                <div className="centro" />
            </div>
        </div>
    );
};

export default RelogioAnalogico;