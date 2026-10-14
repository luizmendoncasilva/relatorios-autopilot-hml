/*
 * Topbar de cada relatório: pill com a issue do Linear + botão "Visualizar SPEC".
 * Para publicar a spec de um relatório, preencha a URL no mapa SPECS (chave = nome do arquivo HTML).
 * Para vincular a issue, preencha o mapa ISSUES (chave = nome do arquivo ou prefixo terminado em "-*").
 * Relatório sem spec mostra o botão desativado; relatório sem issue não mostra a pill.
 */
(function () {
  var SPECS = {
    // Fiscal
    "livro_entradas.html": "https://equipebhub-my.sharepoint.com/:w:/r/personal/luiz_mendonca_bhub_ai/Documents/SPECS/SPECS%20Fiscal/Relat%C3%B3rios/Spec_Relat%C3%B3rio_Livro_Entradas-FIS1143.docx?d=wc4628796ff3040bf816d8264c7281be3&csf=1&web=1&e=ZpOC33",
    "livro_icms.html": "https://equipebhub-my.sharepoint.com/:w:/r/personal/luiz_mendonca_bhub_ai/Documents/SPECS/SPECS%20Fiscal/Relat%C3%B3rios/Spec_Relat%C3%B3rio_Livro_ICMS-FIS1144.docx?d=w9e8b89a460754171b6b9f5cf00b56ebc&csf=1&web=1&e=QFa5Ea",
    "livro_saidas.html": "https://equipebhub-my.sharepoint.com/:w:/r/personal/luiz_mendonca_bhub_ai/Documents/SPECS/SPECS%20Fiscal/Relat%C3%B3rios/Spec_Relat%C3%B3rio_Livro_Sa%C3%ADdas-FIS1141.docx?d=w759be04f0a364fd3869d5891b895be4f&csf=1&web=1&e=Rxz3lB",
    "faturamento_v3.html": "https://docs.google.com/document/d/1N-6lLYzMYBp5SqzAN9FCIMsLM7_ErdanNxIo1NU9Cm0/edit?tab=t.0",
    "retencoes_a_recolher.html": "https://docs.google.com/document/d/1-OmS0H4y6qwYNPVD5sYGxkH2zZZoPshrlu901nrIhrs/edit?usp=sharing",
    "difal.html": "https://docs.google.com/document/d/11UlHFs4nkMWAaN3WgGmhLmoESG-aJ7Zo7vJluAwZxBQ/edit?usp=sharing",
    // DP
    "relacao_de_liquidos.html": "https://docs.google.com/document/d/11B-89dKK17Rf5Wpqooan-cvUU5pJ_aDOhGPUplJxjzY/edit?tab=t.0",
    "extrato_mensal.html": "https://docs.google.com/document/d/13EVQfSrpqTDM3u4pYodzJGrYdUKTkvUMmnfESErM_Ks/edit?tab=t.0",
    "holerite.html": "https://docs.google.com/document/d/1I6v1d5N9hyxg0rwOPCRWTxTBwEAZBzPf3-fhMxdiYz0/edit?tab=t.0",
    // Contábil (spec única dos 4 relatórios pós-fechamento — CTB-92)
    "razao.html": "https://docs.google.com/document/d/1GVsZ2g-pNlrFmB3snV4E5vE_QILFVm8D43A0DuBwnpI/edit?usp=sharing",
    "Balancete.html": "https://docs.google.com/document/d/1GVsZ2g-pNlrFmB3snV4E5vE_QILFVm8D43A0DuBwnpI/edit?usp=sharing",
    "Balanco_Patrimonial.html": "https://docs.google.com/document/d/1GVsZ2g-pNlrFmB3snV4E5vE_QILFVm8D43A0DuBwnpI/edit?usp=sharing",
    "DRE.html": "https://docs.google.com/document/d/1GVsZ2g-pNlrFmB3snV4E5vE_QILFVm8D43A0DuBwnpI/edit?usp=sharing"
  };

  var ISSUES = {
    // Fiscal
    "livro_saidas.html": ["FIS-1141", "Relatório Livro Fiscal – Saídas (Anexo I)"],
    "livro_entradas.html": ["FIS-1143", "Relatório Livro Fiscal – Entradas (Anexo I)"],
    "livro_icms.html": ["FIS-1144", "Relatório Livro Fiscal – ICMS (Anexo I)"],
    "faturamento_v3.html": ["FIS-238", "Spec · Relatório Memória de Cálculo Simples Nacional"],
    "retencoes_a_recolher.html": ["FIS-239", "Spec · Relatórios de impostos retidos"],
    "difal.html": ["FIS-240", "Spec · Relatórios de DIFAL"],
    // DP
    "relacao_de_liquidos.html": ["DP-49", "Spec · Relatório de Líquidos"],
    "extrato_mensal.html": ["DP-50", "Spec · Resumo de Folha"],
    "holerite.html": ["DP-51", "Spec · Holerites"],
    "ficha_registro.html": ["CTB-289", "Relatórios · Ficha Financeira e Ficha de Registro"],
    "ficha_financeira.html": ["CTB-289", "Relatórios · Ficha Financeira e Ficha de Registro"],
    "adiantamento-*": ["DP-550", "Relatórios · Folha de adiantamento"],
    "admissao-*": ["DP-457", "Relatórios · Processo Admissão"],
    "ferias-*": ["DP-461", "Relatórios · Processo Férias"],
    "rescisao-*": ["DP-459", "Relatórios · Processo Rescisão"],
    // Contábil
    "razao.html": ["CTB-92", "Spec dos relatórios contábeis pós-fechamento"],
    "Balancete.html": ["CTB-92", "Spec dos relatórios contábeis pós-fechamento"],
    "Balanco_Patrimonial.html": ["CTB-92", "Spec dos relatórios contábeis pós-fechamento"],
    "DRE.html": ["CTB-92", "Spec dos relatórios contábeis pós-fechamento"]
  };

  var page = decodeURIComponent(location.pathname.split("/").pop() || "");
  var url = SPECS[page] || "";
  var issue = ISSUES[page] || ISSUES[page.split("-")[0] + "-*"] || null;
  var bar = document.querySelector(".bh-topbar");
  if (!bar) return;

  var css = document.createElement("style");
  css.textContent =
    ".bh-topbar-actions{margin-left:auto;display:flex;align-items:center;gap:10px;}" +
    ".bh-issue{display:flex;align-items:center;gap:6px;background:rgba(242,84,97,.14);border:1px solid rgba(242,84,97,.45);color:#fff;font-family:'Nunito Sans',sans-serif;font-size:12px;font-weight:800;letter-spacing:.02em;padding:5px 11px 5px 9px;border-radius:999px;text-decoration:none;transition:background .15s;white-space:nowrap;}" +
    ".bh-issue:hover{background:rgba(242,84,97,.26);}" +
    ".bh-issue svg{width:13px;height:13px;flex-shrink:0;color:#f25461;}" +
    ".bh-spec{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:#fff;font-family:'Nunito Sans',sans-serif;font-size:13px;font-weight:800;padding:8px 14px;border-radius:8px;text-decoration:none;transition:background .15s;white-space:nowrap;}" +
    ".bh-spec:hover{background:rgba(255,255,255,.16);}" +
    ".bh-spec svg{width:15px;height:15px;flex-shrink:0;}" +
    ".bh-spec.off{opacity:.45;cursor:not-allowed;}" +
    ".bh-spec.off:hover{background:rgba(255,255,255,.08);}";
  document.head.appendChild(css);

  var actions = document.createElement("div");
  actions.className = "bh-topbar-actions";

  if (issue) {
    var pill = document.createElement("a");
    pill.className = "bh-issue";
    pill.href = "https://linear.app/bhub/issue/" + issue[0];
    pill.target = "_blank";
    pill.rel = "noopener";
    pill.title = issue[0] + " · " + issue[1] + " (abrir no Linear)";
    pill.innerHTML = '<svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><path d="M1.2 61.5c-.2-.9.8-1.4 1.5-.8l36.6 36.6c.7.7.1 1.7-.8 1.5C20.6 94.4 5.6 79.4 1.2 61.5ZM0 46.9c0 .3.1.7.4.9l52 52c.2.2.6.4.9.4 2.4-.1 4.7-.5 7-.9.8-.2 1-1.1.5-1.7L2.6 39.4c-.6-.5-1.5-.3-1.7.5-.4 2.3-.8 4.6-.9 7Zm4.2-17.2c-.2.4-.1.8.2 1.1l64.9 64.9c.3.3.7.4 1.1.2 1.8-.8 3.5-1.7 5.2-2.7.6-.4.6-1.2.1-1.7L8.5 24.4c-.5-.5-1.3-.4-1.7.1-1 1.7-1.9 3.4-2.7 5.2Zm8.5-11.7c-.4-.4-.4-1 0-1.4C21.8 6.4 35.2 0 50.1 0 77.7 0 100 22.3 100 49.9c0 14.9-6.4 28.3-16.6 37.4-.4.4-1 .3-1.4 0L12.6 18Z"/></svg>' + issue[0];
    actions.appendChild(pill);
  }

  var icon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>';

  var btn = document.createElement(url ? "a" : "span");
  btn.className = "bh-spec" + (url ? "" : " off");
  btn.innerHTML = icon + "Visualizar SPEC";
  if (url) {
    btn.href = url;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.title = "Abrir a spec do relatório (" + (url.indexOf("docs.google.com") >= 0 ? "Google Docs" : "SharePoint") + ")";
  } else {
    btn.title = "Spec ainda não publicada";
    btn.setAttribute("aria-disabled", "true");
  }
  actions.appendChild(btn);
  bar.appendChild(actions);
})();
