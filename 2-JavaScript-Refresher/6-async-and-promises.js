
setTimeout(() => {
    console.log('Timer');
}, 1);

console.log('Task 1');

const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('PROMISE Done!');
        }, 1000);
    });
    return promise;
};

setTimeout(() => {
    fetchData().then((t) => console.log(t));
}, 1);


console.log('Task 2');