import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req.body);
    try {
      const response = await fetch('https://kaotika-server.fly.dev/players/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch consolidated tasks');
      }

      const result = await response.json();
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.error('Failed to register player:', error);
      res.status(500).json({ error: 'Failed to fetch consolidated tasks' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}