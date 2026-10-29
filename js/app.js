(() => {
  'use strict';

  if (window.top !== window.self) {
    document.documentElement.replaceChildren();
    return;
  }

  const SITE = window.SITE && typeof window.SITE === 'object' ? window.SITE : {};
  const PROJECTS_LOADED = Array.isArray(window.PROJECTS);
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const PROJECT_HASH = /^#\/(?:project|proje)\/([a-z0-9-]+)\/?$/;
  const MAX_CODE_FILE_BYTES = 512 * 1024;
  const VISIBLE_TAG_COUNT = 6;
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

  const $ = (selector) => document.querySelector(selector);
  const str = (value) => (typeof value === 'string' ? value : typeof value === 'number' ? String(value) : '');
  const list = (value) => (Array.isArray(value) ? value : []);

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (value == null || value === false) continue;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? '' : String(value));
    }
    for (const child of children.flat()) {
      if (child == null || child === false) continue;
      node.append(child instanceof Node ? child : String(child));
    }
    return node;
  }

  function isSameOrigin(url) {
    return url.protocol === window.location.protocol && url.origin === window.location.origin;
  }

  function safeUrl(value, { allowMailto = true, sameOriginOnly = false } = {}) {
    const raw = str(value).trim();
    if (!raw) return null;
    let url;
    try {
      url = new URL(raw, window.location.href);
    } catch {
      return null;
    }
    if (isSameOrigin(url)) return url.href;
    if (sameOriginOnly) return null;
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.href;
    if (allowMailto && url.protocol === 'mailto:') return url.href;
    return null;
  }

  const safeImage = (value) => safeUrl(value, { allowMailto: false, sameOriginOnly: true });

  function linkAttrs(href) {
    const url = new URL(href);
    if (url.protocol === 'mailto:' || isSameOrigin(url)) return {};
    return { target: '_blank', rel: 'noopener noreferrer' };
  }

  function safeColor(value) {
    const raw = str(value).trim();
    return /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(raw) ? raw : null;
  }

  const TR_MAP = { ç: 'c', ğ: 'g', ı: 'i', İ: 'i', ö: 'o', ş: 's', ü: 'u', Ç: 'c', Ğ: 'g', Ö: 'o', Ş: 's', Ü: 'u' };

  function slugify(text) {
    return str(text)
      .replace(/[çğıİöşüÇĞÖŞÜ]/g, (c) => TR_MAP[c])
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80);
  }

  function formatDate(value) {
    const raw = str(value).trim();
    const match = raw.match(/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/);
    if (!match) return raw;
    const [, year, month, day] = match;
    if (!month) return year;
    const date = new Date(Number(year), Number(month) - 1, Number(day || 1));
    const options = day ? { day: 'numeric', month: 'long', year: 'numeric' } : { month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  function dedent(text) {
    const lines = str(text).replace(/\r\n?/g, '\n').split('\n');
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    const indents = lines.filter((line) => line.trim()).map((line) => line.match(/^[ \t]*/)[0].length);
    const indent = indents.length ? Math.min(...indents) : 0;
    return lines.map((line) => line.slice(indent)).join('\n');
  }

  let toastTimer = 0;

  function toast(message) {
    const node = $('#toast');
    node.textContent = message;
    node.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('is-visible'), 2200);
  }

  async function shareLink(url, title) {
    if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast('Link copied');
    } catch {
      toast("Couldn't copy the link");
    }
  }

  const siteUrl = () => window.location.origin + window.location.pathname;

  const ICONS = {
    github: ['M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4', 'M9 18c-4.51 2-5-2-7-2'],
    instagram: ['M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z', 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', 'M17.5 6.5h.01'],
    x: ['M4 4l11.733 16h4.267l-11.733-16z', 'M4 20l6.768-6.768', 'M13.228 10.772L20 4'],
    youtube: ['M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17', 'm10 15 5-3-5-3z'],
    linkedin: ['M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z', 'M2 9h4v12H2z', 'M4 2a2 2 0 1 0 0 4a2 2 0 1 0 0-4z'],
    discord: ['M8 12a1 1 0 1 0 2 0a1 1 0 0 0-2 0', 'M14 12a1 1 0 1 0 2 0a1 1 0 0 0-2 0', 'M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833-1.667 3.5-3c.667-1.667.5-5.833-1.5-11.5c-1.457-1.015-3-1.34-4.5-1.5l-.972 1.923a11.913 11.913 0 0 0-4.053 0l-.975-1.923c-1.5.16-3.043.485-4.5 1.5c-2 5.667-2.167 9.833-1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2-2 2-3', 'M7 16.5c3.5 1 6.5 1 10 0'],
    twitch: ['M21 2H3v16h5v4l4-4h5l4-4V2z', 'M11 11V7', 'M16 11V7'],
    tiktok: ['M21 7.917v4.034a9.948 9.948 0 0 1-5-1.951v4.5a6.5 6.5 0 1 1-8-6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z'],
    spotify: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z', 'M8 11.973c2.5-1.473 5.5-.973 7.5.527', 'M9 15c1.5-1 4-1 5 .5', 'M7 9c2-1 6-2 10 .5'],
    telegram: ['M15 10l-4 4l6 6l4-16l-18 7l4 2l2 6l3-4'],
    mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'],
    globe: ['M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20z', 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20', 'M2 12h20'],
    link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
    code: ['m16 18 6-6-6-6', 'm8 6-6 6 6 6'],
    heart: ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z'],
    file: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
    folder: ['M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z'],
    book: ['M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20'],
    play: ['M6 3l14 9-14 9V3z'],
    gamepad: ['M6 12h4', 'M8 10v4', 'M15 13h.01', 'M18 11h.01', 'M17.32 5H6.68a4 4 0 0 0-3.978 3.59l-.6 6A3 3 0 0 0 5.1 18c1 0 1.78-.68 2.24-1.5l.66-1.5h8l.66 1.5c.46.82 1.24 1.5 2.24 1.5a3 3 0 0 0 2.999-3.41l-.6-6A4 4 0 0 0 17.32 5z'],
    mapPin: ['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z', 'M12 7a3 3 0 1 0 0 6a3 3 0 1 0 0-6z'],
    calendar: ['M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M16 2v4', 'M8 2v4', 'M3 10h18'],
    image: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M9 7a2 2 0 1 0 0 4a2 2 0 1 0 0-4z', 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'],
    tag: ['M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z', 'M7.5 7.5h.01'],
    copy: ['M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z', 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'],
    check: ['M20 6 9 17l-5-5'],
    close: ['M18 6 6 18', 'm6 6 12 12'],
    star: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
    arrowUpRight: ['M7 7h10v10', 'M7 17 17 7'],
    external: ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'],
    chevronLeft: ['m15 18-6-6 6-6'],
    chevronRight: ['m9 18 6-6-6-6'],
    search: ['M11 3a8 8 0 1 0 0 16a8 8 0 1 0 0-16z', 'm21 21-4.3-4.3'],
    share: ['M18 2a3 3 0 1 0 0 6a3 3 0 1 0 0-6z', 'M6 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z', 'M18 16a3 3 0 1 0 0 6a3 3 0 1 0 0-6z', 'm8.59 13.51 6.83 3.98', 'm15.41 6.51-6.82 3.98'],
    info: ['M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20z', 'M12 16v-4', 'M12 8h.01'],
    lightbulb: ['M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5', 'M9 18h6', 'M10 22h4'],
    important: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', 'M12 7v2', 'M12 13h.01'],
    warning: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
    caution: ['M8.69 2h6.62a2 2 0 0 1 1.41.59l4.69 4.69A2 2 0 0 1 22 8.69v6.62a2 2 0 0 1-.59 1.41l-4.69 4.69a2 2 0 0 1-1.41.59H8.69a2 2 0 0 1-1.41-.59l-4.69-4.69A2 2 0 0 1 2 15.31V8.69a2 2 0 0 1 .59-1.41l4.69-4.69A2 2 0 0 1 8.69 2z', 'M12 8v4', 'M12 16h.01'],
  };

  const ICON_ALIASES = { twitter: 'x', email: 'mail', 'e-posta': 'mail', website: 'globe', web: 'globe', site: 'globe', repo: 'book', game: 'gamepad', oyun: 'gamepad' };

  function icon(name, size = 20) {
    const key = ICON_ALIASES[name] || name;
    const paths = ICONS[key] || ICONS.link;
    const svg = document.createElementNS(SVG_NS, 'svg');
    const attrs = {
      class: 'icon', viewBox: '0 0 24 24', width: size, height: size, fill: 'none',
      stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      'aria-hidden': 'true', focusable: 'false',
    };
    for (const [k, v] of Object.entries(attrs)) svg.setAttribute(k, String(v));
    for (const d of paths) {
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', d);
      svg.append(path);
    }
    return svg;
  }

  const PLATFORM_LABELS = {
    github: 'GitHub', instagram: 'Instagram', x: 'X', twitter: 'X', youtube: 'YouTube', linkedin: 'LinkedIn',
    discord: 'Discord', twitch: 'Twitch', tiktok: 'TikTok', spotify: 'Spotify', telegram: 'Telegram',
    mail: 'Email', email: 'Email', website: 'Website', globe: 'Website',
  };

  const HOST_ICONS = [
    [/(^|\.)github\.com$/, 'github'], [/(^|\.)instagram\.com$/, 'instagram'], [/(^|\.)(x|twitter)\.com$/, 'x'],
    [/(^|\.)(youtube\.com|youtu\.be)$/, 'youtube'], [/(^|\.)linkedin\.com$/, 'linkedin'],
    [/(^|\.)(discord\.gg|discord\.com)$/, 'discord'], [/(^|\.)twitch\.tv$/, 'twitch'], [/(^|\.)tiktok\.com$/, 'tiktok'],
    [/(^|\.)spotify\.com$/, 'spotify'], [/(^|\.)(t\.me|telegram\.org)$/, 'telegram'],
  ];

  function guessIcon(href) {
    const url = new URL(href);
    if (url.protocol === 'mailto:') return 'mail';
    if (isSameOrigin(url)) return 'link';
    const hit = HOST_ICONS.find(([re]) => re.test(url.hostname));
    return hit ? hit[1] : 'globe';
  }

  const LANG_COLORS = {
    javascript: '#f1e05a', typescript: '#3178c6', python: '#3572a5', html: '#e34c26', css: '#663399',
    'c#': '#178600', csharp: '#178600', 'c++': '#f34b7d', cpp: '#f34b7d', c: '#555555', java: '#b07219',
    go: '#00add8', rust: '#dea584', php: '#4f5d95', kotlin: '#a97bff', swift: '#f05138', dart: '#00b4ab',
    lua: '#000080', luau: '#00a2ff', shell: '#89e051', bash: '#89e051', powershell: '#012456', ruby: '#701516',
    vue: '#41b883', svelte: '#ff3e00', gdscript: '#355570', sql: '#e38c00', 'jupyter notebook': '#da5b0b',
  };

  const EXT_LANG = {
    js: 'javascript', mjs: 'javascript', cjs: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript',
    py: 'python', rb: 'ruby', sh: 'bash', bash: 'bash', ps1: 'powershell', html: 'html', htm: 'html', xml: 'xml',
    svg: 'xml', css: 'css', scss: 'css', json: 'json', yml: 'yaml', yaml: 'yaml', toml: 'toml', c: 'c', h: 'c',
    cpp: 'cpp', hpp: 'cpp', cc: 'cpp', ino: 'cpp', cs: 'csharp', java: 'java', kt: 'kotlin', go: 'go', rs: 'rust', php: 'php',
    lua: 'lua', luau: 'lua', swift: 'swift', dart: 'dart', sql: 'sql', md: 'markdown', gd: 'gdscript', txt: 'text',
  };

  const LANG_LABELS = {
    javascript: 'JavaScript', typescript: 'TypeScript', python: 'Python', ruby: 'Ruby', bash: 'Bash',
    powershell: 'PowerShell', html: 'HTML', xml: 'XML', css: 'CSS', json: 'JSON', yaml: 'YAML', toml: 'TOML',
    c: 'C', cpp: 'C++', csharp: 'C#', java: 'Java', kotlin: 'Kotlin', go: 'Go', rust: 'Rust', php: 'PHP',
    lua: 'Lua', swift: 'Swift', dart: 'Dart', sql: 'SQL', markdown: 'Markdown', gdscript: 'GDScript', text: 'Text',
  };

  const langColor = (name) => LANG_COLORS[str(name).trim().toLowerCase()] || null;

  function resolveLang(language, filename) {
    const lang = str(language).trim().toLowerCase();
    if (lang) return EXT_LANG[lang] || lang;
    const ext = str(filename).split('.').pop().toLowerCase();
    return EXT_LANG[ext] || 'text';
  }

  const KEYWORDS = new Set((
    'abstract and as assert async await break case catch class const continue def default del delete do elif else ' +
    'end enum except export extends extern false final finally fn for foreach from func function global go goto if ' +
    'impl implements import in include instanceof interface is lambda let local loop match mod module mut namespace ' +
    'new nil none not null or override package pass private protected pub public raise readonly return self sealed ' +
    'static struct super switch then this throw throws trait true try type typeof undefined union unsafe use using ' +
    'var virtual void volatile when where while with yield True False None int float double char bool boolean string ' +
    'long short byte unsigned signed auto elseif require'
  ).split(' '));

  const COMMENT_SYNTAX = {
    hash: String.raw`#[^\n]*`,
    slash: String.raw`\/\/[^\n]*|\/\*[\s\S]*?\*\/`,
    block: String.raw`\/\*[\s\S]*?\*\/`,
    dash: String.raw`--\[\[[\s\S]*?\]\]|--[^\n]*`,
    markup: String.raw`<!--[\s\S]*?-->`,
    none: '(?!)',
  };

  const LANG_COMMENTS = {
    python: 'hash', ruby: 'hash', bash: 'hash', powershell: 'hash', yaml: 'hash', toml: 'hash', gdscript: 'hash',
    css: 'block', sql: 'dash', lua: 'dash', html: 'markup', xml: 'markup', markdown: 'none', json: 'none', text: 'none',
  };

  const MARKUP_LANGS = new Set(['html', 'xml', 'markdown', 'text']);
  const STRING_SYNTAX = String.raw`"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|\x60(?:\\.|[^\x60\\])*\x60`;
  const NUMBER_SYNTAX = String.raw`\b0x[0-9a-fA-F]+\b|\b\d[\d_]*(?:\.\d+)?\b`;
  const regexCache = new Map();

  function tokenRegex(lang) {
    if (!regexCache.has(lang)) {
      const comment = COMMENT_SYNTAX[LANG_COMMENTS[lang] || 'slash'];
      const tag = lang === 'html' || lang === 'xml' ? String.raw`<\/?[A-Za-z][\w:.-]*|\/?>` : '(?!)';
      const source = `(${comment})|(${STRING_SYNTAX})|(${NUMBER_SYNTAX})|(${tag})|([A-Za-z_$][\\w$]*)`;
      regexCache.set(lang, new RegExp(source, 'g'));
    }
    const re = regexCache.get(lang);
    re.lastIndex = 0;
    return re;
  }

  function highlight(code, lang) {
    const frag = document.createDocumentFragment();
    if (code.length > 200000) {
      frag.append(code);
      return frag;
    }
    const re = tokenRegex(lang);
    const plainWords = MARKUP_LANGS.has(lang);
    let last = 0;
    let match;
    while ((match = re.exec(code))) {
      const [text, comment, string, number, tag, word] = match;
      let cls = null;
      if (comment) cls = 'c';
      else if (string) cls = 's';
      else if (number) cls = 'n';
      else if (tag) cls = 'k';
      else if (word && !plainWords) {
        if (KEYWORDS.has(word)) cls = 'k';
        else if (/^\s*\(/.test(code.slice(re.lastIndex, re.lastIndex + 8))) cls = 'f';
        else if (/^[A-Z]/.test(word)) cls = 't';
      }
      if (match.index > last) frag.append(code.slice(last, match.index));
      frag.append(cls ? el('span', { class: `tok-${cls}`, text }) : text);
      last = re.lastIndex;
    }
    frag.append(code.slice(last));
    return frag;
  }

  const IMAGE = String.raw`!\[([^\]]*)\]\(([^)\s]+)\)`;
  const INLINE_RE = new RegExp(String.raw`\[${IMAGE}\]\(([^)\s]+)\)|${IMAGE}|\*\*([^*]+)\*\*|\x60([^\x60]+)\x60|\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s<>()\[\]]*[^\s<>()\[\].,;:!?'"])`, 'g');
  const BLOCK_START = /^(#{1,4}\s|[-*]\s|\d+[.)]\s|>)/;
  const LIST_ITEM = /^(\s*)([-*]|\d+[.)])\s+(.*)$/;
  const TABLE_SEP = /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?$/;

  const ALERTS = {
    note: ['Note', 'info'], tip: ['Tip', 'lightbulb'], important: ['Important', 'important'],
    warning: ['Warning', 'warning'], caution: ['Caution', 'caution'],
  };

  const anchorSlug = (text) => text.replace(/[*`]/g, '').trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');

  function anchorLink(label, url) {
    let raw = url.slice(1);
    try { raw = decodeURIComponent(raw); } catch {}
    const target = anchorSlug(raw);
    return el('a', {
      href: `#${target}`,
      onclick: (e) => {
        e.preventDefault();
        const md = e.currentTarget.closest('.md');
        const heading = md && [...md.querySelectorAll('[data-anchor]')].find((h) => h.dataset.anchor === target);
        if (heading) heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      },
    }, inline(label));
  }

  function mdImage(alt, src) {
    const href = safeImage(src);
    const sized = alt.match(/^(.*?)\s*\|\s*(\d{1,4})$/);
    const text = sized ? sized[1] : alt;
    return href ? el('img', { class: 'md-img', src: href, alt: text, width: sized ? sized[2] : null, loading: 'lazy', decoding: 'async' }) : text;
  }

  function inline(text) {
    const frag = document.createDocumentFragment();
    let last = 0;
    let match;
    const re = new RegExp(INLINE_RE);
    while ((match = re.exec(text))) {
      frag.append(text.slice(last, match.index));
      const [, linkedAlt, linkedSrc, linkedHref, alt, src, bold, code, label, url, bare] = match;
      if (linkedSrc) {
        const href = safeUrl(linkedHref);
        const img = mdImage(linkedAlt, linkedSrc);
        frag.append(href ? el('a', { class: 'md-img-link', href, ...linkAttrs(href) }, img) : img);
      } else if (src) frag.append(mdImage(alt, src));
      else if (bold) frag.append(el('strong', {}, inline(bold)));
      else if (code) frag.append(el('code', { text: code }));
      else if (bare) {
        const href = safeUrl(bare);
        frag.append(href ? el('a', { href, ...linkAttrs(href), text: bare }) : bare);
      } else if (url.startsWith('#')) frag.append(anchorLink(label, url));
      else {
        const href = safeUrl(url);
        frag.append(href ? el('a', { href, ...linkAttrs(href), text: label }) : label);
      }
      last = re.lastIndex;
    }
    frag.append(text.slice(last));
    return frag;
  }

  function parseList(lines, start) {
    const first = lines[start].match(LIST_ITEM);
    const indent = first[1].length;
    const ordered = /\d/.test(first[2]);
    const startAt = ordered ? parseInt(first[2], 10) : 1;
    const listEl = el(ordered ? 'ol' : 'ul', { start: startAt !== 1 ? startAt : null });
    let i = start;
    while (i < lines.length) {
      const m = lines[i].match(LIST_ITEM);
      if (!m || m[1].length < indent) break;
      if (m[1].length > indent) {
        const [sub, next] = parseList(lines, i);
        listEl.lastElementChild.append(sub);
        i = next;
        continue;
      }
      if (/\d/.test(m[2]) !== ordered) break;
      listEl.append(el('li', {}, inline(m[3].trim())));
      i++;
    }
    return [listEl, i];
  }

  const tableCells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());

  function parseTable(lines, start) {
    const head = tableCells(lines[start]);
    const align = tableCells(lines[start + 1]).map((c) => (c.endsWith(':') ? (c.startsWith(':') ? 'is-center' : 'is-right') : null));
    const cell = (tag, text, n) => el(tag, { class: align[n] }, inline(text || ''));
    let i = start + 2;
    const rows = [];
    while (i < lines.length && lines[i].includes('|')) {
      const cells = tableCells(lines[i++]);
      rows.push(el('tr', {}, head.map((_, n) => cell('td', cells[n], n))));
    }
    const table = el('table', {},
      el('thead', {}, el('tr', {}, head.map((text, n) => cell('th', text, n)))),
      el('tbody', {}, rows));
    return [el('div', { class: 'md-table' }, table), i];
  }

  function quote(lines) {
    const alert = lines[0].trim().match(/^\[!(\w+)\]$/);
    const type = alert ? alert[1].toLowerCase() : null;
    const kind = type && ALERTS[type];
    const body = document.createDocumentFragment();
    appendBlocks(body, (kind ? lines.slice(1) : lines).join('\n'));
    if (!kind) return el('blockquote', {}, body);
    return el('div', { class: `md-alert is-${type}`, role: 'note' },
      el('p', { class: 'md-alert-title' }, icon(kind[1], 16), kind[0]), body);
  }

  function appendBlocks(parent, text) {
    for (const block of text.split(/\n\s*\n/)) {
      const lines = block.split('\n').filter((line) => line.trim());
      let i = 0;
      while (i < lines.length) {
        const line = lines[i].trim();
        const heading = line.match(/^(#{1,4})\s+(.*)$/);
        if (heading) {
          const level = heading[1].length;
          parent.append(el(level <= 2 ? 'h3' : 'h4', { class: level === 1 ? 'md-h1' : null, 'data-anchor': anchorSlug(heading[2]) }, inline(heading[2])));
          i++;
          continue;
        }
        if (line.startsWith('>')) {
          const quoted = [];
          while (i < lines.length && lines[i].trim().startsWith('>')) quoted.push(lines[i++].trim().replace(/^>\s?/, ''));
          parent.append(quote(quoted));
          continue;
        }
        if (LIST_ITEM.test(lines[i])) {
          const [listEl, next] = parseList(lines, i);
          parent.append(listEl);
          i = next;
          continue;
        }
        if (line.includes('|') && i + 1 < lines.length && TABLE_SEP.test(lines[i + 1].trim())) {
          const [table, next] = parseTable(lines, i);
          parent.append(table);
          i = next;
          continue;
        }
        const p = el('p', {}, inline(line));
        i++;
        while (i < lines.length && !BLOCK_START.test(lines[i].trim())
          && !(lines[i].includes('|') && i + 1 < lines.length && TABLE_SEP.test(lines[i + 1].trim()))) {
          p.append(/ {2,}$/.test(lines[i - 1]) ? el('br') : ' ', inline(lines[i++].trim()));
        }
        if (!p.textContent.trim() && p.querySelector('img') && !p.querySelector('a')) p.className = 'md-figure';
        parent.append(p);
      }
    }
  }

  const RICH_BLOCK = /(`{3,})[ \t]*([\w+#.-]*)[^\n]*\n([\s\S]*?)\1|^[ \t]*<details>[ \t]*\n[ \t]*<summary>(.*?)<\/summary>[ \t]*\n([\s\S]*?)^[ \t]*<\/details>[ \t]*$|^[ \t]*<div align="center">[ \t]*\n([\s\S]*?)^[ \t]*<\/div>[ \t]*$/gm;

  function smoothDetails(summary, body) {
    const details = el('details', { class: 'md-details' }, summary, body);
    let anim = null;
    let closing = false;

    summary.addEventListener('click', (e) => {
      if (REDUCED_MOTION.matches) return;
      e.preventDefault();
      const opening = !details.open || closing;
      const start = details.offsetHeight;
      if (anim) anim.cancel();
      details.open = true;
      closing = !opening;
      const frame = details.offsetHeight - details.clientHeight;
      const end = opening ? details.offsetHeight : summary.offsetHeight + frame;
      details.style.overflow = 'hidden';
      anim = details.animate({ height: [`${start}px`, `${end}px`] }, { duration: 280, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' });
      body.animate({ opacity: opening ? [0, 1] : [1, 0] }, { duration: 280, easing: 'ease', fill: 'none' });
      anim.onfinish = () => {
        if (closing) details.open = false;
        closing = false;
        details.style.overflow = '';
        anim = null;
      };
    });
    return details;
  }

  function appendRich(parent, source) {
    const re = new RegExp(RICH_BLOCK);
    let last = 0;
    let match;
    while ((match = re.exec(source))) {
      appendBlocks(parent, source.slice(last, match.index));
      const [, , lang, code, summary, details, centered] = match;
      if (summary != null) {
        const body = el('div', { class: 'md-details-body' });
        appendRich(body, dedent(details));
        parent.append(smoothDetails(el('summary', {}, inline(summary.trim())), body));
      } else if (centered != null) {
        const box = el('div', { class: 'md-center' });
        appendRich(box, dedent(centered));
        parent.append(box);
      } else {
        parent.append(el('pre', {}, el('code', {}, highlight(dedent(code), resolveLang(lang)))));
      }
      last = re.lastIndex;
    }
    appendBlocks(parent, source.slice(last));
  }

  function renderRichText(text) {
    const frag = document.createDocumentFragment();
    appendRich(frag, dedent(text));
    return frag;
  }

  function setText(selector, value) {
    const node = $(selector);
    const text = str(value).trim();
    node.textContent = text;
    node.hidden = !text;
  }

  function renderProfile() {
    const name = str(SITE.name).trim() || 'codechain';
    document.title = str(SITE.title).trim() || name;
    $('#name').textContent = name;

    const avatar = $('#avatar');
    const logo = safeImage(SITE.logo);
    if (logo) {
      avatar.src = logo;
      $('#topbar-logo').src = logo;
    }
    avatar.alt = `${name} logo`;
    $('#topbar-name').textContent = name;

    document.querySelectorAll('.share-btn').forEach((btn) => {
      btn.append(icon('share', 17));
      btn.addEventListener('click', () => shareLink(siteUrl(), name));
    });

    setText('#handle', SITE.handle);
    setText('#bio', SITE.bio);

    const meta = $('#meta');
    if (str(SITE.status).trim()) {
      meta.append(el('span', { class: 'pill' }, el('span', { class: 'status-dot', 'aria-hidden': 'true' }), str(SITE.status)));
    }
    if (str(SITE.location).trim()) {
      meta.append(el('span', { class: 'pill' }, icon('mapPin', 14), str(SITE.location)));
    }

    const socials = $('#socials');
    for (const item of list(SITE.socials)) {
      const disabled = Boolean(item && item.disabled);
      const href = disabled ? null : safeUrl(item && item.url);
      if (!href && !disabled) continue;
      const platform = str(item.platform).trim().toLowerCase() || (href ? guessIcon(href) : 'link');
      const label = str(item.label).trim() || PLATFORM_LABELS[platform] || platform;
      socials.append(disabled
        ? el('span', { class: 'social glass is-disabled', role: 'link', 'aria-disabled': 'true', 'aria-label': `${label} (not available yet)`, title: `${label} · not available yet` }, icon(platform, 20))
        : el('a', { class: 'social glass glass-interactive', href, 'aria-label': label, title: label, ...linkAttrs(href) }, icon(platform, 20)));
    }

    const year = new Date().getFullYear();
    const footer = str(SITE.footer).trim() || name;
    $('#footer').textContent = `© ${year} ${footer}`;
  }

  function renderLinks() {
    const container = $('#links');
    let index = 0;
    for (const link of list(SITE.links)) {
      const disabled = Boolean(link && link.disabled);
      const href = disabled ? null : safeUrl(link && link.url);
      if (!href && !disabled) {
        if (link && link.url) console.warn('[codechain] Skipped invalid or disallowed link:', link.url);
        continue;
      }
      const wide = link.size === 'wide' ? ' is-wide' : '';
      const title = str(link.title) || (href ? new URL(href).hostname : '');
      const block = el(disabled ? 'span' : 'a',
        disabled
          ? { class: `link-block glass is-disabled reveal${wide}`, role: 'link', 'aria-disabled': 'true', title: `${title} · not available yet` }
          : { class: `link-block glass glass-interactive reveal${wide}`, href, ...linkAttrs(href) },
        el('span', { class: 'link-icon' }, icon(str(link.icon).trim().toLowerCase() || (href ? guessIcon(href) : 'link'), 22)),
        el('span', { class: 'link-text' },
          el('span', { class: 'link-title', text: title }),
          str(link.description) ? el('span', { class: 'link-desc', text: str(link.description) }) : null),
        disabled ? null : el('span', { class: 'link-arrow' }, icon('arrowUpRight', 18)));
      const accent = safeColor(link.accent);
      if (accent) block.style.setProperty('--accent', accent);
      block.style.setProperty('--i', String(++index));
      container.append(block);
    }
    $('#links-section').hidden = index === 0;
    $('#topbar-links-link').hidden = index === 0;
  }

  function normalizeCode(item, i) {
    if (!item || typeof item !== 'object') return null;
    const title = str(item.title).trim() || `code-${i + 1}`;
    const content = typeof item.content === 'string' ? item.content : null;
    const file = item.file ? safeUrl(item.file, { sameOriginOnly: true }) : null;
    if (content == null && !file) return null;
    return { title, content, file, lang: resolveLang(item.language, item.file || title) };
  }

  function normalizeProject(raw, i, usedSlugs) {
    if (!raw || typeof raw !== 'object') return null;
    const title = str(raw.title).trim();
    if (!title) return null;

    let slug = slugify(raw.slug || title) || `project-${i + 1}`;
    for (let n = 2; usedSlugs.has(slug); n++) slug = `${slugify(raw.slug || title)}-${n}`;
    usedSlugs.add(slug);

    const images = list(raw.images)
      .map((img) => (typeof img === 'string' ? { src: img } : img || {}))
      .map((img) => ({ src: safeImage(img.src), caption: str(img.caption) }))
      .filter((img) => img.src);
    const cover = safeImage(raw.cover) || (images[0] && images[0].src) || null;

    return {
      slug,
      title,
      summary: str(raw.summary),
      description: str(raw.description),
      cover,
      images: images.length ? images : cover ? [{ src: cover, caption: '' }] : [],
      tags: list(raw.tags).map(str).map((t) => t.trim()).filter(Boolean),
      language: str(raw.language).trim(),
      status: str(raw.status).trim(),
      date: str(raw.date).trim(),
      repo: safeUrl(raw.repo),
      demo: safeUrl(raw.demo),
      code: list(raw.code).map(normalizeCode).filter(Boolean),
      featured: raw.featured === true,
      accent: safeColor(raw.accent),
    };
  }

  const usedSlugs = new Set();
  const projects = PROJECTS_LOADED
    ? window.PROJECTS.map((p, i) => normalizeProject(p, i, usedSlugs)).filter(Boolean)
    : [];

  const dateKey = (value) => {
    const m = str(value).match(/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?/);
    return m ? Number(m[1]) * 10000 + Number(m[2] || 0) * 100 + Number(m[3] || 0) : -1;
  };
  projects.sort((a, b) => (b.featured - a.featured) || (dateKey(b.date) - dateKey(a.date)));

  let activeTag = null;
  let showAllTags = false;
  let query = '';

  const lower = (text) => text.toLocaleLowerCase('en-US');

  function matchesFilters(project) {
    if (activeTag && !project.tags.includes(activeTag)) return false;
    if (!query) return true;
    const haystack = lower([project.title, project.summary, project.language, ...project.tags].join(' '));
    return lower(query).split(/\s+/).every((word) => haystack.includes(word));
  }

  function placeholder(project) {
    const initials = project.title.split(/\s+/).slice(0, 2).map((word) => word.charAt(0)).join('').toLocaleUpperCase('en-US');
    const node = el('div', { class: 'placeholder', 'aria-hidden': 'true', text: initials });
    const color = langColor(project.language);
    if (color) node.style.setProperty('--lang', color);
    return node;
  }

  function langBadge(language) {
    const node = el('span', { class: 'lang' }, el('span', { class: 'lang-dot' }), language);
    const color = langColor(language);
    if (color) node.style.setProperty('--lang', color);
    return node;
  }

  function projectCard(project, index, animate) {
    const cover = el('div', { class: 'pc-cover' });
    if (project.cover) {
      const img = el('img', { src: project.cover, alt: '', loading: 'lazy', decoding: 'async' });
      img.addEventListener('error', () => img.replaceWith(placeholder(project)), { once: true });
      cover.append(img);
    } else {
      cover.append(placeholder(project));
    }
    if (project.featured) cover.append(el('span', { class: 'badge' }, icon('star', 13), 'Featured'));

    const card = el('a', { class: `project-card glass glass-interactive${animate ? ' reveal' : ''}`, href: `#/project/${project.slug}` },
      cover,
      el('div', { class: 'pc-body' },
        el('h3', { class: 'pc-title' }, icon('book', 17), el('span', { text: project.title })),
        project.summary ? el('p', { class: 'pc-summary', text: project.summary }) : null,
        project.tags.length ? el('div', { class: 'pc-tags' }, project.tags.slice(0, 3).map((t) => el('span', { class: 'tag', text: t }))) : null,
        el('div', { class: 'pc-foot' },
          project.language ? langBadge(project.language) : null,
          project.date ? el('span', { text: formatDate(project.date) }) : null,
          project.code.length ? el('span', { text: `${project.code.length} ${project.code.length === 1 ? 'file' : 'files'}` }) : null)));
    card.style.setProperty('--i', String(index));
    if (project.accent) card.style.setProperty('--project-accent', project.accent);
    return card;
  }

  function renderFilters(animateExtra = false) {
    const filters = $('#filters');
    filters.replaceChildren();
    const tags = [...new Set(projects.flatMap((p) => p.tags))];
    if (tags.length < 2) return;
    const chip = (label, value) => el('button', {
      class: 'chip', type: 'button', 'aria-pressed': String(activeTag === value), text: label,
      onclick: () => { activeTag = value; renderFilters(); renderProjectGrid(); },
    });
    const hiddenCount = tags.length - VISIBLE_TAG_COUNT;
    const activeHidden = tags.indexOf(activeTag) >= VISIBLE_TAG_COUNT;
    const expanded = showAllTags || activeHidden;
    const shown = hiddenCount > 0 && !expanded ? tags.slice(0, VISIBLE_TAG_COUNT) : tags;
    filters.append(chip('All', null), ...shown.map((t, i) => {
      const node = chip(t, t);
      if (animateExtra && i >= VISIBLE_TAG_COUNT) {
        node.classList.add('reveal');
        node.style.setProperty('--i', String(i - VISIBLE_TAG_COUNT));
      }
      return node;
    }));
    if (hiddenCount > 0 && !activeHidden) {
      filters.append(el('button', {
        class: 'chip chip-more', type: 'button', 'aria-expanded': String(expanded),
        text: expanded ? 'Show less' : `+${hiddenCount} more`,
        onclick: () => { showAllTags = !expanded; renderFilters(showAllTags); },
      }));
    }
  }

  function clearFilters() {
    activeTag = null;
    query = '';
    $('#project-search').value = '';
    renderFilters();
    renderProjectGrid();
  }

  function renderProjectGrid(animate = false) {
    const grid = $('#projects');
    const notice = $('#projects-notice');
    const visible = projects.filter(matchesFilters);
    grid.replaceChildren(...visible.map((p, i) => projectCard(p, i, animate)));
    $('#project-count').textContent = projects.length ? String(projects.length) : '';

    notice.hidden = true;
    if (!PROJECTS_LOADED) {
      notice.replaceChildren("Projects couldn't be loaded. There may be a syntax error in ", el('code', { text: 'data/projects.js' }), ' (a missing comma, quote, etc.). Check the browser console (F12).');
      notice.hidden = false;
    } else if (!projects.length) {
      notice.textContent = 'No projects yet.';
      notice.hidden = false;
    } else if (!visible.length) {
      notice.replaceChildren(
        query ? `No results for “${query}”.` : 'No projects with this tag.',
        el('br'),
        el('button', { class: 'btn', type: 'button', text: 'Clear filters', onclick: clearFilters }));
      notice.hidden = false;
    }
  }

  function setupSearch() {
    const label = $('#search');
    const input = $('#project-search');
    if (projects.length < 3) return;
    label.prepend(icon('search', 16));
    label.hidden = false;
    input.addEventListener('input', () => {
      query = input.value.trim();
      renderProjectGrid();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && input.value) {
        e.preventDefault();
        input.value = '';
        query = '';
        renderProjectGrid();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (document.querySelector('dialog[open]')) return;
      const target = e.target;
      if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      e.preventDefault();
      input.focus();
    });
  }

  const dialog = $('#project-dialog');
  const pd = $('#pd');
  const pdContent = $('#pd-content');
  const baseTitle = () => str(SITE.title).trim() || str(SITE.name).trim() || 'codechain';
  let openedInSession = false;

  function gallery(images) {
    let current = 0;
    const mainImg = el('img', { alt: '', decoding: 'async' });
    const caption = el('p', { class: 'gallery-caption' });
    const main = el('button', { class: 'gallery-main', type: 'button', 'aria-label': 'Enlarge image', onclick: () => openLightbox(images, current) }, mainImg);
    const thumbs = images.length > 1 ? el('div', { class: 'thumbs' }) : null;

    function show(i) {
      current = i;
      mainImg.src = images[i].src;
      mainImg.alt = images[i].caption || `Image ${i + 1}`;
      caption.textContent = images[i].caption;
      caption.hidden = !images[i].caption;
      if (thumbs) [...thumbs.children].forEach((t, n) => t.setAttribute('aria-current', String(n === i)));
    }

    if (thumbs) {
      images.forEach((img, i) => thumbs.append(el('button', {
        class: 'thumb', type: 'button', 'aria-label': `Image ${i + 1}`, onclick: () => show(i),
      }, el('img', { src: img.src, alt: '', loading: 'lazy', decoding: 'async' }))));
    }
    show(0);
    return el('section', { class: 'gallery', 'aria-label': 'Images' }, main, caption, thumbs);
  }

  const codeFileCache = new Map();

  async function loadCodeFile(href) {
    if (!codeFileCache.has(href)) {
      codeFileCache.set(href, (async () => {
        const res = await fetch(href, { credentials: 'same-origin', cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (text.length > MAX_CODE_FILE_BYTES) throw new Error('File too large');
        return text;
      })());
    }
    try {
      return await codeFileCache.get(href);
    } catch (err) {
      codeFileCache.delete(href);
      throw err;
    }
  }

  function codeViewer(files) {
    const tabs = el('div', { class: 'code-tabs', role: 'tablist', 'aria-label': 'Code files' });
    const langLabel = el('span', { class: 'code-lang' });
    const copyBtn = el('button', { class: 'copy-btn', type: 'button' });
    const gutter = el('div', { class: 'code-gutter', 'aria-hidden': 'true' });
    const code = el('code');
    const area = el('div', { class: 'code-area', role: 'tabpanel', tabindex: '0' }, gutter, el('pre', { class: 'code-pre' }, code));
    let currentText = '';
    let requestId = 0;

    const setCopyLabel = (done) => {
      copyBtn.replaceChildren(icon(done ? 'check' : 'copy', 14), done ? 'Copied' : 'Copy');
      copyBtn.classList.toggle('is-done', done);
    };
    setCopyLabel(false);

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(currentText);
        setCopyLabel(true);
        setTimeout(() => setCopyLabel(false), 1600);
      } catch {
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });

    function render(text, lang) {
      currentText = text;
      code.replaceChildren(highlight(text, lang));
      gutter.textContent = Array.from({ length: text.split('\n').length }, (_, n) => n + 1).join('\n');
      area.scrollTo(0, 0);
    }

    async function show(i) {
      const file = files[i];
      const id = ++requestId;
      [...tabs.children].forEach((tab, n) => {
        tab.setAttribute('aria-selected', String(n === i));
        tab.tabIndex = n === i ? 0 : -1;
      });
      langLabel.textContent = LANG_LABELS[file.lang] || file.lang;

      if (file.content != null) {
        render(dedent(file.content), file.lang);
        return;
      }
      render('Loading…', 'text');
      try {
        const text = await loadCodeFile(file.file);
        if (id === requestId) render(text.replace(/\r\n?/g, '\n').replace(/\n$/, ''), file.lang);
      } catch {
        if (id === requestId) {
          render("Couldn't load the code file.\nCheck the file path. (Loading code from files doesn't work when the site\nis opened directly from disk; try GitHub Pages or a local server.)", 'text');
        }
      }
    }

    files.forEach((file, i) => tabs.append(el('button', {
      class: 'code-tab', type: 'button', role: 'tab', onclick: () => show(i),
      onkeydown: (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + files.length) % files.length;
        show(next);
        tabs.children[next].focus();
      },
    }, icon('file', 14), file.title)));

    show(0);
    return el('section', { class: 'pd-box', 'aria-label': 'Code' },
      el('div', { class: 'pd-box-head code-head' }, tabs, langLabel, copyBtn),
      area);
  }

  function renderProjectDetail(project) {
    if (project.accent) pd.style.setProperty('--project-accent', project.accent);
    else pd.style.removeProperty('--project-accent');
    $('#pd-crumb').replaceChildren(icon('book', 16), el('span', { text: str(SITE.name).trim() || 'codechain' }), '/', el('strong', { text: project.slug }));

    const badges = [];
    if (project.status) badges.push(el('span', { class: 'pill' }, el('span', { class: 'status-dot', 'aria-hidden': 'true' }), project.status));
    if (project.featured) badges.push(el('span', { class: 'pill' }, icon('star', 13), 'Featured'));
    project.tags.forEach((t) => badges.push(el('span', { class: 'tag', text: t })));

    const actions = [];
    if (project.repo) actions.push(el('a', { class: 'btn btn-primary', href: project.repo, ...linkAttrs(project.repo) }, icon('github', 17), 'Source Code'));
    if (project.demo) actions.push(el('a', { class: 'btn', href: project.demo, ...linkAttrs(project.demo) }, icon('external', 17), 'Live Demo'));

    const hero = el('section', { class: 'pd-hero' },
      el('h2', { id: 'pd-title', text: project.title }),
      badges.length ? el('div', { class: 'pd-badges' }, badges) : null,
      project.summary ? el('p', { class: 'pd-summary', text: project.summary }) : null,
      (project.language || project.date || project.images.length) ? el('div', { class: 'pd-meta' },
        project.language ? langBadge(project.language) : null,
        project.date ? el('span', {}, icon('calendar', 15), formatDate(project.date)) : null,
        project.images.length ? el('span', {}, icon('image', 15), `${project.images.length} ${project.images.length === 1 ? 'image' : 'images'}`) : null) : null,
      actions.length ? el('div', { class: 'pd-actions' }, actions) : null);

    const sections = [
      hero,
      project.images.length ? gallery(project.images) : null,
      project.description.trim() ? el('section', { class: 'pd-box', 'aria-label': 'README' },
        el('div', { class: 'pd-box-head' }, icon('book', 16), 'README'),
        el('div', { class: 'md' }, renderRichText(project.description))) : null,
      project.code.length ? codeViewer(project.code) : null,
      disclaimer(),
      projectNav(project),
    ];
    pdContent.replaceChildren(...sections.filter(Boolean));
  }

  function disclaimer() {
    const text = str(SITE.projectDisclaimer).trim();
    if (!text) return null;
    return el('section', { class: 'md pd-disclaimer', 'aria-label': 'Disclaimer' },
      el('div', { class: 'md-alert is-warning', role: 'note' },
        el('p', { class: 'md-alert-title' }, icon('warning', 16), 'Disclaimer'),
        el('p', { text })));
  }

  function projectNav(project) {
    const count = projects.length;
    if (count < 2) return null;
    const index = projects.indexOf(project);
    const next = projects[(index + 1) % count];
    const prev = projects[(index - 1 + count) % count];
    const item = (target, dir) => el('a', {
      class: `pd-nav-item is-${dir}`,
      href: `#/project/${target.slug}`,
      onclick: (e) => {
        e.preventDefault();
        window.history.replaceState(null, '', `#/project/${target.slug}`);
        openProject(target);
      },
    },
    el('span', { class: 'pd-nav-label' }, dir === 'prev' ? [icon('chevronLeft', 15), 'Previous project'] : ['Next project', icon('chevronRight', 15)]),
    el('span', { class: 'pd-nav-title', text: target.title }));
    return el('nav', { class: 'pd-nav', 'aria-label': 'Other projects' }, count > 2 ? item(prev, 'prev') : null, item(next, 'next'));
  }

  const syncModalState = () => {
    document.documentElement.classList.toggle('modal-open', Boolean(document.querySelector('dialog[open]')));
  };

  let closeTimer = 0;

  function closeDialog() {
    if (!dialog.open || closeTimer) return;
    if (REDUCED_MOTION.matches) {
      dialog.close();
      return;
    }
    dialog.classList.add('is-closing');
    closeTimer = setTimeout(() => {
      closeTimer = 0;
      dialog.classList.remove('is-closing');
      dialog.close();
    }, 200);
  }

  function openProject(project) {
    const switching = dialog.open && !closeTimer;
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = 0;
      dialog.classList.remove('is-closing');
    }
    renderProjectDetail(project);
    document.title = `${project.title} · ${baseTitle()}`;
    if (!dialog.open) {
      dialog.showModal();
      syncModalState();
    }
    if (switching && !REDUCED_MOTION.matches) {
      pdContent.animate({ opacity: [0, 1], transform: ['translateY(8px)', 'none'] }, { duration: 300, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' });
    }
    pd.scrollTo(0, 0);
    pd.focus({ preventScroll: true });
  }

  function route(isInitial = false) {
    const match = window.location.hash.match(PROJECT_HASH);
    const project = match && projects.find((p) => p.slug === match[1]);
    if (project) {
      if (!isInitial) openedInSession = true;
      openProject(project);
    } else if (dialog.open) {
      closeDialog();
    }
  }

  dialog.addEventListener('close', () => {
    syncModalState();
    document.title = baseTitle();
    if (PROJECT_HASH.test(window.location.hash)) {
      if (openedInSession) window.history.back();
      else window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    openedInSession = false;
  });

  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeDialog();
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeDialog();
  });

  $('#pd-close').append(icon('close', 18));
  $('#pd-close').addEventListener('click', closeDialog);
  $('#pd-share').append(icon('link', 17));
  $('#pd-share').addEventListener('click', () => shareLink(window.location.href, document.title));

  const lightbox = $('#lightbox');
  const lbImg = $('#lb-img');
  const lbCaption = $('#lb-caption');
  let lbImages = [];
  let lbIndex = 0;

  function showLightboxImage(i) {
    lbIndex = (i + lbImages.length) % lbImages.length;
    const img = lbImages[lbIndex];
    lbImg.src = img.src;
    lbImg.alt = img.caption || `Image ${lbIndex + 1}`;
    lbCaption.textContent = img.caption;
  }

  function openLightbox(images, start) {
    lbImages = images;
    const multiple = images.length > 1;
    $('#lb-prev').hidden = !multiple;
    $('#lb-next').hidden = !multiple;
    showLightboxImage(start);
    if (!lightbox.open) {
      lightbox.showModal();
      syncModalState();
    }
  }

  lightbox.addEventListener('close', syncModalState);

  $('#lb-close').append(icon('close', 20));
  $('#lb-prev').append(icon('chevronLeft', 22));
  $('#lb-next').append(icon('chevronRight', 22));
  $('#lb-close').addEventListener('click', () => lightbox.close());
  $('#lb-prev').addEventListener('click', () => showLightboxImage(lbIndex - 1));
  $('#lb-next').addEventListener('click', () => showLightboxImage(lbIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.id === 'lb-inner') lightbox.close();
  });

  lightbox.addEventListener('keydown', (e) => {
    if (lbImages.length < 2) return;
    if (e.key === 'ArrowLeft') showLightboxImage(lbIndex - 1);
    if (e.key === 'ArrowRight') showLightboxImage(lbIndex + 1);
  });

  if (window.matchMedia('(hover: hover)').matches) {
    let pending = null;
    let frame = 0;
    document.addEventListener('pointermove', (e) => {
      const card = e.target instanceof Element && e.target.closest('.glass-interactive');
      if (!card) return;
      pending = { card, x: e.clientX, y: e.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = pending.card.getBoundingClientRect();
        pending.card.style.setProperty('--mx', `${pending.x - rect.left}px`);
        pending.card.style.setProperty('--my', `${pending.y - rect.top}px`);
      });
    }, { passive: true });
  }

  function setupTopbar() {
    const topbar = $('#topbar');
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      const show = !entry.isIntersecting;
      topbar.classList.toggle('is-visible', show);
      topbar.inert = !show;
    }, { rootMargin: '-72px 0px 0px 0px' });
    observer.observe($('#profile'));
  }

  if (!window.SITE) console.error('[codechain] data/site.js failed to load or contains a syntax error.');
  if (!PROJECTS_LOADED) console.error('[codechain] data/projects.js failed to load or contains a syntax error.');

  renderProfile();
  renderLinks();
  renderFilters();
  renderProjectGrid(true);
  setupSearch();
  setupTopbar();
  window.addEventListener('hashchange', () => route());
  route(true);
})();
