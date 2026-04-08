import { useState } from "react";
import useCheckEmail from "../hooks/useCheckEmail";
import useCheckPhone from "../hooks/useCheckPhone";
import { signupRequest, SignupData } from "../services/api";
import HeaderBackLink from "../components/HeaderBackLink";
import "../index.css";

function SignupForm() {
  
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    data_nascimento: "",
    complemento: "",
    cep: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    cpf: "",
  });

  const {
    validarEmail,
    success: emailSuccess,
    loading: emailLoading,
  } = useCheckEmail();

  const {
    validarCelular,
    success: phoneSuccess,
    loading: phoneLoading,
  } = useCheckPhone();

  const verificaSignUp = async () => {
    try {
      const payload: SignupData = {
        ...formData,
        cpf: formData.cpf.replace(/\D/g, ""),
        cep: formData.cep.replace(/\D/g, ""),
        telefone: formData.telefone.replace(/\D/g, ""),
      };

      await signupRequest(payload);
      alert("Cadastro realizado com sucesso!");
    } catch (err: any) {
      alert(err.message || "Erro ao realizar cadastro");
    }
  };

  const senhasSaoIguais = formData.senha === formData.confirmarSenha;

  return (
    <div className="body bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl ">
        <div className="bg-white rounded-4xl shadow-xl p-10">
          
          <HeaderBackLink />

          <div className="header-forms mb-8 flex items-center justify-center border-b border-gray-400 ">
            <h2 className="text-2xl font-bold mb-1">Registre-se</h2>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium mb-1">Nome:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                type="text"
                placeholder="Nome Completo"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>

            {/* CPF */}
            <div>
              <label className="block text-sm font-medium mb-1">CPF:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              />
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block text-sm font-medium mb-1">Data de Nascimento:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                type="date"
                value={formData.data_nascimento}
                onChange={(e) => setFormData({ ...formData, data_nascimento: e.target.value })}
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium mb-1">Telefone:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                type="text"
                placeholder="Seu telefone"
                value={formData.telefone}
                onBlur={() => validarCelular(formData.telefone)}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              />
              {formData.telefone && !phoneSuccess && !phoneLoading && (
                <span className="text-red-500 text-xs">Telefone já cadastrado ou inválido</span>
              )}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Email:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                type="email"
                placeholder="Seu e-mail"
                value={formData.email}
                onBlur={() => validarEmail(formData.email)}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {formData.email && !emailSuccess && !emailLoading && (
                <span className="text-red-500 text-xs">Email já cadastrado ou inválido</span>
              )}
            </div>

            {/* Endereco */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Endereço:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                type="text"
                placeholder="Insira seu endereço"
                value={formData.endereco}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
              />
            </div>

            {/* Complemento */}
            <div>
              <label className="block text-sm font-medium mb-1">Complemento:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                type="text"
                placeholder="Apto, bloco, etc"
                value={formData.complemento}
                onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
              />
            </div>

            {/* CEP */}
            <div>
              <label className="block text-sm font-medium mb-1">CEP:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                type="text"
                placeholder="Informe seu CEP"
                value={formData.cep}
                onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
              />
            </div>

            {/* Senha */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Senha:</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                type="password"
                placeholder="Crie uma senha forte"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              />
            </div>

            {/* Confirmar senha*/}
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Confirmar Senha:</label>
              <input
                className={`w-full px-4 py-3 rounded-lg border transition duration-150 ${
                  !senhasSaoIguais && formData.confirmarSenha.length > 0
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                type="password"
                placeholder="Confirme sua senha"
                value={formData.confirmarSenha}
                onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
              />
              {!senhasSaoIguais && formData.confirmarSenha.length > 0 && (
                <p className="text-red-500 text-xs mt-1 font-medium">As senhas não são iguais.</p>
              )}
            </div>

            {/* Botão */}
            <div className="mt-8 flex items-center justify-center w-full md:col-span-2">
              <button
                type="button"
                className="w-full bg-purple-600 hover:bg-purple-800 disabled:bg-gray-300 text-white 
                font-medium py-3 px-4 rounded-lg transition duration-150"
                onClick={verificaSignUp}
                disabled={!emailSuccess || !phoneSuccess || emailLoading || phoneLoading || !senhasSaoIguais}
              >
                {emailLoading || phoneLoading ? "Verificando dados..." : "Finalizar Cadastro"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;