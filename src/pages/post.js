import Markdown from 'markdown-to-jsx'
import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/Spiner/Spiner'
import './pages.css'
import ShareButtons from '../components/ShareButtons/ShareButtons';
import Suscribe from '../components/Suscribe/Suscribe';
import { render } from '@testing-library/react';


const Post = () => {
    // eslint-disable-next-line
    const [dbPost, setdbPost] = useState({});
    const [post, setPost] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let { id } = useParams();
    let url = '';
    let hashtag = ["web","development","blog","IT"];
    if (typeof window === 'object') {
      url = String(window.location);
    }
    const getPost = (id) => {
        //let uri = 'http://127.0.0.1:4000/posts/post/'+id;
        let uri = 'https://bermo-blogv2-be.herokuapp.com/posts/post/'+id;
        setIsLoading(true);
        axios.get(uri)
            .then(res => {
                if(res.data.Post.length === 0){
                    setImage("jb-404-error.png");
                    setIsLoading(false);
                }else {
                setdbPost(res.data.Post[0]);
                setImage(res.data.Post[0].img_name);
                setIsLoading(false);
                import("../assets/posts/"+res.data.Post[0].file_name)
                    .then(res => {
                        fetch(res.default)
                            .then(res => res.text())
                            .then(res => setPost(res))
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => {
                console.log("No se seteó dbPost",err);
            })
      
    }

    const renderPost = () => {
            if(Object.entries(dbPost).length === 0){
                return(
                    <>
                        <div className="container-post">
                            <div className="container-intro">
                                <img src={process.env.PUBLIC_URL + '/posts/'+ image} alt="Imagen destacata de post" className="post-img"></img>
                            </div>
                            <div className="container-post">
                                <a className="jb-button link-button" href="/blog">Volver al blog</a>
                            </div>
                            <div className="container-newsletter">
                                <h3 className="newsletter-title">Suscribite y enterate sobre mis posts!</h3>
                                <Suscribe/>
                            </div>
                        </div>
                    </>
                    )
                } else {
                    return(
                        <>
                            <div className="share-sticky">
                                <ShareButtons class="share-vert" titulo={dbPost.titulo} hashtag={hashtag} url={url} />
                            </div>
                            <div className="container-post">
                                <div className="container-intro">
                                    <img src={process.env.PUBLIC_URL + '/posts/'+ image} alt="Imagen destacata de post" className="post-img"></img>
                                </div>
                                <h1 className="container-title">{dbPost.titulo}</h1>
                                <div className="container-markdown">
                                    <Markdown>
                                        {post}
                                    </Markdown>
                                </div>
                                <div className="container-share-buttons">
                                    <ShareButtons class="share-hori" titulo={dbPost.titulo} descripcion={dbPost.descripcion} hashtag={hashtag} url={url} />
                                </div>
                                <div className="container-newsletter">
                                    <h3 className="newsletter-title">Suscribite y enterate sobre mis posts!</h3>
                                    <Suscribe/>
                                </div>
                            </div>
                        </>
                        )
                }
            } 


    useEffect(() => {
        getPost(id);
    },[id])

    return (
        <>
            {isLoading ? <LoadingSpinner/> : renderPost()}
        </>
    )
}

export default Post