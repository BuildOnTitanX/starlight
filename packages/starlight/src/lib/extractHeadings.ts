import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';

export interface MarkdownHeading {
	depth: number;
	value: string;
	slug: string;
}

/**
 * Extract headings from markdown content.
 * Returns an array of headings with depth, text, and slug.
 */
export async function extractHeadings(markdown: string): Promise<MarkdownHeading[]> {
	const tree = unified().use(remarkParse).parse(markdown);

	const headings: MarkdownHeading[] = [];

	visit(tree, 'heading', (node) => {
		const depth = node.depth;
		const text = node.children
			.filter((child) => child.type === 'text' || child.type === 'inlineCode')
			.map((child: any) => child.value)
			.join('');
		// Create slug from text (simple slugify, you can improve this)
		const slug = text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.trim();

		headings.push({ depth, value: text, slug });
	});

	return headings;
}
