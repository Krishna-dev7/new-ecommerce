import React,{useState} from 'react'


function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "7c8cb446-ff39-47d0-99fa-9c3d6bdfafd1");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      alert("Form submitted Successfully")
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className='w-screen flex justify-center items-center flex-col mt-20' >
      <h1 className=' text-4xl w-fit m-auto my-3 md:text-5xl'>Contact Us</h1>
      <h2 className='text-2xl w-fit m-auto my-4 md:text-3xl'>Do you have any queries?</h2>
      {/* form */}
      <form onSubmit={onSubmit} className='w-1/2 ' >
        <div className='w-full m-auto grid grid-cols-10 p-3 gap-4 rounded-md lg:grid-cols-2 lg:gap-y-10 py-10  mb-5' >
          <div>
            <input className='p-2 border border-1 border-black outline-none text-black h-14 w-40 rounded-md text-lg md:w-[100%] lg:w-[100%] duration-300' type="text" name='Name' placeholder='Enter your full name' required />
          </div>
          <div>
            <input className='p-2  border border-1 border-black outline-none text-black h-14 w-40 rounded-md text-lg md:w-[100%] lg:w-[100%] duration-300' type="email" name='Email' placeholder='Enter your email address' required />
          </div>
          <div className=' col-span-full'>
            <textarea className='p-2  border border-1 border-black outline-none text-black text-lg w-full h-36 rounded-md md:w-[100%] lg:w-[100%] lg:h-48 duration-300' name='Message' placeholder='Description' required></textarea>
          </div>
          <div className=' place-self-center col-span-full'>
            <button className='p-2  border border-1 border-black outline-none text-white text-md w-full px-7 py-2 h-14 bg-slate-800 rounded-lg hover:bg-slate-500 duration-300 md:w-[80%] lg:w-[100%]' type='submit'>Send</button>
          </div>
        </div>
      </form>
    </div>

  )
}

export default Contact
