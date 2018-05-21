/**
 * A horrible hack to patch spotify-web-api-node so that it includes the response headers in errors.
 */

const HttpManager = require("spotify-web-api-node/src/http-manager");
const superagent = require("superagent");

/* Create an error object from an error returned from the Web API */
function _getErrorObject(defaultMessage, err) {
	var errorObject;
	if (typeof err.error === 'object' && typeof err.error.message === 'string') {
		// Web API Error format
		errorObject = new WebApiError(err.error.message, err.error.status);
	} else if (typeof err.error === 'string') {
		// Authorization Error format
		errorObject = new WebApiError(err.error + ': ' + err['error_description']);
	} else if (typeof err === 'string') {
		// Serialized JSON error
		try {
			var parsedError = JSON.parse(err);
			errorObject = new WebApiError(
			parsedError.error.message,
			parsedError.error.status
			);
		} catch (err) {
			// Error not JSON formatted
		}
	}

	if (!errorObject) {
	  // Unexpected format
	  errorObject = new WebApiError(defaultMessage + ': ' + JSON.stringify(err));
	}

	return errorObject;
};


HttpManager._makeRequest = function(method, options, uri, callback) {
	let reqEnd;

	const newMethod = function(...methodArgs) {
		const req = method.apply(superagent, methodArgs);

		reqEnd = req.end.bind(req);

		// Disable the original completion handler
		req.end = () => {};
	};

	original(newMethod, ...args);

	reqEnd((err, res) => {
		const {body, headers, statusCode} = res;

		if(err) {
			var errorObject = _getErrorObject('Request error', {
				error: err
			});
			errorObject.headers = headers;
			callback(errorObject)
		}

		return callback(null, {body, headers, statusCode});
	})
}
