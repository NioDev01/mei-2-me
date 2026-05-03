import { Document, Paragraph, TextRun, AlignmentType } from 'docx';
import { GenerateLtdaDto } from '../dto/generate-ltda.dto';

export function buildLtdaDocument(data: GenerateLtdaDto): Document {
  const isSlu = !data.socios || data.socios.length === 0;

  return isSlu ? buildSluDocument(data) : buildLtdaContrato(data);
}

// ================================================================
// SLU — CONTRATO SOCIAL DE SOCIEDADE LIMITADA UNIPESSOAL
// ================================================================

function buildSluDocument(data: GenerateLtdaDto): Document {
  return new Document({
    sections: [
      {
        children: [
          buildSluTitle(data),
          buildSluTitularId(data),
          buildSluQualificacaoEmpresa(data),
          buildSluIntro(),
          buildSluClause(
            'PRIMEIRA',
            `A Sociedade Limitada Unipessoal se apresenta sob o nome empresarial de ${data.nomeEmpresarial} e tem prazo indeterminado de duração.`,
          ),
          buildSluClause(
            'SEGUNDA',
            `A Sociedade Limitada Unipessoal tem sua sede social na ${data.endereco}.`,
          ),
          buildSluClause('TERCEIRA', `O objeto social é: ${data.atividade}.`),
          buildSluClause(
            'QUARTA',
            'A Sociedade poderá a qualquer tempo abrir filiais em todo o território nacional, ou no exterior, sempre respeitando a legislação vigente.',
          ),
          ...buildSluCapitalClause(data),
          buildSluClause(
            'SEXTA',
            `O Sócio ${data.titular.nome} é sócio único de conformidade com os termos do artigo 1.052 da Lei 10.406/2002 e da Instrução Normativa DREI nº 63 de 2019.`,
          ),
          ...buildSluAdministracaoClause(data),
          ...buildSluEncerramento(data),
        ],
      },
    ],
  });
}

function buildSluTitle(data: GenerateLtdaDto): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: 'CONTRATO SOCIAL DE', bold: true, size: 32 }),
      new TextRun({ text: '\n', break: 1 }),
      new TextRun({
        text: 'SOCIEDADE LIMITADA UNIPESSOAL',
        bold: true,
        size: 32,
      }),
      new TextRun({ text: '\n', break: 1 }),
      new TextRun({ text: data.nomeEmpresarial, bold: true, size: 28 }),
      new TextRun({ text: '\n', break: 1 }),
      new TextRun({ text: `CNPJ: ${data.cnpj}`, size: 24 }),
    ],
    spacing: { after: 400 },
  });
}

function buildSluTitularId(data: GenerateLtdaDto): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: 'TITULAR: ', bold: true }),
      new TextRun({
        text:
          `${data.titular.nome}, inscrito(a) no CPF sob o nº ${data.titular.cpf}, ` +
          'único sócio componente da Sociedade Limitada Unipessoal denominada abaixo.',
      }),
    ],
    spacing: { after: 240 },
  });
}

function buildSluQualificacaoEmpresa(data: GenerateLtdaDto): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text:
          `Único sócio componente da Sociedade Limitada Unipessoal, denominada "${data.nomeEmpresarial}", ` +
          `pessoa jurídica de direito privado, com sede social sita ${data.endereco}, ` +
          `devida e regularmente inscrita no Cadastro Nacional de Pessoa Jurídica de nº ${data.cnpj}, ` +
          'RESOLVE, por este instrumento, constituir o Contrato Social, que se regerá pelas seguintes cláusulas e condições:',
      }),
    ],
    spacing: { after: 400 },
  });
}

function buildSluIntro(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: 'Em conformidade com o disposto na Medida Provisória 881 de 30 de abril de 2019 e com o parágrafo único do artigo 1.052 do Código Civil Brasileiro (Lei 10.406/2002), constitui-se a presente Sociedade Limitada Unipessoal, que se regerá pelas cláusulas a seguir:',
      }),
    ],
    spacing: { after: 300 },
  });
}

function buildSluClause(ordinal: string, body: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: `CLÁUSULA ${ordinal.toUpperCase()}: `, bold: true }),
      new TextRun({ text: body }),
    ],
    spacing: { after: 240 },
  });
}

