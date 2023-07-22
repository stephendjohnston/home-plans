import './App.css';
import { useState, useEffect} from 'react'
import { Routes, Route, Link, useSearchParams } from 'react-router-dom';
import Homes from './components/Homes';
import Lots from './components/Lots';
import HomeModal from './components/HomeModal';
import LotModal from './components/LotModal';
import {API} from './server/mockApi/apiClient';

function App() {
  const [homes, setHomes] = useState([]);
  const [lots, setLots] = useState([]);
  const [combinations, setCombinations] = useState([])
  const [homesSaved, setHomesSaved] = useState(false);
  const [lotsSaved, setLotsSaved] = useState(false);
  const savedHomes = homes.filter(home => home.saveButtonState);
  const savedLots= lots.filter(lot => lot.saveButtonState);

  const [params] = useSearchParams();

  useEffect(() => {
    const fetchAllData = async () => {
      let homePlans = await API.getHomePlans();
      let lots = await API.getLots();
      let combos = await API.getCombinations();

      homePlans.forEach(home => home.saveButtonState = false);
      lots.forEach(lot => lot.saveButtonState = false);

      setHomes(homePlans);
      setLots(lots);
      setCombinations(combos);
    }

    fetchAllData();
  }, []);

  const handleClickSaveHomeButton = (event, homePlanId) => {
    event.preventDefault();
    const updatedHomes = homes.map(home => {
      let newHome = {...home};
      if (homePlanId === newHome.homePlanId) {
        newHome.saveButtonState = !newHome.saveButtonState;
      }
      return newHome;
    });

    setHomes(updatedHomes);
  }

  const handleShowSavedHomes = () => {
    setHomesSaved(!homesSaved);
  }

  const handleClickSaveLotButton = (event, lotId) => {
    event.preventDefault();
    const updatedLots = lots.map(lot => {
      let newLot = {...lot}
      if (lotId === newLot.lotId) {
        newLot.saveButtonState = !newLot.saveButtonState;
      }
      return newLot;
    });

    setLots(updatedLots);
  }

  const handleShowSavedLots = () => {
    setLotsSaved(!lotsSaved);
  }

  const modalId = params.get("home") || params.get("lot");

  return (
    <>
      <div className="App">
        <div className="sidenav">
          <ul>
            <li><Link to='/homes'>Home Plans</Link></li>
            <li><Link to='/lots'>Lots</Link></li>
          </ul>
        </div>
        <Routes>
          <Route path='homes' element={<Homes homes={homes} savedHomes={savedHomes} homesSaved={homesSaved} onClickSaveButton={handleClickSaveHomeButton} onClickShowSavedHomes={handleShowSavedHomes}/>}/>
          <Route path='lots' element={<Lots lots={lots} savedLots={savedLots} lotsSaved={lotsSaved} onClickSaveButton={handleClickSaveLotButton} onClickShowSavedLots={handleShowSavedLots} />}/>
          <Route path="/homes?home=:id" />
          <Route path="/lots?lot=:id" />
        </Routes>
      </div>
      {modalId && params.get("home") && <HomeModal homes={homes} lots={lots} combos={combinations} modalId={modalId} onClickSaveHomeButton={handleClickSaveHomeButton} onClickSaveLotButton={handleClickSaveLotButton}/>}
      {modalId && params.get("lot") && <LotModal lots={lots} homes={homes} combos={combinations} modalId={modalId} onClickSaveHomeButton={handleClickSaveHomeButton} onClickSaveLotButton={handleClickSaveLotButton}/>}
    </>
  );
}

export default App;
