
const promise1 = Promise.resolve(73);
const promise2 = 56;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'mango');
});

var promises=[];
promises.push(promise1,promise2,promise3);


function promiseAll(promises) {
    return new Promise((resolve, reject) => {
       let results = [];
       let promisesCompleted = 0;
        
       promises.forEach((value, index) => {
            Promise.resolve(value).then(result => {
                results[index] = result;
                promisesCompleted += 1;
                
                if (promisesCompleted == promises.length) {
                    
                    resolve(results);

                }
            }).catch(err => reject(err));
       });
    });
}

promiseAll(promises)
.then((value)=>{
    console.log(value);
})
.catch((error)=>{
    console.log("error encountered");
});