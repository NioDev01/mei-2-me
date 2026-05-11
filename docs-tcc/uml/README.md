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

## 🧩 PlantUML - Pré-requisitos

Para renderizar diagramas `.puml` localmente, é necessário configurar o ambiente com as seguintes dependências:

---

### 📦 1. Java (JDK 8+)

O PlantUML roda sobre a JVM (Java Virtual Machine).

**Recomendado:** JDK 17 (LTS)

**Verificar instalação:**
```bash
java -version
```

**Saída esperada:**
```bash
java version "17.x.x"
```

---

### 📦 2. Graphviz

Responsável pela renderização dos diagramas (layout gráfico).

**Verificar instalação:**
```bash
dot -version
```

**Saída esperada:**
```bash
dot - graphviz version X.X.X
```

---

### 📦 3. PlantUML

Baixe o arquivo `.jar` oficial:

https://plantuml.com/download

**Testar execução:**
```bash
java -jar plantuml.jar -version
```

---

## 🧠 Como funciona

```text
Arquivo .puml
   ↓
PlantUML (interpreta)
   ↓
Java (executa)
   ↓
Graphviz (renderiza)
   ↓
Imagem final (PNG/SVG)
```

---

## 🧰 Integração com VS Code (recomendado)

Instale a extensão **PlantUML** no VS Code e configure:

```json
"plantuml.render": "Local",
"plantuml.jar": "CAMINHO/ABSOLUTO/plantuml.jar"
```

---

## ▶️ Visualizar diagramas

Com um arquivo `.puml` aberto no VS Code:

```bash
Alt + D
```

---

## ⚠️ Problemas comuns

- `java not recognized` → Java não instalado ou não está no PATH  
- `dot not recognized` → Graphviz não instalado ou não está no PATH  
- Preview em branco → caminho do `plantuml.jar` incorreto  
- Diagrama não renderiza → dependências não configuradas corretamente  

---

## ✅ Checklist

- [ ] Java instalado e funcionando  
- [ ] Graphviz instalado e funcionando  
- [ ] `plantuml.jar` disponível  
- [ ] VS Code configurado (opcional)  
