# Guia de Contribuição

Este guia de contribuição foi criado com o objetivo de padronizar e facilitar a colaboração entre desenvolvedores, promovendo a melhoria contínua do software.

## Como começar a contribuir?

Quer ajudar a melhorar o sistema ou corrigir algum bug? Siga os passos abaixo para começar a contribuir!

### Para fazer um Pull Request

1. Clone o repositório na sua máquina.
2. Crie uma nova branch para a sua contribuição.
3. Faça as alterações no código, criando uma nova funcionalidade ou corrigindo um bug.
4. Adicione os arquivos modificados na área de staging e faça o commit com uma mensagem clara.
5. Faça um push da sua branch para o GitHub.
6. Crie o Pull Request.
7. Aguarde a revisão do código.

### Exemplo de fluxo.

```bash
  # Iniciar uma nova funcionalidade
  git checkout develop
  git pull origin develop
  git checkout -b feature/autenticacao-jwt

  # Trabalhar na funcionalidade, fazendo commits
  git add .
  git commit -m "feat(auth): implementa autenticação JWT"
  git push origin feature/autenticacao-jwt

  # Após revisão e aprovação, mesclar no GitHub
  # Então, limpar localmente
  git checkout develop
  git pull origin develop
  git branch -d feature/autenticacao-jwt
```
