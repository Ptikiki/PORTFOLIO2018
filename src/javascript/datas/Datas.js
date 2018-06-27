const chapter1 = {
	title: "Chapitre 1 <br> Passions",
	firstLetter: "A",
	firstTextLeftPart: "u plus jeune âge, l'apprentissage de <span class='biggerText normalWeight'>l'écriture</span> m’a rapidement ouvert un nouvel horizon, et offert ma première passion. J’étais désormais capable d’immortaliser et partager sur le papier les histoires qui se construisaient dans ma tête.",
	firstTextRightPart: "J’ai ainsi produit plusieurs écrits, des contes aux poèmes, en passant par un <span class='biggerText normalWeight'>roman historique</span> toujours en projet.",
	leftProjectTitle: "Mes écrits",
	leftProjectDescription: "Contes, poèmes, romans...",
	leftProjectImg: "url('../assets/anne.jpg')",
	subtitle: "En grandissant, j’ai développé une grande fascination pour <span class='biggerSubtitle normalWeight'>l’Histoire de France</span>, et certains de ses événements en particulier.",
	secondText: "Le mythe du <span class='biggerText normalWeight'>château de Versailles</span> en fait partie, par la majestuosité du bâtiment et la singularité des intrigues qui s’y sont déroulées. J’avais donc à coeur de réaliser une première ébauche de projet exposant la beauté du lieu, et notamment celle des jardins du palais.",
	rightProjectTitle: "Les jardins de Versailles",
	rightProjectDescription: "Visite virtuelle",
	rightProjectImg: "url('../assets/stp.jpg')",
	statue: "assets/statue.png",
	nextChapter: "Chapitre II"
}

const chapter2 = {
	title: "Chapitre 2 <br> Cursus",
	firstLetter: "A",
	firstTextLeftPart: "près obtention d'un bac scientifique, je me suis orientée vers un DUT MMI, ou <span class='biggerText normalWeight'>Métiers du Multimédia et de l’Internet</span>. ",
	firstTextRightPart: "C'est alors que j’ai développé mes premières compétences dans le web, et notamment en développement et <span class='biggerText normalWeight'>management</span>.",
	leftProjectTitle: "Shakin'BOX",
	leftProjectDescription: "Application mobile",
	leftProjectImg: "url('../assets/shakinbox.jpg')",
	subtitle: "Ma passion pour la culture et la découverte du monde du multimédia m'ont ainsi offert mon projet professionnel actuel : travailler à la mise en oeuvre de <span class='biggerSubtitle normalWeight'>dispositifs culturels immersifs</span> qui placent l'utilisateur au coeur de son expérience.",
	secondText: "Le mastère en développement et design interactif proposé par <span class='biggerText normalWeight'>l'Ecole des Gobelins</span> constituait ainsi le cursus idéal pour moi. J'y ai réalisé plusieurs projets pour lesquels j'avais en charge la <span class='biggerText normalWeight'>conception/rédaction</span> des contenus et le développement.",
	rightProjectTitle: "MIRAGE !",
	rightProjectDescription: "Expérience immersive",	
	rightProjectImg: "url('../assets/mirage.jpg')",
	statue: "assets/statue.png",
	nextChapter: "Chapitre I"
}

const webProjects = [
	{
		title : "MIRAGE !",
		date : "2018",
		role : "Conceptrice | Rédactrice | Développeuse",
		techno : "Three.js, Webpack, Github",
		description : "Projet Gobelins",
		link : "http://aliciabaudry.com/afp/build/",
		img : "url('../assets/mirage.jpg')"
	},
	{
		title : "All Real",
		date : "2017",
		role : "Conceptrice | Développeuse",
		techno : "Three.js, Webpack",
		description : "Projet personnel",
		img : "url('../assets/stp.jpg')"
	},
	{
		title : "Arpegia",
		date : "2017",
		role : "Conceptrice | Développeuse",
		techno : "Three.js, Webpack, Github",
		description : "Projet Gobelins",
		link : "http://projets.gobelins.fr/dmii/2019/arpegia/",
		img : "url('../assets/arpegia.jpg')"
	},
	{
		title : "SUM",
		date : "2017",
		role : "Conceptrice | Développeuse",
		techno : "PIXI.JS, Webpack, Github",
		description : "Projet Gobelins",
		link : "http://guyonmelina.fr/projets/sum/",
		img : "url('../assets/sum.jpg')"
	},
	{
		title : "Shakin'BOX",
		date : "2016",
		role : "Chef de projet | Rédactrice | Développeuse",
		techno : "Redmine, GanttProject | Javascript, jQuery, Ajax, PHP, SQL",
		description : 'Projet de développement d\'une application mobile dynamique au service du divertissement de ses utilisateurs, en manque d\'inspiration pour s\'occuper. La Shakin\'BOX propose aléatoirement ou non (selon la volonté de l\'utilisateur) différents choix d\'activités originales et réalisables selon le contexte précisé. Le résultat apparaît après un "shake" du téléphone, un mouvement qui a donné son nom à  l\'application.',
		link : "http://www.shakinbox.com/",
		img : "url('../assets/shakinbox.jpg')"
	},
	{
		title : "Projet",
		date : "date",
		role : "role",
		techno : "techno",
		description : "un super projet",
		img : "url('../assets/stp.jpg')"
	},
	{
		title : "Projet",
		date : "date",
		role : "role",
		techno : "techno",
		description : "un super projet",
		img : "url('../assets/stp.jpg')"
	},
	{
		title : "Projet",
		date : "date",
		role : "role",
		techno : "techno",
		description : "un super projet",
		img : "url('../assets/stp.jpg')"
	}
]

