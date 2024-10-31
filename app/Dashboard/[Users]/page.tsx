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
import { AssignTask, changeManager, DeleteTask, GetAllTask, Getmanager, GetUsers, UpdateDescription, UpdateStatus } from "@/app/Requests/req";

interface Item {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

const initialItems: Item[] = [
  { id: 1, title: "Project Plan", description: "Complete project planning", status: true },
  { id: 2, title: "UI Design", description: "Design user interface for mobile app", status: false },
  { id: 3, title: "Backend API", description: "Set up API endpoints and server", status: true },
];

const StylishCardList = (props: any) => {
  const searchParams = useSearchParams();
  const id = searchParams.get('user');
  // Get query parameters
  const [task , setTask] = useState()
  const [mange  , setMange ] = useState([]) 
  const [manger_id , setManager_id ] = useState([]) 
  React.useEffect(() => {
    const fetchData = async () => {
        try {
          let res = await GetUsers()
          let res2 = await Getmanager(id)
          let res3 = await GetAllTask(id)
          console.log('ressssss',res2[0]['name'])
          console.log('rezzzzz' , res3?.data)
          setTask(res3?.data)
          const managers = res.filter((user: { role: string; }) => user.role === 'manager');
          set_u_manager(res2[0]['name'])
          setManager_id(res2[0]['_id'])
          setMange(managers)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData(); // Call the async function
  
}, []); // Empty dependency array

    
  const [items, setItems] = useState<Item[]>(initialItems);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [editedDescription, setEditedDescription] = useState("edited");
  const [open, setOpen] = useState(false);

  const [open1, setOpen1] = useState(false);
  const [u_manager, set_u_manager] = useState('');
  const [selectedManagertoChange, setSelectedManagertoChange] = useState('');
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleConfirm = () => {
    // Add logic for confirming the manager change, e.g., API call or state update
    console.log('Selected Manager:', selectedManagertoChange);
      console.log('params:', id)
    changeManager(selectedManagertoChange, id.toString())
    handleClose1();
  };

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: false,
    dueDate: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTaskData({ title: "", description: "", dueDate: "" , status: false});
  };
  const handleManagerChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setTaskData((prev) => ({ ...prev, managerId: e.target.value as number }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData((prev) => ({ ...prev, status: e.target.checked }));
  };

  const handleSubmit = async () => {
    console.log("Task Data:", taskData);

    let resp = await AssignTask(manger_id,id,taskData.title,taskData.description,taskData.dueDate,taskData.status)
    let tt2= await GetAllTask(id)
    setTask(tt2?.data)
      console.log('Api response Assign new Task ',resp)
    // Add submit logic here (e.g., send to backend)


    handleClose();
  };


  const  handleDelete = async (dd: any) => {
    setTask((prevItems) => prevItems.filter((item) => item.id !== dd));

    await DeleteTask(id,dd)
   let ress =  await GetAllTask(id)
   setTask(ress?.data)
  };

  const handleEditClick = (item: Item) => {
    
    setEditItem(item._id);
    setEditedDescription(item.description);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editedDescription != '') {
      // setTask((prevItems) =>
      //   prevItems.map((item) => (item._id == editItem ? { ...item, description: editedDescription } : item))
      // );

      setTask((prevItems) =>
    prevItems.map(async (item) => {
        if (item._id === editItem) {
            // Call the UpdateStatus function with your desired arguments
            const updateddes = editedDescription;
           let ress = await UpdateDescription(id, item._id, editedDescription);
           console.log('---------------------------',ress?.status)
           if(ress?.status == 201)
            {let tt = await GetAllTask(id)
              setTask(tt?.data)
            }
            // Return the updated item with the new description
            return { ...item, description: updateddes };
        }
        // Return the item as-is if the condition is not met
        return item;
    })
);


      setEditDialogOpen(false);
      setEditItem(null);
      setEditedDescription('');
    }
    else
{
  console.log('Edit Description is not edited',editedDescription)
}
  };

  const handleStatusToggle = async (dd: any) => {
    // setTask( (prevItems) =>{
    //   prevItems.map((item) => (item._id == id ? { ...item, status: !item.status } : item))}
    // );
    // UpdateStatus(dd , id , !item.status)
    let matchedstat = null
    setTask((prevItems) => {
      return prevItems.map((item) => {
          if (item._id == dd) {
            console.log('IdDDDDDDDD Matched',item.title)
            console.log(item._id,dd)
              let updatedStatus = !item.status;
              matchedstat = updatedStatus
              return { ...item, status: updatedStatus };
          }
          return item;
      });
  });
    await UpdateStatus(id, dd, matchedstat);
  let wwe = await GetAllTask(id)
  setTask(wwe?.data)
  };

  return (
    <div className="flex-1 gap-4 justify-center bg-white p-2 h-screen space-y-5">
      <div className="bg-slate-500 w-screen h-28 -ml-2  flex  flex-col p-2">
         <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        className="h-9 max-w-max self-center"
      >
        Assign Task
      </Button>

      <text className="ml-6"> Managed by : {u_manager}</text>
      <Button
        variant="contained"
        color="primary"
       // startIcon={<AddIcon />}
        onClick={handleOpen1}
        className="h-9 max-w-max "
      >
      Change Manager
      </Button>
      <Dialog open={open1} onClose={handleClose1} fullWidth maxWidth="sm">
        <DialogTitle>Change Manager</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Select Manager</InputLabel>
            <Select
              value={selectedManagertoChange}
              onChange={(e) => setSelectedManagertoChange(e.target.value)}
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
      </div>

      {/* Dialog for Task Form */}
      <Dialog open={open} onClose={handleClose} fullWidth   sx={{
    "& .MuiDialog-paper": {
      minHeight: "500px", // Set to desired height
      maxHeight: "80vh",  // Optional: limits the height to 80% of the viewport
    },
  }}>
        <DialogTitle>Assign Task to User</DialogTitle>
        <DialogContent>
          <form className="flex flex-col gap-6 mt-9 ">
            <TextField
              label="Title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={taskData.status}
                  onChange={handleStatusChange}
                  name="status"
                  color="primary"
                />
              }
              label="Task Status (Completed)"
            />
            <TextField
              label="Due Date"
              name="dueDate"
              type="date"
              value={taskData.dueDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
             {/* <FormControl fullWidth>
              <InputLabel>Assign Manager</InputLabel>
              <Select
                value={taskData.managerId}
                onChange={handleManagerChange}
                name="managerId"x
                fullWidth
              >
                {mange.map((manager) => (
                  <MenuItem key={manager._id} value={manager._id}>
                    {manager.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Task
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    
      {task?.map((item) => (
        <Card
          key={item._id}
          className=" sm:w-28 lg:w-full p-4 shadow-lg rounded-lg x-3 pt-2"
          sx={{
            border: `2px solid ${item.status ? "green" : "red"}`,
            backgroundColor: item.status ? "#e0ffe0" : "#ffe0e0",
          }}
        >
          <CardContent>
            <Typography variant="h9" color="text.primary" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>

          </CardContent>
          <CardActions className="flex justify-between">
            {/* Toggle Status */}
            <IconButton onClick={() => handleStatusToggle(item._id)} color="primary">
              {item.status ? (
                
                 <Badge badgeContent="Active"
                  key={item._id}
                  color="primary" sx={{
                    "& .MuiBadge-badge": {
                        marginLeft:"10px",
                      padding: "20 6px", // Adjust padding as needed
                      fontSize: "0.75rem", // Optionally adjust font size for better alignment
                    },
                  }} >
                  <CheckCircleIcon />
                </Badge>
              ) : (
                <Badge badgeContent="Inactive" color="error">
                  <CancelIcon />
                </Badge>
              )}
            </IconButton>
            {/* Edit Description */}
            <IconButton onClick={() => handleEditClick(item)} color="secondary">
              <EditIcon />
            </IconButton>
            {/* Delete Item */}
            <IconButton onClick={() => handleDelete(item._id)} color="error">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth>
        <DialogContent>
          <Typography variant="h6">Edit Description</Typography>
          <TextField
            label="Description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button onClick={handleEditSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StylishCardList;
