$(document).ready(function() {
    var $scrollTarget = $(navigator.mozApps === undefined ? 'body' : 'html');

    // Scroll down listener
    $('p.down a').on('click', function(e) {
        $scrollTarget.animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000, 'easeInOutCubic');
        e.preventDefault();
    });
    $('p.down img').on('click', function(e) {
        $scrollTarget.animate({ scrollTop: $('#skills').offset().top }, 1000, 'easeInOutCubic');
        e.preventDefault();
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
    $('#skills').waypoint(function(direction) {
        $('.value span', this).each(function() {
            var element = $(this);
            element.animate({ width: element.data('width') }, 1500, 'easeOutSine');
        })
    }, { offset: '50%', triggerOnce: true });

    // Overwrite cover background
    var image = '/assets/images/background-cover-' + parseInt(Math.random() * 3) + '.png';
    $('#cover').css('background-image', 'url(' + image + ')');
});
