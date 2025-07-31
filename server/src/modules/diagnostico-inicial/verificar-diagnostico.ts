

@Injectable()
export class DiagnosticoInicialService {
  private usuarios: Usuario[] = [];

  constructor() {

    this.usuarios.push({
    id: "1",
    faturamentoAnual: 500000,
    email: "toninho10@gmail.com",
    nome: "Antonio Henrique",
    CNPJ: "12345678000195",
    quantidadeFuncionarios: 2,
    atividadesPermitidasMEI: false,
    possuiSocio: false,
    importador: false,
    emiteNotaFiscalPessoasJuridicas: true,
    });
  }

  diagnostico(id: string) {
    const usuario = this.usuarios.find(u => u.id === id);
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    const motivos: string[] = [];
    const riscos: string[] = [];

    if (usuario.faturamentoAnual > 81000) {
      motivos.push('Faturamento anual acima do limite do MEI');
      riscos.push('Multas por desenquadramento retroativo');
    }

    if (usuario.quantidadeFuncionarios > 1) {
      motivos.push('Quantidade de funcionários maior que o permitido pelo MEI');
    }

    if (!usuario.atividadesPermitidasMEI) {
      motivos.push('Atividade não permitida no MEI');
    }

    if (usuario.possuiSocio) {
        motivos.push('Possui sócio, o que não é permitido para MEI');
        riscos.push('Desenquadramento do MEI e possíveis multas');
    }

    if (usuario.importador) {
        riscos.push('Importação de produtos pode indicar atividade fora do escopo do MEI');
    }
    if (usuario.emiteNotaFiscalPessoasJuridicas) {
      riscos.push('Emissão de nota fiscal para pessoas jurídicas pode indicar atividade fora do escopo do MEI');
    }

    const elegivel = motivos.length > 0;

    r diagnostico(id: string) {
    const usuario = this.usuarios.find(u => u.id === id);
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    const motivos: string[] = [];
    const riscos: string[] = [];

    if (usuario.faturamentoAnual > 81000) {
      motivos.push('Faturamento anual acima do limite do MEI');
      riscos.push('Multas por desenquadramento retroativo');
    }

    if (usuario.quantidadeFuncionarios > 1) {
      motivos.push('Quantidade de funcionários maior que o permitido pelo MEI');
    }

    if (!usuario.atividadesPermitidasMEI) {
      motivos.push('Atividade não permitida no MEI');
    }

    if (usuario.inadimplenteSimples) {
      riscos.push('Exclusão do Simples Nacional se pendências não forem regularizadas');
    }

    if (usuario.pendenciasFiscais) {
      riscos.push('Impedimento de migração até regularização fiscal');
    }

    const elegivel = motivos.length > 0;

    return {
      elegivel,
      motivos: elegivel ? motivos : ['Usuário ainda se enquadra como MEI'],
      riscos: riscos.length > 0 ? riscos : ['Sem riscos imediatos'],
    };
  }

  atualizar(id: string, dto: AtualizarUsuarioDto) {
    const usuario = this.usuarios.find(u => u.id === id);
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    Object.assign(usuario, dto);
    return { mensagem: 'Dados atualizados com sucesso' };
  }

  deletar(id: string) {
    const index = this.usuarios.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException('Usuário não encontrado');

    this.usuarios.splice(index, 1);
    return { mensagem: 'Usuário removido com sucesso' };
  }
}

  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CriarOuAtualizarUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(14, 14, { message: 'CNPJ deve conter exatamente 14 dígitos' })
  CNPJ: string;

  @IsNumber()
  faturamentoAnual: number;

  @IsNumber()
  quantidadeFuncionarios: number;

  @IsBoolean()
  atividadesPermitidasMEI: boolean;

  @IsBoolean()
  possuiSocio: boolean;

  @IsBoolean()
  importador: boolean;

  @IsBoolean()
  emiteNotaFiscalPessoasJuridicas: boolean;
}
