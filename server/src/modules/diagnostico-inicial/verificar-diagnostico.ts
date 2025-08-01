import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { MEI_REVENUE_LIMIT, MEI_EMPLOYEE_LIMIT } from '@/constants';

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