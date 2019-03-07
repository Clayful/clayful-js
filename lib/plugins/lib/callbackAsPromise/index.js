module.exports = callback => {

	let resolve;
	let reject;

	const promise = callback.Promise ? new callback.Promise((_resolve, _reject) => {
		resolve = _resolve;
		reject = _reject;
	}) : null;

	callback = promise ? (err, result) => {
		return err ? reject(err) : resolve(result);
	} : callback;

	return { promise, callback };

};