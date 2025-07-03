import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Post, { IPost } from '../../../models/Post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json(post);
  }

  if (req.method === 'PUT') {
    const { name, description, image } = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      { name, description, image },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json(post);
  }

  if (req.method === 'DELETE') {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
