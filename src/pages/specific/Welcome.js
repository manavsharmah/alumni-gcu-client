// import axios from "axios";
// import React, { useEffect, useState } from "react";
// axios.defaults.withCredentials = true

// const Welcome = () => {
//     const [user, setUser] = useState();
    
//     const sendRequest = async() => {
//         const res = await axios.get('http://localhost:5000/api/user', {
//             withCredentials: true
//         }) 
//         .catch((err) => console.log(err)); 
//         const data = await res.data;
//         console.log(data);
//         return data;     
//     }
    
//     useEffect(() => {
//         sendRequest().then((data) => setUser(data.user));
//     },[])    

//     return(
//         <div> 
//             <h1>Welcome</h1>
//             <h1>Welcome</h1>
//             <h1>Welcome</h1>       
//             {user && <h1>{user.name}</h1>}
//             {user && <h1>{user.name}</h1>} 
//             {user && <h1>{user.name}</h1>} 
//             {user && <h1>{user.name}</h1>} 
//             {user && <h1>{user.name}</h1>}  
//         </div>
//     );
    
// }

// export default Welcome;