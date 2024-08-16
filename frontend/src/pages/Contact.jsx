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
    <div>
      <h1 className=' text-4xl w-fit m-auto my-3 md:text-5xl'>Contact Us</h1>
      <h2 className='text-2xl w-fit m-auto my-4 md:text-3xl'>Do you have any queries?</h2>
      {/* form */}
      <form onSubmit={onSubmit}>
        <div className='w-[80%] m-auto grid justify-center justify-items-center p-3 gap-4 rounded-md lg:grid-cols-2 lg:gap-y-10 py-10 bg-gray-800 mb-5' >
          <div>
            <input className='p-2 text-black h-14 w-64 rounded-md text-lg md:w-[480px] lg:w-[31vw] duration-300' type="text" name='Name' placeholder='Enter your full name' required />
          </div>
          <div>
            <input className='p-2 text-black h-14 w-64 rounded-md text-lg md:w-[480px] lg:w-[31vw] duration-300' type="email" name='Email' placeholder='Enter your email address' required />
          </div>
          <div className='lg:col-span-2'>
            <textarea className='p-2 text-black text-lg w-64 h-36 rounded-md md:w-[480px] lg:w-[71vw] lg:h-48 duration-300' name='Message' placeholder='Description' required></textarea>
          </div>
          <div className='lg:col-span-2'>
            <button className='p-2 text-white text-lg w-64 h-14 bg-slate-800 border-2 rounded-md hover:bg-slate-500 duration-300 md:w-[480px] lg:w-[71vw]' type='submit'>Send</button>
          </div>
        </div>
      </form>
    </div>

  )
}

export default Contact
