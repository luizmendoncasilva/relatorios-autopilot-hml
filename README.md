# Visualizador de Documentos BHub

Vitrine estática (HTML puro, sem build) dos modelos de relatórios contábeis, fiscais e de departamento pessoal produzidos pela BHub — feita para demonstração da identidade visual e da estrutura de cada documento.

> ⚠️ Todos os dados exibidos (empresa, valores, nomes, CPFs) são fictícios, gerados apenas para fins de layout.

## Como abrir

Não há dependências, servidor ou build. Basta abrir [`index.html`](index.html) diretamente no navegador — os links entre as páginas são relativos, então o projeto funciona tanto localmente quanto publicado como site estático (GitHub Pages, Netlify, etc).

## Estrutura

```
index.html                 → página inicial, com os cards de acesso a cada relatório
bhub_style_guide.html      → guia de estilo: cores, tipografia, componentes e regras de uso
Balancete.html             → Balancete de Verificação
Balanco_Patrimonial.html   → Balanço Patrimonial
DRE.html                   → Demonstração do Resultado do Exercício
razao.html                 → Livro Razão
difal.html                 → Demonstrativo do Diferencial de Alíquota (DIFAL)
retencoes_a_recolher.html  → Retenções a Recolher
faturamento_v3.html        → Memória de Cálculo do Simples Nacional
livro_icms.html            → Livro Fiscal – Registro de Apuração do ICMS (FIS-1144)
livro_entradas.html        → Livro Fiscal – Registro de Entradas (FIS-1143)
livro_saidas.html          → Livro Fiscal – Registro de Saídas (FIS-1141)
holerite.html              → Holerite / Recibo de Pagamento
extrato_mensal.html        → Extrato Mensal da folha
relacao_de_liquidos.html   → Relação Geral dos Líquidos
```

Cada relatório é uma página independente — sem framework, sem dependências externas além da fonte (Google Fonts, Nunito Sans) — para que qualquer alteração visual possa ser feita direto no arquivo, sem precisar rodar nada.

## Identidade visual

Todos os documentos seguem o mesmo padrão, documentado em detalhe no [style guide](bhub_style_guide.html):

- **Topbar fixa** (fundo escuro `#0f1726`) com botão "Voltar" para o índice e a logo BHub.
- **Logo do cabeçalho**: apenas a logo CONTJET, sem a logo BHub ao lado. A BHub aparece só na topbar e no rodapé ("powered by").
- **Paleta única**: rosa (`#f25461`) para agrupamentos e acentos, azul (`#0171e4`) para totais e destaques fiscais, tons neutros de cinza para texto e bordas.
- **Tipografia**: Nunito Sans em 4 pesos (500 / 700 / 800 / 900) — nada fora dessa escala.
- **Cabeçalho e rodapé de documento**: padrão fixo com Empresa/CNPJ/Período de um lado e Código de Acesso/Emissão do outro no cabeçalho; logo BHub + "powered by" e número de página no rodapé.
- **Aviso de dados fictícios**: banner discreto entre a topbar e o conteúdo, presente em todos os relatórios.

## Convenções por tipo de documento

- **Contábeis** (Balancete, Balanço, DRE): totalizadores em negrito com borda superior reforçada; assinatura de Sócio + Contador no rodapé.
- **Livro Razão**: contrapartida exibida como código numérico (`Cta.C.Part.`), fiel ao padrão do sistema de origem — sem bloco de assinatura.
- **Fiscais** (DIFAL, Retenções, Memória de Cálculo do Simples): agrupamentos hierárquicos com fundo rosa claro e totais em destaque azul.
- **Departamento Pessoal** (Holerite, Extrato Mensal, Relação de Líquidos): dados do colaborador organizados em cards, com bases de cálculo (INSS/FGTS/IRRF) isoladas.

## Contribuindo

Ao criar ou ajustar um relatório:
1. Reaproveite a topbar, o rodapé e o banner de aviso já existentes em qualquer outro documento — são idênticos entre si.
2. Sempre linke o novo documento a partir do [`index.html`](index.html).
3. Qualquer padrão novo (cor, componente, regra de layout) deve ser incorporado ao [style guide](bhub_style_guide.html).