const writingProjects = [
	{
		title : "Atriarcat",
		date : "2018",
		techno : "Poème",
		description : "Etrange la folle<br>Comme les autres<br>Pauvre, son idole<br>Devient apôtre<br><br>Beaux sentiments<br>Et peur du vide<br>Font-ils semblant ?<br>Bons coeurs arides<br><br>Identité<br>Trop demandeuse<br>Est-elle piégée ?<br>Trop amoureuse",
		img : "url('../assets/anne.jpg')"
	},
	{
		title : "L'Initiée du Merle",
		date : "2017",
		techno : "Poème",
		description : "A vous auxquels je parle<br>Suite aux larmes, à celle qui perla<br>Naïve, après tentative du marle<br>Initiée du savoir que le merl a<br><br>A votre tour m’avez vaincue<br>Par sagesse ou vantardise<br>Je n’ai pas lutté, vous ai crus<br>Sans savoir sur qui je mise<br><br>A vos armes êtes perchés<br>Des valeurs aux mensonges<br>Comme l’oiseau qui songe<br>Sur quelle branche nicher",
		img : "url('../assets/anne.jpg')"
	},
	{
		title : "L'Enfant de l'Abbaye (n°2)",
		date : "2017",
		techno : "Extrait de roman",
		description : "Anne s’engouffra donc dans la station de métro la plus proche de chez elle pour se rendre Place du Palais Royal, quartier du coeur parisien.<br>La jeune fille attendait son train en observant ses compagnons de voyage tour à tour, attentive à ce qui rendait chacun d’entre eux si particulier. Il y avait ce quatuor de collégiens qui lui paraissaient déjà si jeunes, elle qui n’avait que 17 ans. Ils étaient excités et chacun s’attachait à être tout autant remarqué que les autres membres du petit groupe.<br>Anne reconnut aussi une vieille voisine, aux cheveux de coton et au regard apaisé. La petite femme contemplait le panneau publicitaire de l’autre côté des rails. Peut-être songeait-elle à la rapide évolution de ces affichages depuis l’époque de sa jeunesse. Ou peut-être avait elle envie d’un aspirateur “Aspirtou”.<br>Le ronflement du train sortit Anne de ses songes. Malgré l’heure de peu d’affluence, les futurs passagers se précipitèrent dans le wagon avec une détermination étonnante. Après une courte hésitation, la jeune femme suivit le flot humain et pénétra dans la rame.<br><br>Elle saisit une des barres de métal autour desquelles s’agglutinaient tous les voyageurs, en quête d’un espace suffisant pour y placer leurs mains. Le train démarra en ronronnant, et Anne se laissa glisser dans son rythme régulier et bringuebalant. Elle en profita même pour fermer les yeux, histoire de s’isoler du monde un instant. Un isolement bien illusoire, la jeune fille sentant l’étau se resserrer autour d’elle, au fil du manège des entrées et sorties des parisiens pressés.<br><br>Anne avait presque tous ses sens en éveil, mais ce fut ce jour-ci pour son plus grand désarroi. Des parfums écoeurants vinrent agacer ses narines et une vague de chaleur s’empara soudainement de tout son être. Elle étouffait, mais son corps était gelé. Sa respiration lui était d’une difficulté insoutenable. Anne réalisa alors que la puanteur ambiante émanait de toute la rame mais surtout d’elle-même. Le coeur de la jeune fille se mit à bondir frénétiquement, tandis que ses yeux refusaient invariablement de s’ouvrir : l’adolescente était prisonnière d’un cauchemar qu’elle avait le sentiment de déjà connaître.<br><br>Elle luttait de toute ses forces pour ne pas sombrer. Ses paupières se libérèrent alors, et son regard se posa magnétiquement sur une petite fille qu’Anne n’avait même pas vue entrer dans le wagon. L’expression de l’enfant la surprit : il ne semblait plus y avoir une seule once d’insouciance. Mais ce qui la percuta le plus, c’est qu’il n’y avait finalement rien d’autre dans ses yeux; son visage ne trahissait aucune émotion et avait la froideur d’un cadavre.",
		img : "url('../assets/anne.jpg')"
	},
		
	{
		title : "L'Enfant de l'Abbaye (n°1)",
		date : "2017",
		techno : "Extrait de roman",
		description : "La jeune fille grimpa l'étroit escalier grinçant qui menait vers les combles. Elle évita de justesse un premier faux plafond qui lui avait déjà offert quelques bosses par le passé.<br>Réjouie par cette rare esquive, Anne balaya du regard le vieux grenier et toutes les affaires qui y étaient superposées. Ses yeux s'arrêtaient une seconde sur chacun des morceaux de tissu vert anglais qui ressortaient de tout l'amas de vêtements. Et l'interminable fouille débuta.<br><br>Les minutes puis les heures défilant, l'adolescente changeait régulièrement de position, différents de ses membres s'engourdissant à chaque posture adoptée. C'est couchée qu'elle acheva sa recherche, les yeux rivés vers un plafond encore peu décrit jusqu'alors. Celui-ci était d'un bois brun, et étonnamment peu abîmé. Anne ne pouvait, une fois de plus, s'empêcher d'imaginer tout ce qui avait pu se passer sous ce toit. Qui y avait marché, qui y avait passé du temps, qui était venu dans cet immeuble sans jamais soupçonner l'existence de ce lieu sous les combles. Pour elle, ce grenier était comme une île au trésor. Les yeux curieux de la petite femme s'arrêtèrent un moment sur la vue offerte par le vasistas au-dessus d'elle. Elle y aperçut un ciel coloré d'un dégradé de bleus, de jaunes et de roses, éclairé par le soleil qui commençait déjà à se coucher. Anne s'abandonna alors à ce doux cocon isolé, et s'endormit bercée par le cri des mouettes.<br><br>***<br><br>Soudain, un cri strident et incroyablement proche se démarqua des autres, ce qui réveilla Anne, frigorifiée. Les yeux à présent grand ouverts, elle voulu se redresser mais se sentit comme paralysée. Le ciel était devenu noir profond, et des nuages défilaient lentement devant son visage figé. La jeune fille était en sueur. Elle perçut un nouveau hurlement « Robert ! », puis des petits pas s'approcher d'elle précipitamment. Elle parvint enfin à tourner son visage en direction des sons entendus, mais rien. Anne reconnut l’odeur de grillade qui embaumait la salle de spectacle lors de son malaise sur scène.<br><br>L’adolescente se redressa rapidement et s'assit en rassemblant ses genoux vers sa poitrine. Elle n'eut ni la force ni le courage de quitter les lieux aussi rapidement qu'elle l'aurait souhaité. Au bout de quelques minutes, elle parvint à se relever dans la pénombre en prenant appui sur un carton dans lequel son bras s'enfonça ; ce qui la remit à terre instantanément. Les nerfs à vif, Anne força un élan d'énergie qui lui permit de se tenir enfin debout, mais fébrile. Elle adressa un regard accusateur au carton troué et éclairé d'une lumière lunaire, duquel elle aperçut le contenu : du vieux papier. Son incontrôlable curiosité la fit s'approcher du carton, encore tremblante. Elle y découvrit un tas de lettres, dont certaines avaient en partie été brûlées. La jeune fille en piocha une parmi les mieux conservées et débuta sa courte lecture.<br><br>12 août 1949,<br><br>Ce n'est pas le sentiment d'obéissance qui vous sauvera. Chaque être humain est responsable de ses actes. Votre unique chance de rédemption sera le partage du sort de vos victimes.<br><br>Evelyne Pilloux<br><br>Ce courrier rappela inévitablement à Anne celui découvert dans sa valise, lors de son séjour en Normandie. Encore des menaces. Encore des victimes. Mais à qui ces terribles mots et dénonciations étaient-ils adressés ?<br>Anne poursuivit ses lectures, allant de surprise en surprise. Ces lettres procuraient à sa famille un passé bien plus obscur que celui qui lui avait été compté. Anne se pencha au dessus du redoutable carton pour saisir un nouveau courrier. Celui-ci était d’un certain André Akerman.<br><br>xxx,<br><br>Monsieur, pouvez-vous me dire comment vous êtes vous procuré ce bijou ? Je l’avais laissé à la maman de sa propriétaire pour qu’elle puisse retrouver sa fille à la fin de la guerre. Comment va-t-elle ?<br><br>André Akerman",
		img : "url('../assets/anne.jpg')"
	},
	{
		title : "L'Urne Hollandaise",
		date : "2015",
		techno : "Nouvelle",
		description : "Jour 1 : Un compagnon de voyage inattendu<br><br>Et l’homme lâcha enfin mon regard.<br><br>***<br><br>Je m’engouffrai maladroitement dans le sombre wagon, plus handicapé par mon empressement que par ma valise. Le train ne tarda pas à démarrer, tandis que les voyageurs et le personnel s’affairaient à accomplir leurs tâches respectives. Je me surpris à jouer le jeu : je commandai un café crème, forçant la descente de la tablette que je n’avais encore osé toucher.<br>J’observais le spectacle de la brume embaumant les champs, bercé par les secousses régulières de mon siège de velours rouge, et une note amère et persistante sur le palais.<br>Je m’endormis rapidement, après avoir jeté un bref coup d’œil à mon compagnon de voyage imprévu : une urne funéraire encore brillante de son dernier dépoussiérage, trônant sur le siège voisin côté couloir ; je me réservais le privilège de la vue sur l’extérieur. Elle m’avait été confiée précipitamment par une étrange femme sur le quai du départ, sous le regard trop insistant d’un second inconnu que je préférai oublier.<br>Je n’avais évidemment pas tout de suite accepté de prendre en charge cet individu de poussière, mais la femme -sa fille- qui avait réussi à me l’imposer paraissait si bouleversée, empressée et inquiète, que je n’eus ni la présence d’esprit ni le cœur de refuser. Je reçus ainsi la mission de répandre les restes du précieux défunt, dans la cité qui se rappela à moi à l’instant où ma tête cogna contre la vitre embuée : Amsterdam.<br><br>Jour 2 : Des cendres et des souvenirs<br><br>La journée s’était achevée par l’installation de toute la promotion de futurs architectes dans l’hôtel, faisant à la fois office d’auberge et de coffee-shop. Le voyage universitaire prenait peu à peu l’allure d’une joyeuse excursion d’adolescents en quête de l’interdit. Le rangement des valises était rythmé par le trot des étudiants, jonglant entre la terrasse et le coffee-shop à proprement parler.<br>Je ne participai pourtant pas à ce désordre, retenu par le contenu de l’urne, plus surprenant encore que la manière dont on me l’avait confiée. Une fois seul dans la chambre avec l’objet, la curiosité me poussa à l’ouvrir. Si le bibelot remplissait bien sa fonction de tombeau, il s’agissait aussi d’un recueil de souvenirs. Bijoux, photos et autres babioles dont je n’aurais pu deviner l’utilité gisaient dans ce réduit.<br>Un portrait-photo attira particulièrement mon attention : il s’agissait du défunt, selon les mots inscrits au verso de la photographie. L’individu était un militaire, né en 1920 et décédé le 23 septembre dernier. Voir le visage de cet homme si peu de temps après sa mort me mit mal à l’aise. Un bruit de pas se rapprochant rapidement de la porte du dortoir me fit refermer l’urne précipitamment.<br><br>Jour 3 : Jamais seul<br><br>Nous nous rendîmes dès le lendemain matin au port, sur le lieu de notre premier objet d’étude : le musée scientifique Nemo. Malgré mon expérience en la matière, l’architecture du bâtiment me surprit : son toit était en réalité un escalier de dizaines de marches, entre lesquelles de petites fontaines laissaient l’eau jaillir. Je me décidai à laisser les premières cendres de l’urne s’échapper au gré du vent marin.<br>La promenade se poursuivit dans le quartier de la Westerterk, plus connu pour son beffroi qui rythmait les journées répétitives de la jeune Anne Frank. L’annexe de la célèbre adolescente étant ainsi à proximité, nous ne pûmes éviter sa visite.<br>L’étroitesse du lieu et les objets du passé donnèrent à ce moment une atmosphère particulièrement touchante. Des traits à l’encre violette étaient encore visibles sur le mur de la pièce à vivre : la mère d’Anne et de sa sœur Margot avait indiqué les évolutions de taille des deux jeunes filles au fil de leur croissance. Ces marques étaient des gages des deux années passées par les fugitifs confinés dans l’annexe secrète.<br>La visite de la maison se poursuivit par une brève exposition évoquant la publication du journal en lui-même par Otto Frank, rescapé d’Auschwitz. La vue de quelques pages du journal original et une interview récente du malheureux père achevèrent de m’affecter.<br>Je déambulais parmi les panneaux descriptifs, et tombai soudain face à une photo troublante. Le visage d’un des policiers néerlandais ayant participé à l’arrestation des huit clandestins de l’annexe me paraissait étrangement familier. Je réalisai rapidement qu’il s’agissait du militaire aperçu sur une photo de l’urne.<br>Je ne m’éternisai pas plus dans le musée et rejoins l’extérieur, songeur, pour voir mon trouble redoubler d’intensité : je versais le contenu de l’urne dans le canal pour le laisser s’évaporer dans le courant, avant de m’apercevoir que ma solitude n’était qu’illusoire. L’inconnu de la gare de Paris, statique, me regardait.<br><br>Jour 4 : Collaboration<br><br>« – Je ne fais que vous avertir, libre à vous de poursuivre cette sombre collaboration. »<br>Je me débarrassai de son étreinte presque douloureuse et quittai l’individu, sentant le sang me monter au visage.<br><br>***<br><br>Nous étions sortis tôt le matin sur le port, afin de profiter de nos derniers instants à Amsterdam. La petite troupe d’étudiants observait l’architecture du Conservatoire de la ville, réalisant des croquis et schémas hasardeux du bâtiment dans la nuit. J’achevais le dessin de la porte d’entrée, lorsque je sentis une main me saisir l’épaule fermement. Je me fis entraîner sans trop savoir ni comment ni par qui, ne distinguant que la maigre main qui m’avait étreint. Je reconnus pourtant assez vite l’inconnu de la gare de Paris, qui m’emmena ainsi jusqu’à une passerelle isolée.<br>C’est alors que l’homme plongea son regard dans le mien, et débuta un récit sordide et insensé : il accusait de tous les crimes imaginables la femme endeuillée qui m’avait donné la charge de répandre les cendres de l’urne. Je savais qu’elle était effectivement la descendante d’un parent nazi, mais elle ne pouvait avoir vu le jour que des dizaines d’années après les événements qu’il avait pu perpétrer. L’homme parlait de plus en plus rapidement, ses yeux ronds ne décrochant pas des miens. Il était quant à lui d’origine juive, et suivait les actions de cette femme au plus près depuis plusieurs mois. Il avait ainsi la conviction qu’elle participait encore aujourd’hui à la disculpation de son père.<br>Je remarquai les veines de son front qui devenaient peu à peu apparentes, et témoignaient de son état de profonde crispation.<br>Mon attention revint à son discours lorsqu’il se mit à évoquer l’urne, et surtout son contenu. Sa connaissance de la photo-portrait du jeune militaire me désorienta tout d’abord, mais ses fabulations sur le pseudo-complot mené par sa descendante me ramenèrent à la raison : elle aurait entrepris de faire disparaître les corps des victimes de son père, en faisant passer leurs dépouilles de cendres pour celles de son paternel. Faire don de l’urne à de timides voyageurs tel que moi constituait la partie la plus simple du processus.<br>« – Je ne fais que vous avertir, libre à vous de poursuivre cette sombre collaboration. »<br>Je me débarrassai de son étreinte presque douloureuse et quittai l’individu, sentant le sang me monter au visage.<br><br>***<br><br>Le conducteur annonça l’arrivée du train à Paris, et s’excusa des vingt minutes de retard accumulées. Je descendis de mon wagon et rejoins la sortie de la gare, soulagé de ne plus avoir à surveiller la menace des vélos pernicieux. Ma satisfaction s’écourta pourtant ; ce que j’aperçus sur le trottoir d’en face me figea.<br>La femme, en larmes, était là. Elle avait une urne entre les mains.",
		img : "url('../assets/anne.jpg')"
	}
]


export default {
  chapter1,
  chapter2,
  webProjects,
  writingProjects
}
