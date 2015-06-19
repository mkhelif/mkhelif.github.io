$(document).ready(function() {
    // Scroll down listener
    $("p.down a").on("click", function() {
        $("body").animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000, "easeInOutCubic");
        return false;
    });
    $("p.down img").on("click", function() {
        $("body").animate({ scrollTop: $('#skills').offset().top }, 1000, "easeInOutCubic");
        return false;
    });

    // Setup tooltips
    var settings = {
        theme: 'tooltipster-mk',
        contentAsHTML: true,
        interactive: true,
        delay: 0
    };

    settings['position'] = 'top';
    $('.tooltip.top').tooltipster(settings);
    settings['position'] = 'bottom';
    $('.tooltip.bottom').tooltipster(settings);
    settings['position'] = 'right';
    $('.tooltip.right').tooltipster(settings);
    settings['position'] = 'left';
    $('.tooltip.left').tooltipster(settings);

    // Setup waypoints
	$("#skills").waypoint(function(direction) {
        $(".value span", this).each(function() {
            var element = $(this);
            element.animate({ width: element.data("width") }, 1500, "easeOutSine");
        });
	}, { offset: '50%', triggerOnce: true });
});
