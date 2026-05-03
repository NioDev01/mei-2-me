import { Document, Paragraph, TextRun, AlignmentType } from 'docx';
import { GenerateEIDto } from '../dto/generate-ei.dto';

export function buildEIDocument(data: GenerateEIDto): Document {
  return new Document({
    sections: [
      {
        children: [
          buildTitle(),
          buildIntro(data),
          buildClause(
            1,
            'DO NOME EMPRESARIAL',
            `O Empresário Individual adotará como nome empresarial a seguinte firma: ${data.nomeEmpresarial}.`,
          ),
          buildClause(
            2,
            'DO CAPITAL',
            `O capital é de R$ ${data.capitalSocial}, totalmente subscrito e integralizado, neste ato, em moeda corrente do País.`,
          ),
          buildClause(
            3,
            'DA SEDE',
            `O Empresário Individual terá sua sede no seguinte endereço: ${data.endereco}.`,
          ),
          buildClause(
            4,
            'DO OBJETO',
            `O Empresário Individual terá por objeto o exercício das seguintes atividades econômicas: ${data.atividade}.`,
          ),
          buildClause(
            5,
            'DA DECLARAÇÃO DE DESIMPEDIMENTO',
            'O empresário declara, sob as penas da lei, inclusive que são verídicas todas as informações prestadas neste instrumento e quanto ao disposto no artigo 299 do Código Penal, não estar impedido de exercer atividade empresária e não possuir outro registro como Empresário Individual no País.',
          ),
          buildDeclaration(),
          ...buildSignature(data),
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
        text: `INSTRUMENTO DE INSCRIÇÃO DE EMPRESÁRIO INDIVIDUAL`,
        bold: true,
        size: 32,
      }),
    ],
    spacing: { after: 120 },
  });
}

// ===============================
// BLOCO: SUBTÍTULO (nome empresarial)
// ===============================

function buildIntro(data: GenerateEIDto): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: data.nomeEmpresarial,
        bold: true,
        size: 28,
      }),
    ],
    spacing: { after: 400 },
  });
}

// ===============================
// BLOCO: CLÁUSULA GENÉRICA
// ===============================

function buildClause(number: number, title: string, body: string): Paragraph {
  const ordinals: Record<number, string> = {
    1: 'Primeira',
    2: 'Segunda',
    3: 'Terceira',
    4: 'Quarta',
    5: 'Quinta',
    6: 'Sexta',
    7: 'Sétima',
    8: 'Oitava',
    9: 'Nona',
    10: 'Décima',
  };

  const ordinal = ordinals[number] ?? `${number}ª`;

  return new Paragraph({
    children: [
      new TextRun({
        text: `Cláusula ${ordinal} - ${title} - `,
        bold: true,
      }),
      new TextRun({
        text: body,
      }),
    ],
    spacing: { after: 240 },
  });
}

// ===============================
// BLOCO: DECLARAÇÃO FINAL
// ===============================

function buildDeclaration(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: 'E, por estar assim constituído, assino o presente instrumento.',
      }),
    ],
    spacing: { before: 200, after: 400 },
  });
}

// ===============================
// BLOCO: ASSINATURA
// ===============================

function buildSignature(data: GenerateEIDto): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: '_____________________, _______ de _________________________ de _________',
        }),
      ],
      spacing: { after: 600 },
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: '________________________________________',
        }),
      ],
      spacing: { after: 80 },
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: data.nomeEmpresarial,
          bold: true,
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `CNPJ: ${data.cnpj}`,
        }),
      ],
    }),
  ];
}
