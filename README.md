# 📄 Gerador de Currículo Inteligente

Uma aplicação React moderna que permite criar currículos profissionais com preview em tempo real e sugestões de melhoria usando a IA do Google Gemini.  
Foca em conceitos avançados de React e TailwindCSS, com arquitetura escalável e design clean.

---

## 🚀 Tecnologias Utilizadas

- React 19  
- TypeScript  
- Vite  
- TailwindCSS  
- Google Gemini API para inteligência artificial  

---

## 🎯 Conceito da Aplicação

Layout split-screen otimizado para desktop:

- **Esquerda (50%)**: Formulário de entrada de dados com integração de IA.  
- **Direita (50%)**: Preview instantâneo do currículo.  

> Foco em produtividade e experiência desktop (não responsivo para mobile).

---

## 📝 Funcionalidades

- Preview instantâneo ao digitar  
- Sugestões da IA para melhorar resumos e descrições de experiências  
- Modal de sugestões com **skeleton screen** durante o carregamento  
- Persistência de dados no **localStorage** para não perder o progresso  
- Listas dinâmicas para adicionar/remover habilidades e experiências  
- Exportação para PDF do currículo finalizado  
- Validação em tempo real nos formulários  

---

## 📌 Estrutura do Formulário

### Dados Pessoais
- Nome, Email, Telefone, LinkedIn  
- Resumo profissional (contador de caracteres + melhoria por IA)

### Habilidades
- Adição/remoção dinâmica  
- Nível de proficiência (Básico / Intermediário / Avançado)  

### Experiências
- Empresa, Cargo, Período, Descrição (com melhoria por IA)  
- Checkbox **"Trabalho atual"**  
- Validação de datas  

---

## 🧩 Conceitos React Praticados

- Custom Hooks (`useLocalStorage`)  
- Estado compartilhado avançado  
- Componentes controlados (inputs, textareas, listas)  
- Props e Lifting State Up (comunicação entre componentes)  
- Renderização condicional avançada  

---

## ⚡ Como Rodar o Projeto

Clone este repositório:

```bash
git clone https://github.com/Debug-Beauty/projeto-8-koru.git

```
2.  Entre na pasta do projeto:

    ``` bash
    cd projeto-8-koru
    ```

3.  Instale as dependências:

    ``` bash
    npm install
    ```
Bibliotecas adicionais usadas:

- lucide-react (ícones)

- html2pdf.js (exportação para PDF)

- react-markdown e remark-gfm (renderização de Markdown
  
4.  Rode o servidor de desenvolvimento:

    ``` bash
    npm run dev
    ```

5.  Abra no navegador:

        http://localhost:5173

------------------------------------------------------------------------


## 🖼️ Preview do Projeto

![Preview do Projeto](src/assets/preview.png)


------------------------------------------------------------------------
