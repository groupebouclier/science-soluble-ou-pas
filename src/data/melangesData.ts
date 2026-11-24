export type MixtureId = 'sirop' | 'huile' | 'sel' | 'riz';

export interface GlossaryTerm {
  id: string;
  word: string;
  simpleDefinition: string;
  everydayExample: string;
  accent: 'emerald' | 'amber' | 'indigo' | 'rose' | 'sky';
}

export interface LabMixture {
  id: MixtureId;
  name: string;
  ingredientsLabel: string;
  typeLabel: string;
  propertyLabel: string;
  isHomogeneous: boolean;
  simpleSummary: string;
  helpBubbleText: string;
  actionWord: string;
}

export interface SeparationTechnique {
  id: 'evaporation' | 'tamisage' | 'filtration' | 'decantation';
  title: string;
  whenToUse: string;
  simpleHow: string;
  example: string;
  helpBubble: string;
  activeStepLabel: string;
}

export interface ChoiceQuestion {
  type: 'choice';
  prompt: string;
  options: string[];
  answerIndex: number;
  hint: string;
  feedbackOk: string;
  feedbackKo: string;
}

export interface ClozeQuestion {
  type: 'select';
  before: string;
  after: string;
  choices: string[];
  answer: string;
  hint: string;
  feedbackOk: string;
  feedbackKo: string;
}

export type QuizQuestion = ChoiceQuestion | ClozeQuestion;

