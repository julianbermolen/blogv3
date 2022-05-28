import {Container} from 'react-bootstrap';
import logo from '../../images/jb-logo-03.png';
import './Navbar.css';

const Navegador = () => {
    return (
            <Container>
                    <div className="navegador">
                        <li className="navegador-boton">
                            <img src={logo} alt="logo"></img>
                        </li>
                        <li className="navegador-boton">
                            <a href="/" className="navegador-texto">Inicio</a>
                        </li>
                        <li className="navegador-boton">
                            <a href="/about" className="navegador-texto">Sobre mi</a>
                        </li>
                        <li className="navegador-boton">
                            <a href="/blog" className="navegador-texto">Blog</a>
                        </li>
                    </div>
            </Container>
    );
};

export default Navegador;
