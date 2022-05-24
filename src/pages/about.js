import {Container} from 'react-bootstrap'
import AboutImg from '../images/about2.jpeg'

const About = () => {


    return (
        <Container>
            <div className="home-section">
                <div className="img-section">
                    <img className="about-img" src={AboutImg} alt="Imagen sobre mi"/>
                </div>
                <div className="text-section">
                    <p className="about-text">
                    Hola! Soy julián, Fullstack developer recibido en la Universidad de La matanza, actualmente viviendo en Villa Sarmiento, Buenos Aires.

Actualmente, estoy trabajando en Globalhitss cono sur como Software Architect, diseñando y guiando a la implementación de buenas practicas sobre servicios Rest y arquitectura para aplicaciones de Streaming.

Crecí en Villa Luzuriaga, Buenos aires, Zona oeste. Siempre me interesó la programación basandome en mi pasión por los videojuegos 🎮​, a partir de eso aprendí HTML, CSS, Javascript, Java, C#, Mysql, MongoDB, metódologías de trabajo (Scrum, Safe), Cultura de trabajo como Devops (Certificado por Universidad de Cordoba) ✨.

Disfruto mi tiempo libre con mi Novia, Familia y Amigos ​🍻​... Quizás a veces, me encuentren en Twitch!
                    </p>
                    <a className="jb-button contact-button" href="mailto:julianbermolen@gmail.com">Contactame!</a>
                </div>
            </div>
        </Container>
    )
}

export default About