function buildSluCapitalClause(data: GenerateLtdaDto): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: 'CLÁUSULA QUINTA: ', bold: true }),
        new TextRun({
          text:
            `O Capital Social é de R$ ${data.capitalSocial}, dividido em quotas sociais, no valor nominal de R$ 1,00 (um real) cada uma, ` +
            'já totalmente integralizado em moeda corrente nacional e devidamente distribuído pelo único sócio da seguinte forma:',
        }),
      ],
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: data.titular.nome, bold: true }),
        new TextRun({ text: ' — QUOTAS: _______ / VALOR: R$ _______' }),
      ],
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Parágrafo Único: ', bold: true }),
        new TextRun({
          text:
            'A responsabilidade do único sócio é restrita ao valor da integralização do Capital Social, ' +
            'nos termos do artigo 1.052 da Lei nº 10.406 de 2002 e artigo 997 da mesma legislação.',
        }),
      ],
      spacing: { after: 240 },
    }),
  ];
}

function buildSluAdministracaoClause(data: GenerateLtdaDto): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: 'CLÁUSULA SÉTIMA: ', bold: true }),
        new TextRun({
          text:
            `A administração da Sociedade Limitada Unipessoal será exercida isoladamente e individualmente por prazo indeterminado ` +
            `pelo sócio único ${data.titular.nome}, cabendo-lhe gerir os negócios financeiros da empresa, assinando separadamente todos os ` +
            'documentos necessários à gestão, ficando dispensado de prestar caução, razão pela qual compete ao administrador a direção dos ' +
            'negócios sociais e a prática dos atos necessários ao funcionamento normal e regular das atividades econômicas da sociedade, ' +
            'podendo receber, dar quitação, pagar contas em geral, contrair obrigações, abrir, movimentar e encerrar contas bancárias, ' +
            'representar de qualquer forma a sociedade perante às Administrações Públicas: Federal, Estadual, Municipal e Autarquias, ' +
            'bem como representar a sociedade ante qualquer outra instituição pública ou privada, podendo adquirir, vender, alienar, ' +
            'gravar ou onerar bens móveis e imóveis, ou quotas representativas do capital social da sociedade, constituir penhor de ' +
            'qualquer natureza, inclusive caução de títulos e de direitos creditórios, prestar garantias fidejussórias às sociedades ' +
            'subsidiárias, controladas ou coligadas, representar a sociedade ativa e passivamente, em juízo ou fora dele, constituir ' +
            'Procuradores por instrumento público ou particular de mandato nos termos dos artigos 997, VI; 1.013; 1.015 e 1.064 do ' +
            'Código Civil de 2002.',
        }),
      ],
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Parágrafo Primeiro: ', bold: true }),
        new TextRun({
          text:
            `O administrador e único sócio ${data.titular.nome} declara, sob as penas da lei, ` +
            'que não está impedido de exercer a administração da sociedade, por lei especial, ou em virtude de condenação criminal, ' +
            'ou por se encontrar sob os efeitos dela, a pena que vede, ainda que temporariamente, o acesso a cargos públicos; ' +
            'ou por crime falimentar, de prevaricação, peita ou suborno, concussão, peculato, ou contra a economia popular, ' +
            'contra o sistema financeiro nacional, contra normas de defesa da concorrência, contra as relações de consumo, ' +
            'fé pública, ou a propriedade (art. 1.011, § 1º; CC/2002).',
        }),
      ],
      spacing: { after: 160 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Parágrafo Segundo: ', bold: true }),
        new TextRun({
          text: 'Fica vedado o uso da denominação social em: fianças, avais, endossos ou assuntos e negócios alheios e estranhos aos fins sociais.',
        }),
      ],
      spacing: { after: 160 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Parágrafo Terceiro: ', bold: true }),
        new TextRun({
          text: 'O único sócio poderá fazer uma retirada mensal a título de "Pró-Labore", bem como poderá antecipar distribuição de lucros, nos moldes da legislação vigente.',
        }),
      ],
      spacing: { after: 160 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Parágrafo Quarto: ', bold: true }),
        new TextRun({
          text: 'Nos quatro meses seguintes ao término do exercício, o sócio deliberará sobre as contas e designará administrador(es) quando for o caso (Arts. 1.071 e 1.072, § 2º e Art. 1.078, CC/2002).',
        }),
      ],
      spacing: { after: 160 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Parágrafo Quinto: ', bold: true }),
        new TextRun({
          text: 'Os lucros ou prejuízos demonstrados no final de cada exercício social serão suportados ou destinados de conformidade com a maneira que o único sócio determinar.',
        }),
      ],
      spacing: { after: 160 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Parágrafo Sexto: ', bold: true }),
        new TextRun({
          text: 'A sociedade poderá levantar balanços periódicos, ou balancetes, durante o exercício e distribuir resultados com base nestas demonstrações contábeis.',
        }),
      ],
      spacing: { after: 160 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Parágrafo Sétimo: ', bold: true }),
        new TextRun({
          text:
            'Quando da liquidação, dissolução ou extinção da sociedade, será liquidante o único sócio. Em caso de falência, morte ou incapacidade do único sócio, ' +
            'a sociedade não dissolverá, podendo ser vendida a terceiros ou, caso os herdeiros decidam liquidá-la, a liquidação será feita com base em Balanço ' +
            'Patrimonial levantado para essa finalidade e distribuída de conformidade com a Legislação vigente à época.',
        }),
      ],
      spacing: { after: 160 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Parágrafo Oitavo: ', bold: true }),
        new TextRun({
          text: 'Em casos de omissão, este instrumento será regido pela Lei nº 10.406/2002 e, supletivamente, pela Lei nº 6.404/1976 que rege as Sociedades Anônimas, sem prejuízo das disposições supervenientes.',
        }),
      ],
      spacing: { after: 160 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Parágrafo Nono: ', bold: true }),
        new TextRun({
          text: `Para dirimir as dúvidas oriundas deste Contrato, fica eleito o Foro da Comarca de ${data.endereco.split(',')[0]}.`,
        }),
      ],
      spacing: { after: 160 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Parágrafo Décimo: ', bold: true }),
        new TextRun({
          text:
            'Em conformidade com o disposto na Medida Provisória 881 de 30 de abril de 2019, que incluiu o parágrafo único ao art. 1.052 do Código Civil Brasileiro (Lei 10.406/02), ' +
            'permitindo a existência da sociedade limitada por uma única pessoa/sócio, ao presente contrato se aplicará o permissivo legal vigente e, no que couber, as disposições legais, ' +
            'permanecendo a presente sociedade por prazo indeterminado.',
        }),
      ],
      spacing: { after: 300 },
    }),
  ];
}

