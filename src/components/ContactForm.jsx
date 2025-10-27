'use client';
import { useState } from 'react';

export default function ContactForm(){
  const [values,setValues] = useState({name:'',email:'',message:''});
  const [sent,setSent] = useState(false);

  const handle = (e) => setValues(v => ({...v,[e.target.name]: e.target.value}));

  const submit = async (e) => {
    e.preventDefault();
    // simple client validation
    if(!values.email || !values.message) return alert('Please complete the form.');
    // You can hook this to an API route or external service (Mailgun, Netlify forms, Zapier etc)
    // For now simulate success:
    setSent(true);
    setTimeout(()=> setSent(false), 4000);
  };

  return (
    <form onSubmit={submit} className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <label className="block"><span className="text-sm font-medium">Name</span>
        <input name="name" value={values.name} onChange={handle} className="mt-2 w-full border rounded px-3 py-2" />
      </label>

      <label className="block mt-4"><span className="text-sm font-medium">Email</span>
        <input name="email" value={values.email} onChange={handle} className="mt-2 w-full border rounded px-3 py-2" />
      </label>

      <label className="block mt-4"><span className="text-sm font-medium">Message</span>
        <textarea name="message" value={values.message} onChange={handle} className="mt-2 w-full border rounded px-3 py-2 h-28"></textarea>
      </label>

      <div className="mt-4 flex items-center gap-3">
        <button className="px-4 py-2 bg-primary text-white rounded-md">Send Message</button>
        {sent && <div className="text-sm text-green-600">Message sent (simulated)</div>}
      </div>
    </form>
  );
}
