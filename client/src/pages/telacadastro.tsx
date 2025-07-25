import { CadastroForm } from "@/features/cadastro-form";
import mei2me from '@/assets/mei2me.png';

export default function Cadastro() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <CadastroForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={mei2me}
          alt="Cadastro"
          className="absolute inset-0 h-[500px] w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
