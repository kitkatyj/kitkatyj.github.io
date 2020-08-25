/*! starlax.js - Copyright 2020 Kat YJ */
var Starlax = (function () {
    function Starlax(config) {
        var _a, _b, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _t, _u, _v, _w, _x, _y, _z, _0, _1;
        this.ticksPerSecond = 60;
        this.timer = 0;
        this.starfield = [];
        this.config = {};
        var _s = this;
        var target = document.querySelector((_a = config) === null || _a === void 0 ? void 0 : _a.targetCanvas);
        this.config = {
            qtyMultiplier: ((_b = config) === null || _b === void 0 ? void 0 : _b.qtyMultiplier) || 1,
            shape: ((_d = config) === null || _d === void 0 ? void 0 : _d.shape) || 'circle',
            image: config.image,
            fadeIn: (((_e = config) === null || _e === void 0 ? void 0 : _e.fadeIn) == undefined) ? true : (_f = config) === null || _f === void 0 ? void 0 : _f.fadeIn,
            fadeInDuration: ((_g = config) === null || _g === void 0 ? void 0 : _g.fadeInDuration) || 1,
            twinkle: (((_h = config) === null || _h === void 0 ? void 0 : _h.twinkle) == undefined) ? true : (_j = config) === null || _j === void 0 ? void 0 : _j.twinkle,
            twinkleDuration: ((_k = config) === null || _k === void 0 ? void 0 : _k.twinkleDuration) || 2,
            backgroundColor: (_l = config) === null || _l === void 0 ? void 0 : _l.backgroundColor,
            color: ((_m = config) === null || _m === void 0 ? void 0 : _m.color) || '#000',
            size: ((_o = config) === null || _o === void 0 ? void 0 : _o.size) || 5,
            sizeRandom: (0 <= ((_p = config) === null || _p === void 0 ? void 0 : _p.sizeRandom) && ((_q = config) === null || _q === void 0 ? void 0 : _q.sizeRandom) <= 1) ? (_r = config) === null || _r === void 0 ? void 0 : _r.sizeRandom : 0.5,
            zPos: (0 <= ((_t = config) === null || _t === void 0 ? void 0 : _t.sizeRandom)) ? (_u = config) === null || _u === void 0 ? void 0 : _u.zPos : 6,
            zPosRandom: (0 <= ((_v = config) === null || _v === void 0 ? void 0 : _v.zPosRandom) && ((_w = config) === null || _w === void 0 ? void 0 : _w.zPosRandom) <= 1) ? (_x = config) === null || _x === void 0 ? void 0 : _x.zPosRandom : 0.8,
            zPosOpacity: (((_y = config) === null || _y === void 0 ? void 0 : _y.zPosOpacity) == undefined) ? true : (_z = config) === null || _z === void 0 ? void 0 : _z.zPosOpacity,
            invertScroll: (((_0 = config) === null || _0 === void 0 ? void 0 : _0.invertScroll) == undefined) ? false : (_1 = config) === null || _1 === void 0 ? void 0 : _1.invertScroll
        };
        if (target) {
            if (target instanceof HTMLCanvasElement) {
                this.canvas = document.querySelector(config.targetCanvas);
                this.setStarfield();
            }
            else {
                throw new TypeError("Selected element '" + config.targetCanvas + "' is not a canvas.");
            }
        }
        else {
            this.canvas = document.createElement('canvas');
            document.getElementsByTagName('body')[0].appendChild(this.canvas);
            this.canvas.style.position = "fixed";
            this.canvas.style.top = "0";
            this.canvas.style.left = "0";
            this.canvas.style.zIndex = "-1";
            this.sizeReset();
            addEventListener("resize", function () {
                clearTimeout(_s.resizeTimer);
                _s.resizeTimer = setTimeout(function () { _s.sizeReset(); }, 250);
            });
        }
        this.ctx = this.canvas.getContext('2d');
        this.draw();
    }
    Starlax.prototype.sizeReset = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.setStarfield();
    };
    Starlax.prototype.setStarfield = function () {
        this.starfield = [];
        var qty = this.config.qtyMultiplier * Math.floor(this.canvas.width / 75 * this.canvas.height / 75);
        if (typeof this.config.image == "string") {
            this.starImg = new Image();
            this.starImg.src = this.config.image;
        }
        else if (this.config.image instanceof HTMLImageElement) {
            this.starImg = this.config.image;
        }
        for (var i = 0; i < qty; i++) {
            this.starfield.push({
                "twinkleOffset": Math.random() * 2 * Math.PI,
                "posX": Math.round(Math.random() * this.canvas.width),
                "posY": Math.round(Math.random() * this.canvas.height),
                "size": Math.floor(this.config.size - this.config.size * this.config.sizeRandom + Math.random() * this.config.size * this.config.sizeRandom),
                "zIndex": (this.config.zPos - this.config.zPos * this.config.zPosRandom + Math.random() * this.config.zPos * this.config.zPosRandom) + 1,
                "color": (Array.isArray(this.config.color)) ? this.config.color[Math.floor(Math.random() * this.config.color.length)] : this.config.color
            });
        }
    };
    Starlax.prototype.draw = function () {
        var _s = this;
        var _c = this.ctx;
        _c.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.config.backgroundColor) {
            _c.fillStyle = this.config.backgroundColor;
            _c.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.starfield.forEach(function (star) {
            _c.beginPath();
            var fadeOpacity = 1;
            var twinkleOpacity = 1;
            var zPosOpacity = 1;
            if (_s.config.fadeIn && _s.timer < (_s.ticksPerSecond * _s.config.fadeInDuration))
                fadeOpacity = _s.timer / (_s.ticksPerSecond * _s.config.fadeInDuration);
            if (_s.config.twinkle)
                twinkleOpacity = 0.5 + 0.5 * Math.sin((_s.timer / _s.ticksPerSecond / _s.config.twinkleDuration) * 2 * Math.PI + star.twinkleOffset);
            if (_s.config.zPosOpacity)
                zPosOpacity = ((12 - star.zIndex) / 12) * 0.6;
            _c.globalAlpha = fadeOpacity * twinkleOpacity * zPosOpacity;
            var scrollPos = _s.mod((_s.config.invertScroll) ? (star.posY + window.pageYOffset / star.zIndex) : (star.posY - window.pageYOffset / star.zIndex), _s.canvas.height);
            if (_s.starImg) {
                _c.drawImage(_s.starImg, star.posX - star.size / 2, scrollPos - star.size / 2, star.size, star.size);
            }
            else {
                switch (_s.config.shape) {
                    case "square":
                        _c.rect(star.posX, scrollPos, star.size * 2, star.size * 2);
                        break;
                    default:
                        _c.arc(star.posX, scrollPos, star.size, 0, 2 * Math.PI);
                }
                _c.fillStyle = star.color;
                _c.fill();
            }
            _c.globalAlpha = 1;
        });
        this.timer++;
        requestAnimationFrame(function () { _s.draw(); });
    };
    Starlax.prototype.mod = function (n, m) {
        return ((n % m) + m) % m;
    };
    return Starlax;
}());
