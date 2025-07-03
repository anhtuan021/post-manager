import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreatePost() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, image }),
    });
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Post</h1>
      <input required placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <textarea required placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input placeholder="Image URL (optional)" value={image} onChange={e => setImage(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}
