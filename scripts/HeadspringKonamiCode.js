$(function () {
    //Declare constants
    const konamiCodeSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    const canvasCode = 'HeadspringCanvas';
    const canvasContainerCode = 'HeadspringCanvasContainer';
    const fadeTimeOut = 5; //seconds, modify if necessary
    const fineTune = .28; //less = center goes up, more = center goes down
    const hardTune = .54; //<---- Important stuff, only property supposed to be modified
    const canvasWidth = hardTune * 230 * 2;
    const canvasHeight = hardTune * 230 * 2;
    //Calculation initialization const
    const _factorX = 1;
    const _factorY = .5;
    const _iterator = 1;
    const _limit = 7;
    const _startX = 10;
    const _startY = 10;
    const _sizeX = 10;
    const _sizeY = 10;
    //Calculation variables
    var factorX = 0;
    var factorY = 0;
    var iterator = 0;
    var limit = 0;
    var startX = 0;
    var startY = 0;
    var sizeX = 0;
    var sizeY = 0;
    //Declare variables
    var storedSequence = [];

    //KeyDown event handler
    $(window).on('keydown', function (evt) {
        storedSequence.push(evt.keyCode);
        var deletedItem = storedSequence.length > 10 ? storedSequence.shift() : null;
        if (konamiCodeSequence.toString() === storedSequence.toString()) {
            //Prepare canvas container
            $('<div>').attr({
                id: canvasContainerCode,
            }).css({
                width: 'auto',
                height: 'auto',
                bottom: '0',
                right: '0',
                position: 'fixed',
                background: 'transparent'
            }).appendTo('body');
            //Prepare canvas container
            $('<canvas>').attr({
                id: canvasCode,
                width: canvasWidth,
                height: canvasHeight,
            }).css({
                margin: 0,
                padding: 0,
                display: 'block',
                background: 'transparent'
            }).appendTo('#' + canvasContainerCode);

            //Init canvas
            function init() {
                factorX = _factorX //* 5;
                factorY = _factorY //* 5;
                iterator = _iterator //* 5;
                limit = _limit //* 5;
                startX = _startX * hardTune * 2.15;
                startY = _startY * hardTune * 1.75;
                sizeX = _sizeX * hardTune * 2;
                sizeY = _sizeY * hardTune * 2;

                window.requestAnimationFrame(draw);
                setTimeout(function () {
                    $('#' + canvasContainerCode).fadeOut('slow', function () {
                        var ctx = document.getElementById(canvasCode).getContext('2d');
                        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // clear canvas
                        $('#' + canvasContainerCode).remove();
                    });
                }, fadeTimeOut * 1000);
            }

            //Draw in canvas
            function draw() {
                var ctx = document.getElementById(canvasCode).getContext('2d');

                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = "#FFFF00";
                ctx.fillRect(startX * factorX, startY * factorY, sizeX, sizeY);
                ctx.save();

                //3D effect?
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = "#cccccc";
                ctx.fillRect(startX * factorX + 5, startY * factorY + 5, sizeX, sizeY);
                ctx.save();

                setTimeout(function () {
                    if (limit === 1) {
                        return;
                    }

                    //Calculate
                    if (iterator === limit) {
                        iterator = 1;
                        limit--;
                        factorX += 2.4;
                        factorY -= (3.7 * (limit - fineTune));
                        sizeX *= 1.32;
                        sizeY *= 1.32;
                    } else {
                        iterator++;
                        factorY += 3.825;
                    }

                    window.requestAnimationFrame(draw);
                }, 100);
            }

            init();
        }
    });
})