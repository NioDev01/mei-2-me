# Pacote inicial UML (PlantUML)

Este pacote contém diagramas iniciais para o sistema MEI2ME:

- `atores-casos-de-uso.puml`: atores e casos de uso principais.
- `componentes-arquitetura.puml`: visão de componentes (front, backend, banco e integrações).
- `sequencia-login-refresh.puml`: fluxo de autenticação com refresh token.
- `sequencia-diagnostico-cnpj.puml`: fluxo de diagnóstico inicial com consulta de CNPJ.

## Como renderizar

Exemplo com PlantUML instalado localmente:

```bash
plantuml docs/uml/*.puml
```

Isso gera imagens `.png` no mesmo diretório.
