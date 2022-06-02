
import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {
    const {feedback} = useContext(FeedbackContext)

    //calculate ratings average
    let average = feedback.reduce((acc, current) => {
        return acc + current.rating
    }, 0) / feedback.length
  
    //set to 1 decimal, if it is zero, will replace with empty
    average = average.toFixed(1).replace(/[.,]0$/,'')
    
    return (
    <div className="feedback-stats">
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}


export default FeedbackStats