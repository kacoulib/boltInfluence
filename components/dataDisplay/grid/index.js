import MUIDataTable from "mui-datatables";

const columns = [
    {
        name: "img",
        label: "Img",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "name",
        label: "Name",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "company",
        label: "Company",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "city",
        label: "City",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "state",
        label: "State",
        options: {
            filter: true,
            sort: false,
        }
    },
];



const imgs = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEpN0CdweW_9rtafeloKHlN9Nxthy93PPIVxdxZO2-6LUrgPqy',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8KJm4KqRYMdCqNq-R5in8QQVLJoWdImvSjV0EDTJFhUMzn5EhpQ',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0NPYmUvAvS7RDq30I2SlIHqgrTCN09XEoEjfzAcAnLklTm6rh2g',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgmWNz5WaZyoOrLZcBMDTv2eBERwID_70GNf5u5mZaWz-L7WvQQA'
]

const data = [
    { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
    { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
    { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
    { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
];
data.map((e, i) => e['img'] = <img src={imgs[i]} style={{ width: '30px' }} />)

const options = {
    filterType: 'checkbox',
};

const Grid = () => (
    <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
    />

)
export default Grid;
