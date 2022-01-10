window.onload = setup 

function setup() {
    document
        .getElementById('btNewUser')
        .addEventListener('click', () => handlerNewUser())
}

async function handlerNewUser() {
    try{
        const username = document.getElementById('inUsername').value
        const url = document.location.href.replace('/users', '/api/users') + '/' + username
        const resp = await fetch(url, { method: 'PUT'})
        if(resp.status != 201) {
            const msg = await resp.text()
            alertPanel(resp.status + ' ' + resp.statusText, msg)
            return
        }
        // const html = `<li>${username}</li>`
        // const parent = document.getElementById('ulUsers')
        // parent.insertAdjacentElement('beforeend', html)
        
        document.location.href = url.replace('/api', '') + '/tasks'

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