const timer = document.getElementById('timer');

const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

// Audio unlock helper for Mobile WebKit & Chrome
let audioUnlocked = false;
function triggerAudio() {
  const music = document.getElementById('background-music');
  if (music && !audioUnlocked) {
    music.play().then(() => {
      audioUnlocked = true;
    }).catch(() => {});
  }
}

let countDown = new Date('Oct 22, 2025 00:00:00').getTime(),
  x = setInterval(function () {
    let now = new Date().getTime(),
      distance = countDown - now;

    const daysElem = document.getElementById('days');
    const hoursElem = document.getElementById('hours');
    const minutesElem = document.getElementById('minutes');
    const secondsElem = document.getElementById('seconds');

    if (daysElem) daysElem.innerText = Math.floor(distance / day);
    if (hoursElem) hoursElem.innerText = Math.floor((distance % day) / hour);
    if (minutesElem) minutesElem.innerText = Math.floor((distance % hour) / minute);
    if (secondsElem) secondsElem.innerText = Math.floor((distance % minute) / second);

    if (distance < 0) {
      if (timer) timer.classList.add('d-none');
      confetti();
      clearInterval(x);
      _slideSatu();
    }
  }, second);

let tapHandler = null;

function showTap(onTapCallback) {
  const tap = document.getElementById('tap');
  if (!tap) return;

  if (tapHandler) {
    document.body.removeEventListener('click', tapHandler);
  }

  tap.classList.remove('d-none');

  tapHandler = function () {
    triggerAudio(); // Direct user-gesture triggers audio reliably on mobile
    tap.classList.add('d-none');
    document.body.removeEventListener('click', tapHandler);
    tapHandler = null;
    onTapCallback();
  };

  setTimeout(() => {
    document.body.addEventListener('click', tapHandler);
  }, 100);
}

// Ensure all images, fonts, and assets are fully loaded before allowing continuation
// Ensure all images, fonts, and assets are fully loaded before allowing continuation
function waitForAllAssets(callback) {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.remove('d-none'); // Show loading text
  }

  const checkFonts = document.fonts ? document.fonts.ready : Promise.resolve();
  const checkWindow = new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve, { once: true });
    }
  });

  Promise.all([checkFonts, checkWindow]).then(() => {
    const music = document.getElementById('background-music');

    function onReady() {
      if (loader) {
        loader.classList.add('d-none'); // Hide loading text
      }
      callback();
    }

    if (music && music.readyState < 4) {
      music.addEventListener('canplaythrough', onReady, { once: true });
      setTimeout(onReady, 3500); // Safety fallback so user is never stuck
    } else {
      onReady();
    }
  });
}

const _slideSatu = function () {
  const slideSatu = document.getElementById('slideSatu');
  if (slideSatu) {
    slideSatu.className = 'animate__animated animate__slideInDown animate__slow';
  }

  waitForAllAssets(() => {
    showTap(_slideDua);
  });
};

const _slideDua = function () {
  const slideSatu = document.getElementById('slideSatu');
  const slideDua = document.getElementById('slideDua');

  if (slideSatu) {
    slideSatu.classList.replace('animate__slideInDown', 'animate__backOutDown');
    setTimeout(function () {
      slideSatu.classList.add('d-none');
    }, 800);
  }

  if (slideDua) {
    slideDua.className = 'slides paper animate__animated animate__slow animate__zoomInDown';
    const teks1 = document.getElementById('teks1');
    if (teks1) teks1.innerHTML = '';
  }

  // @ts-ignore
  new TypeIt('#teks1', {
    strings: [
      'Hey Joy',
      ' ',
      'FYI, Im just overdoing this to make my surprise way better than waking up at 12am.',
      ' ',
      'In other words usingizi yangu haiwezi acha nitume HBD usiku and theres a chance I might forget',
      ' ',
      'Anyways',
      ' ',
      'Baby G sasa amefikisha 18, huku hatutapumua',
      'Bado we ni mtoto!'
    ],
    startDelay: 500,
    speed: 50,
    waitUntilVisible: true,
    afterComplete: function () {
      showTap(function () {
        if (slideDua) {
          slideDua.classList.replace('animate__zoomInDown', 'animate__fadeOutLeft');
          setTimeout(function () {
            slideDua.classList.add('d-none');
            _slideTiga();
          }, 800);
        }
      });
    }
  }).go();
};

