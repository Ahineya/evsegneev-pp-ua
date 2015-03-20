(function(window, $, d) {

    var CONSTANTS = {
        WORKS_DATA: "data/works.json",
        SELECTORS: {
            CONTENT: "#content",
            TEMPLATE: "#work"
        }
    };

    window.onload = init;

    function init() {

        if(!('content' in d.createElement('template'))) {
            templatePolyfill();
        }

        $.get(CONSTANTS.WORKS_DATA).then(function(data) {
            data.works.forEach(show);
        });

    }

    function show(work) {
        var template = _getTemplate();
        render(bind(template, work));
    }

    function _getTemplate() {

        var template = document
            .querySelector(CONSTANTS.SELECTORS.TEMPLATE)
            .content
            .cloneNode(true);

        var temp = document.createElement('div');
        temp.appendChild(template);
        template = temp.innerHTML;
        return template;
    }

    function bind(template, data) {
        var regex;
        for (var d in data) {
            if (data.hasOwnProperty(d)) {
                regex = new RegExp("\{" + d + "\}", "gi");
                template = template.replace(regex, data[d]);
                if (d === "links") {
                    regex = new RegExp("\\[links\\]", "gi");
                    var links = "";
                    data.links.forEach(function(link) {
                        links += "<p><a href='" + link.url + "' target='_blank'>" + link.text + "</a></p>";
                    });
                    template = template.replace(regex, links);
                }
            }
        }
        return template;
    }

    function render(template) {
        document.querySelector(CONSTANTS.SELECTORS.CONTENT)
            .appendChild( $(template)[0] );
    }

})(window, jQuery, document);