export interface ExerciseSet {
  id: number;
  shortTitle: string;
  subtitle: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface SortingItem {
  id: string;
  title: string;
  ingredients: string;
  visualType: 'sirop' | 'huile' | 'sel' | 'riz' | 'vinaigre' | 'sable';
  category: 'homogene' | 'heterogene';
  helpHint: string;
  explanation: string;
}

export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = {
  homogene: {
    id: 'homogene',
    word: 'homogène',
    simpleDefinition:
      'On ne voit plus qu’un seul liquide ou une seule couleur : on ne peut plus séparer les ingrédients avec nos yeux.',
    everydayExample: 'Un verre d’eau avec du sirop de fraise bien mélangé.',
    accent: 'emerald',
  },
  heterogene: {
    id: 'heterogene',
    word: 'hétérogène',
    simpleDefinition:
      'On voit encore au moins deux choses différentes dans le verre (des couches, des grains ou des morceaux).',
    everydayExample: 'De l’eau avec de l’huile ou du sable au fond du verre.',
    accent: 'amber',
  },
  miscibles: {
    id: 'miscibles',
    word: 'miscibles',
    simpleDefinition:
      'Ce mot s’utilise pour deux liquides qui acceptent de se mélanger complètement ensemble.',
    everydayExample: 'L’eau et le sirop sont miscibles.',
    accent: 'emerald',
  },
  nonMiscibles: {
    id: 'nonMiscibles',
    word: 'non miscibles',
    simpleDefinition:
      'Ce mot s’utilise pour deux liquides qui refusent de rester mélangés : ils forment deux étages séparés.',
    everydayExample: 'L’huile flotte toujours au-dessus de l’eau.',
    accent: 'amber',
  },
  soluble: {
    id: 'soluble',
    word: 'soluble',
    simpleDefinition:
      'Un solide (comme une poudre ou des petits grains) est soluble s’il disparaît dans le liquide quand on remue.',
    everydayExample: 'Le sel ou le sucre dans de l’eau.',
    accent: 'indigo',
  },
  nonSoluble: {
    id: 'nonSoluble',
    word: 'non soluble',
    simpleDefinition:
      'Un solide qui ne disparaît jamais dans le liquide : il reste visible au fond ou flotte.',
    everydayExample: 'Le riz, le sable ou les cailloux dans l’eau.',
    accent: 'rose',
  },
};

export const LAB_MIXTURES: LabMixture[] = [
  {
    id: 'sirop',
    name: 'Eau + Sirop',
    ingredientsLabel: 'Deux liquides',
    typeLabel: 'Mélange homogène',
    propertyLabel: 'Liquides miscibles',
    isHomogeneous: true,
    simpleSummary:
      'Quand on remue, le sirop et l’eau ne font plus qu’un seul liquide rose. On ne voit plus deux liquides séparés !',
    helpBubbleText:
      'Astuce CM1 : « Miscibles » commence comme « mélanger ». Deux liquides qui se mélangent bien sont miscibles.',
    actionWord: 'Mélanger avec la cuillère',
  },
  {
    id: 'huile',
    name: 'Eau + Huile',
    ingredientsLabel: 'Deux liquides',
    typeLabel: 'Mélange hétérogène',
    propertyLabel: 'Liquides non miscibles',
    isHomogeneous: false,
    simpleSummary:
      'Même si tu secoues très fort, l’huile remonte toujours au-dessus de l’eau. On voit bien deux couches différentes.',
    helpBubbleText:
      'Pourquoi l’huile monte ? Parce que l’huile est plus légère que l’eau ! Les deux liquides restent séparés.',
    actionWord: 'Secouer et observer',
  },
  {
    id: 'sel',
    name: 'Eau + Sel',
    ingredientsLabel: 'Un solide et un liquide',
    typeLabel: 'Mélange homogène',
    propertyLabel: 'Solide soluble',
    isHomogeneous: true,
    simpleSummary:
      'Les petits grains blancs de sel disparaissent à nos yeux dans l’eau : le sel s’est dissous, mais l’eau reste salée !',
    helpBubbleText:
      'Attention au piège : le sel n’a pas disparu pour de vrai ! Si tu goûtes ou si tu fais évaporer l’eau, il est toujours là.',
    actionWord: 'Remuer pour dissoudre',
  },
  {
    id: 'riz',
    name: 'Eau + Riz',
    ingredientsLabel: 'Un liquide et un solide',
    typeLabel: 'Mélange hétérogène',
    propertyLabel: 'Solide non soluble',
    isHomogeneous: false,
    simpleSummary:
      'Même en remuant longtemps, les grains de riz restent entiers au fond du verre. Ils ne disparaissent pas dans l’eau.',
    helpBubbleText:
      'Le riz ne fond pas dans l’eau : on dit qu’il n’est pas soluble (non soluble) et le mélange est hétérogène.',
    actionWord: 'Remuer et regarder au fond',
  },
];

export const SEPARATION_TECHNIQUES: SeparationTechnique[] = [
  {
    id: 'evaporation',
    title: 'L’évaporation',
    whenToUse: 'Quand un solide est caché (soluble) dans l’eau, comme le sel.',
    simpleHow: 'On chauffe l’eau (ou on la laisse au soleil) : l’eau part en vapeur et le sel reste sec au fond.',
    example: 'Récupérer le sel de l’eau de mer dans les marais salants.',
    helpBubble:
      'C’est comme une flaque d’eau au soleil : l’eau s’envole doucement dans l’air en vapeur, et ce qui était dedans reste au fond !',
    activeStepLabel: 'L’eau s’évapore en vapeur et les cristaux de sel apparaissent au fond !',
  },
  {
    id: 'tamisage',
    title: 'Le tamisage',
    whenToUse: 'Quand on veut trier des solides de tailles différentes.',
    simpleHow: 'On secoue le mélange au-dessus d’un tamis (une passoire) : les petits grains passent, les gros restent.',
    example: 'Séparer le sable fin et les gros coquillages à la plage.',
    helpBubble:
      'Pense à la passoire pour égoutter les pâtes ou au tamis de plage : les trous laissent passer ce qui est plus petit que le trou.',
    activeStepLabel: 'Le sable fin tombe à travers la grille, les gros coquillages restent dessus !',
  },
  {
    id: 'filtration',
    title: 'La filtration',
    whenToUse: 'Quand de petits grains solides flottent dans un liquide (eau boueuse).',
    simpleHow: 'On verse le mélange dans un filtre en papier : le liquide propre passe, les saletés restent bloquées.',
    example: 'Nettoyer de l’eau pleine de terre avec un filtre à café.',
    helpBubble:
      'Un filtre a de tout petits trous invisibles : l’eau réussit à passer goutte à goutte, mais les grains de terre sont bloqués.',
    activeStepLabel: 'La terre reste piégée dans le filtre et l’eau claire coule goutte à goutte !',
  },
  {
    id: 'decantation',
    title: 'La décantation',
    whenToUse: 'Quand des liquides ne se mélangent pas ou que des grains lourds flottent.',
    simpleHow: 'On pose le verre sans y toucher : le plus lourd descend au fond et le plus léger monte au-dessus.',
    example: 'Laisser reposer un verre d’eau avec de la boue ou de l’huile.',
    helpBubble:
      'Décantation = patience ! Il suffit d’attendre sans bouger le verre pour que tout se range tout seul en étages.',
    activeStepLabel: 'Au repos, les grains lourds descendent au fond et l’eau claire reste en haut !',
  },
];

export const EXERCISE_SETS: ExerciseSet[] = [
  {
    id: 0,
    shortTitle: 'Exercice 1',
    subtitle: 'Les mots de la leçon',
    title: 'Exercice 1 : Les mots importants de la leçon',
    description:
      'Lis bien chaque question et clique sur la bonne réponse. Si tu hésites, clique sur « Besoin d’un indice ? » !',
    questions: [
      {
        type: 'choice',
        prompt:
          'Quand on mélange deux liquides et qu’on ne voit plus qu’un seul liquide (une seule couleur), comment est le mélange ?',
        options: ['Il est homogène.', 'Il est hétérogène.', 'Il est non soluble.'],
        answerIndex: 0,
        hint: 'Pense à « eau + sirop » : on ne voit plus deux choses différentes, tout est pareil !',
        feedbackOk:
          'Bravo ! Quand on ne voit plus les deux ingrédients séparés (comme l’eau et le sirop), le mélange est homogène.',
        feedbackKo:
          'Attention ! Si on ne voit plus qu’un seul liquide dans le verre, le mélange est homogène.',
      },
      {
        type: 'choice',
        prompt: 'Deux liquides qui se mélangent très bien ensemble, comme l’eau et le sirop, sont :',
        options: ['Non miscibles', 'Miscibles', 'Non solubles'],
        answerIndex: 1,
        hint: 'Ce mot commence comme le mot « mélanger » !',
        feedbackOk:
          'Super ! Deux liquides qui se mélangent complètement ensemble sont miscibles.',
        feedbackKo:
          'Pas tout à fait : quand deux liquides se mélangent bien (eau + sirop), on dit qu’ils sont « miscibles ».',
      },
      {
        type: 'choice',
        prompt:
          'Quand on met un solide dans un liquide (comme du sel dans l’eau) et qu’il disparaît à nos yeux, on dit que ce solide est :',
        options: ['Miscible dans l’eau', 'Soluble dans l’eau', 'Tamisable dans l’eau'],
        answerIndex: 1,
        hint: 'Pour un solide qui se dissout dans l’eau, on utilise un mot qui vient de « dissoudre ».',
        feedbackOk:
          'Gagné ! Un solide qui disparaît (se dissout) dans un liquide est soluble dans l’eau.',
        feedbackKo:
          'Attention : pour un solide dans un liquide (comme le sel dans l’eau), on dit qu’il est « soluble ».',
      },
      {
        type: 'choice',
        prompt:
          'Comment appelle-t-on un mélange dans lequel on voit encore plusieurs éléments avec nos yeux ?',
        options: ['Un mélange homogène', 'Un mélange soluble', 'Un mélange hétérogène'],
        answerIndex: 2,
        hint: 'C’est le contraire de « homogène » ! On voit encore l’eau et l’huile, ou l’eau et le riz.',
        feedbackOk:
          'Très bien ! Dès qu’on voit encore plusieurs éléments dans le verre, le mélange est hétérogène.',
        feedbackKo:
          'Relis la leçon : si on voit encore les éléments (comme l’eau et l’huile ou l’eau et le riz), le mélange est hétérogène.',
      },
      {
        type: 'choice',
        prompt:
          'D’après ta leçon, quelles sont les 4 techniques pour séparer les éléments d’un mélange ?',
        options: [
          'L’évaporation, le tamisage, la filtration et la décantation',
          'Congeler, chauffer, couper et mélanger',
          'La miscibilité, la solubilité, l’homogénéité et l’hétérogénéité',
        ],
        answerIndex: 0,
        hint: 'Regarde la partie « Schémas & Techniques » : il y a la passoire (tamis), le filtre, la vapeur et le repos.',
        feedbackOk:
          'Excellent ! Les 4 techniques de la leçon sont bien l’évaporation, le tamisage, la filtration et la décantation.',
        feedbackKo:
          'Les 4 techniques écrites dans ton cahier sont : l’évaporation, le tamisage, la filtration et la décantation.',
      },
    ],
  },
  {
    id: 1,
    shortTitle: 'Exercice 2',
    subtitle: 'Vrai ou Faux',
    title: 'Exercice 2 : Vrai ou Faux sur les expériences',
    description: 'Lis chaque phrase de la leçon et choisis si elle est Vraie ou Fausse.',
    questions: [
      {
        type: 'choice',
        prompt:
          '« Quand on mélange de l’eau et du sirop, on ne voit plus deux liquides séparés : le mélange est homogène et ils sont miscibles. »',
        options: ['Vrai', 'Faux'],
        answerIndex: 0,
        hint: 'Imagine un verre de sirop à la menthe ou à la fraise bien remué avec une cuillère.',
        feedbackOk: 'Vrai ! C’est exactement la règle du cahier pour l’eau et le sirop.',
        feedbackKo:
          'C’était Vrai ! L’eau et le sirop forment un mélange homogène : ces deux liquides sont miscibles.',
      },
      {
        type: 'choice',
        prompt:
          '« Quand on mélange de l’eau et de l’huile, le mélange est hétérogène et les deux liquides sont miscibles. »',
        options: ['Vrai', 'Faux'],
        answerIndex: 1,
        hint: 'Lis bien la fin de la phrase ! L’eau et l’huile se mélangent-elles vraiment ?',
        feedbackOk:
          'Bien joué ! C’est faux parce que l’eau et l’huile sont NON miscibles : l’huile flotte toujours au-dessus de l’eau.',
        feedbackKo:
          'Faux ! On voit encore l’eau et l’huile séparées : le mélange est hétérogène et ils sont NON miscibles.',
      },
      {
        type: 'choice',
        prompt:
          '« Quand on mélange de l’eau et du sel, on ne voit plus le sel dans l’eau : le mélange est donc hétérogène. »',
        options: ['Vrai', 'Faux'],
        answerIndex: 1,
        hint: 'Si on ne voit plus qu’un seul liquide transparent, est-ce hétérogène ou homogène ?',
        feedbackOk:
          'Bravo ! Comme on ne voit plus le sel dans l’eau, le mélange est HOMOGÈNE (et pas hétérogène).',
        feedbackKo:
          'C’était Faux ! Si on ne voit plus le sel dans l’eau, le mélange est homogène.',
      },
      {
        type: 'choice',
        prompt:
          '« Quand on mélange de l’eau et du riz, on voit toujours les deux éléments : le mélange est hétérogène et le riz n’est pas soluble dans l’eau. »',
        options: ['Vrai', 'Faux'],
        answerIndex: 0,
        hint: 'Les grains de riz disparaissent-ils dans l’eau froide ?',
        feedbackOk:
          'Super ! Les grains de riz restent visibles dans l’eau : le mélange est hétérogène et le riz n’est pas soluble.',
        feedbackKo:
          'C’était Vrai ! Le riz ne disparaît pas dans l’eau, on le voit toujours : il n’est pas soluble.',
      },
      {
        type: 'choice',
        prompt:
          '« Pour séparer les ingrédients d’un mélange, on peut utiliser l’évaporation, le tamisage, la filtration ou la décantation. »',
        options: ['Vrai', 'Faux'],
        answerIndex: 0,
        hint: 'Ce sont les 4 techniques de la carte mentale juste au-dessus !',
        feedbackOk: 'Parfait ! C’est exactement la phrase de conclusion de ta leçon.',
        feedbackKo: 'C’était Vrai ! Ce sont bien les 4 techniques de séparation de la leçon.',
      },
    ],
  },
  {
    id: 2,
    shortTitle: 'Exercice 3',
    subtitle: 'Phrases à trous',
    title: 'Exercice 3 : Complète les phrases de la leçon',
    description:
      'Clique sur la bonne étiquette-mot pour boucher le trou et réussir la phrase scientifique.',
    questions: [
      {
        type: 'select',
        before: 'Quand on mélange deux liquides (eau + sirop), on dit que le mélange est ',
        after: ' si on ne voit plus les éléments séparés.',
        choices: ['homogène', 'hétérogène', 'non miscible', 'non soluble'],
        answer: 'homogène',
        hint: 'On cherche le mot qui décrit un mélange où tout a le même aspect.',
        feedbackOk:
          'Bravo ! Quand on ne voit plus les deux éléments séparés, le mélange est homogène.',
        feedbackKo: 'Le bon mot était « homogène » car on ne distingue plus les deux liquides.',
      },
      {
        type: 'select',
        before:
          'L’eau et l’huile forment deux couches bien séparées dans le verre : on dit que ces deux liquides sont ',
        after: '.',
        choices: ['miscibles', 'non miscibles', 'solubles', 'homogènes'],
        answer: 'non miscibles',
        hint: 'Pour deux liquides qui refusent de se mélanger, on ajoute « non » devant miscibles.',
        feedbackOk: 'Exact ! Deux liquides qui ne se mélangent pas sont non miscibles.',
        feedbackKo: 'Il fallait choisir « non miscibles » car l’eau et l’huile restent séparées.',
      },
      {
        type: 'select',
        before:
          'On ne voit plus les grains de sel dans l’eau salée : on dit que le sel est ',
        after: ' dans l’eau.',
        choices: ['miscible', 'soluble', 'non soluble', 'hétérogène'],
        answer: 'soluble',
        hint: 'Le sel est un solide qui se dissout dans l’eau.',
        feedbackOk: 'Très bien ! Le sel disparaît dans l’eau, il est donc soluble.',
        feedbackKo: 'Le mot attendu était « soluble » (un solide qui disparaît dans un liquide).',
      },
      {
        type: 'select',
        before: 'Les grains de riz restent visibles au fond du verre d’eau : le riz est ',
        after: ' dans l’eau.',
        choices: ['soluble', 'non soluble', 'miscible', 'homogène'],
        answer: 'non soluble',
        hint: 'Le riz est un solide qui ne se dissout pas dans l’eau.',
        feedbackOk:
          'Parfait ! Le riz ne disparaît pas dans l’eau, il est non soluble (il n’est pas soluble).',
        feedbackKo: 'Puisque le riz reste visible, il n’est pas soluble : il est « non soluble ».',
      },
      {
        type: 'select',
        before: 'Un mélange d’eau et de riz est un mélange ',
        after: ' car on voit toujours les deux éléments.',
        choices: ['homogène', 'hétérogène', 'miscible', 'soluble'],
        answer: 'hétérogène',
        hint: 'On voit clairement l’eau ET les grains de riz.',
        feedbackOk: 'Excellent ! On voit toujours l’eau et le riz : le mélange est hétérogène.',
        feedbackKo: 'Le bon mot était « hétérogène » puisqu’on voit toujours les deux éléments.',
      },
    ],
  },
  {
    id: 3,
    shortTitle: 'Exercice 4',
    subtitle: 'Séparer un mélange',
    title: 'Exercice 4 : Quelle technique choisir pour séparer ?',
    description:
      'Lis chaque petite histoire et trouve la bonne technique : évaporation, tamisage, filtration ou décantation.',
    questions: [
      {
        type: 'choice',
        prompt:
          'À la plage, tu as un seau rempli de sable fin mélangé avec de gros coquillages. Quelle technique utilises-tu pour garder les coquillages et laisser passer le sable ?',
        options: ['L’évaporation', 'Le tamisage', 'La filtration', 'La décantation'],
        answerIndex: 1,
        hint: 'À la plage, on utilise un jouet avec une grille pleine de petits trous !',
        feedbackOk:
          'Bravo ! Le tamisage (avec une passoire ou un tamis) permet de séparer les gros morceaux des grains fins.',
        feedbackKo:
          'C’est le tamisage ! Le tamis laisse passer le sable fin et retient les gros coquillages.',
      },
      {
        type: 'choice',
        prompt:
          'Dans un verre d’eau salée, on ne voit plus le sel. Comment faire partir toute l’eau (en la chauffant ou au soleil) pour récupérer le sel au fond du verre ?',
        options: ['L’évaporation', 'Le tamisage', 'La filtration', 'La décantation'],
        answerIndex: 0,
        hint: 'L’eau se transforme en vapeur dans l’air !',
        feedbackOk:
          'Super ! Avec l’évaporation, l’eau part en vapeur dans l’air et le sel reste sec au fond du verre.',
        feedbackKo:
          'La bonne réponse est l’évaporation : l’eau s’évapore et laisse le sel au fond.',
      },
      {
        type: 'choice',
        prompt:
          'Tu verses de l’eau pleine de terre dans un entonnoir avec un filtre à café en papier. La terre reste bloquée dans le papier et l’eau propre coule dans le verre. Quelle est cette technique ?',
        options: ['L’évaporation', 'Le tamisage', 'La filtration', 'La décantation'],
        answerIndex: 2,
        hint: 'Le nom de la technique ressemble beaucoup au mot « filtre » !',
        feedbackOk:
          'Parfait ! La filtration retient la terre dans le filtre et laisse passer l’eau.',
        feedbackKo: 'Quand on utilise un filtre en papier, cette technique s’appelle la filtration.',
      },
      {
        type: 'choice',
        prompt:
          'Tu laisses un verre d’eau boueuse posé sur la table sans y toucher : au bout d’un moment, la boue tombe toute seule au fond et l’eau reste au-dessus. Quelle est cette technique ?',
        options: ['L’évaporation', 'Le tamisage', 'La filtration', 'La décantation'],
        answerIndex: 3,
        hint: 'On ne chauffe pas et on n’utilise ni filtre ni passoire : on attend simplement au repos.',
        feedbackOk:
          'Très bien ! Laisser reposer un mélange pour que le plus lourd tombe au fond s’appelle la décantation.',
        feedbackKo:
          'Quand on laisse reposer sans bouger pour que la terre tombe au fond, c’est la décantation.',
      },
      {
        type: 'choice',
        prompt:
          'Après avoir secoué de l’eau et de l’huile, tu poses le bocal sur la table : l’huile remonte toute seule au-dessus de l’eau. Quelle technique observes-tu ?',
        options: ['L’évaporation', 'Le tamisage', 'La filtration', 'La décantation'],
        answerIndex: 3,
        hint: 'Tu laisses simplement le bocal tranquille sur la table pour que les deux liquides se séparent.',
        feedbackOk:
          'Bravo ! En laissant reposer le bocal, l’huile et l’eau se séparent par décantation.',
        feedbackKo: 'C’est encore la décantation ! Au repos, l’huile remonte au-dessus de l’eau.',
      },
    ],
  },
  {
    id: 4,
    shortTitle: 'Exercice 5',
    subtitle: 'En classe de sciences',
    title: 'Exercice 5 : Les défis de la classe de CM1',
    description:
      'Aide Léa, Tom et Inès à réussir leurs 5 expériences dans la salle de sciences !',
    questions: [
      {
        type: 'choice',
        prompt:
          'Pour le goûter, Léa met un morceau de sucre dans son verre d’eau et remue avec une cuillère. On ne voit plus du tout le sucre. Que peut-elle dire ?',
        options: [
          'Le mélange est hétérogène car le sucre est non soluble.',
          'Le mélange est homogène car le sucre est soluble dans l’eau.',
          'Le mélange est homogène car l’eau et le sucre sont miscibles.',
        ],
        answerIndex: 1,
        hint: 'Attention : le sucre est un SOLIDE, pas un liquide ! Quel mot utilise-t-on pour un solide qui disparaît ?',
        feedbackOk:
          'Bravo ! Comme le sel dans la leçon, le sucre est un solide soluble dans l’eau : le mélange est homogène.',
        feedbackKo:
          'Le sucre est un solide qui disparaît dans l’eau : on dit qu’il est soluble (et pas miscible), et le mélange est homogène.',
      },
      {
        type: 'choice',
        prompt:
          'En cuisine, Tom verse un peu de vinaigre (liquide) dans de l’eau (liquide). Il mélange et obtient un seul liquide transparent. Que peut-il dire ?',
        options: [
          'L’eau et le vinaigre sont miscibles : le mélange est homogène.',
          'L’eau et le vinaigre sont non miscibles : le mélange est hétérogène.',
          'Le vinaigre est soluble : le mélange est hétérogène.',
        ],
        answerIndex: 0,
        hint: 'Ce sont deux LIQUIDES qui se mélangent parfaitement ensemble.',
        feedbackOk:
          'Parfait ! Ce sont deux liquides dont on ne voit plus la séparation : ils sont miscibles et le mélange est homogène.',
        feedbackKo:
          'Comme l’eau et le sirop, l’eau et le vinaigre sont deux liquides qui forment un mélange homogène : ils sont miscibles.',
      },
      {
        type: 'choice',
        prompt:
          'Inès met des petits cailloux dans un verre d’eau. Les cailloux restent au fond du verre. Comment peut-elle les récupérer facilement ?',
        options: [
          'Par décantation ou filtration, car le mélange est hétérogène et les cailloux sont non solubles.',
          'Par évaporation uniquement, car les cailloux sont solubles.',
          'On ne peut pas les séparer car ils sont miscibles.',
        ],
        answerIndex: 0,
        hint: 'Les cailloux ne disparaissent pas dans l’eau : on les voit au fond !',
        feedbackOk:
          'Super raisonnement ! Les cailloux sont non solubles (mélange hétérogène) : on peut les récupérer par décantation ou filtration.',
        feedbackKo:
          'Les cailloux ne disparaissent pas dans l’eau (non solubles, mélange hétérogène) : on les sépare par décantation ou filtration.',
      },
      {
        type: 'choice',
        prompt:
          'Un élève a mélangé de l’eau, du sel (qu’on ne voit plus) et du sable (qu’on voit au fond). Que doit-il faire en premier pour enlever le sable ?',
        options: [
          'Faire évaporer toute l’eau tout de suite.',
          'Filtrer le mélange (filtration) pour bloquer le sable dans le filtre et garder l’eau salée.',
          'Ajouter de l’huile dans le verre.',
        ],
        answerIndex: 1,
        hint: 'Si on fait évaporer tout de suite, le sel et le sable resteront mélangés au fond ! Il faut d’abord bloquer les grains de sable.',
        feedbackOk:
          'Génial ! La filtration bloque le sable dans le filtre et laisse passer l’eau salée dans le verre.',
        feedbackKo:
          'Il faut d’abord utiliser la filtration : le filtre retient le sable et laisse couler l’eau salée.',
      },
      {
        type: 'choice',
        prompt:
          'Pourquoi ne peut-on pas séparer l’eau et le sirop avec un filtre à café (filtration) ?',
        options: [
          'Parce que le sirop est un solide trop gros pour le filtre.',
          'Parce que l’eau et le sirop sont deux liquides miscibles formant un mélange homogène : tout passe à travers le filtre.',
          'Parce que l’eau et le sirop sont non miscibles.',
        ],
        answerIndex: 1,
        hint: 'Un filtre arrête les petits morceaux solides. Y a-t-il des morceaux solides dans un mélange homogène d’eau et de sirop ?',
        feedbackOk:
          'Bravo, tu as tout compris ! L’eau et le sirop forment un mélange homogène : les deux liquides traversent le filtre ensemble.',
        feedbackKo:
          'L’eau et le sirop forment un mélange homogène de deux liquides miscibles : il n’y a rien de solide à bloquer dans le filtre.',
      },
    ],
  },
];

export const SORTING_GAME_ITEMS: SortingItem[] = [
  {
    id: 'sort-sirop',
    title: 'Eau + Sirop de menthe',
    ingredients: 'Deux liquides bien remués',
    visualType: 'sirop',
    category: 'homogene',
    helpHint: 'Vois-tu une seule couleur verte ou deux couches différentes ?',
    explanation:
      'On ne voit plus qu’un seul liquide vert : c’est un mélange homogène (les liquides sont miscibles).',
  },
  {
    id: 'sort-huile',
    title: 'Eau + Huile de cuisine',
    ingredients: 'Deux liquides secoués puis posés',
    visualType: 'huile',
    category: 'heterogene',
    helpHint: 'L’huile reste-t-elle mélangée à l’eau ou flotte-t-elle au-dessus ?',
    explanation:
      'L’huile remonte toujours au-dessus de l’eau : on voit deux étages, c’est hétérogène (non miscibles).',
  },
  {
    id: 'sort-sel',
    title: 'Eau + Sel fin',
    ingredients: 'Un solide remué dans l’eau',
    visualType: 'sel',
    category: 'homogene',
    helpHint: 'Après avoir remué, arrive-t-on encore à voir les grains de sel ?',
    explanation:
      'Le sel disparaît dans l’eau car il est soluble : le mélange obtenu est homogène.',
  },
  {
    id: 'sort-riz',
    title: 'Eau + Grains de riz',
    ingredients: 'Un solide dans l’eau froide',
    visualType: 'riz',
    category: 'heterogene',
    helpHint: 'Est-ce que le riz fond dans l’eau ou reste-t-il au fond du verre ?',
    explanation:
      'Les grains de riz restent visibles au fond : le riz n’est pas soluble, c’est hétérogène.',
  },
  {
    id: 'sort-vinaigre',
    title: 'Eau + Vinaigre blanc',
    ingredients: 'Deux liquides mélangés',
    visualType: 'vinaigre',
    category: 'homogene',
    helpHint: 'Peut-on distinguer le vinaigre de l’eau après avoir mélangé ?',
    explanation:
      'L’eau et le vinaigre se mélangent complètement : ils sont miscibles, le mélange est homogène.',
  },
  {
    id: 'sort-sable',
    title: 'Eau + Sable de plage',
    ingredients: 'Des grains de sable dans l’eau',
    visualType: 'sable',
    category: 'heterogene',
    helpHint: 'Le sable se dissout-il comme le sel, ou tombe-t-il au fond ?',
    explanation:
      'Le sable ne se dissout pas dans l’eau (non soluble) : on voit le sable au fond, c’est hétérogène.',
  },
];
