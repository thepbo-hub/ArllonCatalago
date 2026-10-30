import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, Cookie, AlertCircle, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export type LegalDocType = 'privacidade' | 'termos' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  activeDoc: LegalDocType;
  onClose: () => void;
  onSelectDoc: (doc: LegalDocType) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeDoc,
  onClose,
  onSelectDoc,
}) => {
  // Lock background scrolling and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.position = originalStyle.position;
      document.body.style.top = originalStyle.top;
      document.body.style.width = originalStyle.width;
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto overscroll-contain animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-[#0B2340] to-[#04172B] border border-[#1687FF]/40 shadow-[0_20px_50px_rgba(4,23,43,0.95)]"
      >
        {/* Header with Title, Tabs and Close button */}
        <div className="shrink-0 p-4 sm:p-5 border-b border-[#082E5A] bg-[#04172B]/95 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#42C8FF]" />
              <h2 id="legal-modal-title" className="text-base sm:text-lg font-bold text-[#F5F8FC] uppercase tracking-wide">
                Informações Legais & Conformidade LGPD
              </h2>
            </div>

            <button
              onClick={onClose}
              aria-label="Fechar janela de informações legais"
              className="btn-3d btn-3d-navy p-2 rounded-xl text-white hover:text-[#42C8FF] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs between Documents */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <button
              onClick={() => onSelectDoc('privacidade')}
              className={`btn-3d px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeDoc === 'privacidade'
                  ? 'btn-3d-blue text-white'
                  : 'bg-[#082E5A]/50 text-[#AAB8CA] hover:text-[#F5F8FC] border border-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Política de Privacidade</span>
            </button>

            <button
              onClick={() => onSelectDoc('termos')}
              className={`btn-3d px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeDoc === 'termos'
                  ? 'btn-3d-blue text-white'
                  : 'bg-[#082E5A]/50 text-[#AAB8CA] hover:text-[#F5F8FC] border border-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Termos de Uso</span>
            </button>

            <button
              onClick={() => onSelectDoc('cookies')}
              className={`btn-3d px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeDoc === 'cookies'
                  ? 'btn-3d-blue text-white'
                  : 'bg-[#082E5A]/50 text-[#AAB8CA] hover:text-[#F5F8FC] border border-white/5'
              }`}
            >
              <Cookie className="w-4 h-4" />
              <span>Política de Cookies</span>
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-8 text-sm text-[#D4DEEB] leading-relaxed space-y-6">
          {/* Identificação e Campos para preenchimento */}
          <div className="p-4 rounded-xl bg-[#082E5A]/40 border border-[#1687FF]/20 space-y-2 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
              <span className="font-bold text-[#F5F8FC] uppercase">Dados da Empresa / Controlador</span>
              <span className="text-[#42C8FF]">Última atualização: 30 de outubro de 2026</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[#AAB8CA]">
              <div>
                <span className="block font-semibold text-[#F5F8FC]">Nome Empresarial:</span>
                <span>Arllon Fernandes Barbearia</span>
              </div>
              <div>
                <span className="block font-semibold text-[#F5F8FC]">CNPJ:</span>
                <span className="text-[#42C8FF] font-mono">[INSERIR CNPJ AQUI]</span>
              </div>
              <div>
                <span className="block font-semibold text-[#F5F8FC]">E-mail de Contato / Encarregado:</span>
                <span className="text-[#42C8FF] font-mono">[INSERIR E-MAIL DE CONTATO AQUI]</span>
              </div>
            </div>
          </div>

          {/* DOCUMENTO 1: POLÍTICA DE PRIVACIDADE */}
          {activeDoc === 'privacidade' && (
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-xl font-extrabold text-[#F5F8FC] uppercase tracking-wide">
                  Política de Privacidade (LGPD — Lei Federal nº 13.709/2018)
                </h3>
                <p className="text-xs text-[#AAB8CA] mt-1">
                  Transparência, proteção de dados e respeito à sua privacidade em linguagem simples e direta.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-bold text-[#F5F8FC] text-base">1. Quem somos e nosso compromisso</h4>
                <p>
                  A <strong>Arllon Fernandes Barbearia</strong> valoriza a sua privacidade. Esta política tem por objetivo explicar de forma clara, transparente e acessível como lidamos com os dados pessoais quando você navega em nosso biosite/catálogo comercial e quando entra em contato conosco via WhatsApp.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#F5F8FC] text-base">2. Como nosso catálogo funciona e quais dados tratamos</h4>
                <p>
                  Nosso site é um <strong>catálogo comercial digital informativo</strong>. Não exigimos cadastro prévio, criação de conta de usuário com senha, nem coletamos dados de cartões de crédito ou bancários dentro do site:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#AAB8CA]">
                  <li>
                    <strong className="text-[#F5F8FC]">Itens no Carrinho de Compras:</strong> Os produtos que você adiciona ao carrinho ficam salvos temporariamente <em>apenas no seu próprio navegador</em> (via armazenamento local/sessão). Eles não são gravados em servidores externos nem compartilhados com terceiros. Ao fechar a sessão ou finalizar o pedido, esses dados são limpos.
                  </li>
                  <li>
                    <strong className="text-[#F5F8FC]">Dados ao Enviar Pedido via WhatsApp:</strong> Ao clicar em "Finalizar Pedido pelo WhatsApp", você é redirecionado voluntariamente para o aplicativo oficial do WhatsApp. Na conversa, é gerada uma lista em texto com os produtos que você escolheu. Você é quem decide enviar a mensagem, podendo informar seu nome para atendimento personalizado.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#F5F8FC] text-base">3. Bases Legais para Tratamento (Art. 7º da LGPD)</h4>
                <p>
                  O tratamento dos dados estritamente necessários para viabilizar o atendimento baseia-se em:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#AAB8CA]">
                  <li>
                    <strong>Execução de procedimentos preliminares relacionados a contrato a pedido do titular (Art. 7º, V):</strong> para consultar disponibilidade de produtos, confirmar valores e agendar atendimentos.
                  </li>
                  <li>
                    <strong>Legítimo interesse (Art. 7º, IX):</strong> para garantir a segurança da navegação e o correto funcionamento técnico do catálogo.
                  </li>
                  <li>
                    <strong>Consentimento (Art. 7º, I):</strong> quando você aceita expressamente o envio da mensagem ou o uso de preferências no site.
                  </li>
                </ul>
              </section>

              {/* Canal de Direitos do Titular */}
              <section className="p-4 rounded-xl bg-[#082E5A]/50 border border-[#42C8FF]/40 space-y-3">
                <div className="flex items-center gap-2 text-[#42C8FF]">
                  <Mail className="w-5 h-5 shrink-0" />
                  <h4 className="font-bold text-[#F5F8FC] text-base">
                    4. Canal Oficial para Direitos do Titular de Dados (Art. 18 da LGPD)
                  </h4>
                </div>
                <p className="text-xs sm:text-sm">
                  De acordo com a Lei Geral de Proteção de Dados, você tem o direito de solicitar a qualquer momento, de forma simples e gratuita:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#D4DEEB]">
                  <div className="p-2.5 rounded-lg bg-[#04172B]/60 border border-white/5">
                    ✓ Confirmação da existência de tratamento de dados
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#04172B]/60 border border-white/5">
                    ✓ Acesso e correção de dados incompletos ou inexatos
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#04172B]/60 border border-white/5">
                    ✓ Anonimização, bloqueio ou eliminação de dados
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#04172B]/60 border border-white/5">
                    ✓ Revogação do consentimento concedido
                  </div>
                </div>
                <p className="text-xs text-[#AAB8CA]">
                  Para exercer seus direitos de titular, entre em contato diretamente com o Encarregado pelo e-mail <strong className="text-[#42C8FF]">[INSERIR E-MAIL DE CONTATO AQUI]</strong> ou pelo canal de WhatsApp oficial <strong className="text-[#F5F8FC]">(38) 99805-4704</strong>. Responderemos no menor prazo possível, observando as diretrizes da Autoridade Nacional de Proteção de Dados (ANPD).
                </p>
              </section>

              {/* Tabela de Serviços de Terceiros e Scripts */}
              <section className="space-y-3">
                <h4 className="font-bold text-[#F5F8FC] text-base">5. Serviços de Terceiros e Rastreamento</h4>
                <p className="text-xs sm:text-sm">
                  Revisamos periodicamente todos os scripts, dependências e serviços conectados ao site para assegurar que não haja coleta abusiva de dados:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-white/10 rounded-lg overflow-hidden">
                    <thead className="bg-[#082E5A] text-[#F5F8FC]">
                      <tr>
                        <th className="p-3">Serviço / Terceiro</th>
                        <th className="p-3">Finalidade</th>
                        <th className="p-3">O que coleta</th>
                        <th className="p-3">Base / Controle</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-[#AAB8CA]">
                      <tr>
                        <td className="p-3 font-semibold text-[#F5F8FC]">WhatsApp (Meta Platforms)</td>
                        <td className="p-3">Canal direto para envio do pedido e atendimento humano</td>
                        <td className="p-3">Apenas a mensagem e o número que o próprio usuário envia voluntariamente no app</td>
                        <td className="p-3">Iniciado exclusivamente pelo usuário</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#F5F8FC]">YourImageShare (Hospedagem de Mídia)</td>
                        <td className="p-3">Exibição do vídeo demonstrativo de corte em plano de fundo</td>
                        <td className="p-3">Apenas requisição técnica padrão de mídia (MP4). Não executa scripts externos.</td>
                        <td className="p-3">Pausável a qualquer momento (WCAG)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#F5F8FC]">Armazenamento Local do Navegador</td>
                        <td className="p-3">Salvar os produtos adicionados ao carrinho e preferência de cookies</td>
                        <td className="p-3">Identificador do produto, quantidade e status de aceite do aviso</td>
                        <td className="p-3">Fica no próprio aparelho do usuário, limpo ao fechar ou esvaziar</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#F5F8FC]">Google Fonts (Fontes externas)</td>
                        <td className="p-3">Desativado / Fontes hospedadas localmente</td>
                        <td className="p-3"><strong className="text-[#35D49A]">Nenhum dado</strong> (Eliminado para evitar compartilhamento de IP)</td>
                        <td className="p-3">Conformidade total</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-[#F5F8FC]">Pixels de Anúncios / Google Analytics</td>
                        <td className="p-3">Nenhum pixel ou rastreador ativo no site</td>
                        <td className="p-3"><strong className="text-[#35D49A]">Nenhum dado coletado</strong></td>
                        <td className="p-3">Bloqueio padrão nativo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#F5F8FC] text-base">6. Segurança da Informação</h4>
                <p>
                  Adotamos medidas técnicas adequadas, como tráfego criptografado via HTTPS, isolamento de armazenamento no navegador e ausência de banco de dados aberto de clientes no frontend, protegendo seus dados contra acessos não autorizados.
                </p>
              </section>
            </div>
          )}

          {/* DOCUMENTO 2: TERMOS DE USO */}
          {activeDoc === 'termos' && (
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-xl font-extrabold text-[#F5F8FC] uppercase tracking-wide">
                  Termos e Condições de Uso do Catálogo
                </h3>
                <p className="text-xs text-[#AAB8CA] mt-1">
                  Regras claras de utilização, responsabilidades e esclarecimentos comerciais.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-bold text-[#F5F8FC] text-base">1. Natureza Informativa do Catálogo</h4>
                <p>
                  Este site constitui uma vitrine comercial e catálogo digital dos produtos profissionais e serviços da <strong>Arllon Fernandes Barbearia</strong>, com o intuito de facilitar a escolha e o contato do cliente com a nossa equipe.
                </p>
              </section>

              {/* Aviso Informativo Obrigatório sobre Preços, Horários e Status */}
              <section className="p-4 rounded-xl bg-[#082E5A]/50 border border-[#1687FF]/40 space-y-2">
                <div className="flex items-center gap-2 text-[#42C8FF]">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <h4 className="font-bold text-[#F5F8FC] text-base">
                    2. Aviso Importante: Preços, Horários e Disponibilidade Informativos
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#F5F8FC]">
                  <strong>Atenção:</strong> Todos os preços, fotografias, descrições, níveis de fixação/brilho, disponibilidade de estoque e horários de atendimento exibidos neste biosite possuem <strong>caráter estritamente informativo</strong>.
                </p>
                <p className="text-xs text-[#AAB8CA]">
                  Os valores e a disponibilidade física de cada produto ou horário de agendamento estão sujeitos a confirmação final no momento da troca de mensagens com o atendente via WhatsApp. Eventuais promoções possuem prazos e estoques limitados.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#F5F8FC] text-base">3. Como Funciona a Compra e Entrega</h4>
                <p>
                  A finalização do pedido não é concluída dentro do navegador com cartão de crédito, mas sim pelo atendimento direto da barbearia no WhatsApp oficial. A forma de pagamento (Pix, dinheiro ou cartão na entrega/retirada) e as opções de retirada na barbearia ou envio serão combinadas diretamente com nossa equipe.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#F5F8FC] text-base">4. Propriedade Intelectual</h4>
                <p>
                  A marca "Arllon Fernandes Barbearia", logotipos, composições visuais e conteúdos autorais pertencem exclusivamente à Arllon Fernandes Barbearia. As marcas comerciais dos produtos cosméticos exibidos (pomadas, cremes, balms, óleos) pertencem a seus respectivos fabricantes e são reproduzidas no catálogo com finalidade legítima de revenda e identificação dos produtos.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#F5F8FC] text-base">5. Legislação Aplicável e Foro</h4>
                <p>
                  Estes termos são regidos pelas leis da República Federativa do Brasil, em especial o Marco Civil da Internet (Lei nº 12.965/2014) e o Código de Defesa do Consumidor (Lei nº 8.078/1990).
                </p>
              </section>
            </div>
          )}

          {/* DOCUMENTO 3: POLÍTICA DE COOKIES */}
          {activeDoc === 'cookies' && (
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-xl font-extrabold text-[#F5F8FC] uppercase tracking-wide">
                  Política de Cookies e Armazenamento Local
                </h3>
                <p className="text-xs text-[#AAB8CA] mt-1">
                  Entenda exatamente o que é gravado no seu navegador ao utilizar o site.
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-bold text-[#F5F8FC] text-base">1. O que são cookies e tecnologias similares?</h4>
                <p>
                  Cookies e itens de <em>Local Storage</em> são pequenos arquivos de texto armazenados no navegador do seu dispositivo móvel ou computador para lembrar ações e preferências (como itens que você colocou no carrinho de compras).
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-[#F5F8FC] text-base">2. Quais tecnologias utilizamos neste site?</h4>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#082E5A]/40 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#F5F8FC] text-xs uppercase">
                        Armazenamento Essencial / Necessário (Carrinho de Compras)
                      </span>
                      <span className="text-[10px] font-semibold text-[#35D49A] px-2 py-0.5 rounded-full bg-[#35D49A]/10 border border-[#35D49A]/30">
                        Sempre Ativo
                      </span>
                    </div>
                    <p className="text-xs text-[#AAB8CA]">
                      Permite que você selecione produtos e monte sua lista de compras para envio via WhatsApp. Esses dados são temporários e apagados ao fechar o biosite ou limpar o carrinho. Sem eles, a função de carrinho não pode operar.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#082E5A]/40 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#F5F8FC] text-xs uppercase">
                        Armazenamento de Preferências (Aceite do Aviso de Privacidade)
                      </span>
                      <span className="text-[10px] font-semibold text-[#42C8FF] px-2 py-0.5 rounded-full bg-[#42C8FF]/10 border border-[#42C8FF]/30">
                        Preferência do Usuário
                      </span>
                    </div>
                    <p className="text-xs text-[#AAB8CA]">
                      Salva a sua escolha em relação ao aviso de cookies (`arllon_cookie_consent`), evitando que o banner reapareça em todas as páginas.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#082E5A]/40 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#F5F8FC] text-xs uppercase">
                        Cookies Analíticos e Publicitários de Terceiros (Pixel, Rastreamento)
                      </span>
                      <span className="text-[10px] font-semibold text-[#AAB8CA] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                        Desativados por padrão
                      </span>
                    </div>
                    <p className="text-xs text-[#AAB8CA]">
                      Não inserimos pixels de publicidade ou rastreadores de comportamento que compartilhem sua navegação com redes sociais ou agregadores sem sua prévia permissão.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-[#F5F8FC] text-base">3. Como gerenciar ou revogar suas preferências</h4>
                <p className="text-xs sm:text-sm">
                  Você pode a qualquer momento revogar o consentimento ou alterar sua preferência clicando no link <strong>"Preferências de Cookies"</strong> localizado no rodapé de qualquer página deste site, ou limpando o histórico do seu navegador.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="shrink-0 p-4 sm:p-5 border-t border-[#082E5A] bg-[#04172B]/95 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#AAB8CA]">
            <span>Precisa de atendimento?</span>
            <a
              href={STORE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#42C8FF] hover:underline flex items-center gap-1 font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#35D49A]" />
              <span>WhatsApp da Barbearia</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="btn-3d btn-3d-blue w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Fechar e Voltar ao Catálogo
          </button>
        </div>
      </div>
    </div>
  );
};
