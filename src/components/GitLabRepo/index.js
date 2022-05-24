import axios from 'axios'
import {useEffect, useState} from 'react'
import {AiOutlineStar} from 'react-icons/ai'
import {BiGitMerge} from 'react-icons/bi'
import './GitLabRepo.css'

const GitLabRepo = (props) => {
    const [repositories, setRepositories] = useState([]);
    const getRepo = () => {
        let uri = "https://gitlab.com/api/v4/users/"+props.user+"/projects?per_page=5";
        axios.get(uri)
            .then(response => {
                setRepositories(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {getRepo()},[]);

    return (
        <>
            {
                repositories.map(res => {
            
                    return(
                        <a className="card-container" href={res.web_url} target="_blank">
                            <div className="card-container-text">
                                <h3 className="card-repo-title">{res.name}</h3>
                                <p className="card-repo-desc">{res.description}</p>
                            </div>
                            <div className="card-container-stars">
                                <div className="stars">
                                    <AiOutlineStar/>{res.star_count}
                                </div>
                                <div className="merges">
                                    <BiGitMerge/>{res.forks_count}
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </>
    );

}

export default GitLabRepo