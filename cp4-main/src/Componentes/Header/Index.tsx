import React from 'react';
import Frame261 from '../../assets/Img/Frame26-1.png';
import Frame262 from '../../assets/Img/Frame26-2.png';
import Goodwar from '../../assets/Img/goodwar.jpg';
import goodwarbkg from '../../assets/Img/goodwar-bkg.jpg'; // Imagem de fundo
import vector from '../../assets/Img/Vector.png';
import './Style.css';

const Header: React.FC = () => {
    return (
        <header className='header'>
            <div className='grid-container'>
                <div className='grid-item'>
                    <img src={vector} alt='vector'/>
                </div>
                <div className='grid-item'>
                <h1><span className='icon2'>☰</span> MENU</h1>
                </div>
                <div className='grid-item pesquisa'>
                    <span className='icon2'>🔍</span>
                    <input type='text' placeholder='Search...'/>
                    <button>LOGIN</button>
                </div>
            </div>

            <div className='grid' style={{ backgroundImage: `url(${goodwarbkg})` }}>
                <h1>GOD OF WAR: RAGNARÖK</h1>
                <ul>
                    <li>
                        <li><h3>AVALIAÇÃO DA RATINGS</h3></li>
                        <img src={Frame261} alt='estrela vermelha'/> 
                    </li>
                </ul>
                <ul>
                    <li><h3>SUA AVALIAÇÃO</h3></li>
                    <li>
                        <img src={Frame262} alt='estrela com bordas vermelhas'/>
                    </li>
                </ul>
                <div className='image-row'>
                    <img src={Goodwar} alt='GOD OF WAR: RAGNARÖK'/>
                </div>
            </div>
        </header>
    );
}

export default Header;
