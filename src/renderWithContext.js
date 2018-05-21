module.exports =
	(getContext) =>
		(req, res, next) => {
			const render = res.render;
			res.render = function(viewName, locals, callback) {
				const context = {
					...getContext(req, res),
					...locals
				};
				return render.call(this, viewName, context, callback);
			};
			next();
		}
