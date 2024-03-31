import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import sharp from 'sharp';

// passing image
export const GET: RequestHandler = async ({ url, fetch }) => {
	const imageURL = url.searchParams.get('image');
	if (imageURL) {
		// download the image
		const image = await fetch(imageURL).then((res) => res.arrayBuffer());
		const stats = await sharp(Buffer.from(image)).stats();
		// console.log(stats);
		const [r, g, b] = stats.channels.map((c) => c.mean);

		return json({ color: `rgba(${r}, ${g}, ${b})` });
	}

	return json({ color: null });
};
