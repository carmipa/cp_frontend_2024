import React from "react";
import seta from '../../assets/Img/seta.png';
import cruz from '../../assets/Img/cruz.png';
import estrela1 from '../../assets/Img/estrela1.png';
import positivo from '../../assets/Img/positivo.png';
import negativo from '../../assets/Img/negativo.png';
import setaBaixo from '../../assets/Img/setaBaixo.png';
import tresPontos from '../../assets/Img/3Pontos.png';
import "./style.css";

const Body: React.FC = () => {
    return (
        <div className='body'>
            
            <div className='grid1'>
                <div className='linha1'>
                    <img src={seta} alt='sinal de maior' />
                    <h2>ENREDO</h2>
                </div>
                <p>Kratos and his son Atreus face the oncoming Norse apocalypse, Ragnarok.</p>
            </div>
            
            <div className="grid2">
                <div className="left">
                    <img src={seta} alt='sinal de maior' />
                    <h2>AVALIAÇÃO DE USUÁRIOS</h2>
                </div>
                <div className="right">
                    <img src={cruz} alt='sinal de cruz vermelho' />
                    <h3 className="red-text2">Avaliar</h3>
                </div>
            </div>

            <div className='grid3'>
                <button className="bto3">AVALIAÇÃO EM DESTAQUE</button>
                <div className='linha3'>
                    <img src={estrela1} alt='estrela vermelha' />
                    <h2 className="red-text3">10 / 10</h2>
                </div>
            </div>

            <div className='grid4'>
                <div className="grid4Coluna1">CaioHalbert</div>
                <div className="grid4Coluna2">9 de novembro de 2022</div>
            </div>

            <div className="grid5">
                <div className="grid5Linha1">
                    <h2>What an incredible sequel!</h2>
                </div>
                <div className="grid5Linha2">
                    <p className="texto5">A fantastic and strong continuation of its predecessor, 
                        God of War Ragnarök is not afraid to take unexpected turns, or slow its 
                        pace for you to fully explore an environment. It has the same upgrading 
                        system as before, but with better armor, in my opinion. Atreus is a little 
                        bit older now and it's so great to see everybody reprise their magnificent 
                        roles.
                        <p></p>
                        I don't want to give away too much in this review, but it's definitely 
                        worth buying. One of the best looking games on PS5. It'll definitely be a game 
                        of the year contender with Elden Ring. If you're new to the series, I recommend 
                        you start with God of War (2018) If you have the dedication, you could always 
                        start from the very first one. They're all on the PS+ collection. I still have 
                        yet to beat this newest entry, but I wanted to spread the good word as soon as 
                        possible: Ragnarök is here and it is beautiful.
                    </p>    
                </div>
            </div>

            <div className='grid6'>
                <div className='grid6Coluna1'>
                    <img src={positivo} alt='sinal de positivo' />
                    <h2>33</h2>
                </div>
                <div className='grid6Coluna2'>
                    <img src={negativo} alt='sinal de negativo' />
                    <h2>11</h2>
                </div>
                <div className='grid6Coluna3'>
                    <img src={tresPontos} alt='3 pontos' />
                </div>
            </div>

            <div className='grid7'>
                <button className="bto7">AVALIAÇÃO EM DESTAQUE</button>
                <div className='linha7'>
                    <img src={estrela1} alt='estrela vermelha' />
                    <h2 className="re-text7">10 / 10</h2>
                </div>
            </div>

            <div className='grid8'>
                <div className="grid8Coluna1">ClaudiaRayana</div>
                <div className="grid8Coluna2">14 de novembro de 2022</div>
            </div>

            <div className="grid9">
                <div className="grid9Linha1">
                    <h2>This game took part of my soul...</h2>
                </div>
            </div>

            <div className="grid10">
                <h3>Warning: Spoilers!</h3>
                <img src={setaBaixo} alt='sinal de seta para baixo'/>
            </div>

            <div className='grid11'>
                <div className='grid11Coluna1'>
                    <img src={positivo} alt='sinal de positivo' />
                    <h2>24</h2>
                </div>
                <div className='grid11Coluna2'>
                    <img src={negativo} alt='sinal de negativo' />
                    <h2>6</h2>
                </div>
                <div className='grid11Coluna3'>
                    <img src={tresPontos} alt='3 pontos' />
                </div>
            </div>
            
        </div>   
    );
}
export default Body;
