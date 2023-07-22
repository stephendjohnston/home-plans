import Home from './Home';

export default function Homes({ homes, savedHomes, homesSaved, onClickSaveButton, onClickShowSavedHomes }) {
  const homesToDisplay = savedHomes.length > 0 && homesSaved ? savedHomes : homes;

  return (
    <div className="homesListContainer"><button className="button" onClick={() => onClickShowSavedHomes()}>{savedHomes.length > 0 && homesSaved ? 'Show All Homes' : 'Show Saved Homes'}</button>
      <div className="homesList">
        {homesToDisplay.map(home => {
          return <Home key={home.homePlanId} onClickSaveButton={onClickSaveButton} {...home}/>
        })}
      </div>
    </div>
  );
}