const _slideTiga = function () {
  const slideTiga = document.getElementById('slideTiga');
  if (slideTiga) {
    slideTiga.className = 'slides paper animate__animated animate__fadeInRight';
    const teks2 = document.getElementById('teks2');
    if (teks2) teks2.innerHTML = '';
  }

  // @ts-ignore
  new TypeIt('#teks2', {
    strings: [
      'IDK what to say',
      ' ',
      'Advice ambia Mom na Dad wakupee, ju all I know is brainrot... six seven - typical gen z.',
      ' ',
      '- Have a HAPPYBIRTHDAY',
      ' ',
      'May God shower you with blessings coz youll really need them now that youre an "adult". - in quotes',
      ' ',
      'From your very intelligent, humble, handsome and beautiful brother.',
      'Excactly your words, not mine'
    ],
    startDelay: 500,
    speed: 50,
    waitUntilVisible: true,
    afterComplete: function () {
      showTap(function () {
        if (slideTiga) {
          slideTiga.classList.replace('animate__fadeInRight', 'animate__fadeOut');
          setTimeout(function () {
            slideTiga.classList.add('d-none');
            _slideEmpat();
          }, 800);
        }
      });
    }
  }).go();
};

function getRandomPosition(element) {
  var y = document.body.offsetWidth - element.clientWidth;
  var randomX = Math.floor(Math.random() * 300);
  var randomY = Math.floor(Math.random() * y);
  return [randomX, randomY];
}

const _slideEmpat = function () {
  const slideEmpat = document.getElementById('slideEmpat');
  const btn = document.getElementsByTagName('button');
  if (slideEmpat) {
    slideEmpat.style.top = '300px';
    slideEmpat.className = 'kotak slides animate__animated animate__fadeInDown';
  }

  if (btn[0]) {
    btn[0].onclick = function () {
      if (slideEmpat) {
        var xy = getRandomPosition(slideEmpat);
        slideEmpat.style.top = xy[0] + 'px';
      }
    };
  }

  if (btn[1]) {
    btn[1].onclick = function () {
      if (slideEmpat) {
        slideEmpat.classList.replace('animate__fadeInDown', 'animate__bounceOut');
        setTimeout(function () {
          slideEmpat.classList.add('d-none');
          setTimeout(() => {
            _slideLima();
          }, 400);
        }, 800);
      }
    };
  }
};

const _slideLima = function () {
  const slideLima = document.getElementById('slideLima');
  const restartContainer = document.getElementById('restartContainer');
  const btnRestart = document.getElementById('btnRestart');
  const trims = document.getElementById('trims');

  if (trims) trims.innerHTML = '';
  if (restartContainer) {
    restartContainer.className = 'd-none mt-3';
  }

  if (slideLima) {
    slideLima.className = 'animate__animated animate__slow animate__bounceIn';
  }

  // @ts-ignore
  new TypeIt('#trims', {
    strings: ['The part where you say Awwww!'],
    startDelay: 800,
    speed: 120,
    loop: false,
    waitUntilVisible: true,
    afterComplete: function () {
      if (restartContainer) {
        restartContainer.classList.remove('d-none');
        restartContainer.classList.add('animate__animated', 'animate__fadeIn');
      }
    }
  }).go();

  if (btnRestart) {
    btnRestart.onclick = function (e) {
      e.stopPropagation();
      resetToBeginning();
    };
  }
};

function resetToBeginning() {
  const slideLima = document.getElementById('slideLima');
  const tap = document.getElementById('tap');

  if (tapHandler) {
    document.body.removeEventListener('click', tapHandler);
    tapHandler = null;
  }

  if (tap) tap.classList.add('d-none');

  if (slideLima) {
    slideLima.classList.replace('animate__bounceIn', 'animate__fadeOut');
    setTimeout(() => {
      slideLima.className = 'd-none animate__animated animate__slow';
      confetti();
      _slideSatu();
    }, 600);
  }
}

'use strict';

var onlyOnKonami = false;

