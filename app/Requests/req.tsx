import axios from 'axios';


 export async function Login(email: any , password: any) {

    try {
        console.log('Calling Login APi')
        const response = await axios.post('http://localhost:9000/api/admin/loginAdmin', {
            email,
            password,
          });
          // Handle successful login (e.g., save token, redirect)
         
          return response.status       
      } catch (err) {
       

}}

export async function LoginUser(email: any , password: any) {

    try {
        console.log('Calling Login APi')
        const response = await axios.post('http://localhost:9000/api/manager/loginUser', {
            email,
            password,
          });
          // Handle successful login (e.g., save token, redirect)
         
          return response      
      } catch (err) {
       

}}

export async function RegisterNewUser(name: any ,role: any ,email: any , password: any , id: any) {

    try {
        console.log('Calling Register User APi')
        const response = await axios.post('http://localhost:9000/api/admin/newUser', {
            name,
            email,
            password,
            role,
            id
          });
          // Handle successful login (e.g., save token, redirect)
         
          return response     
      } catch (err) {
       

}

 }
 export async function GetUsers() {

    try {
        console.log('Calling User List APi')
        const response = await axios.get('http://localhost:9000/api/admin/getUsers');
          // Handle successful login (e.g., save token, redirect)
         
          return response.data       
      } catch (err) {
       return err

}
 }
