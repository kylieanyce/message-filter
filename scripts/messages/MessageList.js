import { getMessagesByFriend, useMessages } from "./MessageProvider.js"
import { Message } from "./Message.js"

const contentTarget = document.querySelector(".messages")
const friendListSection = document.querySelector(".friends")
const eventHub = document.querySelector(".container")

/*
    COMPONENT FUNCTION
*/
export const MessageList = () => {
    const allmessages = useMessages()
    render(allmessages)
}

/*
    RENDERING FUNCTION
*/
const render = messageArray => {
    const convertedMessages = messageArray.map(messageObject => {
        const messageHTML = Message(messageObject)
        return messageHTML
    })
    const combinedSections = convertedMessages.join("")
    contentTarget.innerHTML = combinedSections
}

// Listen for when a friend is selected
friendListSection.addEventListener("change", changeEvent => {

    if (changeEvent.target.classList.contains("friend")) {
        // Get messages for friend and render the list of messages
        const friendName = changeEvent.target.value
        const messages = getMessagesByFriend(friendName)
        render(messages)
    }
})

eventHub.addEventListener("friendSelected", event => {
    const friendName = event.detail.friend
    const messages = getMessagesByFriend(friendName)
    render(messages)
})