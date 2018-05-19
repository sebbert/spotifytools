module.exports =
	(getContext) =>
		(req, res, next) => {
			const render = res.render;
			res.render = (viewName, locals, callback) => {
				const context = {
					...getContext(req, res),
					...locals
				};
				return render.call(res, viewName, context, callback);
			};
			next();
		}
