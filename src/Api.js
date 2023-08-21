import axios from 'axios'


export const fetchData = () => {
    const userPromise = fetchUser();
    const postsPromise = fetchPosts();
    return {
        user: wrapPromise(userPromise),
        posts: wrapPromise(postsPromise)
    }
}

const wrapPromise = promise => {
    // set initial status
    let status  =  'pending'
    // store result
    let result;
    //wait for promise
    let suspender =  promise.then(
        res => {
            status = 'success'
            result = res;
        },
        err => {
            status = 'error'
            result = err;
        }
    );
    return {
        read() {
            if(status == 'pending') {
                throw suspender;
            }else if (status=='error'){
               throw result;
            }else if (status=='success'){
                return result;
            }
           
        }
    }
}

const fetchUser = () => {
console.log("fetching user...")
return axios.get('https://jsonplaceholder.typicode.com/users/1')
.then(res=>res.data)
.catch(err=>console.log(err))
}

const fetchPosts = () => {
    console.log("fetching Posts...")
    return axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(res=>res.data)
    .catch(err=>console.log(err))
    }