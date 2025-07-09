import { mergeRteBlocks } from './mergeBlocks';
import { extractHeadings } from './extractHeadings';
import { generateToC } from '../../utils/generateToC';

export async function getTocFromEntry(
	entry: any,
	options?: {
		title?: string;
		minHeadingLevel?: number;
		maxHeadingLevel?: number;
	}
) {
	const fullMarkdown = mergeRteBlocks(entry);
	const headings = await extractHeadings(fullMarkdown);

	const fixedHeadings = headings.map(({ value, ...rest }) => ({
		...rest,
		text: value,
	}));

	const toc = generateToC(fixedHeadings, {
		title: options?.title ?? entry.data.title ?? 'On this page',
		minHeadingLevel: options?.minHeadingLevel ?? 2,
		maxHeadingLevel: options?.maxHeadingLevel ?? 3,
	});

	return toc;
}
