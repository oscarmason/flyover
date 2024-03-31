import './Card.css';
import Markdown from 'react-markdown'

export default function Card({content}) {
    return (
        <div className="Card">
          <Markdown>{content}</Markdown>
        </div>
    )
  }
