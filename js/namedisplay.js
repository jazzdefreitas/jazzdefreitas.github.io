function startMatter() {
    var canvas = document.getElementById('matter-canvas');

    const position = {
        name1: { x: -380, y: -75 },
        name2: { x: 195, y: -75 },
        name3: { x: 0, y: 70 },
    };
    const verticalPosition = {
        name1: { x: 0, y: -200 },
        name2: { x: 0, y: -50 },
        name3: { x: 0, y: 100 },
    };

    var minWidth = 745;
    var minHeight = 700;
    var changeWidth = 1100;
    var verticalName = false;
    function resizeCanvas() {
        if (canvas.offsetWidth < changeWidth && !verticalName) {
            verticalName = true;

            Composite.translate(name1, {
                x: verticalPosition.name1.x - position.name1.x,
                y: verticalPosition.name1.y - position.name1.y
            });
            Composite.translate(name2, {
                x: verticalPosition.name2.x - position.name2.x,
                y: verticalPosition.name2.y - position.name2.y
            });
            Body.translate(name3, {
                x: verticalPosition.name3.x - position.name3.x,
                y: verticalPosition.name3.y - position.name3.y
            });
        } else if (canvas.offsetWidth > changeWidth && verticalName) {
            verticalName = false;

            Composite.translate(name1, {
                x: position.name1.x - verticalPosition.name1.x,
                y: position.name1.y - verticalPosition.name1.y
            });
            Composite.translate(name2, {
                x: position.name2.x - verticalPosition.name2.x,
                y: position.name2.y - verticalPosition.name2.y
            });
            Body.translate(name3, {
                x: position.name3.x - verticalPosition.name3.x,
                y: position.name3.y - verticalPosition.name3.y
            });
        }
        var aspectRatio = canvas.offsetWidth / canvas.offsetHeight;

        if (canvas.offsetWidth > minWidth && canvas.offsetHeight > minHeight) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        } else if (canvas.offsetWidth < minWidth && canvas.offsetHeight > minHeight) {
            canvas.width = minWidth;
            canvas.height = minWidth / aspectRatio;
        } else if (canvas.offsetHeight < minHeight && canvas.offsetWidth > minWidth) {
            canvas.height = minHeight;
            canvas.width = minHeight * aspectRatio;
        } else {
            if (canvas.offsetWidth - minWidth > canvas.offsetHeight - minHeight) {
                canvas.height = minHeight;
                canvas.width = minHeight * aspectRatio;
            } else {
                canvas.width = minWidth;
                canvas.height = minWidth / aspectRatio;
            }
        }

        render.options.width = canvas.width;
        render.options.height = canvas.height;

        render.bounds.min.x = -canvas.width / 2;
        render.bounds.max.x = canvas.width / 2;
        // render.bounds.min.y = -canvas.height / 2;
        // render.bounds.max.y = canvas.height / 2;
        var relativeNavbarSize = 60 * Math.max(canvas.height / canvas.offsetHeight, 1);
        render.bounds.min.y = (-canvas.height - relativeNavbarSize) / 2;
        render.bounds.max.y = (canvas.height - relativeNavbarSize) / 2;

        var buttons = document.querySelectorAll('#linkedin-btn, #github-btn');
        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            var name3Pos = verticalName ? verticalPosition.name3.y : position.name3.y;
            var ratio = Math.max(canvas.height / canvas.offsetHeight, 1);
            var y = (canvas.height / 2 + name3Pos + 140) / ratio + 20 * ratio;

            if (canvas.offsetWidth < 300)
                y += 65 * i

            y = Math.min(y, canvas.offsetHeight * .92);
            btn.style.top = y + 'px';
        }
    }

    var Engine = Matter.Engine,
        Render = Matter.Render,
        Events = Matter.Events,
        Composite = Matter.Composite,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Sleeping = Matter.Sleeping;

    // create an engine
    var engine = Engine.create({
        enableSleeping: true
    });

    // create a renderer
    var render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: canvas.width,
            height: canvas.height,
            hasBounds: true,
            wireframes: false,
            showSleeping: false,
            background: 'transparent'
        }
    });

    var collisionRender = { visible: false };
    var name1 = Composite.create({
        bodies: [
            Bodies.rectangle(position.name1.x, position.name1.y, 1, 1, {
                render: { sprite: { texture: 'img/name1.png' } },
                isStatic: true,
            }),
            Body.create({
                parts: [
                    Bodies.rectangle(position.name1.x - 125, position.name1.y + 37, 69, 38),
                    Bodies.rectangle(position.name1.x - 98, position.name1.y - 6, 12, 100),
                ],
                isStatic: true,
                render: collisionRender
            }),
            Bodies.circle(position.name1.x - 37, position.name1.y + 16, 40, { isStatic: true, render: collisionRender }),
            Bodies.rectangle(position.name1.x + 50, position.name1.y + 16, 61, 78, { isStatic: true, render: collisionRender }),
            Bodies.rectangle(position.name1.x + 130, position.name1.y + 16, 61, 78, { isStatic: true, render: collisionRender }),
        ]
    });
    var name2 = Composite.create({
        bodies: [
            Bodies.rectangle(position.name2.x, position.name2.y, 1, 1, {
                render: { sprite: { texture: 'img/name2.png' } },
                isStatic: true,
            }),
            Body.create({
                parts: [
                    Bodies.rectangle(position.name2.x - 330, position.name2.y, 30, 115),
                    Bodies.circle(position.name2.x - 303, position.name2.y - 12, 43)
                ],
                isStatic: true,
                render: collisionRender
            }),
            Bodies.circle(position.name2.x - 203, position.name2.y + 15, 39, { isStatic: true, render: collisionRender }),
            Bodies.rectangle(position.name2.x - 111, position.name2.y, 75, 113, { isStatic: true, render: collisionRender }),
            Bodies.rectangle(position.name2.x - 33, position.name2.y + 16, 46, 78, { isStatic: true, render: collisionRender }),
            Bodies.circle(position.name2.x + 35, position.name2.y + 15, 39, { isStatic: true, render: collisionRender }),
            Bodies.rectangle(position.name2.x + 98, position.name2.y + 2, 13, 110, { isStatic: true, render: collisionRender }),
            Body.create({
                parts: [
                    Bodies.rectangle(position.name2.x + 145, position.name2.y + 18, 46, 76),
                    Bodies.rectangle(position.name2.x + 141, position.name2.y - 28, 12, 40)
                ],
                isStatic: true,
                render: collisionRender
            }),
            Bodies.circle(position.name2.x + 225, position.name2.y + 16, 40, { isStatic: true, render: collisionRender }),
            Bodies.circle(position.name2.x + 313, position.name2.y + 13, 38, { isStatic: true, render: collisionRender }),
        ]
    });
    var name3 = Bodies.rectangle(position.name3.x, position.name3.y, 1, 1, {
        isStatic: true,
        render: { sprite: { texture: 'img/name3.png' } }
    });

    var particles = [];
    setInterval(function () {
        if (!document.hidden) {
            var iconNum = Math.floor(Math.random() * 20);
            // try loading image
            loadImage(
                'img/icons/' + iconNum + '.png',
                function (src) {
                    var particle = Bodies.circle(canvas.width * Math.random() - (canvas.width / 2), -(canvas.height * .7), 50, {
                        restitution: 1,
                        sleepThreshold: 10,
                        render: { sprite: { texture: src } }
                    });
                    particle.jumps = 0;
                    particles.push(particle);
                    Events.on(particle, 'sleepStart', function () {
                        particle.jumps++;
                        Sleeping.set(particle, false)
                        Body.applyForce(particle, particle.position, {
                            x: Math.random() - .5,
                            y: -.5,
                        });
                    });
                    World.add(engine.world, particle);
                }
            );
        }
    }, 500);

    Events.on(engine, 'beforeUpdate', function () {
        for (var i = 0; i < particles.length; i++) {
            if (particles[i].position.y > canvas.height * .6 || particles[i].jumps > 5) {
                World.remove(engine.world, particles.splice(i, 1)[0]);
                i--;
            }
        }
    });

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    World.add(engine.world, [name1, name2, name3]);
    Engine.run(engine);
    Render.run(render);
}

function loadImage(src, onSuccess, onError) {
    const img = new Image();
    img.onload = function () { onSuccess(img.src) };
    img.onerror = onError;
    img.src = src;
};