export type MainCategory = 'CABELO' | 'BARBA' | 'ACESSÓRIOS';

export type HoldLevel = 1 | 2 | 3 | 4;
export type ShineLevel = 1 | 2 | 3 | 4;

export interface Product {
  id: string;
  name: string;
  category: MainCategory;
  subcategory: string;
  image: string;
  price: number;
  description: string;
  purpose: string;
  benefits: string[];
  content: string;
  holdLevel: HoldLevel | null;
  shineLevel: ShineLevel | null;
  available: boolean;
}

export const STORE_INFO = {
  name: 'Arllon Fernandes Barbearia',
  logo: 'https://i.postimg.cc/15tWcqT5/d36b31c4-82c7-4f0a-b040-58e5d065b86b.png',
  whatsappUrl: 'https://wa.link/8q3k2r',
  whatsappPhone: '5521965135344',
  tagline: 'Produtos profissionais. Resultados de respeito.',
  subtitle: 'Encontre os produtos certos para modelar, cuidar e transformar cada detalhe do visual.',
  defaultPrice: 70.0,
};

export const HOLD_LABELS: Record<HoldLevel, string> = {
  1: 'Leve',
  2: 'Média',
  3: 'Forte',
  4: 'Extra forte',
};

export const SHINE_LABELS: Record<ShineLevel, string> = {
  1: 'Matte / Baixo brilho',
  2: 'Natural / Moderado',
  3: 'Alto',
  4: 'Intenso',
};

