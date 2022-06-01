import { useState, useEffect } from 'react'
import axios from 'axios'
import {Container} from 'react-bootstrap'
import SearchPost from '../components/SearchPost'
import Posts from '../components/Posts'
import LoadingSpinner from '../components/Spiner/Spiner'
import './pages.css'

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const getPosts = () => {
        //let url = 'http://localhost:4000/posts/posts';
        let url = 'https://bermo-blogv2-be.herokuapp.com/posts/posts';
        setIsLoading(true);
        axios.get(url)
            .then(res => {
                setPosts(res.data.Posts);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            })        
    }

    const renderPosts = () => {
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
    
    useEffect(() => {getPosts()},[]);

    return (
        <>
            {isLoading ? <LoadingSpinner/> : renderPosts()}
        </>
    )
}

export default Blog