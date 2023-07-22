import { Link } from 'react-router-dom';
import heartLogo from '../public/images/heart.png'

export default function Home({ homePlanId, name, numBeds, numBaths, sqft, image, tags, description, onClickSaveButton, saveButtonState }) {
  return (
    <Link to={`/homes?home=${homePlanId}`}>
      <div className="cardContainer">
        <div className="cardImageContainer"><img src={image} alt={name}/>
          <div><button className="favoriteButton" id={String(saveButtonState)} onClick={(event) => onClickSaveButton(event, homePlanId)}><img src={heartLogo} alt="heart icon"/></button>
          </div>
        </div>
        <div className="homeInfoContainer">
          <h3>{name}</h3>
          <p id="homeDetails">{numBeds} beds - {numBaths} baths - {sqft.toLocaleString()} sqft</p>
          <div className="tagsContainer">
            {tags.map(tag => {
              return <p key={tag} className="tags">{tag}</p>
            })}
          </div>
          <p className="description">{description}</p>
        </div>
      </div>
    </Link>
  )
}