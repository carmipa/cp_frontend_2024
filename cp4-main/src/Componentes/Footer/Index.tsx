import React from "react";
import vector from '../../assets/Img/Vector.png';
import "./style.css";

const Footer: React.FC = () => {
    return (
<footer className='footer'>
    <div className='grid1'>
        <img src={vector} alt='rato vermelho'/>
    </div>
    <div className='grid1Coluna1'>
        <h3 className="gridColuna1Linha1">COMPANY</h3>
        <p className="gridColuna1Linha2">About us</p>
        <p className="gridColuna1Linha3">Partnerships</p>
        <p className="gridColuna1Linha4">FAQ</p>
    </div>
    <div className='grid1Coluna2'>
        <h3 className="gridColuna2Linha1">COMPANY</h3>
        <p className="gridColuna2Linha2">Help</p>
        <p className="gridColuna2Linha3">Support</p>
        <p className="gridColuna2Linha4">Questions</p>
    </div>
    <div className='grid1Coluna3'>
        <h3 className="gridColuna3Linha1">COMPANY</h3>
        <p className="gridColuna3Linha2">Instagram</p>
        <p className="gridColuna3Linha3">Facebook</p>
        <p className="gridColuna3Linha4">Twitter</p>
    </div>
</footer>
    );
}

export default Footer;