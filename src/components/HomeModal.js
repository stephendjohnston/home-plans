import { useNavigate } from 'react-router-dom'
import Lot from './Lot'
import HeartLogo from '../public/images/heart.png';

export default function HomeModal(props) {
  let lotIds = props.combos.filter(combo => combo.homePlanId === Number(props.modalId)).map(combo => combo.lotId);
  let lots = props.lots.filter(lot => lotIds.includes(lot.lotId));
  let home = props.homes.find(home => home.homePlanId === Number(props.modalId));
  const navigate = useNavigate();

  const handleBlur = () => {
    navigate("/homes");
  }

  return (
    <div id="modal-container">
    <div className="screen" onClick={handleBlur}></div>
    <div id="modal">
      <div className="modalContainer">
        <div className="selectedCardContainer">
          <div className="modalImageContainer"><img src={home.image} alt={home.name}/></div>
          <div className="modalInformationContainer">
            <div className="homeInfoContainer">
              <h3>{home.name}</h3>
              <p id="homeDetails">{home.numBeds} beds - {home.numBaths} baths - {home.sqft.toLocaleString()} sqft</p>
              <div className="tagsContainer">
                {home.tags.map(tag => {
                  return <p key={tag}>{tag}</p>
                })}
              </div>
              <p className="description">{home.description}</p>
            </div>
            <div><button className="favoriteButton" id={String(home.saveButtonState)} onClick={(event) => props.onClickSaveHomeButton(event, home.homePlanId)}><img src={HeartLogo} alt="heart icon"/></button>
            </div>
          </div>
        </div>
        <div className="compatibleOptionsContainer">
          <div id="compatibleOptionsTitle">
            <p>Compatible Lots</p>
          </div>
          <div className="compatibleOptionsList">
            {lots.map(lot => {
              return <Lot key={lot.lotId} {...lot} onClickSaveButton={props.onClickSaveLotButton}/>
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}