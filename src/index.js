import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CardView from './CardView';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, HashRouter } from "react-router-dom";
import { content } from "./content"

function contentToObjects(content) {
  var concepts = content.split("---").map(c => {
    content = c.trim();

    if (content.length != 0) {
      const contentByLine = content.split("\n")
      var relationships = []
      var contentFiltered = []
      contentByLine.forEach(line => {
        if (line.match('={.*}\\[.*\\]')) {
          relationships.push({
            relationship: line.match(/\{([^)]+)\}/)[1],
            name: line.match(/\[([^)]+)\]/)[1],
          })
        }
      });

      contentByLine.forEach(line => {
        if (!line.match('={.*}\\[.*\\]')) {
          contentFiltered.push(line)
        }
      });
    
      return {
        title: content.split("\n")[0].replace("# ", ""),
        content: contentFiltered.join("\n"),
        relationships: relationships,
        tags: []
      }
    }
  });
  concepts = concepts.filter(c => c != undefined)
  return concepts
}

function getIndexMappings(concepts) {
  const indexMappings = new Map()

  concepts.forEach((c, i) => {
    indexMappings[c.title] = i
  })
  return indexMappings
}

function populateAllRelationships(cards) {
  var allRelationships = new Map()

  for (const card of cards) {
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
  return allRelationships
}

const cards = contentToObjects(content)
const indexMappings = getIndexMappings(cards)
const allRelationships = populateAllRelationships(cards)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <HashRouter>
    <Routes>
      <Route path="/" element={<Home cards={cards} />} />
      <Route path=":id" element={<CardView cards={cards} indexMappings={indexMappings} allRelationships={allRelationships} />} />
    </Routes>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
