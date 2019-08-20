export const buildForSelect = (datas, label, value) => datas && datas.map(elem => ({ label: elem[label], value: elem[value] }));

export const buildFromArray = (datas, label, value) => datas && datas.map(elem => ({ label: elem[label], value: elem[value] }));

export const buildFieldArray = (datas, label, value) => datas && datas.map(elem => ({ label: elem[label], value: elem[value] }));

export const buildToArray = (datas) => {
    const newData = [];

    datas && datas.map(elem => {
        newData.push(elem.value)
    })
    return newData;
}
