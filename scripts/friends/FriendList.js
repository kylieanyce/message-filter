import { useFriends } from "./FriendProvider.js"

// DOM element where friends will be rendered
const contentTarget = document.querySelector(".friends")
const eventHub = document.querySelector(".container")

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
//Returns name of friend----------------------------------------------------
eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.classList.contains("friend")) {
        const selectedFriend = changeEvent.target.value

        const message = new CustomEvent("friendSelected", {
            detail: {
                friend: selectedFriend
            }
        })
        eventHub.dispatchEvent(message)
    }
})