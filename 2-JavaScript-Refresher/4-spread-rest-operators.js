
function spreadOperator() {

    let hobbies = ['Walking', 'Movies'];
    console.log(hobbies);

    let copyHobbies = hobbies.slice();
    console.log(copyHobbies);

    let copiedHobbies = [...hobbies];
    console.log(copiedHobbies);

    hobbies.push('Music');

    console.log(hobbies);
    console.log(cloneHobbies);
    console.log(copiedHobbies);
}

function restOperator(){

    const sum = (...args) => {
        let total = 0;
        for (const arg of args) {
            total += arg;
        }
        return total;
    };
   
    console.log(sum(1,2,3,4,5));

    const toArray = (...args) => {
        return args;
    };

    console.log(toArray(1,2,3,4,5));
}

spreadOperator();
restOperator();