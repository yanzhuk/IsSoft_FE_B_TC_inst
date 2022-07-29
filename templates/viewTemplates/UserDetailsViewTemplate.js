
export function UserDetailsViewTemplate(
    {
        id: userId,
        userName,
        about,
        location,
        age,
    },
    loggedUserId
) {
    const renderEditBtn = () =>
        '<button id="editUserDetails" class="btn-icon btn-icon--settings"></button>';

    return `
        <div class="userDetails-header bordered-container flex align-center space-between indent">
            <h2>Hello ${userName}</h2>
            <div class="header-actions flex align-center space-between">
                ${userId === loggedUserId ? renderEditBtn() : ''}
                <button id="logOffUser" class="btn btn_filled">Log off</button>
            </div>
        </div>
        <div class="userDetails-info bordered-container indent">
            <ul>
                <li>About: ${about ?? ''}</li>
                <li>Location: ${location ?? ''}</li>
                <li>Age: ${age ?? ''}</li>
            </ul>
        </div>
    `;
}
