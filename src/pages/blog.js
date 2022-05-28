import { useState, useEffect } from 'react'
import axios from 'axios'
import {Container} from 'react-bootstrap'
import SearchPost from '../components/SearchPost'
import Posts from '../components/Posts'
import './pages.css'

const Blog = () => {
    const [posts, setPosts] = useState([]);
    
    const getPosts = () => {
        //let url = 'http://localhost:4000/posts/posts';
        let url = 'https://bermo-blogv2-be.herokuapp.com/posts/posts';
        axios.get(url)
            .then(res => {
                setPosts(res.data.Posts);
            })
            .catch(err => {
                console.log(err);
            })        
    }

    
    useEffect(() => {getPosts()},[]);

    return (
        <Container>
            <div class="home-section">
                <h1 className="jb-title">Blog</h1>
                <p className="blog-subtitle">Escribiré acerca de técnología, desarrollo, lenguajes de programación y más!</p>
                <SearchPost posts={posts} />
                <Posts posts={posts}/>
            </div>
        </Container>
    )
}

export default Blog