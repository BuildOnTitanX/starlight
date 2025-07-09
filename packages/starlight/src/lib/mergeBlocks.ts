// import type { CollectionEntry } from 'astro:content';
// // import matter from 'gray-matter';

// export function mergeRteBlocks(entry: CollectionEntry<'pages'>): string {
// 	const originalBody = entry.body;
// 	const blocks = entry.data.blocks ?? [];

// 	const extraMarkdown = blocks
// 		.filter((block) => block.type === 'rte' && typeof block.content === 'string')
// 		.map((block) => block.content.trim())
// 		.join('\n\n');

// 	return [originalBody?.trim(), extraMarkdown].filter(Boolean).join('\n\n');
// }

import type { CollectionEntry } from 'astro:content';

export function mergeRteBlocks(entry: CollectionEntry<'pages'>): string {
	console.log('mergeRteBlocks: received entry:', entry);

	const originalBody = entry.body;
	console.log(
		'mergeRteBlocks: originalBody:',
		originalBody ? originalBody.slice(0, 100) + '...' : 'empty'
	);

	const blocks = entry.data.blocks ?? [];
	console.log('mergeRteBlocks: blocks length:', blocks.length);

	const filteredBlocks = blocks.filter(
		(block) => block.type === 'rte' && typeof block.content === 'string'
	);
	console.log('mergeRteBlocks: filtered rte blocks:', filteredBlocks.length);

	const extraMarkdown = filteredBlocks
		.map((block) => {
			console.log('mergeRteBlocks: block content snippet:', block.content.slice(0, 100));
			return block.content.trim();
		})
		.join('\n\n');

	const merged = [originalBody?.trim(), extraMarkdown].filter(Boolean).join('\n\n');
	console.log('mergeRteBlocks: merged markdown length:', merged.length);

	return merged;
}
