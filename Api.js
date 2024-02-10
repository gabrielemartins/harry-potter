const api = "https://api.potterdb.com/v1/";

export const getCharacters = async (pageNumber) => {
    const response = await fetch(api + 'characters?page[number]='+pageNumber+'&page[size]=10');
    const data = await response.json();
    if (response.status != 200) {
        return cosole.error('Error fetching characters:', data);
    }
    else return data.data
}

