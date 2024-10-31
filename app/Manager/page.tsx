"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {
    Avatar,
    List,
    InputLabel,
    Card,
    CardContent,
    CardActions,
    ListItem,
    ListItemAvatar,
    Badge,
    ListItemText,
    Typography,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    Button,
    FormControl,
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";

interface User {
    id: number;
    name: string;
    avatarUrl: string;
    title: string;
  }
import {  AddTask, AssignTask, DeleteTask, GetAllTask, GetManagerTask, GetUsers , GetUsersFormanager, RegisterNewUser, UpdateDescription, UpdateStatus} from "../Requests/req";



export default function Dashboard() {
const [users , setUsers] = useState([])
const [task , setTask] = useState()

    React.useEffect(() => {
      const fetchData = async () => {
          try {
            let res = await GetAllTask(global.id)
         console.log(res)

         setTask(res?.data)
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData(); // Call the async function
    
}, []); // Empty dependency array
    const [mange  , setMange ] = useState([]) 
   

    // const users: User[] = [
    //     { id: 1, name: "John Doe", avatarUrl: "https://i.pravatar.cc/150?img=1", title: "Product Manager" },
    //     { id: 2, name: "Jane Smith", avatarUrl: "https://i.pravatar.cc/150?img=2", title: "Software Engineer" },
    //     { id: 3, name: "Alice Johnson", avatarUrl: "https://i.pravatar.cc/150?img=3", title: "UI/UX Designer" },
        
    //   ];
  const [isOpen, setIsOpen] = useState(true);
  const [selectManangerForNewUser, setselectManangerForNewUser] = useState('');
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ email: "", password: "", name: "", manager: "" });
  const [isManagedByChecked, setIsManagedByChecked] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [editedDescription, setEditedDescription] = useState("edited");

  const [u_manager, set_u_manager] = useState('');
  const [selectedManagertoChange, setSelectedManagertoChange] = useState('');
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleConfirm = () => {
    // Add logic for confirming the manager change, e.g., API call or state update
    console.log('Selected Manager:', selectedManagertoChange);
      console.log('params:', global.id)
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

    //let resp = await AssignTask(manger_id,id,taskData.title,taskData.description,taskData.dueDate,taskData.status)
    let reso = await AddTask(global.id,taskData.title,taskData.description,taskData.dueDate,taskData.status)
    console.log('Added new Task of MAnager response',reso?.data)
    let tt2= await GetAllTask(global.id)
    setTask(tt2?.data)
    // Add submit logic here (e.g., send to backend)


    handleClose();
  };


  const  handleDelete = async (dd: any) => {
    setTask((prevItems) => prevItems.filter((item) => item.id !== dd));

    await DeleteTask(global.id,dd)
   let ress =  await GetAllTask(global.id)
   setTask(ress?.data)
  };

  const handleEditClick = (item: Item) => {
    
    setEditItem(item._id);
    setEditedDescription(item.description);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editedDescription != '') {


      setTask((prevItems) =>
    prevItems.map(async (item) => {
        if (item._id === editItem) {
            // Call the UpdateStatus function with your desired arguments
            const updateddes = editedDescription;
           let ress = await UpdateDescription(global.id, item._id, editedDescription);
           console.log('---------------------------',ress?.status)
           if(ress?.status == 201)
            {let tt = await GetAllTask(global.id)
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
    await UpdateStatus (global.id, dd, matchedstat);
  let wwe = await GetAllTask(global.id)
  setTask(wwe?.data)
  };



  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    // Logic to navigate or change view can go here
   // router.push(`/Dashboard/${user._id}`);
  
    console.log("User clicked:", user);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManagedByChecked(e.target.checked);
    if (!e.target.checked) setFormData((prev) => ({ ...prev, manager: "" })); // Clear manager if unchecked
  };

  const renderContent = () => {
    switch (selectedPage) {
      case "dashboard":
        return (
            
            <div className="p-2 -mt-3  md:w-3/3 lg:w-1/1 mx-auto ">
            <div className="bg-slate-500 mx-auto h-16 -ml-2  flex  flex-col p-2">
               <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpen}
              className="h-9 max-w-max self-center"
            >
              Assign Task
            </Button>
      
          
           
            </div>
      
            {/* Dialog for Task Form */}
            <Dialog open={open} onClose={handleClose} fullWidth   sx={{
          "& .MuiDialog-paper": {
            minHeight: "500px", // Set to desired height
            maxHeight: "80vh",  // Optional: limits the height to 80% of the viewport
          },
        }}>
              <DialogTitle>Assign Task</DialogTitle>
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
                className=" sm:w-28 md:w-auto lg:w-full p-4 shadow-lg rounded-lg x-3 pt-2"
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
        )
        case "users":
        return (
          <>
           
             <Paper elevation={3} className="p-4 w-full md:w-3/3 lg:w-1/1 mx-auto ">
             <div className="flex items-center justify-between">
        <Typography variant="h5">User List</Typography>
        {/* <IconButton color="primary" onClick={handleAddUser}>
          <AddIcon/>
        </IconButton> */}
      </div>
      <List>
        {users.map((user) => (
             <Link href={
              {
                  pathname: `/Manager/User`,
                  query: { user : user._id},
                }}>
          <ListItem
            key={user._id}
            button
            onClick={() => handleUserClick(user)}
            sx={{ borderBottom: "1px solid #e0e0e0" }}
          >
            <ListItemAvatar>
              <Avatar src={user.img} alt={user.name} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.role} />
            <span></span>
          </ListItem>
          </Link>
        ))}
      </List>
      {selectedUser && (
        <div className="mt-4">
          <Typography variant="h6">Selected User:</Typography>
          <Typography>Name: {selectedUser.name}</Typography>
          <Typography>Title: {selectedUser.role}</Typography>
        </div>
      )}
       <Dialog open={open} onClose={handleClose} fullWidth >
      
        <DialogTitle className="flex ">Add New User</DialogTitle>
        <span></span>
        <DialogContent  >
          <form className="flex flex-col gap-10">
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              className="mt-2"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              type="email"
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
              type="password"
            />
            <FormControlLabel
              control={<Checkbox checked={isManagedByChecked} onChange={handleCheckboxChange} />}
              label="Managed by"
            />
            {/* {isManagedByChecked && (
              <Select
                label="Manager"
                value={formData.manager}
                onChange={handleManagerChange}
                fullWidth
                displayEmpty
              >
                <MenuItem value="">
                  <em>Select Manager</em>
                </MenuItem>
                {mange.map((manager) => (
                  <MenuItem key={manager['_id']} value={manager['_id']}>
                    {manager['name']}
                  </MenuItem>
                ))}
              </Select>
            )} */}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </DialogContent>
      
      </Dialog> 
    </Paper>

          </>
        );

      // Add more cases here for additional pages
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md transition-transform duration-300 ${
          isOpen ? "w-64" : "w-10"
        }`}
      >
        <div className="flex items-center justify-between p-4 bg-slate-400  ">
          <h1
            className={` font-extrabold text-lg font-serif ${
              isOpen ? "block" : "hidden"
            } sm:pl-1 md: pl-6 lg:pl-10 xl:pl-14`}
          >
            Desuca
          </h1>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
        <nav className="mt-10">
          <ul>
            <li>
              <button
                onClick={() => {
                  setSelectedPage("dashboard");
                }}
                className="block py-2 px-4 hover:bg-gray-200 w-full text-left"
              >
                {isOpen ? "Dashboard" : "D"}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedPage("users");
                }}
                className="block py-2 px-4 hover:bg-gray-200 w-full text-left"
              >
                {isOpen ? "Users" : "U"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 p-0">{renderContent()}</div>
    </div>
  );
}
