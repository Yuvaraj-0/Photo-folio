import { useForm } from 'react-hook-form';

export default function ContactForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-4 space-y-4">
      <input {...register('name')} placeholder="Name" className="w-full p-3 border rounded" />
      <input {...register('email')} placeholder="Email" className="w-full p-3 border rounded" />
      <textarea {...register('message')} placeholder="Message" className="w-full p-3 border rounded h-40" />
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Send</button>
    </form>
  );
}
