import { Document, Paragraph, TextRun, AlignmentType } from 'docx';
import { GenerateEIDto } from '../dto/generate-ei.dto';

export function buildEIDocument(data: GenerateEIDto): Document {
  return new Document({
    sections: [
      {
        children: [
          buildTitle(),
          ...buildIdentification(data),
          ...buildActivity(data),
          ...buildCapital(data),
          buildDeclaration(),
          ...buildSignature(),
        ],
      },
    ],
  });
}

// ===============================
// BLOCO: TÍTULO
// ===============================

function buildTitle(): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'REQUERIMENTO DE EMPRESÁRIO',
        bold: true,
        size: 32,
      }),
    ],
    spacing: { after: 400 },
  });
}

// ===============================
// IDENTIFICAÇÃO
// ===============================

function buildIdentification(data: GenerateEIDto): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: `Eu, ${data.nomeEmpresarial}, inscrito no CNPJ sob o nº ${data.cnpj},`,
        }),
      ],
    }),

    new Paragraph({
      children: [
        new TextRun({
          text: `estabelecido à ${data.endereco}, declaro que exerço a seguinte atividade empresarial:`,
        }),
      ],
      spacing: { after: 200 },
    }),
  ];
}

// ===============================
// ATIVIDADE
// ===============================

function buildActivity(data: GenerateEIDto): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Objeto:',
          bold: true,
        }),
      ],
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

function buildCapital(data: GenerateEIDto): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Capital Social:',
          bold: true,
        }),
      ],
    }),

    new Paragraph({
      children: [
        new TextRun({
          text: `R$ ${data.capitalSocial}`,
        }),
      ],
      spacing: { after: 300 },
    }),
  ];
}

// ===============================
// DECLARAÇÃO
// ===============================

function buildDeclaration(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: 'Declaro que as informações acima são verdadeiras e estou ciente das obrigações legais decorrentes da atividade empresarial.',
      }),
    ],
    spacing: { after: 400 },
  });
}

// ===============================
// ASSINATURA
// ===============================

function buildSignature(): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Local e Data: ___________________________',
        }),
      ],
      spacing: { after: 200 },
    }),

    new Paragraph({
      children: [
        new TextRun({
          text: 'Assinatura: _____________________________',
        }),
      ],
    }),
  ];
}
