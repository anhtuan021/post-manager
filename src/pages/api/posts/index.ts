import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Post from '@/models/Post';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === 'GET') {
    const { search = '', sort = 'asc' } = req.query;
    const sortOrder = sort === 'desc' ? -1 : 1;
    const posts = await Post.find({
      name: { $regex: search as string, $options: 'i' },
    }).sort({ name: sortOrder });
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const { name, description, image } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and Description are required.' });
    }
    const post = await Post.create({ name, description, image });
    return res.status(201).json(post);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
