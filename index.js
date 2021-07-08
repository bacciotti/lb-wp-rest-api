// Triggers a function depending on the option selected
$(".select-options").on("change", function () {
    let option = this.value;
    let slug;
    let term;
    switch (option) {
        case 'opt-posts':
            slug = "posts";
            term = "title";
            break;
        case 'opt-categories':
            slug = "categories";
            term = "name";
            break;
        case 'opt-users':
            slug = "users";
            term = "name";
            break;
        case 'opt-pages':
            slug = "pages";
            term = "title";
            break;
        default:
            slug = "";
            term = "";
    }
    requestWpData(slug, term);
});

// Request data
function requestWpData(slug, term) {

    if (slug == "") return;

    let request = new XMLHttpRequest()
    request.open("GET", 'http://localhost2/wordpress/wp-json/wp/v2/' + slug);
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let data = JSON.parse(request.response);
            let html = "";
            data.forEach(function (item) {
                if (slug == "pages" || slug == "posts") {
                    html += item[term].rendered + "<br>";
                } else {
                    html += item[term] + "<br>";
                }
            });
            $("#p-response").html(html);
        } else {
            console.log("Page not found")// if link is broken, output will be page not found
        }
    }
}

$(document).ready(function () {
    $(".select-options").val("opt-select");
});