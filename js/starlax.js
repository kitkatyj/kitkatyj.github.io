/*! starlax.js - Copyright 2020 Kat YJ */
var Starlax = (function () {
    function Starlax(config) {
        var _a, _b, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        this.timer = 0;
        this.starfield = [];
        this.config = {};
        var _s = this;
        var target = document.querySelector((_a = config) === null || _a === void 0 ? void 0 : _a.targetCanvas);
        this.config = {
            backgroundColor: ((_b = config) === null || _b === void 0 ? void 0 : _b.backgroundColor) || '#000033',
            color: ((_d = config) === null || _d === void 0 ? void 0 : _d.color) || '#ffffff',
            size: ((_e = config) === null || _e === void 0 ? void 0 : _e.size) || 5,
            sizeRandom: (0 <= ((_f = config) === null || _f === void 0 ? void 0 : _f.sizeRandom) && ((_g = config) === null || _g === void 0 ? void 0 : _g.sizeRandom) <= 1) ? (_h = config) === null || _h === void 0 ? void 0 : _h.sizeRandom : 0.5,
            zPos: (0 <= ((_j = config) === null || _j === void 0 ? void 0 : _j.sizeRandom)) ? (_k = config) === null || _k === void 0 ? void 0 : _k.zPos : 6,
            zPosRandom: (0 <= ((_l = config) === null || _l === void 0 ? void 0 : _l.zPosRandom) && ((_m = config) === null || _m === void 0 ? void 0 : _m.zPosRandom) <= 1) ? (_o = config) === null || _o === void 0 ? void 0 : _o.zPosRandom : 0.8
        };
        console.log(this.config);
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
        var qty = Math.floor(this.canvas.width / 75 * this.canvas.height / 75);
        for (var i = 0; i < qty; i++) {
            this.starfield.push({
                "twinkleOffset": Math.random() * 2 * Math.PI,
                "posX": Math.round(Math.random() * this.canvas.width),
                "posY": Math.round(Math.random() * this.canvas.height),
                "size": Math.floor(this.config.size - this.config.size * this.config.sizeRandom + Math.random() * this.config.size * this.config.sizeRandom),
                "zIndex": (this.config.zPos - this.config.zPos * this.config.zPosRandom + Math.random() * this.config.zPos * this.config.zPosRandom) + 1
            });
        }
    };
    Starlax.prototype.draw = function () {
        var _s = this;
        var _c = this.ctx;
        _c.clearRect(0, 0, this.canvas.width, this.canvas.height);
        _c.fillStyle = this.config.backgroundColor;
        _c.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.starfield.forEach(function (star) {
            _c.beginPath();
            _c.arc(star.posX, _s.mod((star.posY - window.pageYOffset / star.zIndex), _s.canvas.height), star.size, 0, 2 * Math.PI);
            _c.globalAlpha = (0.5 + 0.5 * Math.sin((_s.timer + star.twinkleOffset * 20) / 20)) * ((12 - star.zIndex) / 12) * 0.6;
            _c.fillStyle = _s.config.color;
            _c.fill();
            _s.ctx.globalAlpha = 1;
        });
        this.timer++;
        requestAnimationFrame(function () { _s.draw(); });
    };
    Starlax.prototype.mod = function (n, m) {
        return ((n % m) + m) % m;
    };
    return Starlax;
}());