function confetti() {
  // @ts-ignore
  var $window = $(window),
    random = Math.random,
    cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI,
    PI2 = PI * 2,
    timer = undefined,
    frame = undefined,
    confettiArr = [];

  var runFor = 2000;
  var isRunning = true;

  setTimeout(() => {
    isRunning = false;
  }, runFor);

  var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    pointer = 0;

  var particles = 150,
    spread = 20,
    sizeMin = 5,
    sizeMax = 12 - sizeMin,
    eccentricity = 10,
    deviation = 100,
    dxThetaMin = -0.1,
    dxThetaMax = -dxThetaMin - dxThetaMin,
    dyMin = 0.13,
    dyMax = 0.18,
    dThetaMin = 0.4,
    dThetaMax = 0.7 - dThetaMin;

  var colorThemes = [
    function () {
      return color(200 * random() | 0, 200 * random() | 0, 200 * random() | 0);
    },
    function () {
      var black = 200 * random() | 0;
      return color(200, black, black);
    },
    function () {
      var black = 200 * random() | 0;
      return color(black, 200, black);
    },
    function () {
      var black = 200 * random() | 0;
      return color(black, black, 200);
    },
    function () {
      return color(200, 100, 200 * random() | 0);
    },
    function () {
      return color(200 * random() | 0, 200, 200);
    },
    function () {
      var black = 256 * random() | 0;
      return color(black, black, black);
    },
    function () {
      return colorThemes[random() < 0.5 ? 1 : 2]();
    },
    function () {
      return colorThemes[random() < 0.5 ? 3 : 5]();
    },
    function () {
      return colorThemes[random() < 0.5 ? 2 : 4]();
    }
  ];

  function color(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function interpolation(a, b, t) {
    return ((1 - cos(PI * t)) / 2) * (b - a) + a;
  }

  var radius = 1 / eccentricity,
    radius2 = radius + radius;

  function createPoisson() {
    var domain = [radius, 1 - radius],
      measure = 1 - radius2,
      spline = [0, 1];
    while (measure) {
      var dart = measure * random(),
        i,
        l,
        interval,
        a,
        b,
        c,
        d;

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        a = domain[i];
        b = domain[i + 1];
        interval = b - a;
        if (dart < measure + interval) {
          spline.push((dart += a - measure));
          break;
        }
        measure += interval;
      }
      c = dart - radius;
      d = dart + radius;

      for (i = domain.length - 1; i > 0; i -= 2) {
        l = i - 1;
        a = domain[l];
        b = domain[i];
        if (a >= c && a < d) {
          if (b > d) domain[l] = d;
          else domain.splice(l, 2);
        } else if (a < c && b > c) {
          if (b <= d) domain[i] = c;
          else domain.splice(i, 0, c, d);
        }
      }

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i + 1] - domain[i];
    }

    return spline.sort();
  }

  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '0';
  container.style.overflow = 'visible';
  container.style.zIndex = '9999';

  class Confetto {
    constructor(theme) {
      this.frame = 0;
      this.outer = document.createElement('div');
      this.inner = document.createElement('div');
      this.outer.appendChild(this.inner);

      var outerStyle = this.outer.style,
        innerStyle = this.inner.style;
      outerStyle.position = 'absolute';
      outerStyle.width = sizeMin + sizeMax * random() + 'px';
      outerStyle.height = sizeMin + sizeMax * random() + 'px';
      innerStyle.width = '100%';
      innerStyle.height = '100%';
      innerStyle.backgroundColor = theme();

      outerStyle.perspective = '50px';
      outerStyle.transform = 'rotate(' + 360 * random() + 'deg)';
      this.axis = 'rotate3D(' + cos(360 * random()) + ',' + cos(360 * random()) + ',0,';
      this.theta = 360 * random();
      this.dTheta = dThetaMin + dThetaMax * random();
      innerStyle.transform = this.axis + this.theta + 'deg)';

      this.x = $window.width() * random();
      this.y = -deviation;
      this.dx = sin(dxThetaMin + dxThetaMax * random());
      this.dy = dyMin + dyMax * random();
      outerStyle.left = this.x + 'px';
      outerStyle.top = this.y + 'px';

      this.splineX = createPoisson();
      this.splineY = [];
      for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
        this.splineY[i] = deviation * random();
      this.splineY[0] = this.splineY[l] = deviation * random();

      this.update = function (height, delta) {
        this.frame += delta;
        this.x += this.dx * delta;
        this.y += this.dy * delta;
        this.theta += this.dTheta * delta;

        var phi = ((this.frame % 7777) / 7777),
          i = 0,
          j = 1;
        while (phi >= this.splineX[j]) i = j++;
        var rho = interpolation(
          this.splineY[i],
          this.splineY[j],
          (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
        );
        phi *= PI2;

        outerStyle.left = this.x + rho * cos(phi) + 'px';
        outerStyle.top = this.y + rho * sin(phi) + 'px';
        innerStyle.transform = this.axis + this.theta + 'deg)';
        return this.y > height + deviation;
      };
    }
  }

  function poof() {
    if (!frame) {
      document.body.appendChild(container);

      var theme = colorThemes[onlyOnKonami ? (colorThemes.length * random()) | 0 : 0],
        count = 0;

      (function addConfetto() {
        if (onlyOnKonami && ++count > particles) return (timer = undefined);

        if (isRunning) {
          var confetto = new Confetto(theme);
          confettiArr.push(confetto);

          container.appendChild(confetto.outer);
          timer = setTimeout(addConfetto, spread * random());
        }
      })(0);

      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = $window.height();

        for (var i = confettiArr.length - 1; i >= 0; --i) {
          if (confettiArr[i].update(height, delta)) {
            container.removeChild(confettiArr[i].outer);
            confettiArr.splice(i, 1);
          }
        }

        if (timer || confettiArr.length) return (frame = requestAnimationFrame(loop));

        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  $window.keydown(function (event) {
    pointer =
      konami[pointer] === event.which
        ? pointer + 1
        : +(event.which === konami[0]);
    if (pointer === konami.length) {
      pointer = 0;
      poof();
    }
  });

  if (!onlyOnKonami) poof();
}
