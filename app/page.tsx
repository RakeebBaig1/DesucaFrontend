'use client';
import Image from 'next/image'
import Link from 'next/link';
import  { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Login, LoginUser } from './Requests/req';
import { useRouter } from 'next/navigation';

global.id = ''
global.token = ''
global.role=''
export default function Home() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const goToAdminPanel = () => {
    router.push('/Dashboard');
  };
  const goToAdminPanel2 = () => {
    router.push('/Manager');
  };
  const goToAdminPanel3 = () => {
    router.push('/User');
  };
  const handleCheckboxChange = () => {
    setIsChecked(prev => !prev);

    if (!isChecked) {
        // Action if checkbox is checked
        console.log("Checkbox is now checked");
    } else {
        // Action if checkbox is unchecked
        console.log("Checkbox is now unchecked");
    }
};


  const { register, handleSubmit ,formState: { errors }  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });
  const onSubmit = async (data: any)=> {
    if(isChecked){
    console.log(data['email'] , " ++ " , data['password']);
   let res = await Login(data['email'] , data['password']);

   if(res == 201)
   {
    goToAdminPanel()
   }
  }
  else{
    console.log(data['email'] , " ++ " , data['password']);
    let res = await LoginUser(data['email'] , data['password']);
    
    if(res?.status == 201)
    {
      console.log(res?.data)
      global.id=res?.data.id
      global.role=res?.data.role
      global.token=res?.data.token
      if(res?.data.role == 'manager')
      {
     goToAdminPanel2()
    }
    if(res?.data.role == 'user')
    {
      goToAdminPanel3()
    }
  }
}
}


  return (
  

      <div className="flex min-h-screen min-w-72 items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>
        <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">Admin</span>
            </label>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"  
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
              {...register("email")}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
              {...register("password")}
            />
          </div>
          
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" legacyBehavior>
            <a className="text-blue-500 underline hover:text-blue-600">Sign Up</a>
          </Link>
        </p>
      </div>
    </div>


     

  )
}
