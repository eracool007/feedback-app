
import { v4 as uuidv4 } from 'uuid'
import {createContext, useState, useEffect} from 'react'

const FeedbackContext = createContext()


export const FeedbackProvider = ({children}) => {

    const[isLoading, setIsLoading] = useState(true)
    
    const [feedback, setFeedback] = useState([])
   
    // update feedback item
    const updateFeedback = (id, updItem) => {
        setFeedback(
            feedback.map((item) => item.id === id ? { ...item, ...updItem } : item))
    }

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    //fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
        const data = await response.json()

       setFeedback(data)
       setIsLoading(false)
    }
  
    //set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    //add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback]);
    }
    
    //delete feedback
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
           setFeedback(feedback.filter((item) => item.id !==id))
        }
    } 


    return ( 
        <FeedbackContext.Provider value={{
            feedback,
            feedbackEdit,
            isLoading,
            deleteFeedback,
            addFeedback,
            editFeedback,
            updateFeedback
        }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext