const api = "https://api.potterdb.com/v1/";

export const getCharacters = async (pageNumber) => {
    const response = await fetch(api + 'characters?page[number]=' + pageNumber + '&page[size]=100');
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data.errors ? data.errors[0].detail : 'Unknown error occurred');
    }
    return data.data;
}

export const getSpells = async (pageNumber) => {
    const response = await fetch(api + 'spells?page[number]=' + pageNumber + '&page[size]=100');
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data.errors ? data.errors[0].detail : 'Unknown error occurred');
    }
    return data.data;
}
