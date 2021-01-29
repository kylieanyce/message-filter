import { getMessagesByFriend, useMessages } from "./MessageProvider.js"
import { Message } from "./Message.js"

const contentTarget = document.querySelector(".messages")
const friendListSection = document.querySelector(".friends")
const eventHub = document.querySelector(".container")


export const MessageList = () => {
    const allmessages = useMessages()
    render(allmessages)
}

//function that renders array to html-----------------------------------------------
const render = messageArray => {
    const convertedMessages = messageArray.map(messageObject => {
        const messageHTML = Message(messageObject)
        return messageHTML
    })
    const combinedSections = convertedMessages.join("")
    contentTarget.innerHTML = combinedSections
}

//listens for event, gets value of target (classlist="friend"), gets messages from -----------
//that object(s) and renders all messages with that classList to html------------------------------------
friendListSection.addEventListener("change", changeEvent => {
    if (changeEvent.target.classList.contains("friend")) {
        const friendName = changeEvent.target.value
        const messages = getMessagesByFriend(friendName)
        render(messages)
    }
})

//listens for a customEvent, adds detail payload (a specific property)
//to a variable that is then passed through the getMessagesByFriend function
//The messages from that specific property are returned and rendered 
eventHub.addEventListener("friendSelected", event => {
    const friendName = event.detail.friend
    const messages = getMessagesByFriend(friendName)
    render(messages)
})