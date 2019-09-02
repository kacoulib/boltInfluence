export const buildFromArray = (datas, label, value) => datas && datas.map(elem => ({ label: elem[label], value: elem[value] }));

export const buildToArray = (datas) => {
    const newData = [];

    datas && datas.map(elem => {
        newData.push(elem.value)
    })
    return newData;
}

export const toggleArray = (array, name) => {
    let found = false, data;

    if (!array || !name)
        return array;

    data = array.filter((elem) => {
        if (elem == name)
            found = true;

        return elem != name
    });

    if (!found)
        data.push(name)
    return data
}