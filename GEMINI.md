# Diretrizes Gerais de Trabalho do Agente

Sempre que iniciar ou executar tarefas neste repositório, você DEVE seguir rigorosamente as regras abaixo:

## 🚨 Regras Críticas de Execução e Conduta

1. **Planejamento Prévio Obrigatório**:
   - O agente de IA **NUNCA** deve executar nenhuma alteração no código fonte, criar arquivos de funcionalidade ou rodar comandos modificadores sem antes apresentar um plano de implementação detalhado e obter a aprovação explícita do usuário.

2. **Geração de Código sob Demanda**:
   - O agente de IA **SÓ** deve gerar ou alterar códigos/arquivos quando o usuário pedir explicitamente para fazê-lo.

3. **Consulta Obrigatória e Atualização do Registro**:
   - Antes de iniciar qualquer codificação ou planejamento, leia o arquivo de registro e especificações do projeto (como o [registro_projeto.md](file:///c:/Users/User/Documents/Projeto%20EmGrade/registro_projeto.md) na raiz do repositório).
   - Use o arquivo de registro como fonte única de verdade para requisitos, passos concluídos e pendências.
   - A cada passo concluído ou alteração decidida, atualize o checklist correspondente no arquivo com `[x]` para refletir o estado atual do projeto.

4. **Sem Testes de Navegador / Capturas (Economia de Quota)**:
   - O agente de IA **NUNCA** deve abrir o navegador (subagent de browser) ou realizar testes de interface através de prints para economizar quota de tokens.
   - Toda validação funcional e visual da interface será realizada manualmente pelo próprio usuário.

5. **Atualização do GitHub**:
   - O agente de IA deve atualizar o GitHub apenas quando o usuário disser explicitamente que finalizou uma task ou o projeto.

---

## 🛠️ Qualidade Técnica e Validação de Build

1. **Validação de Build Obrigatória**:
   - Toda alteração de código deve ser verificada rodando a compilação de produção (ex: `npm run build`) para assegurar que não há erros de tipo ou quebra de build.

---

## 🎨 Diretrizes de Interface e Usabilidade

1. **Estética Premium**:
   - Evite interfaces simples ou cores primárias cruas. Utilize paletas modernas, sofisticadas e com bom contraste.
2. **Formulários e Modais**:
   - Formulários complexos devem utilizar layouts horizontais/paisagem organizados em colunas e grids, minimizando a necessidade de rolagem vertical.
