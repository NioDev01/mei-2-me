
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const diagnostico = await db.diagnosticoInicial.findUnique({
      where: { id: params.id },
      include: {
        user: true 
      },
    });

    if (!diagnostico) {
      return NextResponse.json({ error: 'Diagnóstico não encontrado' }, { status: 404 });
    }

    const validationResults = validateDiagnostico(diagnostico);

    return NextResponse.json(validationResults);
  } catch (error) {
    console.error('Erro no diagnóstico:', error);
    return NextResponse.json(
      { error: 'Erro ao processar o diagnóstico' },
      { status: 500 }
    );
  }
}

function validateDiagnostico(diagnostico: any) {
  const reasons: string[] = [];
  const legalReferences: string[] = [];
  const riskWarnings: string[] = [];
  let isEligible = true;

 
  const MEI_REVENUE_LIMIT = 97200; 
  const revenue = parseInt(diagnostico.faturamento) || 0;
  
  if (revenue > MEI_REVENUE_LIMIT) {
    isEligible = false;
    reasons.push(`Faturamento anual de R$ ${revenue.toLocaleString('pt-BR')} excede o limite MEI de R$ ${MEI_REVENUE_LIMIT.toLocaleString('pt-BR')}`);
    riskWarnings.push('Multa de até R$ 5.000,00 por enquadramento incorreto');
    riskWarnings.push('Exclusão do Simples Nacional');
    legalReferences.push('Lei Complementar 123/2006, Art. 18-A');
  }


  const MEI_EMPLOYEE_LIMIT = 1;
  const employeeCount = parseInt(diagnostico.qtdFuncionarios) || 0;
  
  if (employeeCount > MEI_EMPLOYEE_LIMIT) {
    isEligible = false;
    reasons.push(`Possui ${employeeCount} funcionários (limite MEI: ${MEI_EMPLOYEE_LIMIT})`);
    riskWarnings.push('Multa trabalhista por contratação irregular');
    riskWarnings.push('Problemas com a Previdência Social');
    legalReferences.push('Lei Complementar 123/2006, Art. 18-A, § 2º');
  }


  if (diagnostico.possuiSocios === 'sim') {
    isEligible = false;
    reasons.push('MEI não pode ter sócios ou administradores');
    riskWarnings.push('Invalidação do CNPJ MEI');
    legalReferences.push('Lei Complementar 123/2006, Art. 18-A, § 1º');
  }


  if (diagnostico.importacaoMercadorias === 'sim') {
    isEligible = false;
    reasons.push('MEI não pode realizar importação de mercadorias');
    riskWarnings.push('Multa da Receita Federal por operação irregular');
    legalReferences.push('Lei Complementar 123/2006, Art. 18-A, § 4º');
  }

  if (diagnostico.emiteNotaPJ === 'sim') {
    isEligible = false;
    reasons.push('MEI deve emitir principalmente notas para pessoas físicas');
    riskWarnings.push('Fiscalização mais rigorosa da Receita');
    legalReferences.push('Instrução Normativa RFB nº 1.868/2018');
  }

  
  if (diagnostico.pisoSalarial === 'sim') {
    reasons.push('Pagamento acima do piso salarial pode indicar vínculo empregatício');
    legalReferences.push('CLT, Art. 3º');
  }

  
  const ATIVIDADES_PROIBIDAS = [
    'bancos',
    'seguros',
    'locação de imóveis próprios'
  ];
  
  if (ATIVIDADES_PROIBIDAS.some(atividade => 
    diagnostico.possibilidades?.toLowerCase().includes(atividade)
  )) {
    isEligible = false;
    reasons.push('Atividade não permitida para MEI');
    riskWarnings.push('Cassação do CNPJ MEI');
    legalReferences.push('Anexo XI da LC 123/2006');
  }

 
  const gastos = parseInt(diagnostico.gastos) || 0;
  if (gastos > 0 && gastos >= revenue * 0.8) {
    reasons.push('Gastos muito próximos ao faturamento (acima de 80%)');
    riskWarnings.push('Possível caracterização de "fachada" para Receita');
  }


  const suggestedNextSteps = isEligible
    ? [
        'Pode permanecer como MEI',
        'Regularize seu cadastro na Receita',
        'Mantenha os documentos em dia'
      ]
    : [
        'Recomendação: Migrar para Microempresa (ME)',
        'Consulte um contador especializado',
        'Verifique os benefícios do Simples Nacional para ME'
      ];


  if (revenue >= MEI_REVENUE_LIMIT * 0.9 && revenue <= MEI_REVENUE_LIMIT) {
    reasons.push('ATENÇÃO: Faturamento próximo do limite máximo (90%)');
    riskWarnings.push('Risco de ultrapassar o limite no próximo ano');
  }

  return {
    isEligible,
    reasons,
    legalReferences,
    riskWarnings,
    suggestedNextSteps,
    details: {
      faturamentoAtual: revenue,
      limiteFaturamento: MEI_REVENUE_LIMIT,
      funcionariosAtual: employeeCount,
      limiteFuncionarios: MEI_EMPLOYEE_LIMIT
    }
  };
}



export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json(); 
    
    
    const updated = await db.diagnosticoInicial.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar' },
      { status: 500 }
    );
  }
}




export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await db.diagnosticoInicial.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Deletado com sucesso' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar' },
      { status: 500 }
    );
  }
}