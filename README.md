# CarrosselMD â @dr.roddhohenfeld

Gerador de carrossÃ©is para Instagram com IA, calibrado para medicina esportiva, performance, longevidade, emagrecimento, TRT e peptÃ­deos.

---

## Deploy na Vercel (5 minutos)

### 1. Crie uma conta gratuita
- Acesse https://vercel.com e crie sua conta (pode usar GitHub)

### 2. Suba o projeto
**OpÃ§Ã£o A â Via GitHub (recomendado):**
1. Crie um repositÃ³rio no GitHub e suba esta pasta
2. Na Vercel, clique em "Add New Project" â importe o repositÃ³rio
3. Clique em "Deploy"

**OpÃ§Ã£o B â Via CLI:**
```bash
npm i -g vercel
cd carrosselmd
vercel
```

### 3. Configure sua chave da API Anthropic
1. Acesse https://console.anthropic.com â API Keys â crie uma chave
2. No painel da Vercel â seu projeto â Settings â Environment Variables
3. Adicione:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-...` (sua chave)
4. Clique em "Save" e faÃ§a um novo deploy

### 4. Acesse seu app
Sua URL serÃ¡ algo como: `https://carrosselmd.vercel.app`

---

## Estrutura do projeto

```
carrosselmd/
âââ api/
â   âââ gerar.js        # Backend â chama a API da Anthropic
âââ public/
â   âââ index.html      # Frontend completo
âââ vercel.json         # ConfiguraÃ§Ã£o de rotas
âââ README.md
```

---

## Custos estimados

- **Vercel:** Gratuito para uso pessoal
- **Anthropic API:** ~$0.003 por carrossel gerado (modelo claude-opus-4-5)
- 100 carrossÃ©is/mÃªs â R$ 1,50

---

## PrÃ³ximos passos (evoluÃ§Ã£o para SaaS)

- [ ] AutenticaÃ§Ã£o (login para outros mÃ©dicos)
- [ ] HistÃ³rico de carrossÃ©is salvos
- [ ] Export como imagens PNG prontas para postar
- [ ] Planos pagos com Stripe
- [ ] Multi-usuÃ¡rio com workspaces por especialidade
