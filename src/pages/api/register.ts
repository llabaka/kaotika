import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { playerClass, equipment, potion } = req.body;

    try {
      const response = await fetch('https://your-private-api-endpoint/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerClass,
          equipment,
          potion,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register player');
      }

      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error('Failed to register player:', error);
      res.status(500).json({ error: 'Failed to register player' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}