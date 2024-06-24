import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, option } = req.body;

  if (!email || !option) {
    return res.status(400).json({ error: 'Email and option are required' });
  }

  try {
    const response = await fetch(`https://api.external-service.com/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, option })
    });
    const data = await response.json();

    if (response.status === 200) {
      return res.status(200).json(data);
    } else {
      return res.status(response.status).json({ error: data.message });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}