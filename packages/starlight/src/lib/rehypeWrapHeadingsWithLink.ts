import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

/** @type {import('unified').Plugin<[], import('hast').Root>} */
export default function rehypeWrapHeadingsWithLink() {
	return (tree) => {
		console.log('[plugin] Starting heading wrapper plugin...');

		visit(tree, 'element', (node, index, parent) => {
			if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) return;

			const level = node.tagName;
			const id = node.properties?.id;
			if (!id || !parent || typeof index !== 'number') return;

			// Create the exact <span><svg>...</svg></span> structure
			const iconNode = h(
				'span',
				{
					'aria-hidden': 'true',
					class: 'sl-anchor-icon',
				},
				[
					h(
						'svg',
						{
							width: 16,
							height: 16,
							viewBox: '0 0 24 24',
							fill: 'currentcolor',
						},
						[
							h('path', {
								d: 'm12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 0 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 1 0-1.42-1.42Zm8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 0 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 1 0 1.42 1.42l3.88-3.89a4.49 4.49 0 0 0 0-6.33ZM8.83 15.17a1 1 0 0 0 1.1.22 1 1 0 0 0 .32-.22l4.92-4.92a1 1 0 0 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42Z',
							}),
						]
					),
				]
			);

			// Link with the icon inside
			const linkNode = h(
				'a',
				{
					href: `#${id}`,
					class: 'sl-anchor-link',
					'aria-hidden': 'true',
				},
				[iconNode]
			);

			// Wrap heading and link in container
			const wrapper = h(
				'div',
				{
					class: `sl-heading-wrapper level-${level}`,
				},
				[node, linkNode]
			);

			parent.children.splice(index, 1, wrapper);
		});

		console.log('[plugin] Finished heading wrapper plugin.');
	};
}
