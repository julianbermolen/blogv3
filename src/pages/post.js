import Markdown from 'markdown-to-jsx'
import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

import './pages.css'
import ShareButtons from '../components/ShareButtons/ShareButtons';

const Post = () => {
    // eslint-disable-next-line
    const [dbPost, setdbPost] = useState({});
    const [post, setPost] = useState("");
    const [image, setImage] = useState("");
    let { id } = useParams();
    let url = '';
    let hashtag = ["web","development","blog","IT"];
    if (typeof window === 'object') {
      url = String(window.location);
    }
    const getPost = (id) => {
        let uri = 'http://127.0.0.1:4000/posts/post/'+id;
        

        axios.get(uri)
            .then(res => {
                setdbPost(res.data.Post[0]);
                setImage(res.data.Post[0].img_name);
                import("../assets/posts/"+res.data.Post[0].file_name)
                    .then(res => {
                        fetch(res.default)
                            .then(res => res.text())
                            .then(res => setPost(res))
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => {
                console.log("No se seteó dbPost",err);
            })
    }

    useEffect(() => {
        getPost(id);
    },[id])

    return (
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
                    <ShareButtons class="share-hori" titulo={dbPost.titulo} hashtag={hashtag} url={url} />
                </div>
            </div>

        </>
    )
}

export default Post