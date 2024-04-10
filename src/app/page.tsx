import ContactForm from "../../components/ContactForm";


export default function Home() {
  return (
    <div className="p-4 max-w-3xl mx-auto bg-gray-500">
      <h1 className="text-3xl font-bold text-white">Contact Us</h1>
      <p className="text-white">Please fill in the form below</p>

      <ContactForm/>
    </div>
  );
}