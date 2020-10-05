let plugins = {
  a: {
    dependencies: ['b', 'd'],
  },
  b: {
    dependencies: ['c', 'e'],
  },
  c: {
    dependencies: ['d', 'e', 'f'],
  },
  d: {
    dependencies: [],
  },
  e: {
    dependencies: [],
	},
	f: {
		dependencies: [],
	},
	g: {
		dependencies: ['f', 'c'],
	},
	h: {
		dependencies: [],
	},
};


function resolve (name, resolved, unresolved) {
  let node = plugins[name];
  unresolved.add(name);

  if (!node) return;

  for (let dep of node.dependencies) {
    if (!resolved.has(dep)) {
      if (unresolved.has(dep))
        throw new Error('Circular reference:', name, dep);

      resolve(dep, resolved, unresolved);
    }
  }

  resolved.add(name);
  unresolved.delete(name);
}

let resolved = new Set;
let unresolved = new Set;

for (let name in plugins) {
	resolve(name, resolved, unresolved);
}

console.log(resolved, unresolved);
