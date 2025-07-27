function storage({key, data}) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key) {
    const storedItem = localStorage.getItem(key);

    if(storedItem) {
        const data = JSON.parse(storedItem);
        return data;
    } else {
        throw new Error("Data not found in storage");
    }
}