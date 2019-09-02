function fetchJSONFile(path, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                let data = JSON.parse(httpRequest.responseText);
                if (callback) {
                    callback(data);
                }
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

function readData(data) {
    let personData = data.people;
    console.log(data);
    console.log(personData[0].name)
}

// this is the function executed as a callback when parsing is done
fetchJSONFile('simpleJSON.json', readData);