export async function Getmanager(id:any) {

    try {
        console.log('Calling User List APi')
        const response = await axios.post('http://localhost:9000/api/admin/getmanager', {
            id,
          });
          // Handle successful login (e.g., save token, redirect)
         
          return response.data       
      } catch (err) {
       console.log(err)

}

 }
 export async function changeManager(mid: any ,uid: any) {

    try {
        console.log('Calling Register User APi')
        const response = await axios.post('http://localhost:9000/api/admin/assignNewManager', {
            userid : uid,
            managerid : mid,
          });
          // Handle successful login (e.g., save token, redirect)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }
 export async function AssignTask(mid: any ,uid: any, tit: any ,des: any, duedate : any ,stat : any) {

    try {
        console.log('Calling Assign Task ',uid)
        const response = await axios.post('http://localhost:9000/api/admin/assignTask', {
            manager_id : mid,
             user_id :  uid,
             title : tit ,
              description : des,
               due_date :  duedate,
               status : stat,
          });
          // Handle successful login (e.g., save token, redirect)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }

 export async function GetAllTask(uid: any) {

    try {
        console.log('Get All Task ',uid)
        const response = await axios.post('http://localhost:9000/api/admin/getalltask', {
           uid
          }
          )
          console.log('API CALLED ',response)
          console.log(global.token)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }
 export async function UpdateStatus(uid: any,tid : any,status: any) {

    try {
        console.log('Get All Task ',uid)
        const response = await axios.post('http://localhost:9000/api/admin/UpdateStatus', {
           uid,
           tid,
           status
          }
          )
          console.log('API CALLED UpdateStatus',uid)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }

 export async function UpdateTitle(uid: any,tid: any,title: any) {

    try {
        console.log('Get All Task ',uid)
        const response = await axios.post('http://localhost:9000/api/admin/UpdateTitle', {
           uid,
           tid,
           title
          }
          )
          console.log('API CALLED UpdateStatus',uid)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }
 export async function UpdateDescription(uid: any,tid: any,des: any) {

    try {
        console.log('Get All Task ',uid)
        const response = await axios.post('http://localhost:9000/api/admin/UpdateDescription', {
           uid,
           tid,
           des
          }
          )
          console.log('API CALLED UpdateDescription',uid)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }
 export async function DeleteTask(uid: any,tid: any) {

    try {
        console.log('Get All Task ',uid)
        const response = await axios.post('http://localhost:9000/api/admin/DeleteTask', {
           uid,
           tid
          }
          )
          console.log('API CALLED UpdateDescription',uid)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }
 export async function GetUsersFormanager(mid:any) {

    try {
        console.log('Calling User List APi')
        const response = await axios.post('http://localhost:9000/api/admin/getUserlistForManager', {
            mid,
          });
          // Handle successful login (e.g., save token, redirect)
         
          return response.data       
      } catch (err) {
       console.log(err)

}

 }
 export async function GetOtherUsersFormanager(mid:any) {

    try {
        console.log('Calling User List APi')
        const response = await axios.post('http://localhost:9000/api/admin/getUser_unassign_Manager', {
            mid,
          });
          // Handle successful login (e.g., save token, redirect)
         
          return response.data       
      } catch (err) {
       console.log(err)

}

 }
 export async function AssignToManager(mid:any,uid:any) {

    try {
        console.log('Calling User List APi')
        const response = await axios.post('http://localhost:9000/api/admin/getUser_unassign_Manager', {
            mid,
            uid,
          });
          // Handle successful login (e.g., save token, redirect)
         
          return response.data       
      } catch (err) {
       console.log(err)

}

 }
 export async function GetManagerTask(mid: any) {

    try {
        console.log('Get All Task ',mid)
        const response = await axios.post('http://localhost:9000/api/manager/getManagerTasks', {
           mid
          }
          )
          console.log('API CALLED ',mid)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }
 export async function AddTask(mid: any , tit: any ,des: any, duedate : any ,stat : any) {

    try {
        console.log('Calling Assign Task ',mid)
        const response = await axios.post('http://localhost:9000/api/manager/getTasks', {
            manager_id : mid,
             title : tit ,
              description : des,
               due_date :  duedate,
               status : stat,
          });
          // Handle successful login (e.g., save token, redirect)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }
 export async function AddTask2(mid: any , tit: any ,des: any, duedate : any ,stat : any) {

    try {
        console.log('Calling Assign Task ',mid)
        const response = await axios.post('http://localhost:9000/api/user/addTask', {
            manager_id : mid,
             title : tit ,
              description : des,
               due_date :  duedate,
               status : stat,
          },{
            // Headers
            headers: {
                'Authorization': `Bearer ${global.token}`,
                'Content-Type': 'application/json'  // Specify JSON if sending JSON data
            },
            withCredentials: true  // Optional: Include cookies if needed
        }
          );
          // Handle successful login (e.g., save token, redirect)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }
 export async function UpdateStatus2(uid: any,tid : any,status: any) {

    try {
        console.log('Get All Task ',uid)
        const response = await axios.post('http://localhost:9000/api/user/UpdateStatus', {
           uid,
           tid,
           status
          },{
            // Headers
            headers: {
                'Authorization': `Bearer ${global.token}`,
                'Content-Type': 'application/json'  // Specify JSON if sending JSON data
            },
            withCredentials: true  // Optional: Include cookies if needed
        }
          )
          console.log('API CALLED UpdateStatus',uid)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }

 export async function UpdateTitle2(uid: any,tid: any,title: any) {

    try {
        console.log('Get All Task ',uid)
        const response = await axios.post('http://localhost:9000/api/user/UpdateTitle', {
           uid,
           tid,
           title
          },{
            // Headers
            headers: {
                'Authorization': `Bearer ${global.token}`,
                'Content-Type': 'application/json'  // Specify JSON if sending JSON data
            },
            withCredentials: true  // Optional: Include cookies if needed
        }
          )
          console.log('API CALLED UpdateStatus',uid)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }
 export async function UpdateDescription2(uid: any,tid: any,des: any) {

    try {
        console.log('Get All Task ',uid)
        const response = await axios.post('http://localhost:9000/api/user/UpdateDescription', {
           uid,
           tid,
           des
          },{
            // Headers
            headers: {
                'Authorization': `Bearer ${global.token}`,
                'Content-Type': 'application/json'  // Specify JSON if sending JSON data
            },
            withCredentials: true  // Optional: Include cookies if needed
        }
          )
          console.log('API CALLED UpdateDescription',uid)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }
 export async function DeleteTask2(uid: any,tid: any) {

    try {
        console.log('Get All Task ',uid)
        const response = await axios.post('http://localhost:9000/api/user/DeleteTask', {
           uid,
           tid
          },{
            // Headers
            headers: {
                'Authorization': `Bearer ${global.token}`,
                'Content-Type': 'application/json'  // Specify JSON if sending JSON data
            },
            withCredentials: true  // Optional: Include cookies if needed
        }
          )
          console.log('API CALLED UpdateDescription',uid)
         
          return response     
      } catch (err) {
       
        console.log(err);
}

 }