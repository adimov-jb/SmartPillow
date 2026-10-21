# 💤 SmartPillow — O Futuro do Sono Restaurador

> **Landing Page & Protótipo Mobile de Alta Conversão para o Travesseiro Inteligente Bio-Adaptativo.**  
> Monitoramento neural do sono, alívio de ronco micropneumático automático, som privativo SoundBeam e massagem cervical terapêutica.

---

## 🎨 Paleta de Cores e Identidade Visual

O projeto foi construído respeitando com rigor o conceito de **Minimalismo Hi-Tech & Conforto Orgânico**:

* **Branco Puro (`#FFFFFF`)**: Base limpa, iluminada e arejada que transmite frescor, higiene e tecnologia médica avançada.
* **Palha / Bege Claro (`#E8D9B5`)**: Traz aconchego e naturalidade em texturas têxteis orgânicas, botões secundários, seletores e molduras.
* **Azul Escuro Navy (`#0A1A3A`)**: Profundidade, autoridade e contraste forte para tipografia, botões de ação e componentes de alta tecnologia.
* **Acento Ciano Tecnológico (`#38BDF8`)**: Detalhes bio-luminescentes, gráficos de frequência cardíaca e ondas sonoras em tempo real.

---

## 🚀 Funcionalidades da Landing Page

* **Hero Cinemático**: Apresentação fotorrealista do SmartPillow com **4 Hotspots Holográficos** interativos (Bolsa Micropneumática, Massagem Cervical, Condução Óssea e Sensor Neural) com cards posicionados para não sofrer cortes.
* **Laboratório Anti-Ronco 3D (Showstopper)**: Simulação ao vivo com gráfico em `<canvas>`, detecção a 68 dB, inflagem da bolsa lateral (+8mm), correção sutil da postura e retorno ao silêncio absoluto (12 dB).
* **SoundBeam Audio**: Transmissão acústica privativa por condução óssea com sintetizador de ondas binaurais relaxantes via Web Audio API.
* **Massagem Cervical Terapêutica**: Seletor com 4 modalidades biomecânicas (*Cervical*, *Miofascial*, *Drenagem* e *Ondas Theta*).
* **Visão Explodida das Camadas**: Detalhamento em alta resolução das 5 camadas do travesseiro com espuma de grafeno e termorregulação constante a 19.2°C.
* **Quiz / Diagnóstico de Sono**: Calculadora em 3 etapas com recomendação personalizada de modelo.
* **Tabela de Modelos & Checkout**: Tiers *Lite*, *Pro* e *Ultra*, contador regressivo de escassez e cupom automático de 35% OFF (`SMART35`) com 100 noites de teste sem risco.
* **Compliance com a LGPD (Lei nº 13.709/2018)**:
  * Banner flutuante de consentimento de cookies.
  * Centro de preferências de cookies granulares (Necessários, Analíticos, Funcionais e Marketing) com persistência em `localStorage`.
  * Portal de transparência LGPD com especificação dos Direitos do Titular (Art. 18) e canal direto do DPO (`dpo@smartpillow.com.br`).

---

## 📱 Protótipo do Aplicativo no Figma & Tokens

* **Showcase 4K**: Visualização das 4 telas do aplicativo em prancheta do Figma (`assets/images/figma-app-showcase.jpg`).
* **Simulador Interativo do Celular (`figma-prototype.html`)**: Protótipo de iPhone 15/16 com navegação por abas, sliders de pressão e temperatura, e teste interativo de ronco.
* **Design Tokens (`figma-design-tokens.json`)**: Arquivo de tokens para importação direta no Figma via *Tokens Studio* ou *Figma Variables*.

---

## 📂 Estrutura de Arquivos

```
SmartPillow/
├── index.html                   # Página principal de vendas e apresentação
├── figma-prototype.html         # Protótipo interativo do App Mobile & Figma Dev Mode
├── figma-design-tokens.json     # Tokens de Design para importação no Figma
├── README.md                    # Documentação do projeto
├── css/
│   └── style.css                # Design system completo, glassmorphism e responsividade
├── js/
│   └── main.js                  # Lógica do simulador 3D, áudio, quiz, LGPD e checkout
└── assets/
    └── images/
        ├── hero-pillow.jpg      # Travesseiro com contornos futuristas
        ├── internal-tech.jpg    # Visão técnica explodida das camadas
        ├── app-sync.jpg         # Mockup do app neural e biometria
        ├── lifestyle-peace.jpg  # Casal dormindo em silêncio absoluto
        └── figma-app-showcase.jpg # Telas do app em prancheta Figma
```

---

## 🌐 Como Rodar Localmente

Basta abrir o arquivo `index.html` em qualquer navegador moderno dando dois cliques no arquivo ou arrastando-o para o navegador. Não requer compilação ou dependências externas.
