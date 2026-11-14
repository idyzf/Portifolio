(() => {
    'use strict';

    /* ==========================================================
       ✎ EDIT YOUR CONTENT HERE
       ========================================================== */

    // themes: cream | blush | brick | pink
    const SKILLS = [
        { title: 'Biotechnology', sub: 'Where it all started: biology as a technology.', tools: 'molecular biology · lab workflows', level: 5, glyph: 'Bio', icon: 'fa-solid fa-flask', theme: 'cream' },
        { title: 'Front-end', sub: 'Interfaces people actually enjoy using.', tools: 'HTML · CSS · JavaScript · Figma', level: 4, glyph: '</>', icon: 'fa-brands fa-figma', theme: 'blush' },
        { title: 'Bioinformatics', sub: 'From raw sequences to biological insight.', tools: 'sequence analysis · NGS · pipelines', level: 5, glyph: 'NGS', icon: 'fa-solid fa-laptop-code', theme: 'brick' },
        { title: 'Back-end', sub: 'Services and data behind the screen.', tools: 'Python · Docker · MongoDB', level: 3, glyph: 'API', icon: 'fa-solid fa-server', theme: 'pink' },
        { title: 'Genomics', sub: 'Reading the code of life, at scale.', tools: 'sequencing · genomics software', level: 5, glyph: 'DNA', icon: 'fa-solid fa-dna', theme: 'cream' },
        { title: 'Data Analysis', sub: 'Turning messy tables into clear stories.', tools: 'R · Python · SQL · machine learning', level: 4, glyph: 'Σ', icon: 'fa-solid fa-magnifying-glass-chart', theme: 'blush' },
        { title: 'Scripting & Structure', sub: 'Shell, servers and version control.', tools: 'Linux · Git · HPC', level: 4, glyph: '$_', icon: 'fa-solid fa-terminal', theme: 'brick' },
        { title: 'AI', sub: 'Putting language models to work, with purpose.', tools: 'open-source models · prompt engineering · building agents', level: 3, glyph: 'AI', icon: 'fa-solid fa-robot', theme: 'pink' },
    ];

    // img: optional screenshot path; without it a collage cover is drawn (color + glyph)
    // link: a project page (projects/…html) or an external site (opens in a new tab)
    // linkLabel: optional button text; note: optional small line shown when there's no link
    const PROJECTS = [
        {
            title: 'Genomics Software Survey', short: 'Genomic Survey',
            desc: 'An interactive, anonymous survey platform on genomics software engineering — with team scoring, a 3D DNA visualisation, a live ranking and automatic notifications.',
            tags: ['React', 'Three.js', 'Framer Motion'], link: 'https://idyzf.github.io/GS_Survey/', linkLabel: 'visit the site ↗',
            color: '#9B2C1F', glyph: 'GS',
        },
        {
            title: 'AI Agents', short: 'AI Agents',
            desc: 'A Discord bot backed by a self-hosted language model: a Qwen model served by Ollama, wrapped in a Qwen-Agent assistant and shipped with Docker.',
            tags: ['Python', 'Qwen-Agent', 'Ollama', 'Docker'], link: 'projects/ai-agents.html',
            color: '#2C0B13', glyph: 'AI',
        },
        {
            title: 'AtlasLife', short: 'AtlasLife',
            desc: 'An interactive genomics website: scroll to turn a 3D DNA helix and stop at short lessons on how DNA is built, copied, read and changed.',
            tags: ['JavaScript', 'Three.js', 'Genomics'], link: 'projects/atlaslife.html',
            color: '#5A1828', glyph: 'DNA',
        },
        {
            title: 'Machine Learning applied to Digital Pathology', short: 'Digital Pathology ML',
            desc: 'A Python and R-based machine learning pipeline that segments cells in digital pathology images and predicts quantitative and qualitative immunohistochemistry (IHC) results.',
            tags: ['Reticulate', 'Python', 'EBImage'], link: 'projects/digital-pathology.html',
            img: 'Project1.png', color: '#9B2C1F', glyph: 'ML',
        },
        {
            title: 'Gene Expression by Neural-Network Analysis', short: 'Gene Expression NN',
            desc: 'An R pipeline that builds gene co-expression networks (WGCNA) to uncover regulatory patterns, highlight functional gene modules and connect them to phenotypes.',
            tags: ['R', 'WGCNA', 'NGS'], link: 'projects/gene-expression.html',
            img: 'Project2.png', color: '#5A1828', glyph: 'NN',
        },
        {
            title: 'Sample Sheet Assistant', short: 'Sample Sheet Assistant',
            desc: 'A full-stack web application that automates the creation of NGS sequencing sample sheets, with real-time guidance on index orientation, color balance and sample configuration for error-free sequencing runs.',
            tags: ['Python', 'Django', 'Docker'], link: 'projects/sample-sheet.html',
            img: 'Project3.png', color: '#2C0B13', glyph: 'SS',
        },
    ];
    const isExternal = url => /^https?:\/\//.test(url || '');

    /* ========================================================== */

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const pad = n => String(n).padStart(2, '0');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    function rng(seed) {
        let s = Math.floor(seed) % 2147483647;
        if (s <= 0) s += 2147483646;
        return () => (s = s * 16807 % 2147483647, (s - 1) / 2147483646);
    }

    $('#year').textContent = new Date().getFullYear();

    /* ---------- torn paper edges ---------- */
    function tear(el, seed) {
        const r = rng(seed);
        const pts = [];
        if (el.dataset.torn === 'all') {
            const j = () => (r() * 1.4).toFixed(2);
            for (let x = 0; x < 100; x += 2 + r() * 4) pts.push(`${x.toFixed(1)}% ${j()}%`);
            for (let y = 0; y < 100; y += 2 + r() * 4) pts.push(`${(100 - r() * 1.4).toFixed(2)}% ${y.toFixed(1)}%`);
            for (let x = 100; x > 0; x -= 2 + r() * 4) pts.push(`${x.toFixed(1)}% ${(100 - r() * 1.4).toFixed(2)}%`);
            for (let y = 100; y > 0; y -= 2 + r() * 4) pts.push(`${j()}% ${y.toFixed(1)}%`);
        } else {
            for (let x = 0; x <= 100; x += .7 + r() * 2.2) pts.push(`${x.toFixed(2)}% ${(18 + r() * 62).toFixed(1)}%`);
            pts.push('100% 40%', '100% 100%', '0% 100%');
        }
        el.style.clipPath = `polygon(${pts.join(',')})`;
    }
    $$('.tear, [data-torn]').forEach((el, i) => tear(el, +el.dataset.seed || (i + 1) * 97));

    /* ---------- barcodes & qr ---------- */
    function barcode(el, seed, vertical) {
        const r = rng(seed);
        let html = '';
        for (let i = 0; i < 46; i++) {
            const w = 1 + Math.floor(r() * 3), g = 1 + Math.floor(r() * 3);
            html += vertical
                ? `<i style="height:${w}px;margin-bottom:${g}px"></i>`
                : `<i style="width:${w}px;margin-right:${g}px"></i>`;
        }
        el.innerHTML = html;
    }
    $$('.badge .barcode').forEach(el => barcode(el, +el.dataset.seed || 3, false));

    $$('.qr').forEach(el => {
        const r = rng(+el.dataset.seed || 9);
        let html = '';
        for (let y = 0; y < 9; y++) for (let x = 0; x < 9; x++) {
            const corner = (x < 3 && y < 3) || (x > 5 && y < 3) || (x < 3 && y > 5);
            const ring = corner && !((x % 6 === 1) && (y % 6 === 1));
            const on = corner ? ring || ((x % 6 === 1) && (y % 6 === 1)) : r() > .5;
            html += `<i class="${on ? '' : 'o'}"></i>`;
        }
        el.innerHTML = html;
    });

    /* ---------- cut-out letters on the name ---------- */
    const chips = [['#5A1828', '#F4ECE2'], ['#EBCFCB', '#9B2C1F'], ['#FBF7F1', '#9B2C1F'], ['#2C0B13', '#EBCFCB'], ['#9B2C1F', '#F3D6D3']];
    $$('[data-split]').forEach(line => {
        const text = line.textContent.trim();
        line.textContent = '';
        [...text].forEach(c => {
            const s = document.createElement('span');
            s.className = 'ch';
            s.textContent = c;
            s.setAttribute('aria-hidden', 'true');
            s.addEventListener('pointerenter', () => {
                const [bg, ink] = chips[Math.floor(Math.random() * chips.length)];
                s.style.setProperty('--chip', bg);
                s.style.setProperty('--chip-ink', ink);
                s.style.setProperty('--rot', `${(Math.random() * 18 - 9).toFixed(1)}deg`);
                s.style.setProperty('--ty', `${(-Math.random() * 14).toFixed(1)}px`);
                s.classList.add('cut');
                clearTimeout(s._t);
                s._t = setTimeout(() => s.classList.remove('cut'), 1800);
            });
            line.appendChild(s);
        });
    });

    /* ---------- reveal on scroll ---------- */
    const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .15 });
    $$('.reveal').forEach(el => io.observe(el));

    /* ==========================================================
       lanyard + 3D badge
       ========================================================== */
    const badge = (() => {
        const zone = $('.lanyard-zone'), svg = $('#lanyard');
        const paths = [$('#strapPathL'), $('#strapPathR')];
        const anchors = $$('.photo-anchor'), frame = $('.photo-frame'), B = $('.badge-anchor');
        const card = $('.badge'), stage = $('.badge-stage');
        const s = { x: 0, y: 0, vx: 0, vy: 0, rz: 0, rx: 0, ry: 0, tx: 0, ty: 0, flip: 0, flipT: 0, drag: false, moved: false, px: 0, py: 0, sx: 0, sy: 0 };

        const flip = () => { s.flipT = s.flipT ? 0 : 180; s.vx += 5; };

        card.addEventListener('pointerdown', e => {
            s.drag = true; s.moved = false;
            s.px = e.clientX; s.py = e.clientY; s.sx = s.x; s.sy = s.y;
            card.setPointerCapture(e.pointerId);
            card.classList.add('grabbing');
            start();
        });
        card.addEventListener('pointermove', e => {
            if (!s.drag) return;
            const dx = e.clientX - s.px, dy = e.clientY - s.py;
            if (Math.abs(dx) + Math.abs(dy) > 6) s.moved = true;
            const nx = clamp(s.sx + dx, -170, 170), ny = clamp(s.sy + dy, -30, 140);
            s.vx = nx - s.x; s.vy = ny - s.y; s.x = nx; s.y = ny;
        });
        const release = flipIfClick => {
            if (!s.drag) return;
            s.drag = false;
            card.classList.remove('grabbing');
            if (flipIfClick && !s.moved) flip();
        };
        card.addEventListener('pointerup', () => release(true));
        card.addEventListener('pointercancel', () => release(false));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); start(); }
        });

        stage.addEventListener('pointermove', e => {
            if (s.drag || e.pointerType === 'touch') return;
            const r = card.getBoundingClientRect();
            const mx = clamp((e.clientX - r.left) / r.width, -.5, 1.5);
            const my = clamp((e.clientY - r.top) / r.height, -.5, 1.5);
            s.ty = clamp((mx - .5) * 40, -26, 26);
            s.tx = clamp(-(my - .5) * 28, -18, 18);
            card.style.setProperty('--gx', `${(mx * 100).toFixed(1)}%`);
            card.style.setProperty('--gy', `${(my * 100).toFixed(1)}%`);
            s.vx += clamp(e.movementX || 0, -30, 30) * .012;
        });
        stage.addEventListener('pointerleave', () => { s.tx = 0; s.ty = 0; });

        let lastY = scrollY;
        addEventListener('scroll', () => {
            const d = clamp(scrollY - lastY, -60, 60);
            lastY = scrollY;
            if (!reduce) { s.vx += d * .02; s.vy += Math.abs(d) * .01; }
        }, { passive: true });

        // the two lanyard straps in the photo, in photo pixels (keep in sync with .photo-straps in index.html)
        const PHOTO = { w: 899, h: 1599, strap: 72 };
        const STRAPS = [[[298, 1000], [352, 1620]], [[512, 960], [391, 1620]]];
        const dirs = STRAPS.map(([p, q]) => { const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy); return [dx / l, dy / l]; });

        // put an anchor where each strap leaves the bottom of the (object-fit: cover) photo
        function placeAnchors() {
            const w = frame.clientWidth, h = frame.clientHeight;
            if (!w || !h) return;
            const sc = Math.max(w / PHOTO.w, h / PHOTO.h);
            const vw = w / sc, vh = h / sc, x0 = (PHOTO.w - vw) / 2, yb = (PHOTO.h - vh) / 2 + vh;
            STRAPS.forEach(([p, q], i) => {
                const x = p[0] + (yb - p[1]) / (q[1] - p[1]) * (q[0] - p[0]);
                anchors[i].style.left = `${((x - x0) / vw * 100).toFixed(2)}%`;
            });
            svg.style.setProperty('--strap-w', `${(PHOTO.strap * sc).toFixed(1)}px`);
        }

        function drawStrap() {
            const z = zone.getBoundingClientRect(), b = B.getBoundingClientRect();
            const bx0 = b.left - z.left + s.x, by = b.top - z.top + s.y;
            const f = v => v.toFixed(1);
            anchors.forEach((an, i) => {
                const a = an.getBoundingClientRect();
                const ax = a.left - z.left, ay = a.top - z.top - 3;
                const bx = bx0 + (i ? 6 : -6);
                const d = Math.max(60, by - ay), k = d * .4;
                const [dx, dy] = dirs[i];
                paths[i].setAttribute('d', `M${f(ax)},${f(ay)} C${f(ax + dx * k)},${f(ay + dy * k)} ${f(bx)},${f(by - d * .45)} ${f(bx)},${f(by)}`);
            });
        }

        let visible = true, raf = 0;
        function tick(t) {
            raf = 0;
            if (!s.drag) {
                s.vx += -s.x * .045;
                s.vy += -s.y * .06;
                if (!reduce) s.vx += Math.sin(t / 1100) * .03;
                s.vx *= .9; s.vy *= .86;
                s.x += s.vx; s.y += s.vy;
            }
            s.rz = lerp(s.rz, clamp(s.vx * 2.2 - s.x * .04, -35, 35), .25);
            s.rx = lerp(s.rx, s.tx + clamp(s.vy * .8, -20, 20), .1);
            s.ry = lerp(s.ry, s.ty, .1);
            s.flip = lerp(s.flip, s.flipT, .12);
            card.style.transform = `translate3d(${s.x.toFixed(2)}px,${s.y.toFixed(2)}px,0) rotateZ(${s.rz.toFixed(2)}deg) rotateX(${s.rx.toFixed(2)}deg) rotateY(${(s.ry + s.flip).toFixed(2)}deg)`;
            drawStrap();
            if (visible) start();
        }
        function start() { if (!raf) raf = requestAnimationFrame(tick); }

        new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) start(); }).observe(zone);
        placeAnchors();
        addEventListener('resize', () => { placeAnchors(); drawStrap(); });
        addEventListener('load', () => { placeAnchors(); drawStrap(); });
        start();
    })();

    /* ==========================================================
       skills · cinema tickets stacking on scroll
       ========================================================== */
    const updateTickets = (() => {
        const sec = $('#skills'), stack = $('#ticketStack');
        const r = rng(11);
        const rows = 'ABCDEFGHJK';
        const tickets = SKILLS.map((sk, i) => {
            const el = document.createElement('article');
            el.className = 'ticket';
            el.dataset.theme = sk.theme || 'cream';
            el.innerHTML = `
                <div class="ticket-body">
                    <div class="t-main">
                        <div class="t-top"><span>IZ cinema club</span><span>admit one</span></div>
                        <h3 class="t-title">${esc(sk.title)}</h3>
                        <p class="t-sub">${esc(sk.sub)}</p>
                        <div class="t-meta">
                            <div><span>screen</span><b>${pad(i + 1)}</b></div>
                            <div><span>row</span><b>${rows[i % rows.length]}</b></div>
                            <div><span>level</span><b>${'●'.repeat(sk.level)}${'○'.repeat(5 - sk.level)}</b></div>
                        </div>
                        <p class="t-tools">${esc(sk.tools)}</p>
                    </div>
                    <div class="t-art" aria-hidden="true">
                        <span class="t-strip">now showing</span>
                        <i class="${esc(sk.icon)} t-icon"></i>
                        <span class="t-glyph">${esc(sk.glyph)}</span>
                    </div>
                    <div class="t-stub" aria-hidden="true">
                        <span class="t-stub-num">${pad(i + 1)}</span>
                        <div class="barcode v"></div>
                        <span class="t-serial">151 1500 01${i}5 1515</span>
                    </div>
                    <span class="ticket-shade"></span>
                </div>`;
            stack.appendChild(el);
            barcode($('.barcode', el), 100 + i * 13, true);
            return { el, base: r() * 7 - 3.5, swing: i % 2 ? 9 : -9 };
        });

        const n = tickets.length;
        const now = $('#ticketNow'), bar = $('#ticketBar');
        $('#ticketTotal').textContent = pad(n);
        sec.style.height = `calc(100svh + ${(n - 1) * 70}vh)`;

        return () => {
            const rect = sec.getBoundingClientRect();
            const total = sec.offsetHeight - innerHeight;
            if (rect.bottom < -50 || rect.top > innerHeight + 50) return;
            const p = clamp(-rect.top / total, 0, 1);
            const s = clamp(p * (n - 1) * 1.08, 0, n - 1);
            tickets.forEach((t, i) => {
                const enter = i === 0 ? 1 : clamp(s - (i - 1), 0, 1);
                const e = easeOut(enter);
                const depth = Math.min(Math.max(0, s - i), 4);
                const y = (1 - e) * innerHeight * 1.05 - depth * 16;
                const rot = t.base + (1 - e) * t.swing;
                const sc = 1 - depth * .04;
                t.el.style.transform = `translate(-50%,-50%) translate3d(0,${y.toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
                t.el.style.setProperty('--shade', (depth * .13).toFixed(3));
                t.el.style.visibility = enter <= 0 || s - i > 5 ? 'hidden' : 'visible';
            });
            now.textContent = pad(Math.round(s) + 1);
            bar.style.width = `${(s / Math.max(1, n - 1)) * 100}%`;
        };
    })();

    /* ==========================================================
       projects · spinning vinyl + polaroids
       ========================================================== */
    const updateVinyl = (() => {
        const sec = $('#projects'), rim = $('#rim'), disc = $('#vinyl');
        const STEP = 45;
        const n = PROJECTS.length;
        const r = rng(42);
        const card = $('#npCard'), list = $('#tracklist');
        let theta = 0, spin = 0, active = -1;

        const polaroids = PROJECTS.map((p, i) => {
            const el = document.createElement('a');
            el.className = 'polaroid';
            if (p.link) {
                el.href = p.link;
                if (isExternal(p.link)) { el.target = '_blank'; el.rel = 'noopener'; }
            } else { el.tabIndex = 0; el.setAttribute('role', 'button'); }
            el.setAttribute('aria-label', p.title);
            el.style.setProperty('--a', `${i * STEP}deg`);
            el.style.setProperty('--tilt', `${(r() * 8 - 4).toFixed(1)}deg`);
            el.innerHTML = `
                <div class="pol-inner">
                    <div class="pol-photo" style="--pc:${esc(p.color || '#9B2C1F')}">
                        <span class="pol-glyph">${esc(p.glyph || p.title[0])}</span>
                        ${p.img ? `<img src="${esc(p.img)}" alt="" loading="lazy" onerror="this.remove()">` : ''}
                    </div>
                    <p class="pol-cap">${esc(p.short || p.title)}</p>
                </div>`;
            // first click brings a polaroid to the front, second click opens it (if it has a link)
            el.addEventListener('click', e => { if (i !== active || !p.link) { e.preventDefault(); goTo(i); } });
            rim.appendChild(el);

            const li = document.createElement('li');
            li.innerHTML = `<button type="button"><span>${pad(i + 1)}</span><span>${esc(p.short || p.title)}</span></button>`;
            li.firstElementChild.addEventListener('click', () => goTo(i));
            list.appendChild(li);
            return el;
        });

        sec.style.height = `calc(100svh + ${(n - 1) * 55}vh)`;

        function goTo(i) {
            const total = sec.offsetHeight - innerHeight;
            const top = sec.getBoundingClientRect().top + scrollY;
            scrollTo({ top: top + (n > 1 ? i / (n - 1) : 0) * total + 2, behavior: reduce ? 'auto' : 'smooth' });
        }
        $('#prevTrack').addEventListener('click', () => goTo(Math.max(0, active - 1)));
        $('#nextTrack').addEventListener('click', () => goTo(Math.min(n - 1, active + 1)));

        function setActive(i) {
            if (i === active) return;
            const first = active === -1;
            active = i;
            const p = PROJECTS[i];
            polaroids.forEach((el, k) => el.classList.toggle('is-active', k === i));
            [...list.children].forEach((li, k) => li.classList.toggle('active', k === i));
            $('#npNum').textContent = `track ${pad(i + 1)}`;
            $('#npYear').textContent = p.year ? ` · ${p.year}` : '';
            $('#npTitle').textContent = p.title;
            $('#npDesc').textContent = p.desc || '';
            $('#npTags').innerHTML = (p.tags || []).map(t => `<li>${esc(t)}</li>`).join('');
            const link = $('#npLink'), note = $('#npNote');
            const ext = isExternal(p.link);
            link.href = p.link || '#';
            link.style.display = p.link ? '' : 'none';
            link.textContent = p.linkLabel || (ext ? 'open project ↗' : 'read more →');
            if (ext) { link.target = '_blank'; link.rel = 'noopener'; } else { link.removeAttribute('target'); link.removeAttribute('rel'); }
            note.textContent = p.link ? '' : (p.note || '');
            if (!first && !reduce) { card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap'); }
        }

        function paint() {
            rim.style.setProperty('--theta', `${theta}deg`);
            rim.style.transform = `rotate(${theta}deg)`;
            disc.style.transform = `rotate(${theta + spin}deg)`;
        }

        // the record keeps spinning slowly while the section is on screen
        let visible = false, last = 0;
        function idle(t) {
            if (!visible) return;
            if (last) spin += (t - last) * .018;
            last = t;
            paint();
            requestAnimationFrame(idle);
        }
        new IntersectionObserver(([en]) => {
            visible = en.isIntersecting;
            last = 0;
            if (visible && !reduce) requestAnimationFrame(idle);
        }).observe(sec);

        setActive(0);

        return () => {
            const rect = sec.getBoundingClientRect();
            if (rect.bottom < -50 || rect.top > innerHeight + 50) return;
            const total = sec.offsetHeight - innerHeight;
            const p = clamp(-rect.top / total, 0, 1);
            theta = -p * (n - 1) * STEP;
            setActive(clamp(Math.round(-theta / STEP), 0, n - 1));
            paint();
        };
    })();

    /* ---------- one scroll loop ---------- */
    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { ticking = false; updateTickets(); updateVinyl(); });
    }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    updateTickets();
    updateVinyl();
})();
