import logo from './logo.svg';
import './App.css';
import Card from './Card';
import NavigationPanel from './NavigationPanel';
import './CardView.css';
import { useParams } from 'react-router-dom';

function CardView({cards, indexMappings, allRelationships}) {
  const { id } = useParams();
  const idx = indexMappings[id]
  const card = cards[idx]
  return (
    <div className="App">
      <div className="Page">
        <div className='CardView'>
          <Card content={card.content}/>
          <NavigationPanel card={card} allRelationships={allRelationships} prev={cards[idx-1]} next={cards[idx+1]}/>
        </div>
      </div>
    </div>
  );
}

export default CardView;
