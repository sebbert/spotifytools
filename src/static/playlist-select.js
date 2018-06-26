$(() => {
	$(".playlist-select").select2({
		ajax: {
			url: "/select2/user-playlists",
			dataType: "json"
		}
	});
});
