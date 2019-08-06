import ReactSelect from 'react-select'
const styles = {
    control: styles => ({
        ...styles,
        backgroundColor: 'none',
        borderRadius: 0,
        border: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    }),
}

const ReactSelectComp = ({ name, value, onChange, options }) => (
    <ReactSelect
        isMulti
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        styles={styles}
    />
)
export const buildFromArray = (datas, label, value) => datas && datas.map(elem => ({ label: elem[label], value: elem[value] }));

export const buildFieldArray = (datas, label, value) => datas && datas.map(elem => ({ label: elem[label], value: elem[value] }));

export const buildToArray = (datas) => {
    const newData = [];

    datas && datas.map(elem => {
        newData.push(elem.value)
    })
    return newData;
}


export default ReactSelectComp
