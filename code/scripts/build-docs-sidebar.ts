import type { CollectionEntry } from 'astro:content';

export interface SidebarNode {
  title: string;
  tab?: string;
  slug: string;          // full url path segment, e.g. "contributing/setup"
  href: string;           // "/docs/contributing/setup"
  children: SidebarNode[];
  order?: number;
}

export function buildSidebarTree(entries: CollectionEntry<'docs'>[]): SidebarNode[] {
  const root: SidebarNode[] = [];

  // Sort so parent index pages and ordering are stable/predictable
  const sorted = [...entries].sort((a, b) => {
    const aSort = a.data.sort;
    const bSort = b.data.sort;

    if (aSort !== undefined && bSort !== undefined) {
        if (aSort !== bSort) return aSort - bSort;
    } else if (aSort !== undefined) {
        return -1;
    } else if (bSort !== undefined) {
        return 1;
    }

    return a.id.localeCompare(b.id);
    });


  for (const entry of sorted) {
    const parts = entry.id.replace(/\.(md|mdx)$/, '').split('/');
    let currentLevel = root;
    let pathSoFar = '';

    parts.forEach((part, i) => {
      const isLast = i === parts.length - 1;
      // treat "index" as the parent page itself, not a new node
      const segment = part;
      pathSoFar = [pathSoFar, segment].filter(Boolean).join('/');

      if (segment === '') {
        return; // index file represents the folder itself; handled separately if needed
      }

      let node = currentLevel.find((n) => n.slug === pathSoFar);

      if (!node) {
        node = {
          title: isLast ? entry.data.title : segment, // fallback label for folder-only nodes
          tab: entry.data.tab || undefined,
          slug: pathSoFar,
          href: `/docs${pathSoFar != 'index' ? `/${pathSoFar}` : ''}`,
          children: [],
        };
        currentLevel.push(node);
      }

      if (isLast) {
        node.title = entry.data.title;
      }

      currentLevel = node.children;
    });
  }

  return root;
}
