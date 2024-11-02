'use client'
import React,{ useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardActions, IconButton,FormControl,InputLabel, Select,MenuItem,DialogActions,
     Typography, Dialog,  DialogTitle,FormControlLabel,Checkbox,DialogContent, TextField, Button, Badge } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { AssignTask, changeManager, DeleteTask, GetAllTask, Getmanager, GetOtherUsersFormanager, GetUsers, GetUsersFormanager, UpdateDescription, UpdateStatus } from "@/app/Requests/req";


const ManagerDetail = (props: any) => {
  const searchParams = useSearchParams();
  const id = searchParams.get('user');
  const [non_userList , set_non_userList] = useState()
  const [userList , set_userList] = useState()
  const [open1, setOpen1] = useState(false);
  const [userId, setUserId] = useState('');
  const [selectedManagertoChange, setSelectedManagertoChange] = useState('');
  const [mange  , setMange ] = useState([]) 
  const handleOpen1 = (id:any) => {
     setUserId(id)
    setOpen1(true)
}
  const handleClose1 = () => {setOpen1(false)
    setUserId('')};
  // Get query parameters
 
  React.useEffect(() => {
    const fetchData = async () => {
        try {
          let res = await GetUsersFormanager(id)
          let res2 = await GetOtherUsersFormanager(id)
          let res3 = await GetUsers()
          console.log('Assigned Users',res)
          set_userList(res)
          console.log('NON - Assigned Users',res2)
          set_non_userList(res2)
          const managers = res3.filter((user: { role: string; }) => user.role === 'manager');
          setMange(managers)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData(); // Call the async function
}, []); // Empty dependency array


const handleManagerChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  
  setSelectedManagertoChange(event.target.value as string)

};

const handleConfirm = async () => {
    // Add logic for confirming the manager change, e.g., API call or state update
    console.log('Selected Manager:', typeof(userId));
    let res =  await changeManager(selectedManagertoChange, userId)
   let res2 = await GetUsersFormanager(id)
   let res3 = await GetOtherUsersFormanager(id)
    console.log(res)
   set_userList(res2)
   set_non_userList(res3)
    handleClose1();
  };
const handleAssignUser = async (userId:any) => {
    try {
      let res =  await changeManager(id, userId)
      let res2 = await GetUsersFormanager(id)
      let res3 = await GetOtherUsersFormanager(id)
      console.log(res)
      set_userList(res2)
      set_non_userList(res3)
      
    } catch (error) {
        console.error('Failed to assign user', error);
    }
};
  



  return (
    <div className="container mx-auto p-4">
    <h1 className="lg:text-2xl font-semibold mb-4 text-center">Assigned Users</h1>
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
                {userList?.map((user) => (
                    <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6">{user.name}</td>
                        <td className="py-3 px-6">{user.email}</td>
                        <td className="py-3 px-6 text-center">
                            <button
                                onClick={() => handleOpen1(user._id)}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Un - Assign
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    <Dialog open={open1} onClose={handleClose1} fullWidth maxWidth="sm">
        <DialogTitle>Change Manager</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Select Manager</InputLabel>
            <Select
              value={selectedManagertoChange}
              onChange={handleManagerChange}
              label="Select Manager"
            >
              {/* Replace these options with dynamic data as needed */}
              {mange.map((manager) => (
                <MenuItem key={manager._id} value={manager._id}>
                  {manager.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    <h1 className="text-xl font-semibold mb-4 text-center">OtherUsers</h1>
    <div className="overflow-x-auto">
        <table className=" lg: min-w-full bg-white shadow-md rounded-lg">
            <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
                {non_userList?.map((user) => (
                    <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6">{user.name}</td>
                        <td className="py-3 px-6">{user.email}</td>
                        <td className="py-3 px-6 text-center">
                            <button
                                onClick={() => handleAssignUser(user._id)}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Assign
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
  );
};

export default ManagerDetail;
