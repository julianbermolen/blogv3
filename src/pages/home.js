import {Container} from 'react-bootstrap';
import './pages.css';
import wisim1 from '../images/jb-about-1.png';
import GitLabRepo from '../components/GitLabRepo';

const Home = () => {

    return(
        <Container>

                <div className="home-section">
                    <div className="title">
                        <h1 className="jb-title w-auto">Hola, mi nombre es&nbsp;</h1>
                        <h1 className="typing-text"> Julián.</h1>
                    </div>
                    <p className="jb-subtitle">Soy Fullstack developer actualmente trabajando en Globalhitss cono sur. Este es mi blog personal donde podrás encontrar todo sobre lo que estoy trabajando y aprendiendo. Bienvenido!</p>
                    <button className="jb-button">Más sobre mi</button>
                </div>
                <div className="home-section">
                    <h1 className="jb-title">Proyectos seleccionados</h1>
                    <div className="project">
                        <img src={wisim1} className="project-img" alt="Wisim proyecto gestion clientes"></img>
                        <h2 className="project-title">Wi-Sim autogestión de clientes</h2>
                        <p className="project-text">Sistema de autogestión de clientes de importante compañia de internet en La Plata. Desarrollado en JS (NodeJS + ReactJS).</p>
                    </div>
                </div>
                <div className="home-section">
                    <h1 className="jb-title">Repositorios seleccionados</h1>
                    <div className="project">
                        <GitLabRepo user="julianbermolen"/>
                    </div>
                </div>
        </Container>
    )

}

export default Home