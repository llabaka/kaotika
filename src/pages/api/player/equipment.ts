import { NextApiRequest, NextApiResponse } from 'next';
import { SERVER_URL } from '@/constants/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	
	const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Id is required' });
  }

	try {
		const response = await fetch(`${SERVER_URL}/players/equipment/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(req.body),
		});
		if (!response.ok) {
			throw new Error('Failed to patch player equipment');
		}
		const result = await response.json();
		console.log(result);
		res.status(200).json(result);
	} catch (error) {
		console.error('Server error on patching player equipment:', error);
		res.status(500).json({ error: 'Server error on patching player equipment' });
	}
}