function buildSluEncerramento(data: GenerateLtdaDto): Paragraph[] {
  return [
    new Paragraph({
      children: [
        new TextRun({
          text: `O sócio assina este instrumento particular em 3 (três) vias de igual teor e ordem, ficando arquivada na Junta Comercial do Estado, para que possa surtir os devidos efeitos legais.`,
        }),
      ],
      spacing: { before: 200, after: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '___________________________, _____ de __________________ de _________',
        }),
      ],
      spacing: { after: 600 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: '________________________________________' }),
      ],
      spacing: { after: 80 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: data.titular.nome, bold: true })],
      spacing: { after: 40 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `CPF: ${data.titular.cpf}` })],
      spacing: { after: 40 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `CNPJ: ${data.cnpj}` })],
    }),
  ];
}

// ================================================================
// LTDA — CONTRATO SOCIAL DE SOCIEDADE EMPRESARIAL LIMITADA
// ================================================================

function buildLtdaContrato(data: GenerateLtdaDto): Document {
  const allSocios = [data.titular, ...data.socios];

  return new Document({
    sections: [
      {
        children: [
          buildTitle(data),
          buildLegalBasis(),
          ...buildSocios(allSocios),
          buildClause(
            'I',
            'DA DENOMINAÇÃO SOCIAL E SEDE',
            `A sociedade girará sob o nome empresarial de ${data.nomeEmpresarial} e terá sua sede no seguinte endereço: ${data.endereco}. ` +
              `Parágrafo Único: Está autorizada a sociedade a qualquer tempo, constituir filiais no país por deliberação dos sócios.`,
          ),
          buildClause(
            'II',
            'DO OBJETO SOCIAL',
            `A sociedade terá como objeto social: ${data.atividade}.`,
          ),
          ...buildCapitalClause(data, allSocios),
          buildClause(
            'IV',
            'DA CESSÃO E TRANSFERÊNCIA DAS QUOTAS',
            'As quotas da sociedade são indivisíveis e não poderão ser cedidas ou transferidas sem o expresso consentimento dos demais sócios, ' +
              'cabendo em igualdade de condições e preço, o direito de preferência ao sócio que queira adquiri-las. ' +
              '§ 1º - O sócio que pretenda ceder ou transferir todas ou parte de suas quotas deverá manifestar sua intenção por escrito aos outros sócios, ' +
              'assistindo a estes o prazo de 30 (trinta) dias para que possam exercer o direito de preferência, ou optar pela dissolução da sociedade.',
          ),
          buildClause(
            'V',
            'INÍCIO DAS ATIVIDADES E PRAZO DE DURAÇÃO',
            'A sociedade iniciará suas atividades em ___/___/______ e seu prazo de duração é por tempo indeterminado.',
          ),
          buildClause(
            'VI',
            'DA ADMINISTRAÇÃO',
            'A administração da sociedade, responsável pela representação desta ativa e passivamente, judicial e extrajudicialmente, ' +
              `será exercida por todos os sócios acima qualificados. ` +
              'Parágrafo Único: Os sócios não poderão, em qualquer circunstância, praticar atos de liberalidade em nome da sociedade, ' +
              'tais como a prestação de garantias de favor e outros atos estranhos ou prejudiciais aos objetivos e negócios sociais, ' +
              'configurando-se justa causa para efeito de exclusão do sócio nos termos do art. 1.085 do Código Civil.',
          ),
          buildClause(
            'VII',
            'DO PRÓ-LABORE',
            'Os sócios terão direito a uma retirada a título de pró-labore que será fixado de comum acordo entre os sócios, ' +
              'obedecidos os limites legais da legislação do imposto de renda.',
          ),
          buildClause(
            'VIII',
            'DO BALANÇO E PRESTAÇÃO DE CONTAS',
            'No dia 31 de dezembro de cada ano, o administrador procederá ao levantamento do balanço patrimonial e de resultado econômico e, ' +
              'apurados os resultados do exercício, após as deduções previstas em lei e formação das reservas que forem consideradas necessárias, ' +
              'os lucros e prejuízos serão distribuídos e suportados pelos sócios, proporcionalmente às quotas do capital social que detiverem. ' +
              '§ 1º - Nos quatro meses seguintes ao término do exercício social, os sócios deliberarão sobre as contas e designarão administrador, quando for o caso.',
          ),
          buildClause(
            'IX',
            'DO FALECIMENTO OU INCAPACIDADE SUPERVENIENTE',
            'No caso de falecimento ou incapacidade superveniente de quaisquer dos sócios será realizado, em 30 (trinta) dias da ocorrência, um balanço especial. ' +
              'Convindo aos sócios remanescentes e concordando os herdeiros, será lavrado termo de alteração contratual com a inclusão destes. ' +
              '§ 1º - Caso não venham os herdeiros a integrar a sociedade, estes receberão seus haveres em moeda corrente, apurados até a data do impedimento ou falecimento, ' +
              'em 10 (dez) prestações mensais e sucessivas, corrigidas monetariamente pelo IGP-M (FGV), ou outro índice que o venha substituir, ' +
              'vencendo-se a primeira parcela após 30 (trinta) dias da data do balanço especial. ' +
              '§ 2º - Em permanecendo apenas um sócio, este terá o prazo de 180 (cento e oitenta) dias para recompor a pluralidade social.',
          ),
          buildClause(
            'X',
            'DO DESIMPEDIMENTO CRIMINAL',
            'O Administrador declara, sob as penas da Lei, que não está impedido de exercer a Administração da empresa, por Lei especial, ' +
              'ou em virtude de condenação criminal, ou por se encontrar sob os efeitos dela, a pena que vede, ainda que temporariamente, ' +
              'o acesso a cargos públicos, ou por crime falimentar, de prevaricação, peita ou suborno, concussão, peculato, ou contra a ' +
              'economia popular, contra o sistema financeiro nacional, contra normas de defesa de concorrência, contra as relações de consumo, ' +
              'fé pública, ou a propriedade (art. 1.011, Lei 10.406 de 10/01/2002).',
          ),
          buildClause(
            'XI',
            'DO FORO DE ELEIÇÃO',
            `Fica eleito o Foro da Comarca de ${data.endereco.split(',')[0]}, para qualquer ação fundada neste contrato, ` +
              'com exclusão expressa de qualquer outro, por mais privilegiado que seja.',
          ),
          ...buildEncerramento(allSocios),
        ],
      },
    ],
  });
}

