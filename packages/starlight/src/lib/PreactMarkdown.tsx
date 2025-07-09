/** @jsxImportSource preact */
import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
// import remarkGfm from 'remark-gfm';
//
interface PreactMarkdownProps {
	content: string;
}

const PreactMarkdown: FunctionalComponent<PreactMarkdownProps> = ({ content }) => {
	const [html, setHtml] = useState<string>('');

	useEffect(() => {
		async function parseMarkdown() {
			const file = await unified()
				.use(remarkParse)
				.use(remarkRehype)
				.use(rehypeSanitize)
				.use(rehypeSlug)
				// .use(remarkGfm)
				.use(rehypeStringify)
				.process(content);
			setHtml(String(file));
		}
		parseMarkdown();
	}, [content]);

	return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default PreactMarkdown;
