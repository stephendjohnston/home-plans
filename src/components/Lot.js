import { Link } from 'react-router-dom';
import heartLogo from '../public/images/heart.png'

export default function Lot({ lotId, address, acres, description, image, saveButtonState, onClickSaveButton }) {
  const [street, city, state] = address.split(',');
  const sqftPerAcre = 43560;
  const sqftRounded = Number((acres * sqftPerAcre).toFixed(0));

  return (
    <Link to={`/lots?lot=${lotId}`}>
      <div className="cardContainer">
        <div className="cardImageContainer"><img src={image} alt={address}/>
          <div><button className="favoriteButton" id={String(saveButtonState)} onClick={(event) => onClickSaveButton(event, lotId)}><img src={heartLogo} alt="heart icon"/></button>
          </div>
        </div>
        <div className="lotInfoContainer">
          <h2>{street}</h2>
          <p id="cityState">{city}, {state}</p>
          <p id="acreage">{acres} acres - {sqftRounded.toLocaleString()} sqft</p>
          <p className="lotDescription">{description}</p>
        </div>
      </div>
    </Link>
  )
}