// ===============================
// LTDA: TÍTULO
// ===============================

function buildTitle(data: GenerateLtdaDto): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'CONTRATO SOCIAL DE CONSTITUIÇÃO DE SOCIEDADE EMPRESARIAL LIMITADA',
        bold: true,
        size: 32,
      }),
      new TextRun({ text: '\n', break: 1 }),
      new TextRun({ text: data.nomeEmpresarial, bold: true, size: 28 }),
      new TextRun({ text: '\n', break: 1 }),
      new TextRun({ text: `CNPJ: ${data.cnpj}`, size: 24 }),
    ],
    spacing: { after: 400 },
  });
}

// ===============================
// LTDA: BASE LEGAL
// ===============================

function buildLegalBasis(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: 'Pelo presente instrumento particular com regulamentação pelo Código Civil (Lei Federal n. 10.406, de 10 de janeiro de 2002) e, eventualmente, pela Lei n. 6.404, de 15 de dezembro de 1976 (Lei das Sociedades por Ações), firmam o presente contrato os abaixo assinados:',
      }),
    ],
    spacing: { after: 300 },
  });
}

// ===============================
// LTDA: SÓCIOS
// ===============================

function buildSocios(
  socios: Array<{ nome: string; cpf: string }>,
): Paragraph[] {
  const intro = new Paragraph({
    children: [
      new TextRun({
        text: 'Os sócios abaixo identificados resolvem constituir uma sociedade limitada:',
        bold: true,
      }),
    ],
    spacing: { after: 200 },
  });

  const sociosParagraphs = socios.map(
    (socio, index) =>
      new Paragraph({
        children: [
          new TextRun({ text: `SÓCIO ${index + 1}: `, bold: true }),
          new TextRun({
            text: `${socio.nome}, inscrito(a) no CPF sob o nº ${socio.cpf}.`,
          }),
        ],
        spacing: { after: 120 },
      }),
  );

  const spacer = new Paragraph({
    children: [new TextRun({ text: '' })],
    spacing: { after: 200 },
  });

  return [intro, ...sociosParagraphs, spacer];
}

