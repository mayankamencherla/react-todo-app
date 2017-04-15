function addPromise (a, b){
    return new Promise(function (resolve, reject){
        if (typeof a === 'number' && typeof b === 'number'){
            resolve(a + b);
        } else if (typeof a !== 'number'){
            reject('a is not a number');
        } else {
            reject('b is not a number');
        }
    });
}

addPromise(3,5).then(function (sum){
    console.log(sum);
}, function (err){
    console.log(err);
});

addPromise(3,'five').then(function (sum){
    console.log(sum);
}, function (err){
    console.log(err);
});

addPromise('three',5).then(function (sum){
    console.log(sum);
}, function (err){
    console.log(err);
});