import './CardView.css';
import { useNavigate } from "react-router-dom";

export default function NavigationPanel({card, allRelationships, prev, next}) {
  let navigate = useNavigate(); 
  var cardRelationships = new Map()
  
  card.relationships.forEach((r) => {
    const relationship = r.relationship
    const name = r.name
    const children = allRelationships.get(relationship).get(name)
    if (!cardRelationships.has(relationship)) {
      cardRelationships.set(relationship, new Map())
    }

    cardRelationships.get(relationship).set(name, children)
  })

  var relationships = []
  cardRelationships.forEach((childrenByName, relationship) => {
    childrenByName.forEach((children, name) => {
      var childrenFormated = []
      children.forEach(c => childrenFormated.push(<span onClick={ function() { navigate("/" + c) } }>{c}, </span>))

      relationships.push(
        <p>
          <span className='Relationship'>{relationship} </span>
          <span className='RelationshipName'>{name}</span>{": "} 
          { childrenFormated.map(r => r) }
        </p>
      )
    });
  });

  function getPrevButton() {
    if (prev != undefined) {
      return <div className="NextPrev" onClick={ function() { navigate("/"+prev.title) } } />
    } else {
      return <div className="NextPrev" disabled/>
    }
  }

  function getNextButton() {
    if (next != undefined) {
      return <div className="NextPrev" onClick={ function() { navigate("/"+next.title) } } />
    } else {
      return <div className="NextPrev" disabled/>
    }
  }
  
  return (
    <div className="NavigationPanel">
      <div className='Search'>Search</div>
      <div className='Tags'><p>{ card.tags.map(t => '#' + t + ' ') }</p></div>
      <div className='Relationships'>{ relationships.map(r => r) }</div>
      <div className='FixedNavigation'>
        {getPrevButton()}
        {getNextButton()}
        <div className="HomeButton" onClick={ function() { navigate("/") } } />
      </div>
    </div>
  )
}