// ===============================
// LTDA: CLÁUSULA GENÉRICA
// ===============================

function buildClause(roman: string, title: string, body: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: `Cláusula ${roman} - ${title} - `,
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
// LTDA: CAPITAL SOCIAL
// ===============================

function buildCapitalClause(
  data: GenerateLtdaDto,
  socios: Array<{ nome: string; cpf: string }>,
): Paragraph[] {
  const header = new Paragraph({
    children: [
      new TextRun({
        text: 'Cláusula III - DO CAPITAL SOCIAL - ',
        bold: true,
      }),
      new TextRun({
        text: `O capital social é de R$ ${data.capitalSocial}, dividido em quotas subscritas e integralizadas neste ato pelos sócios conforme abaixo:`,
      }),
    ],
    spacing: { after: 120 },
  });

  const quotaRows = socios.map(
    (socio) =>
      new Paragraph({
        children: [
          new TextRun({ text: `${socio.nome}`, bold: true }),
          new TextRun({ text: ' — QUOTAS: _______ / VALOR: R$ _______' }),
        ],
        spacing: { after: 80 },
      }),
  );

  const paragrafoUnico = new Paragraph({
    children: [
      new TextRun({ text: 'Parágrafo Único: ', bold: true }),
      new TextRun({
        text: 'A responsabilidade dos sócios é restrita ao valor de suas quotas, mas todos respondem solidariamente pelo capital social, de acordo com o art. 1.052 do Código Civil/2002.',
      }),
    ],
    spacing: { after: 240 },
  });

  return [header, ...quotaRows, paragrafoUnico];
}

// ===============================
// LTDA: ENCERRAMENTO E ASSINATURAS
// ===============================

function buildEncerramento(
  socios: Array<{ nome: string; cpf: string }>,
): Paragraph[] {
  const closing = new Paragraph({
    children: [
      new TextRun({
        text: 'E por estarem assim, justos e contratados, os sócios obrigam-se a cumprir o presente contrato, na presença de duas testemunhas, assinando-o em três vias de igual teor para registro na Junta Comercial do Estado em que a sociedade se encontra.',
      }),
    ],
    spacing: { before: 200, after: 400 },
  });

  const localData = new Paragraph({
    children: [
      new TextRun({
        text: '___________________________, _____ de __________________ de _________',
      }),
    ],
    spacing: { after: 600 },
  });

  const sociosTitle = new Paragraph({
    children: [new TextRun({ text: 'SÓCIOS:', bold: true })],
    spacing: { after: 200 },
  });

  const socioSignatures = socios.flatMap((socio) => [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: '________________________________________' }),
      ],
      spacing: { after: 80 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: socio.nome, bold: true })],
      spacing: { after: 40 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `CPF: ${socio.cpf}` })],
      spacing: { after: 300 },
    }),
  ]);

  const testemunhasTitle = new Paragraph({
    children: [new TextRun({ text: 'TESTEMUNHAS:', bold: true })],
    spacing: { after: 200 },
  });

  const testemunhasBlocks = [1, 2].flatMap((n) => [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: '________________________________________' }),
      ],
      spacing: { after: 80 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `Testemunha ${n}` })],
      spacing: { after: 40 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'CPF nº _________________' })],
      spacing: { after: 300 },
    }),
  ]);

  return [
    closing,
    localData,
    sociosTitle,
    ...socioSignatures,
    testemunhasTitle,
    ...testemunhasBlocks,
  ];
}
