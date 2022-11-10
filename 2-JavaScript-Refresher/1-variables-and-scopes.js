
function varExample(){
    var name = 'Marizilda';
    var test = true;

    console.log(`--- var ---`);
    console.log(`Global: ${name}`);
    
   if (test) {
        var name = 'Francisco'
        console.log(`Block: ${name}`);
    }

    console.log(`Global: ${name}`);
}

function letExample(){
    let name = 'Marizilda';
    let test = true;

    console.log(`--- let ---`);
    console.log(`Global: ${name}`);
    
   if (test) {
        let name = 'Francisco'
        console.log(`Block: ${name}`);
    }

    console.log(`Global: ${name}`);
}

function constExample(){
    const name = 'Marizilda';
    let test = true;

    console.log(`--- const ---`);
    console.log(`Global: ${name}`);
    
   if (test) {
        const name = 'Francisco'
        console.log(`Block: ${name}`);
    }

    console.log(`Global: ${name}`);
}

varExample();
letExample();
constExample();