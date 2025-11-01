/** @jsxImportSource preact */
import { h } from 'preact';

type TreeNode =
	| string
	| { name: string; children?: TreeNode[]; highlight?: boolean; comment?: string };

export function RenderTree({ tree }: { tree: TreeNode[] }) {
	return <ul>{tree.map(renderNode)}</ul>;
}

function renderNode(node: TreeNode) {
	if (typeof node === 'string') {
		return <li>{node}</li>;
	}

	return (
		<li>
			{node.highlight ? <span class="highlight">{node.name}</span> : node.name}
			{node.comment && (
				<span class="comment">
					{' '}
					{/* add spacing */} # {node.comment}
				</span>
			)}
			{node.children && node.children.length > 0 && <ul>{node.children.map(renderNode)}</ul>}
		</li>
	);
}
