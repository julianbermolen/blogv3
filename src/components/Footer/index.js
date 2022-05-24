import {Container} from 'react-bootstrap';
import './Footer.css';
import {AiOutlineCopyright} from 'react-icons/ai';

const Footer = () => {

    return (
        <Container>
            <div className="line"></div>
            <div className="footer-section">
                <div className="footer-column">
                    <a className="footer-text" href="/">Inicio</a>
                    <a className="footer-text" href="/about">Sobre mi</a>
                    <a className="footer-text" href="/blog">Blog</a>
                </div>
                <div className="footer-column">
                    <a className="footer-text" href="https://www.instagram.com/julianbermolen/" target="_blank">Instagram</a>
                    <a className="footer-text" href="https://twitter.com/jbermo93" target="_blank">Twitter</a>
                    <a className="footer-text" href="https://gitlab.com/julianbermolen" target="_blank">Gitlab</a>
                </div>
                <div className="footer-column">
                    <a className="footer-text" href="https://cafecito.app/julianbermolen" target="_blank">Cafecito?</a>
                </div>
            </div>
            <div className="copyright">
                <p className="copyright-text"><AiOutlineCopyright/>Julián Bermolen 2022</p>
            </div>
        </Container>
    )
}

export default Footer