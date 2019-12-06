var reader = new FileReader();

function loadFile() {
    var file = document.getElementById('customFile').files[0];
    reader.addEventListener("load", parseFile, false);
    if (file) {
        reader.readAsText(file);
    }
}

function parseFile() {
    var data = d3.csvParse(reader.result, function (d) {
        return d;
    });
    var model = document.getElementById("model").value;
    displayFile(data);
    downloadButton(data, model);
}

function displayFile(data) {
    var columns = Object.keys(data[0]);
    $.each(columns, function (i, column) {
        $("#header").append("<th>" + column + "</th>")
    })
    $.each(data.slice(0, 5), function (j, d) {
        var row = Object.values(d);
        $("#csv-content").append("<tr>");
        $.each(row, function (k, r) {
            $("#csv-content").append("<td>" + r + "</td>");
        })
        $("#csv-content").append("</tr>");
    })
}

function to_json(row, model) {
    var schema = { "model": model, "fields": row };
    return schema
}

function writeFile(data, model) {
    var json_list = [];
    $.each(data, function (i, row) {
        var record = to_json(row, model);
        json_list.push(record);
    });
    var json = JSON.stringify(json_list, null, 2);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    return url
}

function downloadButton(data, name) {
    var a = document.createElement('a');
    var filename = name.replace(".", "_") + ".json";
    a.download = filename;
    a.href = writeFile(data, name);
    a.classList.add("btn");
    a.classList.add("btn-success");
    a.textContent = "Download json";
    document.getElementById('content').appendChild(a);
    document.getElementById('filename').append(filename);
    document.getElementById("code_directions").style.visibility = "visible";
}

$("#parse-btn").click(function () {
    $("#header").empty();
    $("#csv-content").empty();
    $("#table-caption").empty();
    $("#filename").empty();
    $("#content").empty();
    document.getElementById("code_directions").style.visibility = "hidden";
    var model = document.getElementById("model").value;
    loadFile();
    $("#table-caption").append(model + " preview (head)");
});