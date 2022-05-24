import {Container} from 'react-bootstrap'
import './posts.css'
import {formatInTimeZone} from 'date-fns-tz'

const Posts = (props) => {


    return(
        <Container>
            <div className="container-posts">
            {
                props.posts.map(res => {
                    return(
                        <div className="post">
                            <img src={process.env.PUBLIC_URL + '/posts/'+ res.img_name} alt="Imagen destacata de post" className="post-img"></img>
                            <a href={"/post/"+res.id} className="post-title">{res.titulo}</a>
                            <p className="post-description">{res.descripcion}</p>
                            <p className="post-date">Publicado el {formatInTimeZone(res.created_at,'America/New_York','yyyy-MM-dd HH:mm:ss')}</p>
                        </div>
                    );
                })
            }
            </div>
        </Container>
    )
}

export default Posts