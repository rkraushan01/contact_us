'use client'
import React, { useState, FormEvent } from "react";

interface ContactResponse {
  msg: string[];
  success: boolean;
}

export default function ContactForm(): JSX.Element {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    console.log("Full name: ", fullname);
    console.log("Email: ", email);
    console.log("Phone Number: ", phoneNumber);
    console.log("Message: ", message);

    const res = await fetch("api/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        email,
        phoneNumber,
        message,
      }),
    });

    const { msg, success: isSuccess }: ContactResponse = await res.json();
    setError(msg);
    setSuccess(isSuccess);

    if (isSuccess) {
      setFullname("");
      setEmail("");
      setPhoneNumber("");
      setMessage("");
    }
  };

  return (
    <div className="bg-gray-500 font-bold">
      <form
        onSubmit={handleSubmit}
        className="py-4 mt-4 border-t flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="fullname">Full Name</label>
          <input
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            type="text"
            id="fullname"
            placeholder="John Doe"
            className="shadow-md px-6 py-2 border border-slate-300"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            id="email"
            placeholder="ramesh@gmail.com"
            className="shadow-md px-6 py-2 border border-slate-300"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            type="text"
            id="phoneNumber"
            placeholder="123-456-7890"
            className="shadow-md px-6 py-2 border border-slate-300"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message">Your Message</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="h-32 shadow-md px-6 py-2 border border-slate-300"
            id="message"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <button 
          className="font-bold bg-green-500"
          type="submit"
        >
          Send
        </button>
      </form>

      <div className="bg-slate-100 flex flex-col ">
        {error &&
          error.map((e) => (
            <div
              key={e}
              className={`${
                success ? "text-green-800" : "text-red-600"
              } px-5 py-2`}
            >
              {e}
            </div>
          ))}
      </div>
    </div>
  );
}
