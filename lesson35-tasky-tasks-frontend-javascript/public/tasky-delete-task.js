window.onload = setup 

function setup() {
    document
        .querySelectorAll('.btn-danger')
        .forEach(elem => elem.addEventListener('click', () => handlerDeleteTask(elem)))
}

/**
 * @param {Element} btDelete 
 */
async function handlerDeleteTask(btDelete) {
    /**
     * E.g. DELETE http://localhost:3000/api/users/muadib/tasks/q8oay64oz0i
     */
    try {
        const taskId = btDelete.dataset.taskId
        const url = document.location.href.replace('/users', '/api/users') + '/' + taskId
        const resp = await fetch(url, { method: 'DELETE'})
        if(resp.status != 200) {
            const msg = await resp.text()
            alertPanel('ERROR ' + resp.status + ': ' + resp.statusText, msg)
            return
        }
        btDelete
            .parentElement // get the TD element
            .parentElement // get the TR element
            .remove()
    } catch(err) {
        alertPanel('ERROR', err)
    }
}

function alertPanel(title, message, kind = 'danger') {
    const html = `<div class="alert alert-${kind} alert-dismissible fade show" role="alert">
                    <strong>${title}</strong>
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>`
    document
        .getElementById('alertPanel')
        .innerHTML = html
}