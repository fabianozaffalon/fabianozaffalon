# 📁 Mapa de Assets — Fabiano Zaffalon

## Onde colocar cada imagem

```
public/
└── images/
    │
    ├── logo.svg                  ← Logo principal (Header + Footer)
    │
    ├── ui/                       ← Elementos de interface / decorativos
    │   ├── elipse-whats.svg      ← Elipse verde do botão WhatsApp
    │   └── whats.svg             ← Ícone WhatsApp (branco)
    │
    ├── hero/                     ← Imagens da seção S1 – Hero
    │   └── caminhao.jpg          ← Caminhão do banner principal
    │
    ├── solutions/                ← Imagens da seção S2 – Soluções
    │   ├── varejo.jpg
    │   ├── food-service.jpg
    │   └── industria.jpg
    │
    ├── brands/                   ← Logos das marcas representadas (S3)
    │   ├── suzano.svg
    │   ├── piraque.svg
    │   ├── bic.svg
    │   ├── havaianas.svg
    │   └── yoki.svg
    │
    └── empresa/                  ← Fotos institucionais (S4 – A Empresa)
        └── predio.jpg
```

## Como referenciar no código

```tsx
// Logo
<Image src="/images/logo.svg" alt="Fabiano Zaffalon" />

// WhatsApp
<Image src="/images/ui/elipse-whats.svg" ... />
<Image src="/images/ui/whats.svg" ... />

// Hero
<Image src="/images/hero/caminhao.jpg" ... />
```

## Dicas de otimização

- Fotos → salve como `.jpg` em 85% de qualidade (máx 1920px de largura)
- Logos/ícones → sempre `.svg` quando possível
- O Next.js converte automaticamente para `.webp` / `.avif` em produção

## Hero — slides esperados

```
public/images/hero/
  slide-1.jpg   ← caminhao.jpg (sua imagem atual — renomeie para slide-1.jpg)
  slide-2.jpg   ← segunda foto do slider
  slide-3.jpg   ← terceira foto do slider
  slide-4.jpg   ← quarta foto do slider
```
> Renomeie `caminhao.jpg` → `slide-1.jpg` e adicione as demais.
> Tamanho ideal: 1920×700px, JPG 85%.