export const PRODUCTS: Product[] = [
  // --- CABELO: Pastas capilares ---
  {
    id: 'prod-01',
    name: 'Pasta Capilar Level 1 — 150 g',
    category: 'CABELO',
    subcategory: 'Pastas capilares',
    image: 'https://i.postimg.cc/6QDtVKz5/PASTA-CAPILAR-1.webp',
    price: 70.0,
    description: 'Pra cliente que quer penteado natural, sem parecer que usou produto.',
    purpose: 'Modela, estiliza e fixa os fios preservando o movimento natural do cabelo. Fácil remoção com água corrente. Indicada para uso profissional ou home care.',
    benefits: [
      'Fixação leve com alta memória de penteado e fácil espalhabilidade.',
      'Resistência à umidade com ação antiumidade.',
      'Enriquecida com Aloe Vera e Bisabolol: proteção e hidratação do couro cabeludo.',
      'Sem resíduos (zero flaking): filme flexível e transparente após a secagem.',
      'Ação umectante que previne o ressecamento dos fios.'
    ],
    content: '150 g',
    holdLevel: 1,
    shineLevel: 2,
    available: true,
  },
  {
    id: 'prod-02',
    name: 'Pasta Capilar Level 2 — 150 g',
    category: 'CABELO',
    subcategory: 'Pastas capilares',
    image: 'https://i.postimg.cc/DztnQh5f/PASTA-CAPILAR-2.webp',
    price: 70.0,
    description: 'Segura o penteado o dia todo sem pesar nem grudar no fio.',
    purpose: 'Modela, estiliza e fixa os fios preservando o movimento natural do cabelo. Fácil remoção com água corrente. Indicada para uso profissional ou home care.',
    benefits: [
      'Fixação média com alta memória de penteado e fácil espalhabilidade.',
      'Resistência à umidade com ação antiumidade.',
      'Enriquecida com Aloe Vera e Bisabolol: proteção e hidratação do couro cabeludo.',
      'Sem resíduos (zero flaking): filme flexível e transparente após a secagem.',
      'Ação umectante que previne o ressecamento dos fios.'
    ],
    content: '150 g',
    holdLevel: 2,
    shineLevel: 2,
    available: true,
  },
  {
    id: 'prod-03',
    name: 'Pasta Capilar Level 8 — 150 g',
    category: 'CABELO',
    subcategory: 'Pastas capilares',
    image: 'https://i.postimg.cc/YS4tm0N9/PASTA-CAPILAR-8.webp',
    price: 70.0,
    description: 'Disfarça grisalho na hora e ainda modela o penteado.',
    purpose: 'Maquiagem capilar temporária: modela e fixa intensamente enquanto cobre fios brancos e uniformiza a cor. Fácil remoção por lavagem.',
    benefits: [
      'Fixação extra forte Level 8.',
      'Efeito black: camuflagem imediata de fios brancos.',
      'Efeito teia de alta performance para modelagem.',
      'Ação dermocalmante com Aloe Vera e Bisabolol.',
      'Alta resistência à umidade e acabamento profissional.'
    ],
    content: '150 g',
    holdLevel: 4,
    shineLevel: 1,
    available: true,
  },

  // --- CABELO: Cremes capilares ---
  {
    id: 'prod-04',
    name: 'Creme Capilar Level 6 — 75 g',
    category: 'CABELO',
    subcategory: 'Cremes capilares',
    image: 'https://i.postimg.cc/7LCqTh1C/CREME-CAPILAR-6.webp',
    price: 70.0,
    description: 'Cria o efeito despenteado com fios separados e bem definidos.',
    purpose: 'Modelagem, estruturação e fixação forte sem enxágue. Promove efeito teia, alinhamento dos fios e controle de frizz com sustentação prolongada.',
    benefits: [
      'Fixação forte Level 6 com memória de penteado prolongada.',
      'Efeito teia fibroelástico com distribuição homogênea.',
      'Ação antifrizz sem resíduo esbranquiçado (flake-free).',
      'Acabamento flexível: permite remodelar o penteado ao longo do dia.',
      'Com Aloe Vera e Bisabolol: proteção da fibra e do couro cabeludo.'
    ],
    content: '75 g',
    holdLevel: 4,
    shineLevel: 2,
    available: true,
  },

  // --- CABELO: Géis ---
  {
    id: 'prod-05',
    name: 'Gel Cola Black — 300 g',
    category: 'CABELO',
    subcategory: 'Géis',
    image: 'https://i.postimg.cc/fb6D7s5L/GEL-COLA-BLACK.webp',
    price: 70.0,
    description: 'Fixação máxima e brilho pra quem pede o cabelo durinho.',
    purpose: 'Fixa e modela com alta performance, com camuflagem temporária de fios brancos por pigmentação cosmética de superfície.',
    benefits: [
      'Fixação extra forte.',
      'Efeito tonalizante temporário para fios brancos.',
      'Intensifica a cor preta dos cabelos.',
      'Zero resíduos, sem flaking.',
      'Remoção simples com água corrente.'
    ],
    content: '300 g',
    holdLevel: 4,
    shineLevel: 4,
    available: true,
  },
  {
    id: 'prod-06',
    name: 'Gel Cola Incolor — 300 g',
    category: 'CABELO',
    subcategory: 'Géis',
    image: 'https://i.postimg.cc/mr0B34Vk/GEL-COLA-INCOLOR.webp',
    price: 70.0,
    description: 'Fixação máxima e brilho pra quem pede o cabelo durinho.',
    purpose: 'Modelagem capilar com alta fixação e brilho, de fácil remoção com água corrente.',
    benefits: [
      'Fixação extra forte.',
      'Efeito memória e brilho molhado.',
      'Zero resíduos, sem flaking.',
      'Fórmula com glicerina vegetal.',
      'Uso profissional.'
    ],
    content: '300 g',
    holdLevel: 4,
    shineLevel: 4,
    available: true,
  },

  // --- CABELO: Ceras capilares ---
  {
    id: 'prod-07',
    name: 'Cera Capilar Level 7 — 150 g',
    category: 'CABELO',
    subcategory: 'Ceras capilares',
    image: 'https://i.postimg.cc/W4DsJzmt/CERA-CAPILAR-7.webp',
    price: 70.0,
    description: 'Define cacho e onda com acabamento seco, sem pesar o fio.',
    purpose: 'Fixação extra forte e alta sustentação com acabamento fosco, preservando o aspecto natural do penteado.',
    benefits: [
      'Fixação extra forte Level 7 com memória de estilização.',
      'Efeito matte natural sem brilho excessivo.',
      'Efeito teia para maior espalhabilidade e moldagem.',
      'Resistente à umidade e de fácil remoção no enxágue.',
      'Com extrato de Aloe Vera e Bisabolol.'
    ],
    content: '150 g',
    holdLevel: 4,
    shineLevel: 1,
    available: true,
  },
  {
    id: 'prod-08',
    name: 'Cera Capilar Level 3 — 75 g',
    category: 'CABELO',
    subcategory: 'Ceras capilares',
    image: 'https://i.postimg.cc/GpZdPRzb/CERA-CAPILAR-3.webp',
    price: 70.0,
    description: 'Efeito seco moderno, textura visível sem parecer produto na cabeça.',
    purpose: 'Proporciona fixação extra forte e alta sustentação com acabamento fosco e efeito seco, preservando o aspecto natural do penteado.',
    benefits: [
      'Acabamento matte seco: efeito fosco natural sem brilho oleoso.',
      'Fixação Level 3: estruturação flexível e duradoura com efeito memória.',
      'Ação antifrizz e sem resíduo: filme protetor leve que evita o esfarelamento.',
      'Penteabilidade superior e estilização precisa para bancada.',
      'Com Bisabolol e Aloe Vera: ação dermoprotetora do couro cabeludo.'
    ],
    content: '75 g',
    holdLevel: 4,
    shineLevel: 1,
    available: true,
  },

  // --- CABELO: Finalizadores e modeladores ---
  {
    id: 'prod-09',
    name: 'Bisnaga Shine Wax — 120 ml',
    category: 'CABELO',
    subcategory: 'Finalizadores e modeladores',
    image: 'https://i.postimg.cc/Zq9JynPZ/BISNAGA-SHINE-WAX.webp',
    price: 70.0,
    description: 'Aquele brilho de barbearia clássica, ideal pro penteado molhado.',
    purpose: 'Modela, estiliza e fixa os fios com brilho moderado e definição, sem comprometer o movimento natural. Fácil remoção com água corrente.',
    benefits: [
      'Fixação extra forte com brilho.',
      'Alta memória de penteado.',
      'Sem resíduos brancos.',
      'Fácil remoção com água corrente.',
      'Uso profissional ou home care.'
    ],
    content: '120 ml',
    holdLevel: 4,
    shineLevel: 4,
    available: true,
  },

  // --- CABELO: Modeladores em pó ---
  {
    id: 'prod-10',
    name: 'Pó Modelador — 15 g',
    category: 'CABELO',
    subcategory: 'Modeladores em pó',
    image: 'https://i.postimg.cc/nLsnQrKx/PO-MODELADOR.webp',
    price: 70.0,
    description: 'Dá volume na raiz na hora, sem pesar nem parecer produto.',
    purpose: 'Modela e texturiza dando volume na raiz, com acabamento seco e sem resíduos.',
    benefits: [
      'Efeito matte absoluto: acabamento natural e totalmente opaco.',
      'Volume imediato e textura com sustentação firme desde a raiz.',
      'Controle de oleosidade: alta absorção do sebo capilar.',
      'Fixação flexível: permite remodelar o penteado ao longo do dia.',
      'Fórmula sem água: toque seco, aveludado e livre de resíduos.'
    ],
    content: '15 g',
    holdLevel: 4,
    shineLevel: 1,
    available: true,
  },

  // --- CABELO: Higiene capilar ---
  {
    id: 'prod-11',
    name: 'Shampoo Capilar Ice Cool — 250 ml',
    category: 'CABELO',
    subcategory: 'Higiene capilar',
    image: 'https://i.postimg.cc/hGJK7v8B/SHAMPOO-CAPILAR-ICE-COOL.webp',
    price: 70.0,
    description: 'Limpeza refrescante que tira o excesso de produto sem ressecar.',
    purpose: 'Higienização capilar diária com controle da oleosidade do couro cabeludo e refrescância intensa.',
    benefits: [
      'Ação ice cool: refrescância imediata no couro cabeludo.',
      'Controle dinâmico de oleosidade: limpa sem ressecar a fibra.',
      'Enriquecido com pró-vitamina B5 e Aloe Vera.',
      'Brilho perolado intenso e maciez.',
      'Alto rendimento para uso profissional e home care.'
    ],
    content: '250 ml',
    holdLevel: null,
    shineLevel: null,
    available: true,
  },

  // --- CABELO: Condicionadores ---
  {
    id: 'prod-12',
    name: 'Condicionador Capilar — 250 ml',
    category: 'CABELO',
    subcategory: 'Condicionadores',
    image: 'https://i.postimg.cc/Bv8J1b5G/CONDICIONADOR-CAPILAR.webp',
    price: 70.0,
    description: 'Desembaraça e sela o fio depois do shampoo, escova sem puxar.',
    purpose: 'Condiciona e desembaraça os fios, selando as cutículas, reduzindo o frizz e repondo lipídios sem deixar resíduos pesados.',
    benefits: [
      'Efeito teia: maior rendimento e espalhabilidade.',
      'Nutrição intensiva com manteiga de karité e óleo de amêndoas.',
      'Ação antifrizz com alinhamento imediato das cutículas.',
      'Fragrância premium com notas amadeiradas de longa duração.',
      'Livre de parabenos.'
    ],
    content: '250 ml',
    holdLevel: null,
    shineLevel: null,
    available: true,
  },

  // --- BARBA: Balms para barba ---
  {
    id: 'prod-13',
    name: 'Balm para Barba — 120 ml',
    category: 'BARBA',
    subcategory: 'Balms para barba',
    image: 'https://i.postimg.cc/R03vnh72/BALM-PARA-BARBA.webp',
    price: 70.0,
    description: 'Disciplina o fio rebelde da barba com brilho, sem parecer engordurado.',
    purpose: 'Condiciona, suaviza e alinha os pelos faciais, reduzindo o frizz e melhorando a penteabilidade. Forma filme protetor flexível que auxilia na modelagem.',
    benefits: [
      'Ação antifrizz com Dimeticona e Amodimeticona.',
      'Brilho intenso e maciez com óleo mineral e Pantenol.',
      'Fixação natural por filme flexível de PVP K90.',
      'Blindagem térmica que resiste ao calor do secador.'
    ],
    content: '120 ml',
    holdLevel: null,
    shineLevel: null,
    available: true,
  },

  // --- BARBA: Óleos para barba ---
  {
    id: 'prod-14',
    name: 'Óleo para Barba — 30 ml',
    category: 'BARBA',
    subcategory: 'Óleos para barba',
    image: 'https://i.postimg.cc/q7tpCqsS/OLEO-PARA-BARBA.webp',
    price: 70.0,
    description: 'Amacia a barba áspera e elimina a coceira do crescimento.',
    purpose: 'Emoliente e condicionante para barba e bigode. Hidrata os fios, alinha as cutículas, proporciona brilho e reduz o frizz sem residual pegajoso.',
    benefits: [
      'Blend de cinco óleos naturais: amêndoas, abacate, jojoba, argan e semente de uva.',
      'Nutrição intensa com toque seco e rápida absorção.',
      'Ação antioxidante com vitamina E.',
      'Alinha, amacia e perfuma a barba.',
      'Livre de parabenos e corantes.'
    ],
    content: '30 ml',
    holdLevel: null,
    shineLevel: null,
    available: true,
  },

  // --- ACESSÓRIOS: Esponjas Nudred ---
  {
    id: 'prod-15',
    name: 'Esponja Nudred Média — 16 mm',
    category: 'ACESSÓRIOS',
    subcategory: 'Esponjas Nudred',
    image: 'https://i.postimg.cc/6Q7BGqrD/ESPONJA-NUDRED-MEDIA.webp',
    price: 70.0,
    description: 'Abre a porta pro serviço de twist e dread, ticket mais alto.',
    purpose: 'Criar twists e dreads em cabelos crespos e cacheados.',
    benefits: [
      'Três diâmetros disponíveis na linha: 12 mm, 16 mm e 20 mm.',
      'Possibilita oferecer serviços especializados.',
      'Uso profissional.',
      'Também disponível na versão dupla.'
    ],
    content: '16 mm',
    holdLevel: null,
    shineLevel: null,
    available: true,
  },
  {
    id: 'prod-16',
    name: 'Esponja Nudred Grande — 20 mm',
    category: 'ACESSÓRIOS',
    subcategory: 'Esponjas Nudred',
    image: 'https://i.postimg.cc/Bv8J1bTy/ESPONJA-NUDRED-GRANDE.webp',
    price: 70.0,
    description: 'Abre a porta pro serviço de twist e dread, ticket mais alto.',
    purpose: 'Criar twists e dreads em cabelos crespos e cacheados.',
    benefits: [
      'Três diâmetros disponíveis na linha: 12 mm, 16 mm e 20 mm.',
      'Possibilita oferecer serviços especializados.',
      'Uso profissional.',
      'Também disponível na versão dupla.'
    ],
    content: '20 mm',
    holdLevel: null,
    shineLevel: null,
    available: true,
  },

  // --- ACESSÓRIOS: Esponjas Casca de Ovo ---
  {
    id: 'prod-17',
    name: 'Esponja Casca de Ovo Média — 16 mm',
    category: 'ACESSÓRIOS',
    subcategory: 'Esponjas Casca de Ovo',
    image: 'https://i.postimg.cc/fRqwLm9p/ESPONJA-CASCA-DE-OVO-MEDIA.webp',
    price: 70.0,
    description: 'Abre a porta pro serviço de twist e dread, ticket mais alto.',
    purpose: 'Criar twists e dreads em cabelos crespos e cacheados.',
    benefits: [
      'Modelo casca de ovo.',
      'Alternativa ao modelo tradicional.',
      'Possibilita oferecer serviços especializados.',
      'Uso profissional.'
    ],
    content: '16 mm',
    holdLevel: null,
    shineLevel: null,
    available: true,
  },
];
