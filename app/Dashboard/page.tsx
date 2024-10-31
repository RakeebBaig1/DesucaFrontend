"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
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
  } from "@mui/material";
  import AddIcon from "@mui/icons-material/Add";

interface User {
    id: number;
    name: string;
    avatarUrl: string;
    title: string;
  }
import {  GetManagerTask, GetUsers , RegisterNewUser} from "../Requests/req";



export default function Dashboard() {
const [users , setUsers] = useState([])

    React.useEffect(() => {
      const fetchData = async () => {
          try {
            let res = await GetUsers()
            console.log(res)
            
            const managers = res.filter((user: { role: string; }) => user.role === 'manager');
            const user = res.filter((user: { role: string; }) => user.role === 'user');
            setUsers(user)
            setMange(managers)
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
  const [selectedman, setSelectedman] = useState<User | null>(null);
  const [formData, setFormData] = useState({ email: "", password: "", name: "", manager: "" });
  const [formData1, setFormData1] = useState({ email: "", password: "", name: "", manager: "" });
  const [isManagedByChecked, setIsManagedByChecked] = useState(false);
  const [isManagedByChecked1, setIsManagedByChecked1] = useState(false);


  const handleAddUser = () => {
    // Handle add user logic
    console.log("Add user clicked");
    setOpen(true);
  };
  const handleAddmanager = () => {
    // Handle add user logic
    console.log("Add Manager clicked");
    setOpen1(true);
  };
  

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    // Logic to navigate or change view can go here
   // router.push(`/Dashboard/${user._id}`);
  
    console.log("User clicked:", user);
  };
  const handleManagerClick = (user: User) => {
    setSelectedman(user);
    // Logic to navigate or change view can go here
   // router.push(`/Dashboard/${user._id}`);
  
    console.log("User clicked:", user);
  };
  const handleClose = () => {
    setOpen(false);
    setFormData({ email: "", password: "", name: "", manager: "" });
    setIsManagedByChecked(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
    setFormData1({ email: "", password: "", name: "", manager: "" });
    setIsManagedByChecked1(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData1((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManagedByChecked(e.target.checked);
    if (!e.target.checked) setFormData((prev) => ({ ...prev, manager: "" })); // Clear manager if unchecked
  };
  const handleCheckboxChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManagedByChecked1(e.target.checked);
    if (!e.target.checked) setFormData1((prev) => ({ ...prev, manager: "" })); // Clear manager if unchecked
  };

  const handleManagerChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormData((prev) => ({ ...prev, manager: event.target.value as string }));
    setselectManangerForNewUser(event.target.value as string)
    console.log('Form Value is ',event.target.value)
  };

  const handleSubmit = async() => {
    console.log("Form Data:", formData);
   
  
      let id='0';
      let resp = await RegisterNewUser(formData['name'] , 'user' , formData['email'],formData['password'],id)
      console.log(resp)
      let res = await GetUsers()
      const user = res.filter((user: { role: string; }) => user.role === 'user');
            setUsers(user)
      // Submit form data logic here
      handleClose();

      if (resp == undefined ) {  alert('Check Email Format') }else {alert('SUCCESSFULL without Manger')}
  };
  const handleSubmit1 = async() => {
    console.log("Form Data:", formData1);
   
  
      let id='0';
      let resp = await RegisterNewUser(formData1['name'] , 'manager' , formData1['email'],formData1['password'],id)
      console.log(resp)
      let res = await GetUsers()
      const managers = res.filter((user: { role: string; }) => user.role === 'manager');
      setMange(managers)
      // Submit form data logic here
      handleClose1();

      if (resp == undefined ) {  alert('Check Email Format') }else {alert('SUCCESSFULL Manger')}
  };

  const [todo, setTodo] = useState({
    title: "My Task",
    desc: "I have to do this",
  });

  const addTodo = () => {
    let todos = localStorage.getItem("todos");
    if (todos) {
      let todosJson = JSON.parse(todos);
      if (
        todosJson.filter((value: { title: string }) => {
          return value.title == todo.title;
        }).length > 0
      ) {
        alert("Todo with this title already exists");
      } else {
        todosJson.push(todo);
        localStorage.setItem("todos", JSON.stringify(todosJson));
        alert("Todo has been added");
        setTodo({ title: "", desc: "" });
      }
    } else {
      localStorage.setItem("todos", JSON.stringify([todo]));
    }
  };
  const onChange = (e: { target: { name: any; value: any } }) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
    console.log(todo);
  };

  const renderContent = () => {
    switch (selectedPage) {
      case "dashboard":
        return (
          <>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              DashBoard Page
            </h2>
            <p className="mt-4 text-base md:text-lg lg:text-xl">
              This page displays Dashboard information and details.
            </p>
          </>
        );
      case "managers":
        return (
          <>
                  <Paper elevation={1} className="p-4 w-full md:w-3/3 lg:w-1/1 mx-auto ">
             <div className="flex items-center justify-between">
        <Typography variant="h5">Manager List</Typography>
        <IconButton color="primary" onClick={handleAddmanager}>
          <AddIcon/>
        </IconButton>
      </div>
      <List>
        {mange.map((user) => (
             <Link href={
              {
                  pathname: `/Dashboard/manager/man`,
                  query: { user : user._id},
                }}>
          <ListItem
            key={user._id}
            button
            onClick={() => handleManagerClick(user)}
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
      {selectedman && (
        <div className="mt-4">
          <Typography variant="h6">Selected User:</Typography>
          <Typography>Name: {selectedman.name}</Typography>
          <Typography>Title: {selectedman.role}</Typography>
        </div>
      )}
       <Dialog open={open1} onClose={handleClose1} fullWidth >
      
        <DialogTitle className="flex ">Add New Manager</DialogTitle>
        <span></span>
        <DialogContent  >
          <form className="flex flex-col gap-10">
            <TextField
              label="Name"
              name="name"
              value={formData1.name}
              onChange={handleInputChange1}
              fullWidth
              required
              className="mt-2"
            />
            <TextField
              label="Email"
              name="email"
              value={formData1.email}
              onChange={handleInputChange1}
              fullWidth
              required
              type="email"
            />
            <TextField
              label="Password"
              name="password"
              value={formData1.password}
              onChange={handleInputChange1}
              fullWidth
              required
              type="password"
            />
            {/* <FormControlLabel
              control={<Checkbox checked={isManagedByChecked1} onChange={handleCheckboxChange1} />}
              label="Managed by"
            /> */}
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
            <Button variant="contained" color="primary" onClick={handleSubmit1}>
              Submit
            </Button>
          </form>
        </DialogContent>
      
      </Dialog>
    </Paper>
          </>
        );
      case "users":
        return (
          <>
            {/* <div className=" text-3xl bg-orange-300">
              <section className="text-gray-600 body-font">
                <div
                  className="container px-5 py-24 
					mx-auto flex flex-wrap items-center"
                >
                  <div
                    className="rounded-lg p-8 flex flex-col 
						md:ml-auto w-full mt-10 md:mt-0 bg-slate-100 "
                  >
                    <h2
                      className="text-gray-900 text-lg 
							font-medium title-font mb-5"
                    >
                      Add a Todo
                    </h2>
                    <div className="relative mb-4">
                      <label
                        for="title"
                        className="leading-7 text-sm 
									text-gray-600"
                      >
                        Todo Title
                      </label>
                      <input
                        onChange={onChange}
                        value={todo.title}
                        type="text"
                        id="title"
                        name="title"
                        className="w-full bg-white rounded border border-gray-300
								focus:border-green-800 focus:ring-2 
								focus:ring-green-200 text-base outline-none
								text-gray-700 py-1 px-3
							leading-8 transition-colors duration-200 ease-in-out"
                        autoComplete="false"
                      />
                    </div>
                    <div className="relative mb-4">
                      <label
                        for="desc"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Todo Description
                      </label>
                      <input
                        onChange={onChange}
                        value={todo.desc}
                        type="text"
                        id="desc"
                        name="desc"
                        className="w-full bg-white rounded border 
								border-gray-300 focus:border-green-800
							focus:ring-2 focus:ring-green-200 text-base 
							outline-none text-gray-700 py-1 px-3
							leading-8 transition-colors duration-200 ease-in-out"
                        autoComplete="false"
                      />
                    </div>
                    <button
                      onClick={addTodo}
                      className="text-white 
						bg-green-800 border-0 py-2 px-8
						focus:outline-none w-fit hover:bg-green-600
						rounded text-lg"
                    >
                      Add Todo
                    </button>
                  </div>
                </div>
              </section>
            </div> */}
             <Paper elevation={3} className="p-4 w-full md:w-3/3 lg:w-1/1 mx-auto ">
             <div className="flex items-center justify-between">
        <Typography variant="h5">User List</Typography>
        <IconButton color="primary" onClick={handleAddUser}>
          <AddIcon/>
        </IconButton>
      </div>
      <List>
        {users.map((user) => (
             <Link href={
              {
                  pathname: `/Dashboard/User`,
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md transition-transform duration-300 ${
          isOpen ? "sm: w-28 md:w-36 lg:w-44 xl:w-64" : "w-10"
        }`}
      >
        <div className="flex items-center justify-between p-4 bg-slate-400  justify-cente ">
          <h1
            className={` font-extrabold text-lg font-serif ${
              isOpen ? "block" : "hidden"
            } sm: pl-1 md: pl-6 lg:pl-10 xl:pl-14 self-center `}
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
                  setSelectedPage("managers");
                }}
                className="block py-2 px-4 hover:bg-gray-200 w-full text-left"
              >
                {isOpen ? "Managers" : "M"}
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
