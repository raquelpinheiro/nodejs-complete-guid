
const person = {
    name: 'Raquel',
    age: 35,
    country: 'Brazil',
    city: 'Curitiba'
}

const printName = ({ name }) => {
    console.log(name);
}

printName(person);

const hobbies = ['Walking', 'Series', 'Listen music'];
const [firstHobbie] = hobbies;
console.log(firstHobbie);