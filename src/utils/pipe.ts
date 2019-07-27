export default (...fns: Function[]) =>
	fns.reduce((f, g) => (...args: unknown[]) => g(f(...args)));
