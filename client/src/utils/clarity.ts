export function initializeClarity() {
  const clarityId = import.meta.env.VITE_CLARITY_ID;

  if (!clarityId) {
    console.warn('Clarity ID não definido na variável de ambiente VITE_CLARITY_ID.');
    return;
  }

  (function (c: any, l: Document, a: string, r: string, i: string, t?: HTMLScriptElement, y?: Node) {
    c[a] = c[a] || function () {
      (c[a].q = c[a].q || []).push(arguments);
    };
    t = l.createElement(r);
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, "clarity", "script", clarityId);
}
