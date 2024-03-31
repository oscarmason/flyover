import './CardView.css';

export default function NavigationPanel({tags, allRelationships}) {
  var relationships = []
  
  allRelationships.forEach((childrenByName, relationship) => {
    childrenByName.forEach((children, name) => {
      var childrenFormated = ""
      children.forEach(c => childrenFormated += c + " ")
      relationships.push(
        <p><span className='Relationship'>{relationship}</span> <span className='RelationshipName'>{name}</span>: {childrenFormated}</p>
      )
    });
  });
  
  return (
    <div className="NavigationPanel">
          <div className='Search'>Search</div>
          <div className='Tags'>
            <p>
              { tags.map(t => '#' + t + ' ') }
            </p>
          </div>
          <div className='Relationships'>
          { relationships.map(
            r => r
          ) }
          </div>
        </div>
    )
  }
