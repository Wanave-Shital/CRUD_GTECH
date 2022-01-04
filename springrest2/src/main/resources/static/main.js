$(document).ready(function () {
	$.ajax({
		type: "GET",
		url: "http://localhost:3333/courses",
		success: function (response) {

			console.log(response);
			data = response;
			var dataSource = new kendo.data.DataSource({
				data: [
					{ response }
				]
		});
		$('#grid').kendoGrid({
				filterable: true,
				groupable: true,
				_height: 400,
				get height() {
					return this._height;
				},
				set height(value) {
					this._height = value;
				},
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
							"title":{type:'string'},
						}
					}
				},

				customDropdownEditor: function (container, options) {
					$('<input name="' + options.field + '"/>')
						.appendTo(container)
						.kendoDropDownList({
							dataSource: ["Python","Angular","Java","Javascript","Gofer"]
						});
				},
				save: function (e) {
					alert("saving your fields");
					console.log(e);
					var data = e.model;
					console.log(data);

					var postData = {};
					postData.id = data.id;

					postData.title = data.title;
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


							var grid = $("#grid").data("kendoGrid");
							grid.setDataSource(dataSource);
							location.reload(true);
							$('#grid').data('kendoGrid').refresh();
							preventCloseOnSave = false;


						},
					});
				},
				remove: function (e) {
					$.ajax({
						url: "http://localhost:3333/courses/" + e.model.id,
						type: "DELETE",
						success: function () {
							alert("deleted!!!");
							$('#grid').data('kendoGrid').refresh();
							preventCloseOnSave = false;
						},
						error: function (error) {
							alert(error);
							$('#grid').data('kendoGrid').refresh();
							preventCloseOnSave = false;
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
				dataSource: ["Python","Angular","Java","Javascript","Gofer"]
			});
	}
});





						