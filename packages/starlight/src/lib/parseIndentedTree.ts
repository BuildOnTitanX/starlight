export interface TreeNode {
	name: string;
	highlight?: boolean;
	comment?: string;
	children?: TreeNode[];
}

export function parseIndentedTree(treeString: string): TreeNode[] {
	const lines = treeString.trim().split('\n');

	const root: TreeNode[] = [];
	const stack: { indentLevel: number; children: TreeNode[] }[] = [
		{ indentLevel: -1, children: root },
	];

	console.log('Parsing tree string...');

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const match = line.match(/^(\s*)-\s+(.*)/);
		if (!match) {
			console.log(`Skipping line ${i}: does not match pattern -> "${line}"`);
			continue;
		}

		const rawIndent = match[1].replace(/\t/g, '  ');
		const indentLevel = rawIndent.length / 2;
		let content = match[2].trim();

		// Extract comment if present
		let comment = undefined;
		const commentMatch = content.match(/^(.+?)(?:\s+#\s*(.+))?$/);

		if (commentMatch) {
			content = commentMatch[1].trim();
			comment = commentMatch[2]?.trim();
		}

		// Detect highlight
		let highlight = false;
		const highlightMatch = content.match(/^\*\*(.*?)\*\*$/);
		if (highlightMatch) {
			content = highlightMatch[1].trim();
			highlight = true;
		}

		// Look ahead to next line to detect if this node has children
		let nextIndentLevel = -1;
		if (i + 1 < lines.length) {
			const nextMatch = lines[i + 1].match(/^(\s*)-\s+(.*)/);
			if (nextMatch) {
				const nextRawIndent = nextMatch[1].replace(/\t/g, '  ');
				nextIndentLevel = nextRawIndent.length / 2;
			}
		}

		// Determine if node has children
		const hasChildren = nextIndentLevel > indentLevel;
		const node: TreeNode =
			hasChildren || content.endsWith('/') ? { name: content, children: [] } : { name: content };

		if (highlight) {
			node.highlight = true;
		}
		if (comment) {
			node.comment = comment;
		}

		console.log(
			`Line ${i}: indent=${indentLevel}, name="${node.name}", highlight=${highlight}, comment=${comment ?? 'none'}, hasChildren=${hasChildren}`
		);

		// Pop stack to find proper parent
		while (stack.length > 0 && indentLevel <= stack[stack.length - 1].indentLevel) {
			const popped = stack.pop();
			console.log(`  Popped from stack: indentLevel=${popped?.indentLevel}`);
		}

		const parent = stack[stack.length - 1].children;
		parent.push(node);
		console.log(
			`  Added node "${node.name}" to parent at indentLevel=${stack[stack.length - 1].indentLevel}`
		);

		if (node.children) {
			stack.push({ indentLevel, children: node.children });
			console.log(`  Pushed to stack: indentLevel=${indentLevel}, children length=0`);
		}
	}

	console.log('Parsing complete.');
	return root;
}
