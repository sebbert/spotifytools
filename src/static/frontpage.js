window.addEventListener("load", () => {
	Array.from(document.getElementsByTagName("button"))
		.filter(e => e.dataset.href != null)
		.forEach(e => {
			e.addEventListener("click", () => {
				document.location.href = e.dataset.href;
			});
		})
})

