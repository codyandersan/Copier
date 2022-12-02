const runHandler = () => {
    const uri = 'https://api.paste.ee/v1/pastes?key=a8w6YZP62DqbFhFXohNbumCkPgpfGrDdd9WgQFswf';
    const desc = document.getElementById("desc").value
    const text = document.getElementById("text").value
    const title = document.getElementById("title").value
    const initDetails = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: "cors",
        body: JSON.stringify({
            "description": desc,
            "sections": [
                {
                    "name": title,
                    "syntax": "autodetect",
                    "contents": text
                }]
        }
        )
    }
    return [uri, initDetails]
}


function createPaste() {
    let resp = runHandler()
    let uri = resp[0]
    let initDetails = resp[1]

    fetch(uri, initDetails)
        .then(response => {
            if (response.status !== 201) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            return response.json();
        }
        )
        .then(resp => {
            let pasteLink = resp["link"]
            let box = document.getElementById("box")
            box.style += "display:block;"
            copyLink(pasteLink.replace("/p/", "/d/"))
            document.getElementById("copyBtn").href = pasteLink.replace("/p/", "/d/")

        })
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });
}


function copyLink(text) {
    navigator.clipboard.writeText(text).then(() => {
    })
}
