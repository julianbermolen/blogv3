import {FacebookShareButton, FacebookIcon,TwitterShareButton, TwitterIcon} from "react-share";
import './ShareButtons.css'

const ShareButtons = (props) => {

    return (
        <div className={props.class}>
            <div className="share-button">
                <FacebookShareButton 
                            url={props.url}
                            title={props.titulo}
                            quote={props.titulo}
                            hashtags={props.hashtag}
                            >
                    <FacebookIcon size={36} />                    
                </FacebookShareButton>
            </div>
            <div className="share-button">
                <TwitterShareButton
                    url={props.url}
                    title={props.titulo}
                    hashtags={props.hashtag}
                    >
                        <TwitterIcon size={36} />
                </TwitterShareButton>
            </div>
        </div>
    );
}

export default ShareButtons
