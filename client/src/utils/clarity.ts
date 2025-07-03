// src/utils/clarity.ts

export function initializeClarity() {
  const clarityId = import.meta.env.VITE_CLARITY_ID;

  if (!clarityId) {
    console.warn('Clarity ID não definido na variável de ambiente VITE_CLARITY_ID.');
    return;
  }

  (function (c: any, l: Document, a: string, r: string, i: string) {
    c[a] = c[a] || function () {
      (c[a].q = c[a].q || []).push(arguments);
    };

    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = `https://www.clarity.ms/tag/${i}`;

    const y = l.getElementsByTagName(r)[0];
    if (y && y.parentNode) {
      y.parentNode.insertBefore(t, y);
    } else {
      // Fallback para adicionar ao <head> se não houver outro script
      l.head.appendChild(t);
    }
  })(window, document, "clarity", "script", clarityId);
}
