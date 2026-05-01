import { Document, Paragraph, TextRun, AlignmentType } from 'docx';
import { GenerateLtdaDto } from '../dto/generate-ltda.dto';

export function buildLtdaDocument(data: GenerateLtdaDto): Document {
  return new Document({
    sections: [
      {
        children: [
          buildTitle(),
          ...buildIdentificacaoEmpresa(data),
          ...buildSocios(data),
          ...buildObjeto(data),
          ...buildCapital(data),
          ...buildAdministracao(),
          ...buildEncerramento(),
        ],
      },
    ],
  });
}

// ===============================
// TÍTULO
// ===============================

function buildTitle(): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'CONTRATO SOCIAL',
        bold: true,
        size: 32,
      }),
    ],
    spacing: { after: 400 },
  });
}

// ===============================
// IDENTIFICAÇÃO DA EMPRESA
// ===============================

function buildIdentificacaoEmpresa(data: GenerateLtdaDto): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: `Nome Empresarial: ${data.nomeEmpresarial}`,
        }),
      ],
    }),

    new Paragraph({
      children: [
        new TextRun({
          text: `CNPJ: ${data.cnpj}`,
        }),
      ],
    }),

    new Paragraph({
      children: [
        new TextRun({
          text: `Endereço: ${data.endereco}`,
        }),
      ],
      spacing: { after: 200 },
    }),
  ];
}

// ===============================
// SÓCIOS
// ===============================

function buildSocios(data: GenerateLtdaDto): Paragraph[] {
  const { titular, socios } = data;

  // SLU (sem sócios adicionais)
  if (!socios || socios.length === 0) {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: `O titular ${titular.nome}, inscrito no CPF ${titular.cpf}, constitui uma Sociedade Limitada Unipessoal.`,
          }),
        ],
        spacing: { after: 200 },
      }),
    ];
  }

  // LTDA (com sócios)
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: `Os sócios abaixo identificados resolvem constituir uma sociedade limitada:`,
        }),
      ],
      spacing: { after: 200 },
    }),

    // titular
    new Paragraph({
      children: [
        new TextRun({
          text: `Sócio: ${titular.nome} - CPF: ${titular.cpf}`,
        }),
      ],
    }),

    // sócios adicionais
    ...socios.map(
      (socio) =>
        new Paragraph({
          children: [
            new TextRun({
              text: `Sócio: ${socio.nome} - CPF: ${socio.cpf}`,
            }),
          ],
        }),
    ),
  ];
}

// ===============================
// OBJETO
// ===============================

function buildObjeto(data: GenerateLtdaDto): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'CLÁUSULA PRIMEIRA – DO OBJETO SOCIAL',
          bold: true,
        }),
      ],
      spacing: { before: 200 },
    }),

    new Paragraph({
      children: [
        new TextRun({
          text: data.atividade,
        }),
      ],
      spacing: { after: 200 },
    }),
  ];
}

// ===============================
// CAPITAL
// ===============================

function buildCapital(data: GenerateLtdaDto): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'CLÁUSULA SEGUNDA – DO CAPITAL SOCIAL',
          bold: true,
        }),
      ],
    }),

    new Paragraph({
      children: [
        new TextRun({
          text: `O capital social é de R$ ${data.capitalSocial}.`,
        }),
      ],
      spacing: { after: 200 },
    }),
  ];
}

// ===============================
// ADMINISTRAÇÃO
// ===============================

function buildAdministracao(): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'CLÁUSULA TERCEIRA – DA ADMINISTRAÇÃO',
          bold: true,
        }),
      ],
    }),

    new Paragraph({
      children: [
        new TextRun({
          text: 'A administração da sociedade será exercida pelo(s) sócio(s), com poderes para representar a empresa.',
        }),
      ],
      spacing: { after: 200 },
    }),
  ];
}

// ===============================
// ENCERRAMENTO
// ===============================

function buildEncerramento(): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'E por estarem assim justos e contratados, firmam o presente instrumento.',
        }),
      ],
      spacing: { after: 300 },
    }),

    new Paragraph({
      children: [
        new TextRun({
          text: 'Local e Data: ___________________________',
        }),
      ],
    }),

    new Paragraph({
      children: [
        new TextRun({
          text: 'Assinatura(s): ___________________________',
        }),
      ],
    }),
  ];
}
