export function UserPaperTemplate({
    userName,
    id
}) {
    return `
        <div class="flex align-center space-between bordered-container indent">
            <div class="userPaper_info">${userName}</div>
            <div data-userId="${id}" class="userPaper_actions flex space-between">
                <button class="viewUser btn btn_filled">View</button>
                <button class="deleteUser btn btn_outlined">Delete</button>
            </div>
        </div>
    `;
};
