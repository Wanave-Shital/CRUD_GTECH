$(document).ready(function () {

	$.ajax({
		type: "GET",
		url: "http://localhost:3333/courses",
		success: function (response) {
			console.log(response);
			$('#grid').kendoGrid({


				filterable: true,
				groupable: true,
				height: 400,
				scrollable: true,
				pageable: true,
				sortable: true,
				dataSource: {
					data: response
				},
				pageable: true,
				height: 550,
				toolbar: [{ name: "create", text: "Add", iconClass: "k-icon k-i-plus" }],
				columns: [
					{ title: "Course_Id", field: "id" },
					{ title: "Description", field: "description" },
					{ title: "Price", field: "price" },
					{ field: "title", width: "120px", editor: customDropdownEditor },
					{
						title: "Action", width: '200px',
						command: [{
							name: "edit", text: "Edit", iconClass: {
								edit: "k-icon k-i-edit",
								update: "k-icon k-i-save",
								cancel: "k-icon k-i-cancel"
							}
						}, {
							name: "destroy",
							text: "Delete",
							iconClass: "k-icon k-i-delete"
						}]
					}

				],

				editable: "popup",
				schema: {
					model: {
						id: "Course_id",

						fields: {
							"id": { type: "number", editable: "false" },
							"description": { type: "string", editable: "true" },
							"price":
							{
								type: "number", editable: "true",
							},
						}
					}
				},

				customDropdownEditor: function (container, options) {
					$('<input name="' + options.field + '"/>')
						.appendTo(container)
						.kendoDropDownList({
							dataTextField: "title",
							dataValueField: "id",
							dataSource: [{ "id": 1, "title": "Java" }, { "id": 2, "title": "DS Using Java" }, { "id": 3, "title": "Python" }, { "id": 4, "title": "Angular" }]
						});
				},
				save: function (e) {
					alert("saving");
					console.log(e);
					var data = e.model;
					console.log(data);

					var postData = {};
					postData.id = data.id;

					postData.title = data.title.title;
					postData.description = data.description;
					postData.price = data.price;

					$.ajax({
						type: "PUT",
						contentType: "application/json",
						url: "http://localhost:3333/courses",
						data: JSON.stringify(postData),
						dataType: 'json',

						success: function (data) {
							console.log(data);
							$('#grid').data('kendoGrid').dataSource.read().then(function() {
								$('#grid').data('kendoGrid').refresh();
							});


						},


					});
				},

				remove: function (e) {
					$.ajax({
						url: "http://localhost:3333/courses/" + e.model.id,
						type: "DELETE",
						success: function () {
							alert("deleted!!!");


						},
						error: function (error) {
							alert(error);

						}
					})
				},


			});
		}
	});

	function customDropdownEditor(container, options) {
		$('<input name="' + options.field + '"/>')
			.appendTo(container)
			.kendoDropDownList({
				dataTextField: "title",
				dataValueField: "id",
				dataSource: [{ "id": 1, title: "Java" }, { "id": 2, "title": "DS Using Java" }, { "id": 3, "title": "Python" }, { "id": 4, "title": "Angular" }]
			});
	}
});





