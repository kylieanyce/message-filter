import { useFriends } from "./FriendProvider.js"

// DOM element where friends will be rendered
const contentTarget = document.querySelector(".friends")

// Function that renders a collection of friends
const render = friendCollection => {
    contentTarget.innerHTML = `
        ${
            friendCollection.map(friend => {
                return `
                    <div>
                        <input class="friend" name="friend" type="radio" value="${friend.name}">
                        ${friend.name}
                    </div>
                `
            }).join("")
        }
    `
}

// Component function for initial rendering of friends
export const FriendList = () => {
    const appStateFriends = useFriends()
    render(appStateFriends)
}

// Listen for a browser-generated change event
eventHub.addEventListener("change", changeEvent => {

    // If the change event was generated by the radio buttons...
    if (changeEvent.target.classList.contains("friend")) {
        const selectedFriend = changeEvent.target.value

        // Generate a new custom message that a friend was selected
        const message = new CustomEvent("friendSelected", {
            detail: {
                friend: selectedFriend
            }
        })

        // Dispatch custom message to event hub
        eventHub.dispatchEvent(message)
    }
})