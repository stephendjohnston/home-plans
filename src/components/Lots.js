import Lot from './Lot';

export default function Lots({ lots, savedLots, lotsSaved, onClickSaveButton, onClickShowSavedLots }) {
  const lotsToDisplay = savedLots.length > 0 && lotsSaved ? savedLots : lots;

  return (
    <div className="lotsContainer"><button className="button" onClick={() => onClickShowSavedLots()}>{savedLots.length > 0 && lotsSaved ? 'Show All Lots' : 'Show Saved Lots'}</button>
      <div className="lotsList">
        {lotsToDisplay.map(lot => {
          return <Lot key={lot.lotId} onClickSaveButton={onClickSaveButton} {...lot}/>
        })}
      </div>
    </div>
  )
}