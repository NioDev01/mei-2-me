// src/app/api/diagnostico-inicial/[id]/resultado/route.ts

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const diagnostico = await db.diagnosticoInicial.findUnique({
      where: { id: params.id },
    });

    if (!diagnostico) {
      return NextResponse.json({ error: 'Diagnóstico não encontrado' }, { status: 404 });
    }

 
    const validationResults = validateDiagnostico(diagnostico);

    return NextResponse.json(validationResults);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar o diagnóstico' },
      { status: 500 }
    );
  }
}


function validateDiagnostico(diagnostico) {
  const reasons = []; 
  const legalReferences = []; 
  const riskWarnings = []; 
  let isEligible = true; 


  const MEI_REVENUE_LIMIT = 97200;
  const revenue = parseInt(diagnostico.faturamento) || 0;
  if (revenue > MEI_REVENUE_LIMIT) {
    isEligible = false;
    reasons.push(`Faturamento acima do limite (R$ ${MEI_REVENUE_LIMIT})`);
    riskWarnings.push('Multas e exclusão do Simples Nacional');
    legalReferences.push('Lei Complementar 123/2006, Art. 18-A');
  }


  const employeeCount = parseInt(diagnostico.qtdFuncionarios) || 0;
  if (employeeCount > 1) {
    isEligible = false;
    reasons.push(`Muitos funcionários (${employeeCount})`);
    riskWarnings.push('Multas trabalhistas');
    legalReferences.push('Lei Complementar 123/2006, Art. 18-A, § 2º');
  }



  return {
    isEligible,
    reasons,
    legalReferences,
    riskWarnings,
    suggestedNextSteps: isEligible 
      ? ['Pode continuar como MEI'] 
      : ['Mudar para Microempresa']
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