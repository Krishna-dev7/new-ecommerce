import React, { useState } from 'react';

function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "7c8cb446-ff39-47d0-99fa-9c3d6bdfafd1");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      alert("Form submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className='w-screen flex justify-center items-center flex-col mt-20'>
      <h1 className='text-4xl w-fit m-auto my-3 md:text-5xl'>Contact Us</h1>
      <h2 className='text-2xl w-fit m-auto my-4 md:text-3xl'>Do you have any queries?</h2>
      
      {/* form */}
      <form onSubmit={onSubmit} className='w-full max-w-lg px-4 md:px-0'>
        <div className='w-full m-auto grid grid-cols-1 gap-4 py-10'>
          <div>
            <input
              className='p-2 border border-gray-300 outline-none text-black h-14 w-full rounded-md text-lg transition duration-300 focus:ring-2 focus:ring-blue-500'
              type="text"
              name='Name'
              placeholder='Enter your full name'
              required
            />
          </div>
          <div>
            <input
              className='p-2 border border-gray-300 outline-none text-black h-14 w-full rounded-md text-lg transition duration-300 focus:ring-2 focus:ring-blue-500'
              type="email"
              name='Email'
              placeholder='Enter your email address'
              required
            />
          </div>
          <div className='col-span-full'>
            <textarea
              className='p-2 border border-gray-300 outline-none text-black text-lg w-full h-36 rounded-md transition duration-300 focus:ring-2 focus:ring-blue-500'
              name='Message'
              placeholder='Description'
              required
            ></textarea>
          </div>
          <div className='place-self-center col-span-full'>
            <button
              className='p-2 border border-gray-300 outline-none text-white text-md w-full py-2 bg-slate-800 rounded-lg hover:bg-slate-500 duration-300'
              type='submit'
            >
              Send
            </button>
          </div>
        </div>
      </form>
      {result && <p className='text-center text-green-600 mt-4'>{result}</p>}
    </div>
  );
}

export default Contact;
