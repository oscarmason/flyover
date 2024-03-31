import Card from './Card';
import NavigationPanel from './NavigationPanel';
import './CardView.css';

var allRelationships = new Map()

var card = {
  title: 'Master-Slave Replication',
  content: `
  # Master-Slave Replication
  - Master serves both reads and writes
  - Slaves server only reads
  - Data is replicated from the master to the slaves
  - Data can also be replicated from slaves to other slaves; this is useful to reduce load and number of connections on the master
  - If the master goes offline, the system can continue to operate in read-only mode until a slave is promoted to a master or a new master is provisioned
  - Updates may be propagated either synchronously or asynchronous

  ## Pros
  - Data backup
  - Horizontal scaling
  - Different clients can use different spaces e.g internal analytics
  `,
  tags: ["databases", "replication"],
  relationships: [
    {
      relationship: "is",
      name: "Database Replication Method"
    }
  ]
}

populateAllRelationships()
console.log("")

function populateAllRelationships() {
  card.relationships.forEach(r => {
    if (!allRelationships.has(r.relationship)) {
      allRelationships.set(r.relationship, new Map())
    }

    if (!allRelationships.get(r.relationship).has(r.name)) {
      allRelationships.get(r.relationship).set(r.name, new Set())
    }

    allRelationships.get(r.relationship).get(r.name).add(card.title)
  })
}

// Map from relationship item to others

export default function CardView() {
    return (
      <div className='CardView'>
        <Card content={card.content}/>
        <NavigationPanel tags={card.tags} allRelationships={allRelationships}/>
      </div>
    )
}
