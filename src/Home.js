import logo from './logo.svg';
import './App.css';
import CardView from './CardView';
import { useNavigate } from "react-router-dom";

function Home({cards}) {
  let navigate = useNavigate()

  const cardsList = []
  for (const card of cards) {
    cardsList.push(
      <p onClick={ function() { navigate(card.title) } }>{card.title}</p>
    )
  }

  return (
    <div className="App">
      <div className='Page'>
        {cardsList}
      </div>
    </div>
  );
}

export default Home;
