window.onload = setup 

function setup() {
    const inTitle = document.querySelector('input[name="title"]')
    const inDesc = document.querySelector('input[name="desc"]')
    const inDueDate = document.querySelector('input[name="dueDate"]')
    document
        // .getElementById('btNewTask')
        .querySelector('#btNewTask')
        .addEventListener('click', () => handlerNewTAsk(inTitle, inDesc, inDueDate))
    document
        .querySelectorAll('.btn-danger')
        .forEach(elem => elem.addEventListener('click', () => handlerDeleteTask(elem)))
}

// eslint-disable-next-line no-unused-vars
function handlerDeleteTaskWithId(trId) {
    handlerDeleteTask(document.getElementById(trId))
}
/**
 * @param {Element} btDelete 
 */
function handlerDeleteTask(btDelete) {
    btDelete
        .parentElement // get the TD element
        .parentElement // get the TR element
        .remove()
}

/**
 * @param {Element} inTitle 
 * @param {Element} inDesc 
 * @param {Element} inDueDate 
 */
function handlerNewTAsk(inTitle, inDesc, inDueDate) {
    const title = inTitle.value
    const desc = inDesc.value
    const dueDate = inDueDate.value
    if(title == undefined || title == '') return alert('Title cannot be empty!')

    const fragment = fragmentRow(title, desc, dueDate)
    document
        .querySelector('tbody')
        .insertAdjacentHTML('beforeend', fragment)
}

function fragmentRow(title, desc, dueDate) {
    return `<tr>
        <td><button id="${title}" class="btn btn-danger" onClick="handlerDeleteTaskWithId('${title}')">Delete</button></td>
        <td>
            <a href="tasks/4bmls9xez58">${title}</a>
        </td>
        <td>${desc}</td>
        <td>${dueDate}</td>
    </tr>
`
}