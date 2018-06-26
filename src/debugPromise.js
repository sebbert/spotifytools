const nativeThen = Promise.prototype.then;
const then = function(...args) {
	Promise.prototype.then = nativeThen;
	const res = this.then(...args);
	// console.log(res);
	Promise.prototype.then = debugThen;
	return res;
}

const debugThen = function(onRes, onErr) {
	const stackFrames = getStackFrames();
	const stackFrame = stackFrames.slice(0,2);

	const wrap = function(fn, msg) {
		if(fn == undefined)
			return undefined;
		return function(value) {
			const res = fn.apply(this, value);
			console.log(`[${msg}]	${String(value)}	${stackFrame}`);
			return res;
		}
	}

	console.log(`.then(${[].concat(onRes, onErr).join(", ")})`);

	const p = then.apply(this,
		onRes,
		onErr,
		// wrap(onRes, "RES"),
		// wrap(onErr, "ERR")
	);

	return p;
}

Promise.prototype.then = debugThen;
Promise.prototype.catch = function(onErr) {
	return debugThen.call(this, undefined, onErr)
}

const STACK_FRAME_REGEX = /\n\s+at (.+)\n/g;
function getStackFrames() {
	const {stack} = new Error();
	const results = [];
	for (let match, first = true; match = STACK_FRAME_REGEX.exec(stack); first = false) {
		if(!first)
			results.push(match[1]);
	}
	return results
}
