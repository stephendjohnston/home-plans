import { useNavigate } from 'react-router-dom'
import Home from './Home';
import HeartLogo from '../public/images/heart.png';

export default function LotModal(props) {
  const homeIds = props.combos.filter(combo => combo.lotId === Number(props.modalId)).map(combo => combo.homePlanId);
  let homes = props.homes.filter(lot => homeIds.includes(lot.homePlanId));
  let lot = props.lots.find(lot => lot.lotId === Number(props.modalId));

  const [street, city, state] = lot.address.split(',');
  const sqftPerAcre = 43560;
  const sqftRounded = Number((lot.acres * sqftPerAcre).toFixed(0));

  const navigate = useNavigate();

  const handleBlur = () => {
    navigate("/lots");
  }

  return (
    <div id="modal-container">
    <div className="screen" onClick={handleBlur}></div>
    <div id="modal">
      <div className="modalContainer">
        <div className="selectedCardContainer">
          <div className="modalImageContainer"><img src={lot.image} alt="123-example-ln"/></div>
          <div className="modalInformationContainer">
            <div className="lotInfoContainer">
              <h2>{street}</h2>
              <p id="cityState"> {city}, {state}</p>
              <p id="acreage">{lot.acres} - {sqftRounded.toLocaleString()} sqft</p>
              <p className="lotDescription">{lot.description}</p>
            </div>
            <div><button className="favoriteButton" id={String(lot.saveButtonState)} onClick={(event) => props.onClickSaveLotButton(event, lot.lotId)}><img src={HeartLogo} alt="heart icon"/></button>
            </div>
          </div>
        </div>
        <div className="compatibleOptionsContainer">
          <div id="compatibleOptionsTitle">
            <p>Compatible Homes</p>
          </div>
          <div className="compatibleOptionsList">
            {homes.map(home => {
              return <Home key={home.homePlanId} {...home} onClickSaveButton={props.onClickSaveHomeButton}/>
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}