import './SearchPost.css'
import {Form} from 'react-bootstrap'
import {useState, useEffect} from 'react'

const SearchPost = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState([]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        if(searchTerm.length > 2){
            const results = props.posts.filter(post => {
                return post.titulo.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setSearch(results);
        } else {
            setSearch([]);
        }
    },[searchTerm]);

    return (
        <div className="container-search">
            <Form.Control name="search-button" onChange={handleSearch} className="search-input" type="text" placeholder="Buscar..." />
            <ul className="search-results">
                {search.map(res => {
                    return <li className="s-result"><a className="link-result" href={"/post/"+res.id}>{res.titulo}</a></li>
                })}
            </ul>
        </div>
    )
}

export default SearchPost