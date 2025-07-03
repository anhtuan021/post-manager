import { useState, useEffect } from 'react';
import Link from 'next/link';

export interface IPost {
  _id: string;
  name: string;
  description: string;
  image?: string;
}

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetch(`/api/posts?search=${search}&sort=${sort}`)
      .then(res => res.json())
      .then(setPosts);
  }, [search, sort]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      setPosts(posts.filter(p => p._id !== id));
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <Link href="/create">
        <button>Create New Post</button>
      </Link>
      <div style={{ margin: '16px 0' }}>
        <input
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <button onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}>
          Sort: {sort.toUpperCase()}
        </button>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post._id} style={{ marginBottom: 24 }}>
            <div>
              <strong>{post.name}</strong>
              <div>
                <Link href={`/edit/${post._id}`}>
                  <button style={{ marginRight: 8 }}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            </div>
            <p>{post.description}</p>
            {post.image && (
              <img
                src={post.image}
                alt={post.name}
                width={100}
                style={{ display: 'block', marginTop: 8 }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
