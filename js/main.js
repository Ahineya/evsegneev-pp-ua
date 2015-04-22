(function(window, $, d) {

    var CONST = {
        WORKS_DATA: "data/works.json",
        CLASSES: {
            ACTIVE: 'active',
            HIDDEN: 'hidden'
        },
        SELECTORS: {
            CONTENT: "#content",
            TEMPLATE: "#work",
            CARDS: '.card',
            DEMOS: '.demo',
            EVENTS: '.event',
            FILTER_BUTTONS: '.filters>button',
            FILTERS: {
                ALL: '.filter-all',
                EVENTS: '.filter-events',
                DEMOS: '.filter-demos'
            }
        }
    };

    window.onload = init;

    function init() {

        if(!('content' in d.createElement('template'))) {
            templatePolyfill();
        }

        $.get(CONST.WORKS_DATA).then(function(data) {
            data.works.forEach(show);
            _addFiltersEventListeners();
        });



    }

    function show(work) {
        var template = _getTemplate();
        render(bind(template, work));
    }

    function _getTemplate() {

        var template = document
            .querySelector(CONST.SELECTORS.TEMPLATE)
            .content
            .cloneNode(true);

        var temp = document.createElement('div');
        temp.appendChild(template);
        template = temp.innerHTML;
        return template;
    }

    function bind(template, data) {
        var regex;
        data.class = data.class || 'demo';
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
        document.querySelector(CONST.SELECTORS.CONTENT)
            .appendChild( $(template)[0] );
    }

    function _addFiltersEventListeners() {

        var $filterButtons = $(CONST.SELECTORS.FILTER_BUTTONS);
        var $cards = $(CONST.SELECTORS.CARDS);
        var $notDemos = $(CONST.SELECTORS.CARDS + ':not(' + CONST.SELECTORS.DEMOS + ')');
        var $notEvents = $(CONST.SELECTORS.CARDS + ':not(' + CONST.SELECTORS.EVENTS + ')');

        function _clear(node) {
            $filterButtons.removeClass(CONST.CLASSES.ACTIVE);
            $(node).addClass(CONST.CLASSES.ACTIVE);
            $cards.removeClass(CONST.CLASSES.HIDDEN);
        }

        $(CONST.SELECTORS.FILTERS.ALL).on('click', function () {
            _clear(this);
        });

        $(CONST.SELECTORS.FILTERS.DEMOS).on('click', function () {
            _clear(this);
            $notDemos.addClass('hidden');
        });

        $(CONST.SELECTORS.FILTERS.EVENTS).on('click', function () {
            _clear(this);
            $notEvents.addClass('hidden');
        });
    }

})(window, jQuery, document);