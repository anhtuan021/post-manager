// pages/edit/[id].tsx
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';

interface IPost {
  _id: string;
  name: string;
  description: string;
  image?: string;
}

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch post data
  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (post) {
      setPost({
        ...post,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!post) return;
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: post.name,
        description: post.description,
        image: post.image,
      }),
    });
    router.push('/');
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Post</h1>
      <div>
        <label>Name</label>
        <input
          required
          name="name"
          value={post.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          required
          name="description"
          value={post.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image URL (optional)</label>
        <input
          name="image"
          value={post.image || ''}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
