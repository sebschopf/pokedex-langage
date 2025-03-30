-- Requêtes SQL générées à partir de l'ancien système de frameworks
-- Exécutez ces requêtes dans l'interface SQL de Supabase


-- Framework: GTK (C)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'GTK', (SELECT id FROM language_id), 'Framework d''interface graphique multiplateforme pour le développement d''applications de bureau', 'https://www.gtk.org/', 'Interface graphique native multiplateforme avec une riche bibliothèque de composants', 'Applications de bureau multiplateformes nécessitant une interface native', ARRAY['Riche bibliothèque de widgets', 'Intégration avec GNOME', 'Accessibilité', 'Internationalisation', 'Système de thèmes'], 'Développement d''applications de bureau multiplateformes, interfaces graphiques natives', '4.12', 'https://docs.gtk.org/', 'https://github.com/GNOME/gtk'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework d''interface graphique multiplateforme pour le développement d''applications de bureau'),
  official_website = COALESCE(libraries.official_website, 'https://www.gtk.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Interface graphique native multiplateforme avec une riche bibliothèque de composants'),
  best_for = COALESCE(libraries.best_for, 'Applications de bureau multiplateformes nécessitant une interface native'),
  features = COALESCE(libraries.features, ARRAY['Riche bibliothèque de widgets', 'Intégration avec GNOME', 'Accessibilité', 'Internationalisation', 'Système de thèmes']),
  used_for = COALESCE(libraries.used_for, 'Développement d''applications de bureau multiplateformes, interfaces graphiques natives'),
  version = COALESCE(libraries.version, '4.12'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.gtk.org/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/GNOME/gtk');


-- Framework: SDL (C)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'SDL', (SELECT id FROM language_id), 'Bibliothèque multimédia multiplateforme conçue pour fournir un accès bas niveau au matériel', 'https://www.libsdl.org/', 'Accès bas niveau au matériel avec une API simple et multiplateforme', 'Développeurs de jeux et applications multimédias nécessitant contrôle direct du matériel', ARRAY['Accès au matériel graphique', 'Audio', 'Multiplateforme', 'Intégration avec OpenGL/Vulkan'], 'Jeux vidéo, émulateurs, lecteurs multimédias, applications graphiques', '2.28.3', 'https://wiki.libsdl.org/', 'https://github.com/libsdl-org/SDL'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque multimédia multiplateforme conçue pour fournir un accès bas niveau au matériel'),
  official_website = COALESCE(libraries.official_website, 'https://www.libsdl.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Accès bas niveau au matériel avec une API simple et multiplateforme'),
  best_for = COALESCE(libraries.best_for, 'Développeurs de jeux et applications multimédias nécessitant contrôle direct du matériel'),
  features = COALESCE(libraries.features, ARRAY['Accès au matériel graphique', 'Audio', 'Multiplateforme', 'Intégration avec OpenGL/Vulkan']),
  used_for = COALESCE(libraries.used_for, 'Jeux vidéo, émulateurs, lecteurs multimédias, applications graphiques'),
  version = COALESCE(libraries.version, '2.28.3'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://wiki.libsdl.org/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/libsdl-org/SDL');


-- Framework: OpenGL (C)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'OpenGL', (SELECT id FROM language_id), 'API graphique multiplateforme pour le rendu 2D et 3D', 'https://www.opengl.org/', 'Standard de l''industrie pour le graphisme 3D accéléré par matériel', 'Applications nécessitant rendu graphique performant et portable', ARRAY['Rendu 2D et 3D', 'Shaders programmables', 'Accélération matérielle', 'Multiplateforme', 'Interopérabilité avec d''autres APIs'], 'Jeux vidéo, CAO, visualisation scientifique, réalité virtuelle', '4.6', 'https://www.opengl.org/documentation/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'API graphique multiplateforme pour le rendu 2D et 3D'),
  official_website = COALESCE(libraries.official_website, 'https://www.opengl.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Standard de l''industrie pour le graphisme 3D accéléré par matériel'),
  best_for = COALESCE(libraries.best_for, 'Applications nécessitant rendu graphique performant et portable'),
  features = COALESCE(libraries.features, ARRAY['Rendu 2D et 3D', 'Shaders programmables', 'Accélération matérielle', 'Multiplateforme', 'Interopérabilité avec d''autres APIs']),
  used_for = COALESCE(libraries.used_for, 'Jeux vidéo, CAO, visualisation scientifique, réalité virtuelle'),
  version = COALESCE(libraries.version, '4.6'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.opengl.org/documentation/');


-- Framework: SQLite (C)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'SQLite', (SELECT id FROM language_id), 'Moteur de base de données SQL léger, autonome et sans serveur', 'https://www.sqlite.org/', 'Base de données SQL complète sans serveur ni configuration', 'Applications nécessitant stockage local structuré sans infrastructure de serveur', ARRAY['Sans serveur', 'Zéro configuration', 'Base de données complète dans un seul fichier', 'Transactions ACID', 'Empreinte mémoire minimale'], 'Stockage local, applications embarquées, prototypage, tests', '3.43.0', 'https://www.sqlite.org/docs.html'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Moteur de base de données SQL léger, autonome et sans serveur'),
  official_website = COALESCE(libraries.official_website, 'https://www.sqlite.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Base de données SQL complète sans serveur ni configuration'),
  best_for = COALESCE(libraries.best_for, 'Applications nécessitant stockage local structuré sans infrastructure de serveur'),
  features = COALESCE(libraries.features, ARRAY['Sans serveur', 'Zéro configuration', 'Base de données complète dans un seul fichier', 'Transactions ACID', 'Empreinte mémoire minimale']),
  used_for = COALESCE(libraries.used_for, 'Stockage local, applications embarquées, prototypage, tests'),
  version = COALESCE(libraries.version, '3.43.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.sqlite.org/docs.html');


-- Framework: Ring (Clojure)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Clojure'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Ring', (SELECT id FROM language_id), 'Bibliothèque pour applications web Clojure, inspirée par WSGI/Rack', 'https://github.com/ring-clojure/ring', 'Fondation simple et composable pour applications web Clojure', 'Applications web Clojure nécessitant flexibilité et composabilité', ARRAY['Abstraction HTTP simple', 'Middleware composable', 'Adaptateurs pour différents serveurs', 'Gestion des sessions', 'Traitement des paramètres'], 'Applications web, middleware HTTP, fondation pour frameworks web', '1.10.0', 'https://github.com/ring-clojure/ring/wiki', 'https://github.com/ring-clojure/ring/wiki'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque pour applications web Clojure, inspirée par WSGI/Rack'),
  official_website = COALESCE(libraries.official_website, 'https://github.com/ring-clojure/ring'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Fondation simple et composable pour applications web Clojure'),
  best_for = COALESCE(libraries.best_for, 'Applications web Clojure nécessitant flexibilité et composabilité'),
  features = COALESCE(libraries.features, ARRAY['Abstraction HTTP simple', 'Middleware composable', 'Adaptateurs pour différents serveurs', 'Gestion des sessions', 'Traitement des paramètres']),
  used_for = COALESCE(libraries.used_for, 'Applications web, middleware HTTP, fondation pour frameworks web'),
  version = COALESCE(libraries.version, '1.10.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://github.com/ring-clojure/ring/wiki'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/ring-clojure/ring/wiki');


-- Framework: Compojure (Clojure)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Clojure'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Compojure', (SELECT id FROM language_id), 'Bibliothèque de routage concise pour Ring', 'https://github.com/weavejester/compojure', 'Routage élégant et concis pour applications web Clojure', 'Applications Ring nécessitant routage simple et expressif', ARRAY['Routage déclaratif', 'Composition de routes', 'Middleware', 'Intégration avec Ring', 'Gestion des paramètres'], 'Routage HTTP, applications web, APIs RESTful', '1.7.0', 'https://github.com/weavejester/compojure/wiki', 'https://github.com/weavejester/compojure/wiki'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque de routage concise pour Ring'),
  official_website = COALESCE(libraries.official_website, 'https://github.com/weavejester/compojure'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Routage élégant et concis pour applications web Clojure'),
  best_for = COALESCE(libraries.best_for, 'Applications Ring nécessitant routage simple et expressif'),
  features = COALESCE(libraries.features, ARRAY['Routage déclaratif', 'Composition de routes', 'Middleware', 'Intégration avec Ring', 'Gestion des paramètres']),
  used_for = COALESCE(libraries.used_for, 'Routage HTTP, applications web, APIs RESTful'),
  version = COALESCE(libraries.version, '1.7.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://github.com/weavejester/compojure/wiki'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/weavejester/compojure/wiki');


-- Framework: Reagent (Clojure)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Clojure'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Reagent', (SELECT id FROM language_id), 'Interface minimaliste entre ClojureScript et React', 'https://reagent-project.github.io/', 'React en ClojureScript avec simplicité et élégance fonctionnelle', 'Applications frontend ClojureScript avec interfaces réactives', ARRAY['Composants React en ClojureScript', 'Gestion d''état simplifiée', 'Rendu efficace', 'Hiccup pour HTML', 'Interopérabilité avec JavaScript'], 'Applications web frontend, interfaces utilisateur réactives, SPAs', '1.2.0', 'https://cljdoc.org/d/reagent/reagent/1.2.0/doc/documentation-index', 'https://github.com/reagent-project/reagent'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Interface minimaliste entre ClojureScript et React'),
  official_website = COALESCE(libraries.official_website, 'https://reagent-project.github.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'React en ClojureScript avec simplicité et élégance fonctionnelle'),
  best_for = COALESCE(libraries.best_for, 'Applications frontend ClojureScript avec interfaces réactives'),
  features = COALESCE(libraries.features, ARRAY['Composants React en ClojureScript', 'Gestion d''état simplifiée', 'Rendu efficace', 'Hiccup pour HTML', 'Interopérabilité avec JavaScript']),
  used_for = COALESCE(libraries.used_for, 'Applications web frontend, interfaces utilisateur réactives, SPAs'),
  version = COALESCE(libraries.version, '1.2.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://cljdoc.org/d/reagent/reagent/1.2.0/doc/documentation-index'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/reagent-project/reagent');


-- Framework: GnuCOBOL (Cobol)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Cobol'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'GnuCOBOL', (SELECT id FROM language_id), 'Compilateur COBOL open source', 'https://gnucobol.sourceforge.io/', 'COBOL open source pour environnements modernes', 'Migration de code COBOL legacy vers plateformes modernes', ARRAY['Compatible ANSI COBOL', 'Génération de code C', 'Portabilité', 'Intégration avec systèmes modernes', 'Extensions modernes'], 'Applications COBOL, migration de legacy code, éducation', '3.1.2', 'https://gnucobol.sourceforge.io/guides/', 'https://github.com/opensourcecobol/gnucobol'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Compilateur COBOL open source'),
  official_website = COALESCE(libraries.official_website, 'https://gnucobol.sourceforge.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'COBOL open source pour environnements modernes'),
  best_for = COALESCE(libraries.best_for, 'Migration de code COBOL legacy vers plateformes modernes'),
  features = COALESCE(libraries.features, ARRAY['Compatible ANSI COBOL', 'Génération de code C', 'Portabilité', 'Intégration avec systèmes modernes', 'Extensions modernes']),
  used_for = COALESCE(libraries.used_for, 'Applications COBOL, migration de legacy code, éducation'),
  version = COALESCE(libraries.version, '3.1.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://gnucobol.sourceforge.io/guides/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/opensourcecobol/gnucobol');


-- Framework: Spine (Coffeescript)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Coffeescript'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Spine', (SELECT id FROM language_id), 'Framework MVC léger pour construire des applications JavaScript, optimisé pour CoffeeScript', 'http://spinejs.com/', 'Framework MVC ultra-léger avec une API élégante qui exploite parfaitement la syntaxe concise de CoffeeScript', 'Applications web légères nécessitant des performances optimales et une syntaxe élégante', ARRAY['Modèles avec événements et validation', 'Contrôleurs avec gestion des événements', 'Routage client', 'Liaison de données bidirectionnelle', 'Support pour le stockage local et REST', 'Architecture orientée événements', 'Syntaxe concise idéale pour CoffeeScript'], 'Applications web single-page, interfaces utilisateur réactives, applications mobiles HTML5', '1.6.1', 'http://spinejs.com/docs/', 'https://github.com/spine/spine'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework MVC léger pour construire des applications JavaScript, optimisé pour CoffeeScript'),
  official_website = COALESCE(libraries.official_website, 'http://spinejs.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework MVC ultra-léger avec une API élégante qui exploite parfaitement la syntaxe concise de CoffeeScript'),
  best_for = COALESCE(libraries.best_for, 'Applications web légères nécessitant des performances optimales et une syntaxe élégante'),
  features = COALESCE(libraries.features, ARRAY['Modèles avec événements et validation', 'Contrôleurs avec gestion des événements', 'Routage client', 'Liaison de données bidirectionnelle', 'Support pour le stockage local et REST', 'Architecture orientée événements', 'Syntaxe concise idéale pour CoffeeScript']),
  used_for = COALESCE(libraries.used_for, 'Applications web single-page, interfaces utilisateur réactives, applications mobiles HTML5'),
  version = COALESCE(libraries.version, '1.6.1'),
  documentation_url = COALESCE(libraries.documentation_url, 'http://spinejs.com/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/spine/spine');


-- Framework: Qt (C++)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C++'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Qt', (SELECT id FROM language_id), 'Framework C++ complet pour le développement d''applications multiplateformes avec interfaces graphiques', 'https://www.qt.io/', 'Écosystème complet pour développer des applications multiplateformes avec une expérience utilisateur native', 'Applications d''entreprise multiplateformes nécessitant des interfaces utilisateur riches et natives', ARRAY['Widgets natifs', 'QML pour interfaces modernes', 'Signaux et slots', 'Support multiplateforme', 'Outils de développement intégrés'], 'Applications de bureau multiplateformes, interfaces utilisateur, applications embarquées, applications mobiles, systèmes automobiles', '6.6', 'https://doc.qt.io/qt-6/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework C++ complet pour le développement d''applications multiplateformes avec interfaces graphiques'),
  official_website = COALESCE(libraries.official_website, 'https://www.qt.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Écosystème complet pour développer des applications multiplateformes avec une expérience utilisateur native'),
  best_for = COALESCE(libraries.best_for, 'Applications d''entreprise multiplateformes nécessitant des interfaces utilisateur riches et natives'),
  features = COALESCE(libraries.features, ARRAY['Widgets natifs', 'QML pour interfaces modernes', 'Signaux et slots', 'Support multiplateforme', 'Outils de développement intégrés']),
  used_for = COALESCE(libraries.used_for, 'Applications de bureau multiplateformes, interfaces utilisateur, applications embarquées, applications mobiles, systèmes automobiles'),
  version = COALESCE(libraries.version, '6.6'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://doc.qt.io/qt-6/');


-- Framework: Boost (C++)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C++'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Boost', (SELECT id FROM language_id), 'Collection de bibliothèques C++ haute qualité couvrant un large éventail de fonctionnalités', 'https://www.boost.org/', 'Bibliothèques C++ de haute qualité qui étendent les fonctionnalités standard et simplifient le développement complexe', 'Développeurs C++ cherchant à améliorer la productivité et la qualité du code avec des composants réutilisables', ARRAY['Plus de 160 bibliothèques', 'Programmation générique', 'Gestion de la mémoire', 'Multithreading', 'Algorithmes avancés'], 'Développement C++ avancé, programmation générique, métaprogrammation, concurrence, traitement d''images, mathématiques', '1.84.0', 'https://www.boost.org/doc/', 'https://github.com/boostorg/boost'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Collection de bibliothèques C++ haute qualité couvrant un large éventail de fonctionnalités'),
  official_website = COALESCE(libraries.official_website, 'https://www.boost.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Bibliothèques C++ de haute qualité qui étendent les fonctionnalités standard et simplifient le développement complexe'),
  best_for = COALESCE(libraries.best_for, 'Développeurs C++ cherchant à améliorer la productivité et la qualité du code avec des composants réutilisables'),
  features = COALESCE(libraries.features, ARRAY['Plus de 160 bibliothèques', 'Programmation générique', 'Gestion de la mémoire', 'Multithreading', 'Algorithmes avancés']),
  used_for = COALESCE(libraries.used_for, 'Développement C++ avancé, programmation générique, métaprogrammation, concurrence, traitement d''images, mathématiques'),
  version = COALESCE(libraries.version, '1.84.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.boost.org/doc/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/boostorg/boost');


-- Framework: POCO (C++)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C++'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'POCO', (SELECT id FROM language_id), 'Bibliothèques C++ pour construire des applications réseau et Internet', 'https://pocoproject.org/', 'Bibliothèques C++ modernes et élégantes pour le développement d''applications réseau et distribuées', 'Applications C++ orientées réseau nécessitant performance et maintenabilité', ARRAY['Abstraction réseau', 'Accès aux bases de données', 'Cryptographie', 'XML et JSON', 'Multithreading'], 'Applications réseau, services web, microservices, applications IoT, applications distribuées', '1.12.4', 'https://docs.pocoproject.org/', 'https://github.com/pocoproject/poco'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèques C++ pour construire des applications réseau et Internet'),
  official_website = COALESCE(libraries.official_website, 'https://pocoproject.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Bibliothèques C++ modernes et élégantes pour le développement d''applications réseau et distribuées'),
  best_for = COALESCE(libraries.best_for, 'Applications C++ orientées réseau nécessitant performance et maintenabilité'),
  features = COALESCE(libraries.features, ARRAY['Abstraction réseau', 'Accès aux bases de données', 'Cryptographie', 'XML et JSON', 'Multithreading']),
  used_for = COALESCE(libraries.used_for, 'Applications réseau, services web, microservices, applications IoT, applications distribuées'),
  version = COALESCE(libraries.version, '1.12.4'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.pocoproject.org/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/pocoproject/poco');


-- Framework: GTK (C++)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C++'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'GTK', (SELECT id FROM language_id), 'Framework d''interface graphique multiplateforme pour le développement d''applications de bureau', 'https://www.gtk.org/', 'Interface graphique native multiplateforme avec une riche bibliothèque de composants', 'Applications de bureau multiplateformes nécessitant une interface native', ARRAY['Riche bibliothèque de widgets', 'Intégration avec GNOME', 'Accessibilité', 'Internationalisation', 'Système de thèmes'], 'Développement d''applications de bureau multiplateformes, interfaces graphiques natives', '4.12', 'https://docs.gtk.org/', 'https://github.com/GNOME/gtk'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework d''interface graphique multiplateforme pour le développement d''applications de bureau'),
  official_website = COALESCE(libraries.official_website, 'https://www.gtk.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Interface graphique native multiplateforme avec une riche bibliothèque de composants'),
  best_for = COALESCE(libraries.best_for, 'Applications de bureau multiplateformes nécessitant une interface native'),
  features = COALESCE(libraries.features, ARRAY['Riche bibliothèque de widgets', 'Intégration avec GNOME', 'Accessibilité', 'Internationalisation', 'Système de thèmes']),
  used_for = COALESCE(libraries.used_for, 'Développement d''applications de bureau multiplateformes, interfaces graphiques natives'),
  version = COALESCE(libraries.version, '4.12'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.gtk.org/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/GNOME/gtk');


-- Framework: wxWidgets (C++)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C++'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'wxWidgets', (SELECT id FROM language_id), 'Bibliothèque C++ pour le développement d''interfaces graphiques multiplateformes', 'https://www.wxwidgets.org/', 'Interfaces utilisateur natives sur toutes les plateformes principales avec une seule base de code', 'Applications de bureau nécessitant apparence native sur multiples plateformes', ARRAY['Widgets natifs', 'Outils de développement rapide', 'Extensible', 'Licence libre'], 'Applications de bureau multiplateformes, interfaces utilisateur natives, applications portables', '3.2.4', 'https://docs.wxwidgets.org/', 'https://github.com/wxWidgets/wxWidgets'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque C++ pour le développement d''interfaces graphiques multiplateformes'),
  official_website = COALESCE(libraries.official_website, 'https://www.wxwidgets.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Interfaces utilisateur natives sur toutes les plateformes principales avec une seule base de code'),
  best_for = COALESCE(libraries.best_for, 'Applications de bureau nécessitant apparence native sur multiples plateformes'),
  features = COALESCE(libraries.features, ARRAY['Widgets natifs', 'Outils de développement rapide', 'Extensible', 'Licence libre']),
  used_for = COALESCE(libraries.used_for, 'Applications de bureau multiplateformes, interfaces utilisateur natives, applications portables'),
  version = COALESCE(libraries.version, '3.2.4'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.wxwidgets.org/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/wxWidgets/wxWidgets');


-- Framework: OpenFrameworks (C++)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C++'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'OpenFrameworks', (SELECT id FROM language_id), 'Boîte à outils C++ open source conçue pour la création artistique et expérimentale', 'https://openframeworks.cc/', 'Environnement créatif pour artistes et designers avec puissance du C++', 'Artistes numériques et créateurs d''installations interactives', ARRAY['Graphiques et OpenGL', 'Audio et vidéo', 'Traitement d''images', 'Communication réseau', 'Intégration matérielle'], 'Art numérique, installations interactives, visualisations de données, prototypage créatif', '0.12.0', 'https://openframeworks.cc/documentation/', 'https://github.com/openframeworks/openFrameworks'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Boîte à outils C++ open source conçue pour la création artistique et expérimentale'),
  official_website = COALESCE(libraries.official_website, 'https://openframeworks.cc/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Environnement créatif pour artistes et designers avec puissance du C++'),
  best_for = COALESCE(libraries.best_for, 'Artistes numériques et créateurs d''installations interactives'),
  features = COALESCE(libraries.features, ARRAY['Graphiques et OpenGL', 'Audio et vidéo', 'Traitement d''images', 'Communication réseau', 'Intégration matérielle']),
  used_for = COALESCE(libraries.used_for, 'Art numérique, installations interactives, visualisations de données, prototypage créatif'),
  version = COALESCE(libraries.version, '0.12.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://openframeworks.cc/documentation/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/openframeworks/openFrameworks');


-- Framework: Cinder (C++)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C++'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Cinder', (SELECT id FROM language_id), 'Bibliothèque C++ pour la programmation créative et le design interactif', 'https://libcinder.org/', 'Bibliothèque de qualité professionnelle pour applications créatives avec performances C++', 'Développeurs et artistes créant applications visuelles haute performance', ARRAY['Graphiques 2D/3D', 'Audio', 'Vidéo', 'Calcul GPU', 'Intégration avec OpenGL'], 'Art numérique, design interactif, visualisations, prototypage, installations', '1.0', 'https://libcinder.org/docs/', 'https://github.com/cinder/Cinder'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque C++ pour la programmation créative et le design interactif'),
  official_website = COALESCE(libraries.official_website, 'https://libcinder.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Bibliothèque de qualité professionnelle pour applications créatives avec performances C++'),
  best_for = COALESCE(libraries.best_for, 'Développeurs et artistes créant applications visuelles haute performance'),
  features = COALESCE(libraries.features, ARRAY['Graphiques 2D/3D', 'Audio', 'Vidéo', 'Calcul GPU', 'Intégration avec OpenGL']),
  used_for = COALESCE(libraries.used_for, 'Art numérique, design interactif, visualisations, prototypage, installations'),
  version = COALESCE(libraries.version, '1.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://libcinder.org/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/cinder/Cinder');


-- Framework: Unity (C#)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C#'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Unity', (SELECT id FROM language_id), 'Moteur de jeu multiplateforme leader pour le développement de jeux 2D et 3D', 'https://unity.com/', 'Environnement de développement complet pour créer des jeux professionnels', 'Développement de jeux et applications interactives pour toutes plateformes', ARRAY['Éditeur visuel puissant', 'Scripting en C#', 'Moteur physique intégré', 'Support multiplateforme', 'Asset Store riche'], 'Jeux vidéo, réalité virtuelle, réalité augmentée, simulations, visualisations', '2023.2', 'https://docs.unity3d.com/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Moteur de jeu multiplateforme leader pour le développement de jeux 2D et 3D'),
  official_website = COALESCE(libraries.official_website, 'https://unity.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Environnement de développement complet pour créer des jeux professionnels'),
  best_for = COALESCE(libraries.best_for, 'Développement de jeux et applications interactives pour toutes plateformes'),
  features = COALESCE(libraries.features, ARRAY['Éditeur visuel puissant', 'Scripting en C#', 'Moteur physique intégré', 'Support multiplateforme', 'Asset Store riche']),
  used_for = COALESCE(libraries.used_for, 'Jeux vidéo, réalité virtuelle, réalité augmentée, simulations, visualisations'),
  version = COALESCE(libraries.version, '2023.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.unity3d.com/');


-- Framework: Xamarin (C#)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C#'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Xamarin', (SELECT id FROM language_id), 'Plateforme pour développer des applications mobiles multiplateformes avec C#', 'https://dotnet.microsoft.com/apps/xamarin', 'Développement mobile multiplateforme avec C# et .NET', 'Applications d''entreprise nécessitant une présence sur iOS et Android', ARRAY['Code partagé entre plateformes', 'Accès natif aux APIs de plateforme', 'Performances natives', 'Intégration avec Visual Studio', 'Xamarin.Forms pour UI partagée'], 'Applications mobiles iOS et Android, applications d''entreprise', '5.0', 'https://learn.microsoft.com/xamarin/', 'https://github.com/xamarin/Xamarin.Forms'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Plateforme pour développer des applications mobiles multiplateformes avec C#'),
  official_website = COALESCE(libraries.official_website, 'https://dotnet.microsoft.com/apps/xamarin'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Développement mobile multiplateforme avec C# et .NET'),
  best_for = COALESCE(libraries.best_for, 'Applications d''entreprise nécessitant une présence sur iOS et Android'),
  features = COALESCE(libraries.features, ARRAY['Code partagé entre plateformes', 'Accès natif aux APIs de plateforme', 'Performances natives', 'Intégration avec Visual Studio', 'Xamarin.Forms pour UI partagée']),
  used_for = COALESCE(libraries.used_for, 'Applications mobiles iOS et Android, applications d''entreprise'),
  version = COALESCE(libraries.version, '5.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://learn.microsoft.com/xamarin/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/xamarin/Xamarin.Forms');


-- Framework: Blazor (C#)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'C#'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Blazor', (SELECT id FROM language_id), 'Framework pour construire des applications web interactives avec C# au lieu de JavaScript', 'https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor', 'Développement web full-stack en C# sans JavaScript', 'Équipes .NET souhaitant créer des applications web sans JavaScript', ARRAY['Composants UI réutilisables', 'Exécution côté serveur ou WebAssembly', 'Intégration complète avec .NET', 'Interopérabilité JavaScript', 'Déploiement progressif'], 'Applications web interactives, SPAs, PWAs, applications d''entreprise', '8.0', 'https://learn.microsoft.com/aspnet/core/blazor/', 'https://github.com/dotnet/aspnetcore'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework pour construire des applications web interactives avec C# au lieu de JavaScript'),
  official_website = COALESCE(libraries.official_website, 'https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Développement web full-stack en C# sans JavaScript'),
  best_for = COALESCE(libraries.best_for, 'Équipes .NET souhaitant créer des applications web sans JavaScript'),
  features = COALESCE(libraries.features, ARRAY['Composants UI réutilisables', 'Exécution côté serveur ou WebAssembly', 'Intégration complète avec .NET', 'Interopérabilité JavaScript', 'Déploiement progressif']),
  used_for = COALESCE(libraries.used_for, 'Applications web interactives, SPAs, PWAs, applications d''entreprise'),
  version = COALESCE(libraries.version, '8.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://learn.microsoft.com/aspnet/core/blazor/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/dotnet/aspnetcore');


-- Framework: Bootstrap (Css)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Css'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Bootstrap', (SELECT id FROM language_id), 'Framework CSS populaire pour la création de sites web responsives et mobiles-first', 'https://getbootstrap.com/', 'Solution complète et éprouvée pour développer rapidement des interfaces responsives avec une courbe d''apprentissage minimale et une compatibilité maximale', 'Projets nécessitant un développement rapide avec une apparence professionnelle et cohérente, idéal pour les développeurs qui privilégient la productivité à la personnalisation extrême', ARRAY['Système de grille responsive à 12 colonnes', 'JavaScript intégré pour les interactions', 'Personnalisable via Sass', 'Compatible avec tous les navigateurs modernes', 'Accessibilité intégrée', 'Système d''icônes (Bootstrap Icons)', 'Documentation complète et exemples', 'Large communauté et support'], 'Sites web responsives, applications web, interfaces utilisateur, tableaux de bord, sites e-commerce, projets nécessitant un développement rapide', '5.3', 'https://getbootstrap.com/docs/5.3/getting-started/introduction/', 'https://github.com/twbs/bootstrap'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework CSS populaire pour la création de sites web responsives et mobiles-first'),
  official_website = COALESCE(libraries.official_website, 'https://getbootstrap.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Solution complète et éprouvée pour développer rapidement des interfaces responsives avec une courbe d''apprentissage minimale et une compatibilité maximale'),
  best_for = COALESCE(libraries.best_for, 'Projets nécessitant un développement rapide avec une apparence professionnelle et cohérente, idéal pour les développeurs qui privilégient la productivité à la personnalisation extrême'),
  features = COALESCE(libraries.features, ARRAY['Système de grille responsive à 12 colonnes', 'JavaScript intégré pour les interactions', 'Personnalisable via Sass', 'Compatible avec tous les navigateurs modernes', 'Accessibilité intégrée', 'Système d''icônes (Bootstrap Icons)', 'Documentation complète et exemples', 'Large communauté et support']),
  used_for = COALESCE(libraries.used_for, 'Sites web responsives, applications web, interfaces utilisateur, tableaux de bord, sites e-commerce, projets nécessitant un développement rapide'),
  version = COALESCE(libraries.version, '5.3'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://getbootstrap.com/docs/5.3/getting-started/introduction/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/twbs/bootstrap');


-- Framework: Pico CSS (Css)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Css'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Pico CSS', (SELECT id FROM language_id), 'Framework CSS minimal et sémantique qui fournit des styles élégants pour les éléments HTML natifs sans classes', 'https://picocss.com/', 'Approche ''classless'' qui permet de créer des sites web élégants en écrivant uniquement du HTML sémantique, sans avoir à ajouter de classes CSS', 'Développeurs qui préfèrent se concentrer sur le contenu et la structure HTML plutôt que sur les classes CSS, idéal pour les projets simples et les prototypes rapides', ARRAY['Styles pour les éléments HTML natifs sans classes CSS', 'Taille minimale (~10KB minifié et gzippé)', 'Design responsive par défaut', 'Thèmes clair et sombre intégrés', 'Personnalisation via variables CSS', 'Grille basée sur CSS Grid', 'Composants de formulaire élégants', 'Typographie soignée', 'Accessibilité intégrée', 'Aucune dépendance JavaScript'], 'Sites web minimalistes, prototypes, blogs, documentation, projets qui privilégient le HTML sémantique, sites à faible maintenance', '2.0.0', 'https://picocss.com/docs/', 'https://github.com/picocss/pico'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework CSS minimal et sémantique qui fournit des styles élégants pour les éléments HTML natifs sans classes'),
  official_website = COALESCE(libraries.official_website, 'https://picocss.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Approche ''classless'' qui permet de créer des sites web élégants en écrivant uniquement du HTML sémantique, sans avoir à ajouter de classes CSS'),
  best_for = COALESCE(libraries.best_for, 'Développeurs qui préfèrent se concentrer sur le contenu et la structure HTML plutôt que sur les classes CSS, idéal pour les projets simples et les prototypes rapides'),
  features = COALESCE(libraries.features, ARRAY['Styles pour les éléments HTML natifs sans classes CSS', 'Taille minimale (~10KB minifié et gzippé)', 'Design responsive par défaut', 'Thèmes clair et sombre intégrés', 'Personnalisation via variables CSS', 'Grille basée sur CSS Grid', 'Composants de formulaire élégants', 'Typographie soignée', 'Accessibilité intégrée', 'Aucune dépendance JavaScript']),
  used_for = COALESCE(libraries.used_for, 'Sites web minimalistes, prototypes, blogs, documentation, projets qui privilégient le HTML sémantique, sites à faible maintenance'),
  version = COALESCE(libraries.version, '2.0.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://picocss.com/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/picocss/pico');


-- Framework: UIkit (Css)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Css'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'UIkit', (SELECT id FROM language_id), 'Framework frontend léger et modulaire pour développer des interfaces web rapides et puissantes', 'https://getuikit.com/', 'Combinaison parfaite de légèreté, modularité et élégance visuelle, avec une attention particulière aux animations et transitions fluides', 'Projets nécessitant une interface utilisateur moderne et élégante avec des animations fluides et une approche modulaire', ARRAY['Plus de 30 composants modulaires', 'Système de grille flexible basé sur Flexbox', 'Animations et transitions fluides', 'Thèmes personnalisables', 'Intégration JavaScript complète', 'Approche mobile-first', 'Système d''icônes intégré', 'Préprocesseur Less/Sass', 'Personnalisation via variables', 'Architecture extensible via plugins'], 'Sites web modernes, applications web, interfaces utilisateur complexes, projets nécessitant une approche modulaire', '3.17.11', 'https://getuikit.com/docs/introduction', 'https://github.com/uikit/uikit'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework frontend léger et modulaire pour développer des interfaces web rapides et puissantes'),
  official_website = COALESCE(libraries.official_website, 'https://getuikit.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Combinaison parfaite de légèreté, modularité et élégance visuelle, avec une attention particulière aux animations et transitions fluides'),
  best_for = COALESCE(libraries.best_for, 'Projets nécessitant une interface utilisateur moderne et élégante avec des animations fluides et une approche modulaire'),
  features = COALESCE(libraries.features, ARRAY['Plus de 30 composants modulaires', 'Système de grille flexible basé sur Flexbox', 'Animations et transitions fluides', 'Thèmes personnalisables', 'Intégration JavaScript complète', 'Approche mobile-first', 'Système d''icônes intégré', 'Préprocesseur Less/Sass', 'Personnalisation via variables', 'Architecture extensible via plugins']),
  used_for = COALESCE(libraries.used_for, 'Sites web modernes, applications web, interfaces utilisateur complexes, projets nécessitant une approche modulaire'),
  version = COALESCE(libraries.version, '3.17.11'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://getuikit.com/docs/introduction'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/uikit/uikit');


-- Framework: Foundation (Css)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Css'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Foundation', (SELECT id FROM language_id), 'Framework front-end responsive avancé pour créer des sites et applications professionnels', 'https://get.foundation/', 'Framework professionnel avec options avancées pour les besoins d''entreprise et une approche ''mobile-first''', 'Projets d''entreprise nécessitant flexibilité et personnalisation avancée', ARRAY['Système de grille responsive avancé', 'Composants d''interface utilisateur', 'Typographie responsive', 'Formulaires et validation', 'Navigation et menus', 'Personnalisation via Sass', 'Accessibilité', 'Framework d''emails responsives', 'Système de plugins'], 'Sites web d''entreprise, applications web, emails responsives, prototypage', '6.7.5', 'https://get.foundation/sites/docs/', 'https://github.com/foundation/foundation-sites'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework front-end responsive avancé pour créer des sites et applications professionnels'),
  official_website = COALESCE(libraries.official_website, 'https://get.foundation/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework professionnel avec options avancées pour les besoins d''entreprise et une approche ''mobile-first'''),
  best_for = COALESCE(libraries.best_for, 'Projets d''entreprise nécessitant flexibilité et personnalisation avancée'),
  features = COALESCE(libraries.features, ARRAY['Système de grille responsive avancé', 'Composants d''interface utilisateur', 'Typographie responsive', 'Formulaires et validation', 'Navigation et menus', 'Personnalisation via Sass', 'Accessibilité', 'Framework d''emails responsives', 'Système de plugins']),
  used_for = COALESCE(libraries.used_for, 'Sites web d''entreprise, applications web, emails responsives, prototypage'),
  version = COALESCE(libraries.version, '6.7.5'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://get.foundation/sites/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/foundation/foundation-sites');


-- Framework: Bulma (Css)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Css'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Bulma', (SELECT id FROM language_id), 'Framework CSS moderne basé sur Flexbox sans JavaScript', 'https://bulma.io/', 'Framework CSS pur sans JavaScript avec une approche moderne basée sur Flexbox', 'Projets nécessitant une interface moderne sans dépendance JavaScript', ARRAY['Basé entièrement sur Flexbox', 'Modulaire et léger', 'Sans JavaScript', 'Responsive par défaut', 'Système de colonnes flexible', 'Composants modernes', 'Personnalisation via variables Sass', 'Approche mobile-first'], 'Sites web modernes, interfaces utilisateur, applications web, prototypage', '0.9.4', 'https://bulma.io/documentation/', 'https://github.com/jgthms/bulma'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework CSS moderne basé sur Flexbox sans JavaScript'),
  official_website = COALESCE(libraries.official_website, 'https://bulma.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework CSS pur sans JavaScript avec une approche moderne basée sur Flexbox'),
  best_for = COALESCE(libraries.best_for, 'Projets nécessitant une interface moderne sans dépendance JavaScript'),
  features = COALESCE(libraries.features, ARRAY['Basé entièrement sur Flexbox', 'Modulaire et léger', 'Sans JavaScript', 'Responsive par défaut', 'Système de colonnes flexible', 'Composants modernes', 'Personnalisation via variables Sass', 'Approche mobile-first']),
  used_for = COALESCE(libraries.used_for, 'Sites web modernes, interfaces utilisateur, applications web, prototypage'),
  version = COALESCE(libraries.version, '0.9.4'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://bulma.io/documentation/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/jgthms/bulma');


-- Framework: Skeleton (Css)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Css'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Skeleton', (SELECT id FROM language_id), 'Framework CSS ultra-léger pour sites responsives', 'http://getskeleton.com/', 'Framework CSS minimaliste qui fournit juste l''essentiel pour démarrer rapidement', 'Projets simples nécessitant une base CSS légère sans superflu', ARRAY['Ultra-léger (~400 lignes de CSS)', 'Système de grille responsive', 'Typographie de base', 'Boutons et formulaires', 'Utilitaires simples', 'Mobile-first', 'Sans classes complexes'], 'Sites web simples, prototypes, projets nécessitant base minimale', '2.0.4', 'http://getskeleton.com/', 'https://github.com/dhg/Skeleton'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework CSS ultra-léger pour sites responsives'),
  official_website = COALESCE(libraries.official_website, 'http://getskeleton.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework CSS minimaliste qui fournit juste l''essentiel pour démarrer rapidement'),
  best_for = COALESCE(libraries.best_for, 'Projets simples nécessitant une base CSS légère sans superflu'),
  features = COALESCE(libraries.features, ARRAY['Ultra-léger (~400 lignes de CSS)', 'Système de grille responsive', 'Typographie de base', 'Boutons et formulaires', 'Utilitaires simples', 'Mobile-first', 'Sans classes complexes']),
  used_for = COALESCE(libraries.used_for, 'Sites web simples, prototypes, projets nécessitant base minimale'),
  version = COALESCE(libraries.version, '2.0.4'),
  documentation_url = COALESCE(libraries.documentation_url, 'http://getskeleton.com/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/dhg/Skeleton');


-- Framework: Milligram (Css)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Css'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Milligram', (SELECT id FROM language_id), 'Framework CSS minimaliste pour un démarrage rapide avec un style minimal', 'https://milligram.io/', 'Framework CSS ultra-léger avec style minimaliste et moderne', 'Projets nécessitant une base CSS légère avec un style élégant', ARRAY['Taille minimale (2kb gzippé)', 'Typographie responsive', 'Système de grille basé sur Flexbox', 'Formulaires élégants', 'Utilisation de variables CSS', 'Style épuré et minimaliste', 'Compatible avec tous les navigateurs modernes'], 'Sites web légers, prototypes, projets avec design minimaliste', '1.4.1', 'https://milligram.io/', 'https://github.com/milligram/milligram'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework CSS minimaliste pour un démarrage rapide avec un style minimal'),
  official_website = COALESCE(libraries.official_website, 'https://milligram.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework CSS ultra-léger avec style minimaliste et moderne'),
  best_for = COALESCE(libraries.best_for, 'Projets nécessitant une base CSS légère avec un style élégant'),
  features = COALESCE(libraries.features, ARRAY['Taille minimale (2kb gzippé)', 'Typographie responsive', 'Système de grille basé sur Flexbox', 'Formulaires élégants', 'Utilisation de variables CSS', 'Style épuré et minimaliste', 'Compatible avec tous les navigateurs modernes']),
  used_for = COALESCE(libraries.used_for, 'Sites web légers, prototypes, projets avec design minimaliste'),
  version = COALESCE(libraries.version, '1.4.1'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://milligram.io/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/milligram/milligram');


-- Framework: Flutter (Dart)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Dart'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Flutter', (SELECT id FROM language_id), 'Framework UI multiplateforme de Google pour créer des applications natives compilées à partir d''une seule base de code Dart', 'https://flutter.dev/', 'Développement multiplateforme avec une expérience utilisateur native et des performances exceptionnelles grâce à la compilation AOT (Ahead-of-Time)', 'Équipes souhaitant développer des applications multiplateformes avec une interface utilisateur riche, des animations fluides et une expérience utilisateur native', ARRAY['Hot Reload pour un développement rapide', 'Widgets personnalisables et composables', 'Rendu haute performance avec le moteur Skia', 'Animations fluides à 60 FPS', 'Intégration native avec les plateformes cibles', 'Gestion d''état intégrée et extensible', 'Internationalisation et accessibilité', 'DevTools pour le débogage et l''analyse de performances', 'Support pour Material Design et Cupertino (iOS)'], 'Applications mobiles iOS et Android, applications web progressives (PWA), applications de bureau (Windows, macOS, Linux), applications embarquées', '3.19.0', 'https://docs.flutter.dev/', 'https://github.com/flutter/flutter'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework UI multiplateforme de Google pour créer des applications natives compilées à partir d''une seule base de code Dart'),
  official_website = COALESCE(libraries.official_website, 'https://flutter.dev/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Développement multiplateforme avec une expérience utilisateur native et des performances exceptionnelles grâce à la compilation AOT (Ahead-of-Time)'),
  best_for = COALESCE(libraries.best_for, 'Équipes souhaitant développer des applications multiplateformes avec une interface utilisateur riche, des animations fluides et une expérience utilisateur native'),
  features = COALESCE(libraries.features, ARRAY['Hot Reload pour un développement rapide', 'Widgets personnalisables et composables', 'Rendu haute performance avec le moteur Skia', 'Animations fluides à 60 FPS', 'Intégration native avec les plateformes cibles', 'Gestion d''état intégrée et extensible', 'Internationalisation et accessibilité', 'DevTools pour le débogage et l''analyse de performances', 'Support pour Material Design et Cupertino (iOS)']),
  used_for = COALESCE(libraries.used_for, 'Applications mobiles iOS et Android, applications web progressives (PWA), applications de bureau (Windows, macOS, Linux), applications embarquées'),
  version = COALESCE(libraries.version, '3.19.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.flutter.dev/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/flutter/flutter');


-- Framework: AngularDart (Dart)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Dart'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'AngularDart', (SELECT id FROM language_id), 'Version Dart du framework Angular, optimisée pour les applications web d''entreprise avec typage statique et performances élevées', 'https://angulardart.dev/', 'Combinaison de la structure robuste d''Angular avec les avantages du typage statique de Dart pour des applications web d''entreprise fiables et maintenables', 'Équipes de développement d''entreprise cherchant à construire des applications web complexes avec une architecture solide et un typage fort', ARRAY['Architecture basée sur les composants', 'Injection de dépendances robuste', 'Typage statique complet', 'Formulaires réactifs et basés sur les templates', 'Routage puissant et configurable', 'Compilation AOT (Ahead-of-Time) pour des performances optimales', 'Intégration avec les services web et APIs REST', 'Tests unitaires et d''intégration intégrés', 'Internationalisation (i18n)', 'Intégration avec l''écosystème Dart'], 'Applications web d''entreprise, applications à grande échelle, applications web progressives (PWA), applications internes d''entreprise', '7.0.0', 'https://angulardart.dev/guide', 'https://github.com/dart-lang/angular'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Version Dart du framework Angular, optimisée pour les applications web d''entreprise avec typage statique et performances élevées'),
  official_website = COALESCE(libraries.official_website, 'https://angulardart.dev/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Combinaison de la structure robuste d''Angular avec les avantages du typage statique de Dart pour des applications web d''entreprise fiables et maintenables'),
  best_for = COALESCE(libraries.best_for, 'Équipes de développement d''entreprise cherchant à construire des applications web complexes avec une architecture solide et un typage fort'),
  features = COALESCE(libraries.features, ARRAY['Architecture basée sur les composants', 'Injection de dépendances robuste', 'Typage statique complet', 'Formulaires réactifs et basés sur les templates', 'Routage puissant et configurable', 'Compilation AOT (Ahead-of-Time) pour des performances optimales', 'Intégration avec les services web et APIs REST', 'Tests unitaires et d''intégration intégrés', 'Internationalisation (i18n)', 'Intégration avec l''écosystème Dart']),
  used_for = COALESCE(libraries.used_for, 'Applications web d''entreprise, applications à grande échelle, applications web progressives (PWA), applications internes d''entreprise'),
  version = COALESCE(libraries.version, '7.0.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://angulardart.dev/guide'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/dart-lang/angular');


-- Framework: Aqueduct (Dart)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Dart'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Aqueduct', (SELECT id FROM language_id), 'Framework serveur Dart complet pour le développement d''APIs RESTful et d''applications backend (Note: maintenant considéré comme legacy, remplacé par Conduit)', 'https://aqueduct.io/', 'Framework backend Dart tout-en-un avec ORM, authentification et documentation API intégrés pour un développement rapide et structuré', 'Développeurs Dart cherchant à construire des APIs RESTful complètes avec une architecture MVC et des fonctionnalités d''entreprise', ARRAY['ORM intégré pour la persistance des données', 'Système de routage basé sur les contrôleurs', 'Authentification OAuth 2.0 intégrée', 'Documentation OpenAPI automatique', 'Tests d''intégration et unitaires', 'Migrations de base de données', 'Validation des requêtes', 'Gestion des erreurs HTTP', 'Middleware configurable', 'Support pour PostgreSQL'], 'APIs RESTful, services backend, microservices, applications serveur, authentification et autorisation', '4.0.0-b1 (legacy)', 'https://aqueduct.io/docs/', 'https://github.com/stablekernel/aqueduct'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework serveur Dart complet pour le développement d''APIs RESTful et d''applications backend (Note: maintenant considéré comme legacy, remplacé par Conduit)'),
  official_website = COALESCE(libraries.official_website, 'https://aqueduct.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework backend Dart tout-en-un avec ORM, authentification et documentation API intégrés pour un développement rapide et structuré'),
  best_for = COALESCE(libraries.best_for, 'Développeurs Dart cherchant à construire des APIs RESTful complètes avec une architecture MVC et des fonctionnalités d''entreprise'),
  features = COALESCE(libraries.features, ARRAY['ORM intégré pour la persistance des données', 'Système de routage basé sur les contrôleurs', 'Authentification OAuth 2.0 intégrée', 'Documentation OpenAPI automatique', 'Tests d''intégration et unitaires', 'Migrations de base de données', 'Validation des requêtes', 'Gestion des erreurs HTTP', 'Middleware configurable', 'Support pour PostgreSQL']),
  used_for = COALESCE(libraries.used_for, 'APIs RESTful, services backend, microservices, applications serveur, authentification et autorisation'),
  version = COALESCE(libraries.version, '4.0.0-b1 (legacy)'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://aqueduct.io/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/stablekernel/aqueduct');


-- Framework: Shelf (Dart)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Dart'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Shelf', (SELECT id FROM language_id), 'Bibliothèque Dart minimaliste et composable pour créer des applications web et des serveurs HTTP', 'https://pub.dev/packages/shelf', 'Approche minimaliste et composable pour construire des serveurs HTTP en Dart, offrant une flexibilité maximale et une excellente testabilité', 'Développeurs préférant une approche modulaire et composable pour construire des applications backend, ou nécessitant un contrôle précis sur le pipeline HTTP', ARRAY['Architecture basée sur les middleware', 'Composabilité et extensibilité maximales', 'Handlers pour le traitement des requêtes HTTP', 'Support pour les serveurs HTTP asynchrones', 'Intégration facile avec d''autres bibliothèques Dart', 'Testabilité élevée', 'Performances optimisées', 'Support pour les streams et les réponses asynchrones', 'Routage flexible via shelf_router', 'Support pour HTTP/2'], 'APIs RESTful légères, microservices, middleware HTTP, serveurs web personnalisés, applications backend modulaires', '1.4.1', 'https://pub.dev/documentation/shelf/latest/', 'https://github.com/dart-lang/shelf'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque Dart minimaliste et composable pour créer des applications web et des serveurs HTTP'),
  official_website = COALESCE(libraries.official_website, 'https://pub.dev/packages/shelf'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Approche minimaliste et composable pour construire des serveurs HTTP en Dart, offrant une flexibilité maximale et une excellente testabilité'),
  best_for = COALESCE(libraries.best_for, 'Développeurs préférant une approche modulaire et composable pour construire des applications backend, ou nécessitant un contrôle précis sur le pipeline HTTP'),
  features = COALESCE(libraries.features, ARRAY['Architecture basée sur les middleware', 'Composabilité et extensibilité maximales', 'Handlers pour le traitement des requêtes HTTP', 'Support pour les serveurs HTTP asynchrones', 'Intégration facile avec d''autres bibliothèques Dart', 'Testabilité élevée', 'Performances optimisées', 'Support pour les streams et les réponses asynchrones', 'Routage flexible via shelf_router', 'Support pour HTTP/2']),
  used_for = COALESCE(libraries.used_for, 'APIs RESTful légères, microservices, middleware HTTP, serveurs web personnalisés, applications backend modulaires'),
  version = COALESCE(libraries.version, '1.4.1'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://pub.dev/documentation/shelf/latest/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/dart-lang/shelf');


-- Framework: Phoenix (Elixir)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Elixir'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Phoenix', (SELECT id FROM language_id), 'Framework web complet et performant pour Elixir, conçu pour créer des applications robustes et hautement évolutives', 'https://www.phoenixframework.org/', 'Performances exceptionnelles et développement d''applications temps réel avec une productivité élevée grâce à LiveView qui élimine le besoin de JavaScript côté client', 'Applications web nécessitant une haute concurrence, une faible latence et une tolérance aux pannes, comme les plateformes de chat, les jeux en ligne, les tableaux de bord en temps réel', ARRAY['Architecture MVC', 'Système de routage expressif', 'Générateurs de code pour un développement rapide', 'LiveView pour des interfaces réactives sans JavaScript', 'Channels pour la communication bidirectionnelle en temps réel', 'PubSub pour la communication entre processus', 'Présence pour suivre les utilisateurs en ligne', 'Tests intégrés', 'Haute performance et faible latence', 'Support pour WebSockets et longpolling'], 'Applications web, APIs RESTful, applications temps réel, microservices, applications à haute disponibilité, systèmes distribués', '1.7.10', 'https://hexdocs.pm/phoenix/overview.html', 'https://github.com/phoenixframework/phoenix'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web complet et performant pour Elixir, conçu pour créer des applications robustes et hautement évolutives'),
  official_website = COALESCE(libraries.official_website, 'https://www.phoenixframework.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Performances exceptionnelles et développement d''applications temps réel avec une productivité élevée grâce à LiveView qui élimine le besoin de JavaScript côté client'),
  best_for = COALESCE(libraries.best_for, 'Applications web nécessitant une haute concurrence, une faible latence et une tolérance aux pannes, comme les plateformes de chat, les jeux en ligne, les tableaux de bord en temps réel'),
  features = COALESCE(libraries.features, ARRAY['Architecture MVC', 'Système de routage expressif', 'Générateurs de code pour un développement rapide', 'LiveView pour des interfaces réactives sans JavaScript', 'Channels pour la communication bidirectionnelle en temps réel', 'PubSub pour la communication entre processus', 'Présence pour suivre les utilisateurs en ligne', 'Tests intégrés', 'Haute performance et faible latence', 'Support pour WebSockets et longpolling']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs RESTful, applications temps réel, microservices, applications à haute disponibilité, systèmes distribués'),
  version = COALESCE(libraries.version, '1.7.10'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://hexdocs.pm/phoenix/overview.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/phoenixframework/phoenix');


-- Framework: Nerves (Elixir)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Elixir'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Nerves', (SELECT id FROM language_id), 'Framework pour construire des applications embarquées et IoT avec Elixir sur des plateformes matérielles comme Raspberry Pi', 'https://www.nerves-project.org/', 'Développement d''applications IoT robustes et professionnelles avec la puissance d''Elixir et d''Erlang/OTP, offrant une tolérance aux pannes et des mises à jour à distance sécurisées', 'Projets IoT nécessitant fiabilité, mises à jour à distance et longue durée de fonctionnement sans intervention humaine', ARRAY['Système d''exploitation minimal basé sur Linux', 'Mises à jour OTA (Over-The-Air)', 'Démarrage rapide (quelques secondes)', 'Système de fichiers en lecture seule pour la résilience', 'Gestion des firmwares', 'Tolérance aux pannes héritée d''Erlang/OTP', 'Outils de débogage à distance'], 'Internet des objets (IoT), systèmes embarqués, automatisation industrielle, domotique, robotique, applications de surveillance, kiosques interactifs', '1.10.4', 'https://hexdocs.pm/nerves/getting-started.html', 'https://github.com/nerves-project/nerves'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework pour construire des applications embarquées et IoT avec Elixir sur des plateformes matérielles comme Raspberry Pi'),
  official_website = COALESCE(libraries.official_website, 'https://www.nerves-project.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Développement d''applications IoT robustes et professionnelles avec la puissance d''Elixir et d''Erlang/OTP, offrant une tolérance aux pannes et des mises à jour à distance sécurisées'),
  best_for = COALESCE(libraries.best_for, 'Projets IoT nécessitant fiabilité, mises à jour à distance et longue durée de fonctionnement sans intervention humaine'),
  features = COALESCE(libraries.features, ARRAY['Système d''exploitation minimal basé sur Linux', 'Mises à jour OTA (Over-The-Air)', 'Démarrage rapide (quelques secondes)', 'Système de fichiers en lecture seule pour la résilience', 'Gestion des firmwares', 'Tolérance aux pannes héritée d''Erlang/OTP', 'Outils de débogage à distance']),
  used_for = COALESCE(libraries.used_for, 'Internet des objets (IoT), systèmes embarqués, automatisation industrielle, domotique, robotique, applications de surveillance, kiosques interactifs'),
  version = COALESCE(libraries.version, '1.10.4'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://hexdocs.pm/nerves/getting-started.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/nerves-project/nerves');


-- Framework: Absinthe (Elixir)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Elixir'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Absinthe', (SELECT id FROM language_id), 'Framework GraphQL pour Elixir, permettant de créer des APIs GraphQL performantes et flexibles', 'https://absinthe-graphql.org/', 'Implémentation GraphQL native pour Elixir qui exploite la concurrence et la tolérance aux pannes d''Erlang/OTP pour des APIs GraphQL hautement performantes et évolutives', 'APIs nécessitant des requêtes flexibles, des performances élevées et des fonctionnalités en temps réel', ARRAY['Implémentation complète de la spécification GraphQL', 'Schémas GraphQL en Elixir pur', 'Résolution parallèle des requêtes', 'Subscriptions en temps réel', 'Intégration avec Phoenix', 'Middleware et plugins extensibles', 'Validation et introspection', 'Batching et dataloader pour éviter le problème N+1', 'Support pour les directives et les fragments', 'Documentation intégrée avec GraphiQL'], 'APIs GraphQL, applications avec requêtes complexes, applications mobiles, applications avec besoins de données flexibles, agrégation de données', '1.7.5', 'https://hexdocs.pm/absinthe/overview.html', 'https://github.com/absinthe-graphql/absinthe'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework GraphQL pour Elixir, permettant de créer des APIs GraphQL performantes et flexibles'),
  official_website = COALESCE(libraries.official_website, 'https://absinthe-graphql.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Implémentation GraphQL native pour Elixir qui exploite la concurrence et la tolérance aux pannes d''Erlang/OTP pour des APIs GraphQL hautement performantes et évolutives'),
  best_for = COALESCE(libraries.best_for, 'APIs nécessitant des requêtes flexibles, des performances élevées et des fonctionnalités en temps réel'),
  features = COALESCE(libraries.features, ARRAY['Implémentation complète de la spécification GraphQL', 'Schémas GraphQL en Elixir pur', 'Résolution parallèle des requêtes', 'Subscriptions en temps réel', 'Intégration avec Phoenix', 'Middleware et plugins extensibles', 'Validation et introspection', 'Batching et dataloader pour éviter le problème N+1', 'Support pour les directives et les fragments', 'Documentation intégrée avec GraphiQL']),
  used_for = COALESCE(libraries.used_for, 'APIs GraphQL, applications avec requêtes complexes, applications mobiles, applications avec besoins de données flexibles, agrégation de données'),
  version = COALESCE(libraries.version, '1.7.5'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://hexdocs.pm/absinthe/overview.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/absinthe-graphql/absinthe');


-- Framework: Ecto (Elixir)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Elixir'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Ecto', (SELECT id FROM language_id), 'Bibliothèque de base de données et ORM pour Elixir, offrant un moyen robuste d''interagir avec les bases de données relationnelles', 'https://hexdocs.pm/ecto/Ecto.html', 'ORM fonctionnel qui sépare clairement les préoccupations (requêtes, schémas, changesets) et offre une sécurité de type sans sacrifier la flexibilité ou les performances', 'Applications nécessitant un accès fiable et performant aux bases de données avec une modélisation de données robuste', ARRAY['DSL de requête composable et type-safe', 'Migrations de schéma', 'Associations et relations', 'Validations et contraintes', 'Transactions', 'Changesets pour les transformations de données sécurisées', 'Requêtes paramétrées pour éviter les injections SQL', 'Support pour les types personnalisés', 'Fonctions d''agrégation et sous-requêtes'], 'Accès aux bases de données, modélisation de données, migrations de schémas, requêtes complexes, validation de données, applications avec persistance', '3.10.3', 'https://hexdocs.pm/ecto/Ecto.html', 'https://github.com/elixir-ecto/ecto'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque de base de données et ORM pour Elixir, offrant un moyen robuste d''interagir avec les bases de données relationnelles'),
  official_website = COALESCE(libraries.official_website, 'https://hexdocs.pm/ecto/Ecto.html'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'ORM fonctionnel qui sépare clairement les préoccupations (requêtes, schémas, changesets) et offre une sécurité de type sans sacrifier la flexibilité ou les performances'),
  best_for = COALESCE(libraries.best_for, 'Applications nécessitant un accès fiable et performant aux bases de données avec une modélisation de données robuste'),
  features = COALESCE(libraries.features, ARRAY['DSL de requête composable et type-safe', 'Migrations de schéma', 'Associations et relations', 'Validations et contraintes', 'Transactions', 'Changesets pour les transformations de données sécurisées', 'Requêtes paramétrées pour éviter les injections SQL', 'Support pour les types personnalisés', 'Fonctions d''agrégation et sous-requêtes']),
  used_for = COALESCE(libraries.used_for, 'Accès aux bases de données, modélisation de données, migrations de schémas, requêtes complexes, validation de données, applications avec persistance'),
  version = COALESCE(libraries.version, '3.10.3'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://hexdocs.pm/ecto/Ecto.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/elixir-ecto/ecto');


-- Framework: OTP (Open Telecom Platform) (Erlang)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Erlang'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'OTP (Open Telecom Platform)', (SELECT id FROM language_id), 'Ensemble de bibliothèques et principes de conception pour construire des applications Erlang robustes', 'https://www.erlang.org/', 'Framework éprouvé pour construire des systèmes distribués hautement disponibles', 'Applications critiques nécessitant haute disponibilité et tolérance aux pannes', ARRAY['Supervision d''arbres', 'Comportements génériques', 'Gestion d''erreurs', 'Distribution transparente', 'Hot code swapping'], 'Applications distribuées, systèmes tolérants aux pannes, télécommunications, systèmes temps réel', '26.0', 'https://www.erlang.org/doc/', 'https://github.com/erlang/otp'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Ensemble de bibliothèques et principes de conception pour construire des applications Erlang robustes'),
  official_website = COALESCE(libraries.official_website, 'https://www.erlang.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework éprouvé pour construire des systèmes distribués hautement disponibles'),
  best_for = COALESCE(libraries.best_for, 'Applications critiques nécessitant haute disponibilité et tolérance aux pannes'),
  features = COALESCE(libraries.features, ARRAY['Supervision d''arbres', 'Comportements génériques', 'Gestion d''erreurs', 'Distribution transparente', 'Hot code swapping']),
  used_for = COALESCE(libraries.used_for, 'Applications distribuées, systèmes tolérants aux pannes, télécommunications, systèmes temps réel'),
  version = COALESCE(libraries.version, '26.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.erlang.org/doc/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/erlang/otp');


-- Framework: Cowboy (Erlang)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Erlang'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Cowboy', (SELECT id FROM language_id), 'Serveur HTTP petit, rapide et moderne pour Erlang/OTP', 'https://ninenines.eu/docs/en/cowboy/2.9/guide/', 'Serveur HTTP Erlang léger et performant avec support moderne', 'Applications web Erlang nécessitant performances et fonctionnalités modernes', ARRAY['Support HTTP/1.1 et HTTP/2', 'WebSockets', 'Streaming', 'Routage basé sur les patterns', 'Middleware'], 'Applications web, APIs RESTful, WebSockets, services HTTP', '2.10.0', 'https://ninenines.eu/docs/en/cowboy/2.9/guide/', 'https://github.com/ninenines/cowboy'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Serveur HTTP petit, rapide et moderne pour Erlang/OTP'),
  official_website = COALESCE(libraries.official_website, 'https://ninenines.eu/docs/en/cowboy/2.9/guide/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Serveur HTTP Erlang léger et performant avec support moderne'),
  best_for = COALESCE(libraries.best_for, 'Applications web Erlang nécessitant performances et fonctionnalités modernes'),
  features = COALESCE(libraries.features, ARRAY['Support HTTP/1.1 et HTTP/2', 'WebSockets', 'Streaming', 'Routage basé sur les patterns', 'Middleware']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs RESTful, WebSockets, services HTTP'),
  version = COALESCE(libraries.version, '2.10.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://ninenines.eu/docs/en/cowboy/2.9/guide/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/ninenines/cowboy');


-- Framework: OpenMP (Fortran)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Fortran'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'OpenMP', (SELECT id FROM language_id), 'API pour la programmation parallèle multi-plateforme', 'https://www.openmp.org/', 'Parallélisation simple et portable pour applications Fortran', 'Applications scientifiques nécessitant performances sur architectures multi-cœurs', ARRAY['Directives de compilation', 'Parallélisme de tâches', 'Parallélisme de données', 'Environnement d''exécution', 'Portabilité'], 'Calcul haute performance, parallélisation, applications scientifiques', '5.2', 'https://www.openmp.org/specifications/', 'https://github.com/OpenMP/OpenMP-Examples'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'API pour la programmation parallèle multi-plateforme'),
  official_website = COALESCE(libraries.official_website, 'https://www.openmp.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Parallélisation simple et portable pour applications Fortran'),
  best_for = COALESCE(libraries.best_for, 'Applications scientifiques nécessitant performances sur architectures multi-cœurs'),
  features = COALESCE(libraries.features, ARRAY['Directives de compilation', 'Parallélisme de tâches', 'Parallélisme de données', 'Environnement d''exécution', 'Portabilité']),
  used_for = COALESCE(libraries.used_for, 'Calcul haute performance, parallélisation, applications scientifiques'),
  version = COALESCE(libraries.version, '5.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.openmp.org/specifications/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/OpenMP/OpenMP-Examples');


-- Framework: MPI (Fortran)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Fortran'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'MPI', (SELECT id FROM language_id), 'Standard pour la communication dans les applications parallèles', 'https://www.mpi-forum.org/', 'Communication efficace entre processus pour calcul distribué', 'Applications scientifiques sur clusters et supercalculateurs', ARRAY['Communication point-à-point', 'Opérations collectives', 'Groupes de processus', 'Topologies virtuelles', 'E/S parallèles'], 'Calcul distribué, supercalculateurs, simulations scientifiques', '4.0', 'https://www.mpi-forum.org/docs/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Standard pour la communication dans les applications parallèles'),
  official_website = COALESCE(libraries.official_website, 'https://www.mpi-forum.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Communication efficace entre processus pour calcul distribué'),
  best_for = COALESCE(libraries.best_for, 'Applications scientifiques sur clusters et supercalculateurs'),
  features = COALESCE(libraries.features, ARRAY['Communication point-à-point', 'Opérations collectives', 'Groupes de processus', 'Topologies virtuelles', 'E/S parallèles']),
  used_for = COALESCE(libraries.used_for, 'Calcul distribué, supercalculateurs, simulations scientifiques'),
  version = COALESCE(libraries.version, '4.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.mpi-forum.org/docs/');


-- Framework: BLAS (Fortran)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Fortran'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'BLAS', (SELECT id FROM language_id), 'Bibliothèque d''algèbre linéaire de base', 'http://www.netlib.org/blas/', 'Opérations d''algèbre linéaire optimisées pour hautes performances', 'Applications scientifiques nécessitant calculs matriciels efficaces', ARRAY['Opérations vectorielles', 'Opérations matrice-vecteur', 'Opérations matrice-matrice', 'Optimisations spécifiques au matériel', 'Interface standardisée'], 'Calcul scientifique, algèbre linéaire, opérations matricielles', '3.10.0', 'http://www.netlib.org/blas/#_documentation', 'https://github.com/Reference-LAPACK/lapack/tree/master/BLAS'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque d''algèbre linéaire de base'),
  official_website = COALESCE(libraries.official_website, 'http://www.netlib.org/blas/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Opérations d''algèbre linéaire optimisées pour hautes performances'),
  best_for = COALESCE(libraries.best_for, 'Applications scientifiques nécessitant calculs matriciels efficaces'),
  features = COALESCE(libraries.features, ARRAY['Opérations vectorielles', 'Opérations matrice-vecteur', 'Opérations matrice-matrice', 'Optimisations spécifiques au matériel', 'Interface standardisée']),
  used_for = COALESCE(libraries.used_for, 'Calcul scientifique, algèbre linéaire, opérations matricielles'),
  version = COALESCE(libraries.version, '3.10.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'http://www.netlib.org/blas/#_documentation'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/Reference-LAPACK/lapack/tree/master/BLAS');


-- Framework: LAPACK (Fortran)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Fortran'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'LAPACK', (SELECT id FROM language_id), 'Bibliothèque d''algèbre linéaire avancée', 'http://www.netlib.org/lapack/', 'Bibliothèque complète pour problèmes d''algèbre linéaire avancés', 'Applications scientifiques nécessitant algèbre linéaire sophistiquée', ARRAY['Systèmes d''équations linéaires', 'Problèmes de valeurs propres', 'Décompositions matricielles', 'Factorisation', 'Routines auxiliaires'], 'Calcul scientifique, résolution de systèmes, décompositions matricielles', '3.10.1', 'http://www.netlib.org/lapack/explore-html/', 'https://github.com/Reference-LAPACK/lapack'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque d''algèbre linéaire avancée'),
  official_website = COALESCE(libraries.official_website, 'http://www.netlib.org/lapack/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Bibliothèque complète pour problèmes d''algèbre linéaire avancés'),
  best_for = COALESCE(libraries.best_for, 'Applications scientifiques nécessitant algèbre linéaire sophistiquée'),
  features = COALESCE(libraries.features, ARRAY['Systèmes d''équations linéaires', 'Problèmes de valeurs propres', 'Décompositions matricielles', 'Factorisation', 'Routines auxiliaires']),
  used_for = COALESCE(libraries.used_for, 'Calcul scientifique, résolution de systèmes, décompositions matricielles'),
  version = COALESCE(libraries.version, '3.10.1'),
  documentation_url = COALESCE(libraries.documentation_url, 'http://www.netlib.org/lapack/explore-html/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/Reference-LAPACK/lapack');


-- Framework: NAG (Fortran)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Fortran'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'NAG', (SELECT id FROM language_id), 'Bibliothèque numérique complète pour mathématiques et statistiques', 'https://www.nag.com/content/nag-fortran-library', 'Bibliothèque numérique complète avec support professionnel', 'Applications scientifiques et financières nécessitant fiabilité et précision', ARRAY['Algèbre linéaire', 'Optimisation', 'Quadrature', 'Équations différentielles', 'Statistiques'], 'Calcul scientifique, statistiques, optimisation, équations différentielles', '28.0', 'https://www.nag.com/numeric/fl/nagdoc_latest/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque numérique complète pour mathématiques et statistiques'),
  official_website = COALESCE(libraries.official_website, 'https://www.nag.com/content/nag-fortran-library'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Bibliothèque numérique complète avec support professionnel'),
  best_for = COALESCE(libraries.best_for, 'Applications scientifiques et financières nécessitant fiabilité et précision'),
  features = COALESCE(libraries.features, ARRAY['Algèbre linéaire', 'Optimisation', 'Quadrature', 'Équations différentielles', 'Statistiques']),
  used_for = COALESCE(libraries.used_for, 'Calcul scientifique, statistiques, optimisation, équations différentielles'),
  version = COALESCE(libraries.version, '28.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.nag.com/numeric/fl/nagdoc_latest/');


-- Framework: PETSc (Fortran)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Fortran'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'PETSc', (SELECT id FROM language_id), 'Suite de structures de données et routines pour applications scientifiques', 'https://petsc.org/', 'Bibliothèque scalable pour simulations scientifiques complexes', 'Applications scientifiques à grande échelle sur architectures parallèles', ARRAY['Solveurs linéaires', 'Solveurs non linéaires', 'Intégration temporelle', 'Maillages', 'Parallélisme'], 'Équations différentielles partielles, calcul scientifique, simulations', '3.19.0', 'https://petsc.org/release/documentation/', 'https://gitlab.com/petsc/petsc'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Suite de structures de données et routines pour applications scientifiques'),
  official_website = COALESCE(libraries.official_website, 'https://petsc.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Bibliothèque scalable pour simulations scientifiques complexes'),
  best_for = COALESCE(libraries.best_for, 'Applications scientifiques à grande échelle sur architectures parallèles'),
  features = COALESCE(libraries.features, ARRAY['Solveurs linéaires', 'Solveurs non linéaires', 'Intégration temporelle', 'Maillages', 'Parallélisme']),
  used_for = COALESCE(libraries.used_for, 'Équations différentielles partielles, calcul scientifique, simulations'),
  version = COALESCE(libraries.version, '3.19.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://petsc.org/release/documentation/'),
  github_url = COALESCE(libraries.github_url, 'https://gitlab.com/petsc/petsc');


-- Framework: Fable (F#)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'F#'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Fable', (SELECT id FROM language_id), 'Compilateur qui transforme le code F# en JavaScript/TypeScript pour le développement web et mobile', 'https://fable.io/', 'Développement frontend avec la sécurité et l''expressivité de F# tout en profitant de l''écosystème JavaScript, offrant une expérience de développement sans compromis', 'Développeurs .NET qui souhaitent utiliser F# pour le développement frontend tout en conservant la sécurité du typage statique', ARRAY['Compilation de F# vers JavaScript/TypeScript', 'Intégration transparente avec l''écosystème npm', 'Support pour React via Feliz ou Fable.React', 'Architecture Elmish (MVU) inspirée d''Elm', 'Interopérabilité bidirectionnelle avec JavaScript', 'Typage statique complet', 'Inférence de types puissante', 'Support pour les modules ES6', 'Hot Module Replacement'], 'Applications web, applications mobiles avec React Native, applications de bureau avec Electron, jeux avec Fable.Elmish', '4.1.4', 'https://fable.io/docs/', 'https://github.com/fable-compiler/Fable'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Compilateur qui transforme le code F# en JavaScript/TypeScript pour le développement web et mobile'),
  official_website = COALESCE(libraries.official_website, 'https://fable.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Développement frontend avec la sécurité et l''expressivité de F# tout en profitant de l''écosystème JavaScript, offrant une expérience de développement sans compromis'),
  best_for = COALESCE(libraries.best_for, 'Développeurs .NET qui souhaitent utiliser F# pour le développement frontend tout en conservant la sécurité du typage statique'),
  features = COALESCE(libraries.features, ARRAY['Compilation de F# vers JavaScript/TypeScript', 'Intégration transparente avec l''écosystème npm', 'Support pour React via Feliz ou Fable.React', 'Architecture Elmish (MVU) inspirée d''Elm', 'Interopérabilité bidirectionnelle avec JavaScript', 'Typage statique complet', 'Inférence de types puissante', 'Support pour les modules ES6', 'Hot Module Replacement']),
  used_for = COALESCE(libraries.used_for, 'Applications web, applications mobiles avec React Native, applications de bureau avec Electron, jeux avec Fable.Elmish'),
  version = COALESCE(libraries.version, '4.1.4'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://fable.io/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/fable-compiler/Fable');


-- Framework: Giraffe (F#)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'F#'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Giraffe', (SELECT id FROM language_id), 'Framework web fonctionnel pour F# construit sur ASP.NET Core', 'https://giraffe.wiki/', 'Approche fonctionnelle élégante pour le développement web sur ASP.NET Core, offrant la puissance et la flexibilité de F# avec les performances de la plateforme .NET', 'Développeurs F# cherchant à créer des applications web et des APIs avec une approche fonctionnelle sur la plateforme ASP.NET Core', ARRAY['Routage fonctionnel composable', 'Middleware ASP.NET Core', 'Modèle de programmation basé sur HttpHandler', 'Composition de fonctions pour le pipeline HTTP', 'Sérialisation/désérialisation JSON intégrée', 'Validation de modèles', 'Support pour les vues (Giraffe.ViewEngine)', 'Intégration avec ASP.NET Core', 'Performances élevées', 'Testabilité excellente'], 'APIs RESTful, applications web, microservices, backends pour applications SPA', '6.0.0', 'https://giraffe.wiki/', 'https://github.com/giraffe-fsharp/Giraffe'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web fonctionnel pour F# construit sur ASP.NET Core'),
  official_website = COALESCE(libraries.official_website, 'https://giraffe.wiki/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Approche fonctionnelle élégante pour le développement web sur ASP.NET Core, offrant la puissance et la flexibilité de F# avec les performances de la plateforme .NET'),
  best_for = COALESCE(libraries.best_for, 'Développeurs F# cherchant à créer des applications web et des APIs avec une approche fonctionnelle sur la plateforme ASP.NET Core'),
  features = COALESCE(libraries.features, ARRAY['Routage fonctionnel composable', 'Middleware ASP.NET Core', 'Modèle de programmation basé sur HttpHandler', 'Composition de fonctions pour le pipeline HTTP', 'Sérialisation/désérialisation JSON intégrée', 'Validation de modèles', 'Support pour les vues (Giraffe.ViewEngine)', 'Intégration avec ASP.NET Core', 'Performances élevées', 'Testabilité excellente']),
  used_for = COALESCE(libraries.used_for, 'APIs RESTful, applications web, microservices, backends pour applications SPA'),
  version = COALESCE(libraries.version, '6.0.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://giraffe.wiki/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/giraffe-fsharp/Giraffe');


-- Framework: FAKE (F# Make) (F#)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'F#'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'FAKE (F# Make)', (SELECT id FROM language_id), 'Système de build DSL pour F# inspiré par MAKE et RAKE, permettant d''automatiser les processus de build et de déploiement', 'https://fake.build/', 'Système de build entièrement programmable en F# qui combine la puissance d''un langage de programmation complet avec la simplicité d''un DSL dédié aux tâches de build', 'Projets F# ou .NET nécessitant des processus de build complexes et personnalisés avec une approche code-first', ARRAY['DSL F# pour définir des tâches de build', 'Exécution parallèle des tâches', 'Dépendances entre tâches', 'Extensible via des modules personnalisés', 'Support pour les scripts FAKE (.fsx)', 'Rechargement à chaud des scripts', 'Logging intégré'], 'Automatisation de builds, CI/CD, déploiement, tests, packaging, génération de documentation, scripts d''administration', '5.23.1', 'https://fake.build/guide.html', 'https://github.com/fsprojects/FAKE'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Système de build DSL pour F# inspiré par MAKE et RAKE, permettant d''automatiser les processus de build et de déploiement'),
  official_website = COALESCE(libraries.official_website, 'https://fake.build/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Système de build entièrement programmable en F# qui combine la puissance d''un langage de programmation complet avec la simplicité d''un DSL dédié aux tâches de build'),
  best_for = COALESCE(libraries.best_for, 'Projets F# ou .NET nécessitant des processus de build complexes et personnalisés avec une approche code-first'),
  features = COALESCE(libraries.features, ARRAY['DSL F# pour définir des tâches de build', 'Exécution parallèle des tâches', 'Dépendances entre tâches', 'Extensible via des modules personnalisés', 'Support pour les scripts FAKE (.fsx)', 'Rechargement à chaud des scripts', 'Logging intégré']),
  used_for = COALESCE(libraries.used_for, 'Automatisation de builds, CI/CD, déploiement, tests, packaging, génération de documentation, scripts d''administration'),
  version = COALESCE(libraries.version, '5.23.1'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://fake.build/guide.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/fsprojects/FAKE');


-- Framework: Suave (F#)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'F#'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Suave', (SELECT id FROM language_id), 'Framework web léger, non-bloquant et composable pour F#', 'https://suave.io/', 'Framework web F# minimaliste et élégant qui permet de créer des applications web avec une approche purement fonctionnelle, sans dépendance à ASP.NET', 'Applications web légères et APIs nécessitant une approche fonctionnelle pure et une empreinte minimale', ARRAY['Serveur web autonome', 'Modèle de programmation fonctionnelle', 'Composition de WebParts', 'Routage basé sur les fonctions', 'Support HTTPS', 'WebSockets', 'Serveur OWIN', 'Templating avec DotLiquid', 'Performances élevées', 'Empreinte mémoire minimale'], 'Applications web, APIs RESTful, microservices, prototypes, services web légers', '2.6.2', 'https://suave.io/index.html', 'https://github.com/SuaveIO/suave'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web léger, non-bloquant et composable pour F#'),
  official_website = COALESCE(libraries.official_website, 'https://suave.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web F# minimaliste et élégant qui permet de créer des applications web avec une approche purement fonctionnelle, sans dépendance à ASP.NET'),
  best_for = COALESCE(libraries.best_for, 'Applications web légères et APIs nécessitant une approche fonctionnelle pure et une empreinte minimale'),
  features = COALESCE(libraries.features, ARRAY['Serveur web autonome', 'Modèle de programmation fonctionnelle', 'Composition de WebParts', 'Routage basé sur les fonctions', 'Support HTTPS', 'WebSockets', 'Serveur OWIN', 'Templating avec DotLiquid', 'Performances élevées', 'Empreinte mémoire minimale']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs RESTful, microservices, prototypes, services web légers'),
  version = COALESCE(libraries.version, '2.6.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://suave.io/index.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/SuaveIO/suave');


-- Framework: FsLab (F#)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'F#'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'FsLab', (SELECT id FROM language_id), 'Suite d''outils pour la science des données et l''analyse numérique en F#', 'https://fslab.org/', 'Écosystème complet pour la science des données en F# qui combine la sécurité du typage statique avec la concision et l''expressivité de la programmation fonctionnelle', 'Scientifiques des données, analystes et chercheurs qui préfèrent un environnement de programmation fonctionnelle typée pour l''analyse de données', ARRAY['Visualisation de données avec XPlot et Plotly', 'Analyse statistique avec Math.NET Numerics', 'Accès aux données avec type providers', 'Notebooks F# interactifs', 'Intégration R via RProvider', 'Traitement de données tabulaires', 'Intégration avec .NET ML', 'Support pour les grands ensembles de données'], 'Science des données, analyse statistique, visualisation de données, machine learning, traitement de données, notebooks interactifs', '2.0.0', 'https://fslab.org/docs/', 'https://github.com/fslaborg/FsLab'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Suite d''outils pour la science des données et l''analyse numérique en F#'),
  official_website = COALESCE(libraries.official_website, 'https://fslab.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Écosystème complet pour la science des données en F# qui combine la sécurité du typage statique avec la concision et l''expressivité de la programmation fonctionnelle'),
  best_for = COALESCE(libraries.best_for, 'Scientifiques des données, analystes et chercheurs qui préfèrent un environnement de programmation fonctionnelle typée pour l''analyse de données'),
  features = COALESCE(libraries.features, ARRAY['Visualisation de données avec XPlot et Plotly', 'Analyse statistique avec Math.NET Numerics', 'Accès aux données avec type providers', 'Notebooks F# interactifs', 'Intégration R via RProvider', 'Traitement de données tabulaires', 'Intégration avec .NET ML', 'Support pour les grands ensembles de données']),
  used_for = COALESCE(libraries.used_for, 'Science des données, analyse statistique, visualisation de données, machine learning, traitement de données, notebooks interactifs'),
  version = COALESCE(libraries.version, '2.0.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://fslab.org/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/fslaborg/FsLab');


-- Framework: Saturn (F#)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'F#'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Saturn', (SELECT id FROM language_id), 'Framework web de haut niveau pour F# construit sur Giraffe, inspiré par Elixir''s Phoenix', 'https://saturnframework.org/', 'Combinaison de la puissance fonctionnelle de F# avec des conventions inspirées de frameworks web populaires comme Phoenix et Ruby on Rails, offrant productivité et type-safety', 'Développeurs F# cherchant un framework web complet avec des conventions et une structure claire pour des applications web de taille moyenne à grande', ARRAY['Architecture MVC', 'Système de routage élégant', 'Contrôleurs et vues typés', 'Génération de CRUD automatique', 'Intégration avec Entity Framework Core', 'Support pour l''authentification et l''autorisation', 'Middleware composable', 'Support pour les WebSockets', 'Intégration avec ASP.NET Core', 'CLI pour la génération de code'], 'Applications web, APIs RESTful, applications CRUD, backends pour applications SPA, microservices', '0.16.1', 'https://saturnframework.org/docs/', 'https://github.com/SaturnFramework/Saturn'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web de haut niveau pour F# construit sur Giraffe, inspiré par Elixir''s Phoenix'),
  official_website = COALESCE(libraries.official_website, 'https://saturnframework.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Combinaison de la puissance fonctionnelle de F# avec des conventions inspirées de frameworks web populaires comme Phoenix et Ruby on Rails, offrant productivité et type-safety'),
  best_for = COALESCE(libraries.best_for, 'Développeurs F# cherchant un framework web complet avec des conventions et une structure claire pour des applications web de taille moyenne à grande'),
  features = COALESCE(libraries.features, ARRAY['Architecture MVC', 'Système de routage élégant', 'Contrôleurs et vues typés', 'Génération de CRUD automatique', 'Intégration avec Entity Framework Core', 'Support pour l''authentification et l''autorisation', 'Middleware composable', 'Support pour les WebSockets', 'Intégration avec ASP.NET Core', 'CLI pour la génération de code']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs RESTful, applications CRUD, backends pour applications SPA, microservices'),
  version = COALESCE(libraries.version, '0.16.1'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://saturnframework.org/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/SaturnFramework/Saturn');


-- Framework: Gin (Go)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Go'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Gin', (SELECT id FROM language_id), 'Framework web HTTP léger et rapide pour Go, inspiré par Martini avec des performances bien meilleures', 'https://gin-gonic.com/', 'Combinaison parfaite entre performances exceptionnelles (jusqu''à 40 fois plus rapide que d''autres frameworks Go) et API élégante inspirée de Martini, idéale pour les applications à fort trafic', 'Développeurs cherchant un framework Go minimaliste mais complet avec des performances optimales pour des APIs et services web à fort trafic', ARRAY['Routage extrêmement rapide basé sur httprouter', 'Middleware flexible et extensible', 'Validation de données et binding de formulaires/JSON', 'Gestion des erreurs avec récupération élégante', 'Support pour le téléchargement/téléversement de fichiers', 'Groupes de routes pour une meilleure organisation', 'Injection de dépendances via le contexte', 'Tests unitaires facilités', 'Logging personnalisable'], 'APIs RESTful, microservices, applications web hautes performances, services backend, applications cloud natives', '1.9.1', 'https://gin-gonic.com/docs/', 'https://github.com/gin-gonic/gin'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web HTTP léger et rapide pour Go, inspiré par Martini avec des performances bien meilleures'),
  official_website = COALESCE(libraries.official_website, 'https://gin-gonic.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Combinaison parfaite entre performances exceptionnelles (jusqu''à 40 fois plus rapide que d''autres frameworks Go) et API élégante inspirée de Martini, idéale pour les applications à fort trafic'),
  best_for = COALESCE(libraries.best_for, 'Développeurs cherchant un framework Go minimaliste mais complet avec des performances optimales pour des APIs et services web à fort trafic'),
  features = COALESCE(libraries.features, ARRAY['Routage extrêmement rapide basé sur httprouter', 'Middleware flexible et extensible', 'Validation de données et binding de formulaires/JSON', 'Gestion des erreurs avec récupération élégante', 'Support pour le téléchargement/téléversement de fichiers', 'Groupes de routes pour une meilleure organisation', 'Injection de dépendances via le contexte', 'Tests unitaires facilités', 'Logging personnalisable']),
  used_for = COALESCE(libraries.used_for, 'APIs RESTful, microservices, applications web hautes performances, services backend, applications cloud natives'),
  version = COALESCE(libraries.version, '1.9.1'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://gin-gonic.com/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/gin-gonic/gin');


-- Framework: Echo (Go)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Go'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Echo', (SELECT id FROM language_id), 'Framework web haute performance et minimaliste pour Go avec une API élégante et extensible', 'https://echo.labstack.com/', 'API minimaliste et élégante combinée à des performances exceptionnelles et une extensibilité maximale, avec une documentation claire et complète', 'Développeurs Go cherchant un framework bien structuré, hautement personnalisable et performant pour des applications web modernes', ARRAY['Routage optimisé avec support des paramètres et expressions régulières', 'Middleware extensible avec architecture en oignon', 'Validation de données intégrée', 'Templates HTML avec différents moteurs', 'WebSockets natifs', 'Groupes de routes et sous-domaines', 'Gestion automatique des TLS/HTTPS', 'Système de contexte puissant', 'Injection de dépendances'], 'APIs RESTful, microservices, applications web, services cloud, applications temps réel, backends pour applications mobiles', '4.11.2', 'https://echo.labstack.com/docs/', 'https://github.com/labstack/echo'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web haute performance et minimaliste pour Go avec une API élégante et extensible'),
  official_website = COALESCE(libraries.official_website, 'https://echo.labstack.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'API minimaliste et élégante combinée à des performances exceptionnelles et une extensibilité maximale, avec une documentation claire et complète'),
  best_for = COALESCE(libraries.best_for, 'Développeurs Go cherchant un framework bien structuré, hautement personnalisable et performant pour des applications web modernes'),
  features = COALESCE(libraries.features, ARRAY['Routage optimisé avec support des paramètres et expressions régulières', 'Middleware extensible avec architecture en oignon', 'Validation de données intégrée', 'Templates HTML avec différents moteurs', 'WebSockets natifs', 'Groupes de routes et sous-domaines', 'Gestion automatique des TLS/HTTPS', 'Système de contexte puissant', 'Injection de dépendances']),
  used_for = COALESCE(libraries.used_for, 'APIs RESTful, microservices, applications web, services cloud, applications temps réel, backends pour applications mobiles'),
  version = COALESCE(libraries.version, '4.11.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://echo.labstack.com/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/labstack/echo');


-- Framework: Fiber (Go)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Go'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Fiber', (SELECT id FROM language_id), 'Framework web Express-inspiré pour Go basé sur Fasthttp, conçu pour faciliter les choses sans sacrifier les performances', 'https://gofiber.io/', 'Expérience de développement similaire à Express.js avec la puissance et les performances de Go, permettant une transition en douceur pour les développeurs JavaScript/Node.js', 'Développeurs JavaScript/Node.js passant à Go ou équipes cherchant un framework Go avec une syntaxe familière et des performances exceptionnelles', ARRAY['API inspirée d''Express.js pour une transition facile depuis Node.js', 'Routage ultra-rapide basé sur Fasthttp', 'Middleware à faible surcharge avec Next support', 'Système de templates intégré', 'WebSockets natifs', 'Rate limiter et compression', 'Support pour les tests API', 'Zéro allocation de mémoire dans le hot path', 'Serveur API prêt pour la production'], 'APIs RESTful, microservices, applications web, services temps réel, applications à fort trafic, migration depuis Node.js/Express', '2.51.0', 'https://docs.gofiber.io/', 'https://github.com/gofiber/fiber'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web Express-inspiré pour Go basé sur Fasthttp, conçu pour faciliter les choses sans sacrifier les performances'),
  official_website = COALESCE(libraries.official_website, 'https://gofiber.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Expérience de développement similaire à Express.js avec la puissance et les performances de Go, permettant une transition en douceur pour les développeurs JavaScript/Node.js'),
  best_for = COALESCE(libraries.best_for, 'Développeurs JavaScript/Node.js passant à Go ou équipes cherchant un framework Go avec une syntaxe familière et des performances exceptionnelles'),
  features = COALESCE(libraries.features, ARRAY['API inspirée d''Express.js pour une transition facile depuis Node.js', 'Routage ultra-rapide basé sur Fasthttp', 'Middleware à faible surcharge avec Next support', 'Système de templates intégré', 'WebSockets natifs', 'Rate limiter et compression', 'Support pour les tests API', 'Zéro allocation de mémoire dans le hot path', 'Serveur API prêt pour la production']),
  used_for = COALESCE(libraries.used_for, 'APIs RESTful, microservices, applications web, services temps réel, applications à fort trafic, migration depuis Node.js/Express'),
  version = COALESCE(libraries.version, '2.51.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.gofiber.io/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/gofiber/fiber');


-- Framework: Buffalo (Go)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Go'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Buffalo', (SELECT id FROM language_id), 'Framework web complet pour Go qui aide à développer rapidement des applications web robustes', 'https://gobuffalo.io/', 'Approche ''batteries included'' qui fournit tout ce dont vous avez besoin pour développer des applications web complètes en Go, de la base de données au frontend, avec une expérience de développement rapide similaire à Ruby on Rails', 'Développeurs cherchant un framework Go tout-en-un pour construire rapidement des applications web complètes avec une expérience de développement productive', ARRAY['Génération de code et scaffolding', 'Hot reloading pour un développement rapide', 'Intégration avec Webpack pour les assets frontend', 'ORM intégré (Pop) pour l''accès aux bases de données', 'Système de templates Buffalo (Plush)', 'Internationalisation (i18n) intégrée', 'Authentification et autorisation', 'Migrations de base de données', 'Outils de test intégrés', 'CLI puissante pour la génération de code'], 'Applications web complètes, sites web avec backend, applications monolithiques, prototypage rapide, applications CRUD, sites avec authentification', '1.1.0', 'https://gobuffalo.io/documentation/', 'https://github.com/gobuffalo/buffalo'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web complet pour Go qui aide à développer rapidement des applications web robustes'),
  official_website = COALESCE(libraries.official_website, 'https://gobuffalo.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Approche ''batteries included'' qui fournit tout ce dont vous avez besoin pour développer des applications web complètes en Go, de la base de données au frontend, avec une expérience de développement rapide similaire à Ruby on Rails'),
  best_for = COALESCE(libraries.best_for, 'Développeurs cherchant un framework Go tout-en-un pour construire rapidement des applications web complètes avec une expérience de développement productive'),
  features = COALESCE(libraries.features, ARRAY['Génération de code et scaffolding', 'Hot reloading pour un développement rapide', 'Intégration avec Webpack pour les assets frontend', 'ORM intégré (Pop) pour l''accès aux bases de données', 'Système de templates Buffalo (Plush)', 'Internationalisation (i18n) intégrée', 'Authentification et autorisation', 'Migrations de base de données', 'Outils de test intégrés', 'CLI puissante pour la génération de code']),
  used_for = COALESCE(libraries.used_for, 'Applications web complètes, sites web avec backend, applications monolithiques, prototypage rapide, applications CRUD, sites avec authentification'),
  version = COALESCE(libraries.version, '1.1.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://gobuffalo.io/documentation/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/gobuffalo/buffalo');


-- Framework: Beego (Go)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Go'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Beego', (SELECT id FROM language_id), 'Framework web MVC complet pour Go inspiré par Django et Rails, avec une architecture modulaire', 'https://beego.vip/', 'Framework MVC complet et mature pour Go avec une approche inspirée de Django et Rails, offrant une solution tout-en-un pour les applications d''entreprise avec une architecture modulaire', 'Équipes d''entreprise cherchant un framework Go complet avec une architecture MVC claire et des fonctionnalités d''entreprise intégrées', ARRAY['Architecture MVC complète', 'ORM puissant et intégré', 'Routage intelligent avec annotations', 'Validation de formulaires et de données', 'Internationalisation (i18n)', 'Système de cache flexible', 'Logs personnalisables', 'Administration automatique (comme Django)', 'Génération de documentation Swagger', 'Outils de déploiement et monitoring'], 'Applications web d''entreprise, APIs RESTful, microservices, applications backend, systèmes CMS, sites e-commerce, applications avec ORM', '2.1.0', 'https://beego.vip/docs/', 'https://github.com/beego/beego'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web MVC complet pour Go inspiré par Django et Rails, avec une architecture modulaire'),
  official_website = COALESCE(libraries.official_website, 'https://beego.vip/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework MVC complet et mature pour Go avec une approche inspirée de Django et Rails, offrant une solution tout-en-un pour les applications d''entreprise avec une architecture modulaire'),
  best_for = COALESCE(libraries.best_for, 'Équipes d''entreprise cherchant un framework Go complet avec une architecture MVC claire et des fonctionnalités d''entreprise intégrées'),
  features = COALESCE(libraries.features, ARRAY['Architecture MVC complète', 'ORM puissant et intégré', 'Routage intelligent avec annotations', 'Validation de formulaires et de données', 'Internationalisation (i18n)', 'Système de cache flexible', 'Logs personnalisables', 'Administration automatique (comme Django)', 'Génération de documentation Swagger', 'Outils de déploiement et monitoring']),
  used_for = COALESCE(libraries.used_for, 'Applications web d''entreprise, APIs RESTful, microservices, applications backend, systèmes CMS, sites e-commerce, applications avec ORM'),
  version = COALESCE(libraries.version, '2.1.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://beego.vip/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/beego/beego');


-- Framework: Gorilla (Go)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Go'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Gorilla', (SELECT id FROM language_id), 'Boîte à outils web modulaire pour Go offrant des packages réutilisables pour construire des applications web', 'https://www.gorillatoolkit.org/', 'Approche modulaire et composable permettant de choisir uniquement les composants nécessaires, avec une intégration parfaite avec la bibliothèque standard Go et une grande flexibilité', 'Développeurs Go préférant une approche à la carte pour construire des applications web, en sélectionnant uniquement les composants dont ils ont besoin', ARRAY['Routeur mux puissant et flexible', 'Gestion des sessions et cookies sécurisés', 'Implémentation WebSocket complète', 'Gestion du contexte pour les requêtes', 'Schéma pour la validation et le binding', 'RPC over HTTP', 'Compression HTTP', 'Packages indépendants et composables', 'Compatibilité avec la bibliothèque standard net/http', 'Faible couplage entre les composants'], 'Applications web, APIs RESTful, WebSockets, services web personnalisés, middleware personnalisés, applications nécessitant des composants spécifiques', '1.0.0', 'https://www.gorillatoolkit.org/pkg/', 'https://github.com/gorilla/mux'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Boîte à outils web modulaire pour Go offrant des packages réutilisables pour construire des applications web'),
  official_website = COALESCE(libraries.official_website, 'https://www.gorillatoolkit.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Approche modulaire et composable permettant de choisir uniquement les composants nécessaires, avec une intégration parfaite avec la bibliothèque standard Go et une grande flexibilité'),
  best_for = COALESCE(libraries.best_for, 'Développeurs Go préférant une approche à la carte pour construire des applications web, en sélectionnant uniquement les composants dont ils ont besoin'),
  features = COALESCE(libraries.features, ARRAY['Routeur mux puissant et flexible', 'Gestion des sessions et cookies sécurisés', 'Implémentation WebSocket complète', 'Gestion du contexte pour les requêtes', 'Schéma pour la validation et le binding', 'RPC over HTTP', 'Compression HTTP', 'Packages indépendants et composables', 'Compatibilité avec la bibliothèque standard net/http', 'Faible couplage entre les composants']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs RESTful, WebSockets, services web personnalisés, middleware personnalisés, applications nécessitant des composants spécifiques'),
  version = COALESCE(libraries.version, '1.0.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.gorillatoolkit.org/pkg/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/gorilla/mux');


-- Framework: Yesod (Haskell)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Haskell'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Yesod', (SELECT id FROM language_id), 'Framework web type-safe pour Haskell', 'https://www.yesodweb.com/', 'Framework web avec sécurité de type extrême pour éliminer les bugs à la compilation', 'Applications web nécessitant sécurité et fiabilité maximales', ARRAY['Sécurité de type à la compilation', 'Génération de routes type-safe', 'Protection contre les vulnérabilités web courantes', 'Performances élevées', 'Modèles HTML type-safe'], 'Applications web, APIs RESTful, sites web type-safe', '1.6', 'https://www.yesodweb.com/book', 'https://github.com/yesodweb/yesod'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web type-safe pour Haskell'),
  official_website = COALESCE(libraries.official_website, 'https://www.yesodweb.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web avec sécurité de type extrême pour éliminer les bugs à la compilation'),
  best_for = COALESCE(libraries.best_for, 'Applications web nécessitant sécurité et fiabilité maximales'),
  features = COALESCE(libraries.features, ARRAY['Sécurité de type à la compilation', 'Génération de routes type-safe', 'Protection contre les vulnérabilités web courantes', 'Performances élevées', 'Modèles HTML type-safe']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs RESTful, sites web type-safe'),
  version = COALESCE(libraries.version, '1.6'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.yesodweb.com/book'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/yesodweb/yesod');


-- Framework: Servant (Haskell)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Haskell'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Servant', (SELECT id FROM language_id), 'Bibliothèque pour définir des APIs type-safe au niveau du type', 'https://www.servant.dev/', 'Définition d''APIs comme des types pour garantie de correction totale', 'APIs nécessitant documentation et cohérence parfaites', ARRAY['Définition d''API au niveau du type', 'Génération de client', 'Documentation automatique', 'Sécurité de type extrême', 'Extensible via type families'], 'APIs RESTful, services web, documentation d''API', '0.20', 'https://docs.servant.dev/en/stable/', 'https://github.com/haskell-servant/servant'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque pour définir des APIs type-safe au niveau du type'),
  official_website = COALESCE(libraries.official_website, 'https://www.servant.dev/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Définition d''APIs comme des types pour garantie de correction totale'),
  best_for = COALESCE(libraries.best_for, 'APIs nécessitant documentation et cohérence parfaites'),
  features = COALESCE(libraries.features, ARRAY['Définition d''API au niveau du type', 'Génération de client', 'Documentation automatique', 'Sécurité de type extrême', 'Extensible via type families']),
  used_for = COALESCE(libraries.used_for, 'APIs RESTful, services web, documentation d''API'),
  version = COALESCE(libraries.version, '0.20'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.servant.dev/en/stable/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/haskell-servant/servant');


-- Framework: Scotty (Haskell)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Haskell'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Scotty', (SELECT id FROM language_id), 'Micro-framework web minimaliste inspiré par Ruby''s Sinatra', 'https://hackage.haskell.org/package/scotty', 'Framework web Haskell minimaliste pour développement rapide', 'Applications web simples et prototypes rapides', ARRAY['API simple et intuitive', 'Routage basé sur les patterns', 'Middleware', 'Gestion des exceptions', 'Intégration avec WAI'], 'Applications web légères, APIs simples, prototypes', '0.12', 'https://hackage.haskell.org/package/scotty', 'https://github.com/scotty-web/scotty'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Micro-framework web minimaliste inspiré par Ruby''s Sinatra'),
  official_website = COALESCE(libraries.official_website, 'https://hackage.haskell.org/package/scotty'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web Haskell minimaliste pour développement rapide'),
  best_for = COALESCE(libraries.best_for, 'Applications web simples et prototypes rapides'),
  features = COALESCE(libraries.features, ARRAY['API simple et intuitive', 'Routage basé sur les patterns', 'Middleware', 'Gestion des exceptions', 'Intégration avec WAI']),
  used_for = COALESCE(libraries.used_for, 'Applications web légères, APIs simples, prototypes'),
  version = COALESCE(libraries.version, '0.12'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://hackage.haskell.org/package/scotty'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/scotty-web/scotty');


-- Framework: Hakyll (Haskell)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Haskell'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Hakyll', (SELECT id FROM language_id), 'Générateur de sites statiques en Haskell', 'https://jaspervdj.be/hakyll/', 'Générateur de sites statiques programmable et flexible', 'Sites web statiques nécessitant personnalisation avancée', ARRAY['Basé sur des règles', 'Intégration avec Pandoc', 'Système de templates', 'Génération incrémentale'], 'Blogs, sites web statiques, documentation, portfolios', '4.15', 'https://jaspervdj.be/hakyll/tutorials.html', 'https://github.com/jaspervdj/hakyll'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Générateur de sites statiques en Haskell'),
  official_website = COALESCE(libraries.official_website, 'https://jaspervdj.be/hakyll/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Générateur de sites statiques programmable et flexible'),
  best_for = COALESCE(libraries.best_for, 'Sites web statiques nécessitant personnalisation avancée'),
  features = COALESCE(libraries.features, ARRAY['Basé sur des règles', 'Intégration avec Pandoc', 'Système de templates', 'Génération incrémentale']),
  used_for = COALESCE(libraries.used_for, 'Blogs, sites web statiques, documentation, portfolios'),
  version = COALESCE(libraries.version, '4.15'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://jaspervdj.be/hakyll/tutorials.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/jaspervdj/hakyll');


-- Framework: Spring (Java)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Java'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Spring', (SELECT id FROM language_id), 'Framework Java complet pour le développement d''applications d''entreprise avec une approche modulaire et flexible', 'https://spring.io/', 'Écosystème complet et modulaire qui simplifie le développement d''applications Java d''entreprise avec une approche moderne et des outils de productivité comme Spring Boot', 'Équipes développant des applications d''entreprise complexes nécessitant modularité, testabilité et évolutivité, particulièrement adaptées aux architectures microservices et cloud-native', ARRAY['Inversion de contrôle (IoC) et injection de dépendances', 'Spring Boot pour la configuration automatique et le démarrage rapide', 'Spring MVC pour les applications web', 'Spring WebFlux pour la programmation réactive', 'Spring Security pour l''authentification et l''autorisation', 'Spring Cloud pour les architectures microservices', 'Spring Batch pour le traitement par lots', 'Spring Integration pour l''intégration d''entreprise', 'Support pour les tests unitaires et d''intégration'], 'Applications d''entreprise, microservices, applications web, applications cloud, applications réactives, batch processing, intégration de systèmes', '6.1.3 (Spring Framework) / 3.2.2 (Spring Boot)', 'https://docs.spring.io/', 'https://github.com/spring-projects'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework Java complet pour le développement d''applications d''entreprise avec une approche modulaire et flexible'),
  official_website = COALESCE(libraries.official_website, 'https://spring.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Écosystème complet et modulaire qui simplifie le développement d''applications Java d''entreprise avec une approche moderne et des outils de productivité comme Spring Boot'),
  best_for = COALESCE(libraries.best_for, 'Équipes développant des applications d''entreprise complexes nécessitant modularité, testabilité et évolutivité, particulièrement adaptées aux architectures microservices et cloud-native'),
  features = COALESCE(libraries.features, ARRAY['Inversion de contrôle (IoC) et injection de dépendances', 'Spring Boot pour la configuration automatique et le démarrage rapide', 'Spring MVC pour les applications web', 'Spring WebFlux pour la programmation réactive', 'Spring Security pour l''authentification et l''autorisation', 'Spring Cloud pour les architectures microservices', 'Spring Batch pour le traitement par lots', 'Spring Integration pour l''intégration d''entreprise', 'Support pour les tests unitaires et d''intégration']),
  used_for = COALESCE(libraries.used_for, 'Applications d''entreprise, microservices, applications web, applications cloud, applications réactives, batch processing, intégration de systèmes'),
  version = COALESCE(libraries.version, '6.1.3 (Spring Framework) / 3.2.2 (Spring Boot)'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.spring.io/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/spring-projects');


-- Framework: Hibernate (Java)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Java'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Hibernate', (SELECT id FROM language_id), 'Framework ORM (Object-Relational Mapping) leader pour Java qui simplifie l''accès aux bases de données relationnelles en mappant les objets Java aux tables de base de données', 'https://hibernate.org/', 'Solution ORM mature et complète qui élimine le code JDBC répétitif et permet aux développeurs de se concentrer sur la logique métier plutôt que sur la persistance des données', 'Applications Java nécessitant un accès aux bases de données relationnelles avec des modèles de données complexes et une abstraction de la couche de persistance', ARRAY['Mapping objet-relationnel transparent', 'HQL (Hibernate Query Language) pour des requêtes orientées objet', 'Gestion des transactions et du cache', 'Lazy loading et chargement par lots pour l''optimisation des performances', 'Associations et héritage entre entités', 'Validation de données via Bean Validation', 'Génération automatique de schéma', 'Support pour les procédures stockées et les requêtes natives SQL', 'Événements et intercepteurs pour la logique métier', 'Intégration avec JPA (Java Persistence API)'], 'Persistance de données, mapping objet-relationnel, accès aux bases de données, applications avec modèles de données complexes, applications d''entreprise', '6.4.1.Final', 'https://hibernate.org/orm/documentation/', 'https://github.com/hibernate/hibernate-orm'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework ORM (Object-Relational Mapping) leader pour Java qui simplifie l''accès aux bases de données relationnelles en mappant les objets Java aux tables de base de données'),
  official_website = COALESCE(libraries.official_website, 'https://hibernate.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Solution ORM mature et complète qui élimine le code JDBC répétitif et permet aux développeurs de se concentrer sur la logique métier plutôt que sur la persistance des données'),
  best_for = COALESCE(libraries.best_for, 'Applications Java nécessitant un accès aux bases de données relationnelles avec des modèles de données complexes et une abstraction de la couche de persistance'),
  features = COALESCE(libraries.features, ARRAY['Mapping objet-relationnel transparent', 'HQL (Hibernate Query Language) pour des requêtes orientées objet', 'Gestion des transactions et du cache', 'Lazy loading et chargement par lots pour l''optimisation des performances', 'Associations et héritage entre entités', 'Validation de données via Bean Validation', 'Génération automatique de schéma', 'Support pour les procédures stockées et les requêtes natives SQL', 'Événements et intercepteurs pour la logique métier', 'Intégration avec JPA (Java Persistence API)']),
  used_for = COALESCE(libraries.used_for, 'Persistance de données, mapping objet-relationnel, accès aux bases de données, applications avec modèles de données complexes, applications d''entreprise'),
  version = COALESCE(libraries.version, '6.4.1.Final'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://hibernate.org/orm/documentation/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/hibernate/hibernate-orm');


-- Framework: Quarkus (Java)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Java'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Quarkus', (SELECT id FROM language_id), 'Framework Java conçu pour les environnements cloud-native et serverless', 'https://quarkus.io/', 'Java supersonic subatomic - optimisé pour les environnements cloud avec démarrage instantané et faible consommation de ressources', 'Applications cloud-native nécessitant performances et efficacité des ressources', ARRAY['Démarrage ultra-rapide', 'Empreinte mémoire réduite', 'Live coding', 'Compilation native avec GraalVM', 'Extensions pour l''écosystème Java'], 'Microservices, applications cloud-native, applications Kubernetes, serverless, edge computing', '3.6', 'https://quarkus.io/guides/', 'https://github.com/quarkusio/quarkus'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework Java conçu pour les environnements cloud-native et serverless'),
  official_website = COALESCE(libraries.official_website, 'https://quarkus.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Java supersonic subatomic - optimisé pour les environnements cloud avec démarrage instantané et faible consommation de ressources'),
  best_for = COALESCE(libraries.best_for, 'Applications cloud-native nécessitant performances et efficacité des ressources'),
  features = COALESCE(libraries.features, ARRAY['Démarrage ultra-rapide', 'Empreinte mémoire réduite', 'Live coding', 'Compilation native avec GraalVM', 'Extensions pour l''écosystème Java']),
  used_for = COALESCE(libraries.used_for, 'Microservices, applications cloud-native, applications Kubernetes, serverless, edge computing'),
  version = COALESCE(libraries.version, '3.6'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://quarkus.io/guides/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/quarkusio/quarkus');


-- Framework: Micronaut (Java)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Java'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Micronaut', (SELECT id FROM language_id), 'Framework JVM moderne pour microservices et applications serverless', 'https://micronaut.io/', 'Framework polyglotte avec injection de dépendances à la compilation pour performances optimales', 'Applications cloud modernes nécessitant performances et polyvalence', ARRAY['Injection de dépendances à la compilation', 'Démarrage rapide', 'Faible consommation mémoire', 'Support natif pour GraalVM', 'Programmation réactive'], 'Microservices, applications cloud, serverless, applications réactives', '4.2', 'https://docs.micronaut.io/latest/guide/index.html', 'https://github.com/micronaut-projects/micronaut-core'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework JVM moderne pour microservices et applications serverless'),
  official_website = COALESCE(libraries.official_website, 'https://micronaut.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework polyglotte avec injection de dépendances à la compilation pour performances optimales'),
  best_for = COALESCE(libraries.best_for, 'Applications cloud modernes nécessitant performances et polyvalence'),
  features = COALESCE(libraries.features, ARRAY['Injection de dépendances à la compilation', 'Démarrage rapide', 'Faible consommation mémoire', 'Support natif pour GraalVM', 'Programmation réactive']),
  used_for = COALESCE(libraries.used_for, 'Microservices, applications cloud, serverless, applications réactives'),
  version = COALESCE(libraries.version, '4.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.micronaut.io/latest/guide/index.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/micronaut-projects/micronaut-core');


-- Framework: Vaadin (Java)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Java'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Vaadin', (SELECT id FROM language_id), 'Framework pour construire des applications web progressives en Java', 'https://vaadin.com/', 'Développement d''interfaces web riches entièrement en Java sans JavaScript', 'Applications d''entreprise nécessitant interfaces riches et développement full-Java', ARRAY['Composants UI Java', 'Architecture serveur-side', 'Intégration avec l''écosystème Java', 'Thèmes personnalisables', 'PWA support'], 'Applications web d''entreprise, interfaces utilisateur riches, applications métier', '24.3', 'https://vaadin.com/docs', 'https://github.com/vaadin/flow'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework pour construire des applications web progressives en Java'),
  official_website = COALESCE(libraries.official_website, 'https://vaadin.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Développement d''interfaces web riches entièrement en Java sans JavaScript'),
  best_for = COALESCE(libraries.best_for, 'Applications d''entreprise nécessitant interfaces riches et développement full-Java'),
  features = COALESCE(libraries.features, ARRAY['Composants UI Java', 'Architecture serveur-side', 'Intégration avec l''écosystème Java', 'Thèmes personnalisables', 'PWA support']),
  used_for = COALESCE(libraries.used_for, 'Applications web d''entreprise, interfaces utilisateur riches, applications métier'),
  version = COALESCE(libraries.version, '24.3'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://vaadin.com/docs'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/vaadin/flow');


-- Framework: React (JavaScript)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'JavaScript'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'React', (SELECT id FROM language_id), 'Bibliothèque JavaScript pour construire des interfaces utilisateur composables', 'https://react.dev/', 'Modèle de composants réutilisables et performances optimisées', 'Applications web complexes nécessitant une architecture modulaire', ARRAY['Composants réutilisables', 'DOM virtuel', 'JSX', 'Hooks', 'Écosystème riche'], 'Applications web single-page, applications mobiles avec React Native, interfaces utilisateur complexes', '18.2', 'https://react.dev/learn', 'https://github.com/facebook/react'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque JavaScript pour construire des interfaces utilisateur composables'),
  official_website = COALESCE(libraries.official_website, 'https://react.dev/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Modèle de composants réutilisables et performances optimisées'),
  best_for = COALESCE(libraries.best_for, 'Applications web complexes nécessitant une architecture modulaire'),
  features = COALESCE(libraries.features, ARRAY['Composants réutilisables', 'DOM virtuel', 'JSX', 'Hooks', 'Écosystème riche']),
  used_for = COALESCE(libraries.used_for, 'Applications web single-page, applications mobiles avec React Native, interfaces utilisateur complexes'),
  version = COALESCE(libraries.version, '18.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://react.dev/learn'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/facebook/react');


-- Framework: Angular (JavaScript)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'JavaScript'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Angular', (SELECT id FROM language_id), 'Plateforme de développement d''applications web côté client', 'https://angular.io/', 'Framework complet pour applications web d''entreprise', 'Applications web à grande échelle nécessitant une architecture robuste', ARRAY['Architecture basée sur les composants', 'TypeScript', 'Injection de dépendances', 'Routage', 'Data binding'], 'Applications web complexes, applications d''entreprise, SPAs', '17.0', 'https://angular.io/docs', 'https://github.com/angular/angular'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Plateforme de développement d''applications web côté client'),
  official_website = COALESCE(libraries.official_website, 'https://angular.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework complet pour applications web d''entreprise'),
  best_for = COALESCE(libraries.best_for, 'Applications web à grande échelle nécessitant une architecture robuste'),
  features = COALESCE(libraries.features, ARRAY['Architecture basée sur les composants', 'TypeScript', 'Injection de dépendances', 'Routage', 'Data binding']),
  used_for = COALESCE(libraries.used_for, 'Applications web complexes, applications d''entreprise, SPAs'),
  version = COALESCE(libraries.version, '17.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://angular.io/docs'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/angular/angular');


-- Framework: Express (JavaScript)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'JavaScript'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Express', (SELECT id FROM language_id), 'Framework web minimaliste pour Node.js', 'https://expressjs.com/', 'Simplicité et flexibilité pour applications Node.js', 'Applications Node.js nécessitant rapidité de développement', ARRAY['Routage', 'Middleware', 'Templates', 'Gestion des erreurs'], 'APIs RESTful, applications web, microservices', '4.18.2', 'https://expressjs.com/en/starter/basic-routing.html', 'https://github.com/expressjs/express'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web minimaliste pour Node.js'),
  official_website = COALESCE(libraries.official_website, 'https://expressjs.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Simplicité et flexibilité pour applications Node.js'),
  best_for = COALESCE(libraries.best_for, 'Applications Node.js nécessitant rapidité de développement'),
  features = COALESCE(libraries.features, ARRAY['Routage', 'Middleware', 'Templates', 'Gestion des erreurs']),
  used_for = COALESCE(libraries.used_for, 'APIs RESTful, applications web, microservices'),
  version = COALESCE(libraries.version, '4.18.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://expressjs.com/en/starter/basic-routing.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/expressjs/express');


-- Framework: Svelte (JavaScript)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'JavaScript'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Svelte', (SELECT id FROM language_id), 'Framework qui compile le code en JavaScript vanilla hautement optimisé', 'https://svelte.dev/', 'Performances exceptionnelles et simplicité', 'Applications web nécessitant rapidité et petite taille', ARRAY['Pas de DOM virtuel', 'Composants simples', 'Réactivité intégrée', 'Transitions'], 'Applications web légères, interfaces utilisateur réactives, sites web performants', '4.0', 'https://svelte.dev/tutorial', 'https://github.com/sveltejs/svelte'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework qui compile le code en JavaScript vanilla hautement optimisé'),
  official_website = COALESCE(libraries.official_website, 'https://svelte.dev/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Performances exceptionnelles et simplicité'),
  best_for = COALESCE(libraries.best_for, 'Applications web nécessitant rapidité et petite taille'),
  features = COALESCE(libraries.features, ARRAY['Pas de DOM virtuel', 'Composants simples', 'Réactivité intégrée', 'Transitions']),
  used_for = COALESCE(libraries.used_for, 'Applications web légères, interfaces utilisateur réactives, sites web performants'),
  version = COALESCE(libraries.version, '4.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://svelte.dev/tutorial'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/sveltejs/svelte');


-- Framework: Astro (JavaScript)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'JavaScript'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Astro', (SELECT id FROM language_id), 'Méta-framework pour construire des sites web rapides avec moins de JavaScript', 'https://astro.build/', 'Sites web rapides avec un minimum de JavaScript côté client', 'Sites web axés sur le contenu nécessitant performances et SEO', ARRAY['Architecture axée sur le contenu', 'Support pour multiples frameworks UI', 'Performances optimisées', 'Partial Hydration', 'Facilité d''utilisation'], 'Sites web axés sur le contenu, blogs, portfolios, documentation', '3.6', 'https://docs.astro.build/en/getting-started/', 'https://github.com/withastro/astro'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Méta-framework pour construire des sites web rapides avec moins de JavaScript'),
  official_website = COALESCE(libraries.official_website, 'https://astro.build/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Sites web rapides avec un minimum de JavaScript côté client'),
  best_for = COALESCE(libraries.best_for, 'Sites web axés sur le contenu nécessitant performances et SEO'),
  features = COALESCE(libraries.features, ARRAY['Architecture axée sur le contenu', 'Support pour multiples frameworks UI', 'Performances optimisées', 'Partial Hydration', 'Facilité d''utilisation']),
  used_for = COALESCE(libraries.used_for, 'Sites web axés sur le contenu, blogs, portfolios, documentation'),
  version = COALESCE(libraries.version, '3.6'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.astro.build/en/getting-started/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/withastro/astro');


-- Framework: Remix (JavaScript)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'JavaScript'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Remix', (SELECT id FROM language_id), 'Framework web full-stack pour React avec rendu côté serveur et transitions fluides', 'https://remix.run/', 'Expérience utilisateur exceptionnelle avec rendu côté serveur et transitions fluides', 'Applications React nécessitant performances et accessibilité', ARRAY['Rendu côté serveur (SSR)', 'Transitions fluides', 'Optimisations des performances', 'Accès aux données', 'Formulaires et mutations'], 'Applications web dynamiques, e-commerce, applications avec données', '2.3', 'https://remix.run/docs/en/main/start/tutorial', 'https://github.com/remix-run/remix'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web full-stack pour React avec rendu côté serveur et transitions fluides'),
  official_website = COALESCE(libraries.official_website, 'https://remix.run/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Expérience utilisateur exceptionnelle avec rendu côté serveur et transitions fluides'),
  best_for = COALESCE(libraries.best_for, 'Applications React nécessitant performances et accessibilité'),
  features = COALESCE(libraries.features, ARRAY['Rendu côté serveur (SSR)', 'Transitions fluides', 'Optimisations des performances', 'Accès aux données', 'Formulaires et mutations']),
  used_for = COALESCE(libraries.used_for, 'Applications web dynamiques, e-commerce, applications avec données'),
  version = COALESCE(libraries.version, '2.3'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://remix.run/docs/en/main/start/tutorial'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/remix-run/remix');


-- Framework: jQuery (JavaScript)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'JavaScript'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'jQuery', (SELECT id FROM language_id), 'Bibliothèque JavaScript rapide, petite et riche en fonctionnalités', 'https://jquery.com/', 'Simplification de la manipulation DOM et compatibilité navigateurs', 'Projets nécessitant compatibilité avec navigateurs anciens', ARRAY['Sélecteurs CSS', 'Manipulation DOM', 'Animations', 'AJAX', 'Utilitaires'], 'Manipulation DOM, animations, AJAX, compatibilité navigateurs', '3.7.1', 'https://api.jquery.com/', 'https://github.com/jquery/jquery'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque JavaScript rapide, petite et riche en fonctionnalités'),
  official_website = COALESCE(libraries.official_website, 'https://jquery.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Simplification de la manipulation DOM et compatibilité navigateurs'),
  best_for = COALESCE(libraries.best_for, 'Projets nécessitant compatibilité avec navigateurs anciens'),
  features = COALESCE(libraries.features, ARRAY['Sélecteurs CSS', 'Manipulation DOM', 'Animations', 'AJAX', 'Utilitaires']),
  used_for = COALESCE(libraries.used_for, 'Manipulation DOM, animations, AJAX, compatibilité navigateurs'),
  version = COALESCE(libraries.version, '3.7.1'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://api.jquery.com/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/jquery/jquery');


-- Framework: Flux (Julia)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Julia'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Flux', (SELECT id FROM language_id), 'Bibliothèque de machine learning élégante et flexible pour Julia', 'https://fluxml.ai/', 'Machine learning en Julia avec simplicité et performances', 'Chercheurs et data scientists utilisant Julia pour l''IA', ARRAY['API intuitive', 'Différentiation automatique', 'Intégration GPU', 'Modèles pré-entraînés', 'Extensibilité'], 'Machine learning, deep learning, modèles neuronaux, recherche en IA', '0.14.0', 'https://fluxml.ai/Flux.jl/stable/', 'https://github.com/FluxML/Flux.jl'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque de machine learning élégante et flexible pour Julia'),
  official_website = COALESCE(libraries.official_website, 'https://fluxml.ai/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Machine learning en Julia avec simplicité et performances'),
  best_for = COALESCE(libraries.best_for, 'Chercheurs et data scientists utilisant Julia pour l''IA'),
  features = COALESCE(libraries.features, ARRAY['API intuitive', 'Différentiation automatique', 'Intégration GPU', 'Modèles pré-entraînés', 'Extensibilité']),
  used_for = COALESCE(libraries.used_for, 'Machine learning, deep learning, modèles neuronaux, recherche en IA'),
  version = COALESCE(libraries.version, '0.14.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://fluxml.ai/Flux.jl/stable/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/FluxML/Flux.jl');


-- Framework: JuMP (Julia)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Julia'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'JuMP', (SELECT id FROM language_id), 'Langage de modélisation pour l''optimisation mathématique en Julia', 'https://jump.dev/', 'Modélisation d''optimisation mathématique expressive et performante', 'Chercheurs et ingénieurs travaillant sur des problèmes d''optimisation', ARRAY['Syntaxe déclarative', 'Support pour différents solveurs', 'Performances élevées', 'Extensibilité', 'Dérivées automatiques'], 'Optimisation mathématique, recherche opérationnelle, planification', '1.12.0', 'https://jump.dev/JuMP.jl/stable/', 'https://github.com/jump-dev/JuMP.jl'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Langage de modélisation pour l''optimisation mathématique en Julia'),
  official_website = COALESCE(libraries.official_website, 'https://jump.dev/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Modélisation d''optimisation mathématique expressive et performante'),
  best_for = COALESCE(libraries.best_for, 'Chercheurs et ingénieurs travaillant sur des problèmes d''optimisation'),
  features = COALESCE(libraries.features, ARRAY['Syntaxe déclarative', 'Support pour différents solveurs', 'Performances élevées', 'Extensibilité', 'Dérivées automatiques']),
  used_for = COALESCE(libraries.used_for, 'Optimisation mathématique, recherche opérationnelle, planification'),
  version = COALESCE(libraries.version, '1.12.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://jump.dev/JuMP.jl/stable/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/jump-dev/JuMP.jl');


-- Framework: Ktor (Kotlin)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Kotlin'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Ktor', (SELECT id FROM language_id), 'Framework asynchrone pour créer des applications connectées en Kotlin', 'https://ktor.io/', 'Framework web asynchrone léger et moderne pour Kotlin', 'Applications web et microservices Kotlin nécessitant asynchronicité', ARRAY['Serveur et client HTTP', 'WebSockets', 'Coroutines pour asynchrone', 'Extensions modulaires', 'Multiplateforme'], 'Applications web, microservices, APIs RESTful, applications client-serveur', '2.3', 'https://ktor.io/docs/', 'https://github.com/ktorio/ktor'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework asynchrone pour créer des applications connectées en Kotlin'),
  official_website = COALESCE(libraries.official_website, 'https://ktor.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web asynchrone léger et moderne pour Kotlin'),
  best_for = COALESCE(libraries.best_for, 'Applications web et microservices Kotlin nécessitant asynchronicité'),
  features = COALESCE(libraries.features, ARRAY['Serveur et client HTTP', 'WebSockets', 'Coroutines pour asynchrone', 'Extensions modulaires', 'Multiplateforme']),
  used_for = COALESCE(libraries.used_for, 'Applications web, microservices, APIs RESTful, applications client-serveur'),
  version = COALESCE(libraries.version, '2.3'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://ktor.io/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/ktorio/ktor');


-- Framework: Spring (Kotlin)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Kotlin'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Spring', (SELECT id FROM language_id), 'Framework d''entreprise pour Java et Kotlin avec support Kotlin natif', 'https://spring.io/guides/tutorials/spring-boot-kotlin/', 'Puissance de Spring avec la concision et sécurité de Kotlin', 'Applications d''entreprise Kotlin nécessitant robustesse et écosystème mature', ARRAY['Support Kotlin natif', 'Spring Boot pour configuration automatique', 'Coroutines pour programmation réactive', 'DSL Kotlin pour configuration', 'Extensions Kotlin'], 'Applications d''entreprise, microservices, applications web, applications cloud', '6.0', 'https://docs.spring.io/spring-framework/reference/languages/kotlin.html', 'https://github.com/spring-projects/spring-framework'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework d''entreprise pour Java et Kotlin avec support Kotlin natif'),
  official_website = COALESCE(libraries.official_website, 'https://spring.io/guides/tutorials/spring-boot-kotlin/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Puissance de Spring avec la concision et sécurité de Kotlin'),
  best_for = COALESCE(libraries.best_for, 'Applications d''entreprise Kotlin nécessitant robustesse et écosystème mature'),
  features = COALESCE(libraries.features, ARRAY['Support Kotlin natif', 'Spring Boot pour configuration automatique', 'Coroutines pour programmation réactive', 'DSL Kotlin pour configuration', 'Extensions Kotlin']),
  used_for = COALESCE(libraries.used_for, 'Applications d''entreprise, microservices, applications web, applications cloud'),
  version = COALESCE(libraries.version, '6.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.spring.io/spring-framework/reference/languages/kotlin.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/spring-projects/spring-framework');


-- Framework: Exposed (Kotlin)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Kotlin'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Exposed', (SELECT id FROM language_id), 'Framework ORM SQL léger pour Kotlin', 'https://github.com/JetBrains/Exposed', 'ORM Kotlin idiomatique avec DSL SQL type-safe', 'Applications Kotlin nécessitant accès aux bases de données relationnelles', ARRAY['DSL SQL type-safe', 'API DAO pour mapping objet-relationnel', 'Transactions', 'Support pour plusieurs bases de données', 'Extensions Kotlin'], 'Accès aux bases de données, mapping objet-relationnel, requêtes SQL', '0.44.0', 'https://github.com/JetBrains/Exposed/wiki', 'https://github.com/JetBrains/Exposed/wiki'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework ORM SQL léger pour Kotlin'),
  official_website = COALESCE(libraries.official_website, 'https://github.com/JetBrains/Exposed'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'ORM Kotlin idiomatique avec DSL SQL type-safe'),
  best_for = COALESCE(libraries.best_for, 'Applications Kotlin nécessitant accès aux bases de données relationnelles'),
  features = COALESCE(libraries.features, ARRAY['DSL SQL type-safe', 'API DAO pour mapping objet-relationnel', 'Transactions', 'Support pour plusieurs bases de données', 'Extensions Kotlin']),
  used_for = COALESCE(libraries.used_for, 'Accès aux bases de données, mapping objet-relationnel, requêtes SQL'),
  version = COALESCE(libraries.version, '0.44.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://github.com/JetBrains/Exposed/wiki'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/JetBrains/Exposed/wiki');


-- Framework: Less (Less)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Less'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Less', (SELECT id FROM language_id), 'Préprocesseur CSS qui étend le CSS avec des fonctionnalités dynamiques comme les variables, les mixins et les fonctions', 'https://lesscss.org/', 'Préprocesseur CSS qui ajoute des fonctionnalités de programmation au CSS tout en restant très proche de la syntaxe CSS standard', 'Projets nécessitant une organisation CSS avancée avec une courbe d''apprentissage minimale', ARRAY['Variables pour réutilisation de valeurs', 'Mixins pour réutilisation de blocs CSS', 'Fonctions et opérations mathématiques', 'Nesting pour meilleure organisation', 'Importation et modularité', 'Compatibilité avec CSS standard', 'Compilation côté client ou serveur'], 'Développement CSS avancé, maintenance de feuilles de style complexes, thèmes, frameworks CSS personnalisés', '4.2.0', 'https://lesscss.org/usage/', 'https://github.com/less/less.js'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Préprocesseur CSS qui étend le CSS avec des fonctionnalités dynamiques comme les variables, les mixins et les fonctions'),
  official_website = COALESCE(libraries.official_website, 'https://lesscss.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Préprocesseur CSS qui ajoute des fonctionnalités de programmation au CSS tout en restant très proche de la syntaxe CSS standard'),
  best_for = COALESCE(libraries.best_for, 'Projets nécessitant une organisation CSS avancée avec une courbe d''apprentissage minimale'),
  features = COALESCE(libraries.features, ARRAY['Variables pour réutilisation de valeurs', 'Mixins pour réutilisation de blocs CSS', 'Fonctions et opérations mathématiques', 'Nesting pour meilleure organisation', 'Importation et modularité', 'Compatibilité avec CSS standard', 'Compilation côté client ou serveur']),
  used_for = COALESCE(libraries.used_for, 'Développement CSS avancé, maintenance de feuilles de style complexes, thèmes, frameworks CSS personnalisés'),
  version = COALESCE(libraries.version, '4.2.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://lesscss.org/usage/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/less/less.js');


-- Framework: UIkit (Less)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Less'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'UIkit', (SELECT id FROM language_id), 'Framework frontend léger et modulaire qui utilise Less pour ses styles', 'https://getuikit.com/', 'Framework frontend léger avec personnalisation avancée via Less', 'Projets nécessitant une interface utilisateur moderne et personnalisable', ARRAY['Composants modulaires', 'Personnalisation via Less', 'Animations et transitions', 'Système de grille flexible', 'Approche mobile-first'], 'Sites web modernes, applications web, interfaces utilisateur', '3.17.11', 'https://getuikit.com/docs/introduction', 'https://github.com/uikit/uikit'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework frontend léger et modulaire qui utilise Less pour ses styles'),
  official_website = COALESCE(libraries.official_website, 'https://getuikit.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework frontend léger avec personnalisation avancée via Less'),
  best_for = COALESCE(libraries.best_for, 'Projets nécessitant une interface utilisateur moderne et personnalisable'),
  features = COALESCE(libraries.features, ARRAY['Composants modulaires', 'Personnalisation via Less', 'Animations et transitions', 'Système de grille flexible', 'Approche mobile-first']),
  used_for = COALESCE(libraries.used_for, 'Sites web modernes, applications web, interfaces utilisateur'),
  version = COALESCE(libraries.version, '3.17.11'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://getuikit.com/docs/introduction'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/uikit/uikit');


-- Framework: PrestaShop (Less)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Less'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'PrestaShop', (SELECT id FROM language_id), 'Plateforme e-commerce open source qui utilise Less pour les thèmes et l''interface d''administration', 'https://www.prestashop.com/', 'Plateforme e-commerce qui utilise Less pour faciliter la personnalisation des thèmes et de l''interface', 'Développeurs de thèmes et modules PrestaShop nécessitant une personnalisation avancée', ARRAY['Thèmes personnalisables via Less', 'Interface d''administration utilisant Less', 'Modules front-office et back-office', 'Responsive design', 'Personnalisation avancée'], 'Boutiques en ligne, e-commerce, thèmes de boutique personnalisés', '8.1', 'https://devdocs.prestashop-project.org/', 'https://github.com/PrestaShop/PrestaShop'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Plateforme e-commerce open source qui utilise Less pour les thèmes et l''interface d''administration'),
  official_website = COALESCE(libraries.official_website, 'https://www.prestashop.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Plateforme e-commerce qui utilise Less pour faciliter la personnalisation des thèmes et de l''interface'),
  best_for = COALESCE(libraries.best_for, 'Développeurs de thèmes et modules PrestaShop nécessitant une personnalisation avancée'),
  features = COALESCE(libraries.features, ARRAY['Thèmes personnalisables via Less', 'Interface d''administration utilisant Less', 'Modules front-office et back-office', 'Responsive design', 'Personnalisation avancée']),
  used_for = COALESCE(libraries.used_for, 'Boutiques en ligne, e-commerce, thèmes de boutique personnalisés'),
  version = COALESCE(libraries.version, '8.1'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://devdocs.prestashop-project.org/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/PrestaShop/PrestaShop');


-- Framework: SBCL (Lisp)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Lisp'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'SBCL', (SELECT id FROM language_id), 'Implémentation haute performance de Common Lisp avec compilateur natif', 'http://www.sbcl.org/', 'Implémentation Common Lisp haute performance avec compilateur sophistiqué', 'Applications Lisp nécessitant performances et robustesse', ARRAY['Compilateur natif', 'Performances élevées', 'Débogueur avancé', 'Vérification de type', 'Support multiplateforme'], 'Applications hautes performances, calcul scientifique, systèmes critiques', '2.3.5', 'http://www.sbcl.org/manual/', 'https://github.com/sbcl/sbcl'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Implémentation haute performance de Common Lisp avec compilateur natif'),
  official_website = COALESCE(libraries.official_website, 'http://www.sbcl.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Implémentation Common Lisp haute performance avec compilateur sophistiqué'),
  best_for = COALESCE(libraries.best_for, 'Applications Lisp nécessitant performances et robustesse'),
  features = COALESCE(libraries.features, ARRAY['Compilateur natif', 'Performances élevées', 'Débogueur avancé', 'Vérification de type', 'Support multiplateforme']),
  used_for = COALESCE(libraries.used_for, 'Applications hautes performances, calcul scientifique, systèmes critiques'),
  version = COALESCE(libraries.version, '2.3.5'),
  documentation_url = COALESCE(libraries.documentation_url, 'http://www.sbcl.org/manual/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/sbcl/sbcl');


-- Framework: LispWorks (Lisp)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Lisp'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'LispWorks', (SELECT id FROM language_id), 'Environnement de développement Common Lisp commercial complet', 'http://www.lispworks.com/', 'Environnement Common Lisp commercial avec outils professionnels', 'Développement d''applications commerciales Lisp avec interfaces graphiques', ARRAY['IDE graphique complet', 'Débogueur avancé', 'CAPI pour interfaces graphiques', 'Livraison d''applications', 'Support professionnel'], 'Applications d''entreprise, interfaces graphiques, applications commerciales', '8.0', 'http://www.lispworks.com/documentation/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Environnement de développement Common Lisp commercial complet'),
  official_website = COALESCE(libraries.official_website, 'http://www.lispworks.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Environnement Common Lisp commercial avec outils professionnels'),
  best_for = COALESCE(libraries.best_for, 'Développement d''applications commerciales Lisp avec interfaces graphiques'),
  features = COALESCE(libraries.features, ARRAY['IDE graphique complet', 'Débogueur avancé', 'CAPI pour interfaces graphiques', 'Livraison d''applications', 'Support professionnel']),
  used_for = COALESCE(libraries.used_for, 'Applications d''entreprise, interfaces graphiques, applications commerciales'),
  version = COALESCE(libraries.version, '8.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'http://www.lispworks.com/documentation/');


-- Framework: CMUCL (Lisp)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Lisp'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'CMUCL', (SELECT id FROM language_id), 'Implémentation haute performance de Common Lisp', 'https://www.cons.org/cmucl/', 'Implémentation Common Lisp académique avec compilateur sophistiqué', 'Applications scientifiques et recherche nécessitant performances', ARRAY['Compilateur optimisant', 'Performances élevées', 'Débogueur', 'Interface étrangère', 'Bibliothèque standard complète'], 'Calcul scientifique, recherche, applications hautes performances', '21d', 'https://www.cons.org/cmucl/doc/index.html'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Implémentation haute performance de Common Lisp'),
  official_website = COALESCE(libraries.official_website, 'https://www.cons.org/cmucl/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Implémentation Common Lisp académique avec compilateur sophistiqué'),
  best_for = COALESCE(libraries.best_for, 'Applications scientifiques et recherche nécessitant performances'),
  features = COALESCE(libraries.features, ARRAY['Compilateur optimisant', 'Performances élevées', 'Débogueur', 'Interface étrangère', 'Bibliothèque standard complète']),
  used_for = COALESCE(libraries.used_for, 'Calcul scientifique, recherche, applications hautes performances'),
  version = COALESCE(libraries.version, '21d'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.cons.org/cmucl/doc/index.html');


-- Framework: LÖVE (Lua)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Lua'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'LÖVE', (SELECT id FROM language_id), 'Framework pour créer des jeux 2D en Lua', 'https://love2d.org/', 'Création de jeux 2D rapide et accessible avec Lua', 'Développeurs de jeux indépendants et prototypage rapide', ARRAY['API simple et puissante', 'Physique 2D', 'Audio', 'Multiplateforme', 'Communauté active'], 'Jeux 2D, prototypes, jeux indépendants, applications interactives', '11.4', 'https://love2d.org/wiki/Main_Page', 'https://github.com/love2d/love'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework pour créer des jeux 2D en Lua'),
  official_website = COALESCE(libraries.official_website, 'https://love2d.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Création de jeux 2D rapide et accessible avec Lua'),
  best_for = COALESCE(libraries.best_for, 'Développeurs de jeux indépendants et prototypage rapide'),
  features = COALESCE(libraries.features, ARRAY['API simple et puissante', 'Physique 2D', 'Audio', 'Multiplateforme', 'Communauté active']),
  used_for = COALESCE(libraries.used_for, 'Jeux 2D, prototypes, jeux indépendants, applications interactives'),
  version = COALESCE(libraries.version, '11.4'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://love2d.org/wiki/Main_Page'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/love2d/love');


-- Framework: Lapis (Lua)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Lua'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Lapis', (SELECT id FROM language_id), 'Framework web pour Lua et MoonScript', 'https://leafo.net/lapis/', 'Framework web Lua complet avec ORM intégré', 'Applications web Lua avec base de données', ARRAY['Routage', 'Templates', 'ORM', 'Sessions', 'Validation de formulaires'], 'Applications web, APIs, sites dynamiques', '1.16.0', 'https://leafo.net/lapis/reference.html', 'https://github.com/leafo/lapis'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web pour Lua et MoonScript'),
  official_website = COALESCE(libraries.official_website, 'https://leafo.net/lapis/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web Lua complet avec ORM intégré'),
  best_for = COALESCE(libraries.best_for, 'Applications web Lua avec base de données'),
  features = COALESCE(libraries.features, ARRAY['Routage', 'Templates', 'ORM', 'Sessions', 'Validation de formulaires']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs, sites dynamiques'),
  version = COALESCE(libraries.version, '1.16.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://leafo.net/lapis/reference.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/leafo/lapis');


-- Framework: Tarantool (Lua)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Lua'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Tarantool', (SELECT id FROM language_id), 'Plateforme d''application in-memory avec Lua embarqué', 'https://www.tarantool.io/', 'Plateforme d''application avec base de données et Lua intégré', 'Applications nécessitant performances et programmabilité', ARRAY['Base de données in-memory', 'Procédures stockées en Lua', 'Réplication', 'Sharding', 'Transactions ACID'], 'Bases de données, microservices, applications temps réel', '2.10', 'https://www.tarantool.io/en/doc/latest/', 'https://github.com/tarantool/tarantool'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Plateforme d''application in-memory avec Lua embarqué'),
  official_website = COALESCE(libraries.official_website, 'https://www.tarantool.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Plateforme d''application avec base de données et Lua intégré'),
  best_for = COALESCE(libraries.best_for, 'Applications nécessitant performances et programmabilité'),
  features = COALESCE(libraries.features, ARRAY['Base de données in-memory', 'Procédures stockées en Lua', 'Réplication', 'Sharding', 'Transactions ACID']),
  used_for = COALESCE(libraries.used_for, 'Bases de données, microservices, applications temps réel'),
  version = COALESCE(libraries.version, '2.10'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.tarantool.io/en/doc/latest/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/tarantool/tarantool');


-- Framework: MoonScript (Lua)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Lua'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'MoonScript', (SELECT id FROM language_id), 'Langage de programmation qui se compile en Lua avec une syntaxe plus concise et des fonctionnalités supplémentaires', 'https://moonscript.org/', 'Syntaxe plus concise et fonctionnalités modernes pour le développement Lua', 'Développeurs Lua cherchant une syntaxe plus expressive et des fonctionnalités orientées objet', ARRAY['Syntaxe inspirée par CoffeeScript et Python', 'Classes et héritage', 'Compréhensions de liste', 'Fonctions anonymes concises', 'Compilation vers Lua standard'], 'Développement Lua avec une syntaxe alternative, jeux, applications web, scripts', '0.5.0', 'https://moonscript.org/reference/', 'https://github.com/leafo/moonscript'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Langage de programmation qui se compile en Lua avec une syntaxe plus concise et des fonctionnalités supplémentaires'),
  official_website = COALESCE(libraries.official_website, 'https://moonscript.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Syntaxe plus concise et fonctionnalités modernes pour le développement Lua'),
  best_for = COALESCE(libraries.best_for, 'Développeurs Lua cherchant une syntaxe plus expressive et des fonctionnalités orientées objet'),
  features = COALESCE(libraries.features, ARRAY['Syntaxe inspirée par CoffeeScript et Python', 'Classes et héritage', 'Compréhensions de liste', 'Fonctions anonymes concises', 'Compilation vers Lua standard']),
  used_for = COALESCE(libraries.used_for, 'Développement Lua avec une syntaxe alternative, jeux, applications web, scripts'),
  version = COALESCE(libraries.version, '0.5.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://moonscript.org/reference/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/leafo/moonscript');


-- Framework: OpenResty (Lua)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Lua'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'OpenResty', (SELECT id FROM language_id), 'Plateforme qui intègre Nginx avec Lua pour créer des applications web et API performantes', 'https://openresty.org/', 'Combinaison de la performance de Nginx avec la flexibilité de Lua pour des applications web ultra-rapides', 'Applications web nécessitant performances extrêmes et haute concurrence', ARRAY['Basé sur Nginx', 'Programmation asynchrone en Lua', 'Haute concurrence', 'Faible latence', 'Modules Lua préintégrés'], 'Applications web haute performance, API gateways, microservices, CDN, caching', '1.21.4.2', 'https://openresty.org/en/getting-started.html', 'https://github.com/openresty/openresty'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Plateforme qui intègre Nginx avec Lua pour créer des applications web et API performantes'),
  official_website = COALESCE(libraries.official_website, 'https://openresty.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Combinaison de la performance de Nginx avec la flexibilité de Lua pour des applications web ultra-rapides'),
  best_for = COALESCE(libraries.best_for, 'Applications web nécessitant performances extrêmes et haute concurrence'),
  features = COALESCE(libraries.features, ARRAY['Basé sur Nginx', 'Programmation asynchrone en Lua', 'Haute concurrence', 'Faible latence', 'Modules Lua préintégrés']),
  used_for = COALESCE(libraries.used_for, 'Applications web haute performance, API gateways, microservices, CDN, caching'),
  version = COALESCE(libraries.version, '1.21.4.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://openresty.org/en/getting-started.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/openresty/openresty');


-- Framework: Simulink (Matlab)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Matlab'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Simulink', (SELECT id FROM language_id), 'Environnement de programmation graphique pour la modélisation et la simulation de systèmes dynamiques', 'https://www.mathworks.com/products/simulink.html', 'Modélisation graphique intuitive pour systèmes complexes', 'Ingénieurs travaillant sur des systèmes dynamiques et embarqués', ARRAY['Modélisation par blocs', 'Simulation de systèmes dynamiques', 'Génération de code C/C++', 'Vérification et validation', 'Intégration matérielle'], 'Modélisation de systèmes, simulation, génération de code, systèmes embarqués', 'R2023b', 'https://www.mathworks.com/help/simulink/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Environnement de programmation graphique pour la modélisation et la simulation de systèmes dynamiques'),
  official_website = COALESCE(libraries.official_website, 'https://www.mathworks.com/products/simulink.html'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Modélisation graphique intuitive pour systèmes complexes'),
  best_for = COALESCE(libraries.best_for, 'Ingénieurs travaillant sur des systèmes dynamiques et embarqués'),
  features = COALESCE(libraries.features, ARRAY['Modélisation par blocs', 'Simulation de systèmes dynamiques', 'Génération de code C/C++', 'Vérification et validation', 'Intégration matérielle']),
  used_for = COALESCE(libraries.used_for, 'Modélisation de systèmes, simulation, génération de code, systèmes embarqués'),
  version = COALESCE(libraries.version, 'R2023b'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.mathworks.com/help/simulink/');


-- Framework: Jester (Nim)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Nim'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Jester', (SELECT id FROM language_id), 'Framework web sinatra-like pour Nim', 'https://github.com/dom96/jester', 'Framework web Nim simple et expressif inspiré par Sinatra', 'Applications web Nim légères et APIs', ARRAY['Routage simple', 'Patterns de route', 'Middleware', 'Templates', 'Gestion des cookies et sessions'], 'Applications web, APIs RESTful, microservices', '0.5.0', 'https://github.com/dom96/jester#documentation', 'https://github.com/dom96/jester#documentation'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web sinatra-like pour Nim'),
  official_website = COALESCE(libraries.official_website, 'https://github.com/dom96/jester'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web Nim simple et expressif inspiré par Sinatra'),
  best_for = COALESCE(libraries.best_for, 'Applications web Nim légères et APIs'),
  features = COALESCE(libraries.features, ARRAY['Routage simple', 'Patterns de route', 'Middleware', 'Templates', 'Gestion des cookies et sessions']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs RESTful, microservices'),
  version = COALESCE(libraries.version, '0.5.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://github.com/dom96/jester#documentation'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/dom96/jester#documentation');


-- Framework: Karax (Nim)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Nim'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Karax', (SELECT id FROM language_id), 'Framework pour créer des applications web côté client en Nim', 'https://github.com/karaxnim/karax', 'Framework frontend Nim avec DOM virtuel et compilation vers JavaScript', 'Applications web frontend en Nim', ARRAY['DOM virtuel', 'Composants réutilisables', 'Rendu côté serveur', 'Compilation vers JavaScript', 'Réactivité'], 'Applications web single-page, interfaces utilisateur interactives', '1.2.2', 'https://github.com/karaxnim/karax#karax', 'https://github.com/karaxnim/karax#karax'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework pour créer des applications web côté client en Nim'),
  official_website = COALESCE(libraries.official_website, 'https://github.com/karaxnim/karax'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework frontend Nim avec DOM virtuel et compilation vers JavaScript'),
  best_for = COALESCE(libraries.best_for, 'Applications web frontend en Nim'),
  features = COALESCE(libraries.features, ARRAY['DOM virtuel', 'Composants réutilisables', 'Rendu côté serveur', 'Compilation vers JavaScript', 'Réactivité']),
  used_for = COALESCE(libraries.used_for, 'Applications web single-page, interfaces utilisateur interactives'),
  version = COALESCE(libraries.version, '1.2.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://github.com/karaxnim/karax#karax'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/karaxnim/karax#karax');


-- Framework: Nimble (Nim)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Nim'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Nimble', (SELECT id FROM language_id), 'Système de paquets pour le langage de programmation Nim', 'https://github.com/nim-lang/nimble', 'Gestionnaire de paquets officiel pour Nim avec fonctionnalités de build', 'Projets Nim nécessitant gestion de dépendances et distribution', ARRAY['Gestion de dépendances', 'Versionnement', 'Tâches personnalisées', 'Publication de paquets', 'Scripts de build'], 'Gestion de dépendances, distribution de paquets, build system', '0.14.2', 'https://github.com/nim-lang/nimble#nimble', 'https://github.com/nim-lang/nimble#nimble'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Système de paquets pour le langage de programmation Nim'),
  official_website = COALESCE(libraries.official_website, 'https://github.com/nim-lang/nimble'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Gestionnaire de paquets officiel pour Nim avec fonctionnalités de build'),
  best_for = COALESCE(libraries.best_for, 'Projets Nim nécessitant gestion de dépendances et distribution'),
  features = COALESCE(libraries.features, ARRAY['Gestion de dépendances', 'Versionnement', 'Tâches personnalisées', 'Publication de paquets', 'Scripts de build']),
  used_for = COALESCE(libraries.used_for, 'Gestion de dépendances, distribution de paquets, build system'),
  version = COALESCE(libraries.version, '0.14.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://github.com/nim-lang/nimble#nimble'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/nim-lang/nimble#nimble');


-- Framework: Prologue (Nim)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Nim'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Prologue', (SELECT id FROM language_id), 'Framework web full-stack pour Nim inspiré par Python''s Flask et Django', 'https://planety.github.io/prologue/', 'Framework web Nim complet avec fonctionnalités inspirées de Flask et Django', 'Applications web Nim complètes nécessitant fonctionnalités full-stack', ARRAY['Routage', 'Middleware', 'ORM', 'Templates', 'Validation'], 'Applications web, APIs, applications full-stack', '0.6.4', 'https://planety.github.io/prologue/', 'https://github.com/planety/prologue'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web full-stack pour Nim inspiré par Python''s Flask et Django'),
  official_website = COALESCE(libraries.official_website, 'https://planety.github.io/prologue/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web Nim complet avec fonctionnalités inspirées de Flask et Django'),
  best_for = COALESCE(libraries.best_for, 'Applications web Nim complètes nécessitant fonctionnalités full-stack'),
  features = COALESCE(libraries.features, ARRAY['Routage', 'Middleware', 'ORM', 'Templates', 'Validation']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs, applications full-stack'),
  version = COALESCE(libraries.version, '0.6.4'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://planety.github.io/prologue/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/planety/prologue');


-- Framework: Cocoa (Objective-C)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Objective-C'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Cocoa', (SELECT id FROM language_id), 'Framework d''application pour macOS en Objective-C', 'https://developer.apple.com/documentation/appkit', 'Framework natif pour applications macOS de qualité professionnelle', 'Applications desktop macOS nécessitant intégration système profonde', ARRAY['Interface utilisateur native', 'Binding de données', 'Gestion des documents', 'Graphiques et animation', 'Intégration système'], 'Applications macOS, interfaces utilisateur, applications desktop', '14.0', 'https://developer.apple.com/documentation/appkit'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework d''application pour macOS en Objective-C'),
  official_website = COALESCE(libraries.official_website, 'https://developer.apple.com/documentation/appkit'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework natif pour applications macOS de qualité professionnelle'),
  best_for = COALESCE(libraries.best_for, 'Applications desktop macOS nécessitant intégration système profonde'),
  features = COALESCE(libraries.features, ARRAY['Interface utilisateur native', 'Binding de données', 'Gestion des documents', 'Graphiques et animation', 'Intégration système']),
  used_for = COALESCE(libraries.used_for, 'Applications macOS, interfaces utilisateur, applications desktop'),
  version = COALESCE(libraries.version, '14.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://developer.apple.com/documentation/appkit');


-- Framework: Foundation (Objective-C)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Objective-C'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Foundation', (SELECT id FROM language_id), 'Framework fondamental pour applications Apple', 'https://developer.apple.com/documentation/foundation', 'Bibliothèque fondamentale pour toutes applications Apple', 'Applications nécessitant fonctionnalités de base robustes', ARRAY['Collections', 'Chaînes et texte', 'Dates et temps', 'Persistance', 'Réseau'], 'Applications iOS/macOS, fonctionnalités de base, gestion de données', '17.0', 'https://developer.apple.com/documentation/foundation'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework fondamental pour applications Apple'),
  official_website = COALESCE(libraries.official_website, 'https://developer.apple.com/documentation/foundation'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Bibliothèque fondamentale pour toutes applications Apple'),
  best_for = COALESCE(libraries.best_for, 'Applications nécessitant fonctionnalités de base robustes'),
  features = COALESCE(libraries.features, ARRAY['Collections', 'Chaînes et texte', 'Dates et temps', 'Persistance', 'Réseau']),
  used_for = COALESCE(libraries.used_for, 'Applications iOS/macOS, fonctionnalités de base, gestion de données'),
  version = COALESCE(libraries.version, '17.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://developer.apple.com/documentation/foundation');


-- Framework: UIKit (Objective-C)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Objective-C'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'UIKit', (SELECT id FROM language_id), 'Framework d''interface utilisateur pour iOS', 'https://developer.apple.com/documentation/uikit', 'Framework UI complet pour interfaces iOS natives', 'Applications iOS nécessitant interfaces utilisateur riches', ARRAY['Contrôles d''interface utilisateur', 'Gestion des événements', 'Animation', 'Dessin et impression', 'Accessibilité'], 'Interfaces iOS, applications iPhone/iPad, UI mobile', '17.0', 'https://developer.apple.com/documentation/uikit'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework d''interface utilisateur pour iOS'),
  official_website = COALESCE(libraries.official_website, 'https://developer.apple.com/documentation/uikit'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework UI complet pour interfaces iOS natives'),
  best_for = COALESCE(libraries.best_for, 'Applications iOS nécessitant interfaces utilisateur riches'),
  features = COALESCE(libraries.features, ARRAY['Contrôles d''interface utilisateur', 'Gestion des événements', 'Animation', 'Dessin et impression', 'Accessibilité']),
  used_for = COALESCE(libraries.used_for, 'Interfaces iOS, applications iPhone/iPad, UI mobile'),
  version = COALESCE(libraries.version, '17.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://developer.apple.com/documentation/uikit');


-- Framework: AppKit (Objective-C)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Objective-C'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'AppKit', (SELECT id FROM language_id), 'Framework d''interface utilisateur pour macOS', 'https://developer.apple.com/documentation/appkit', 'Framework UI complet pour interfaces macOS natives', 'Applications macOS nécessitant interfaces utilisateur riches', ARRAY['Contrôles d''interface utilisateur', 'Gestion des fenêtres', 'Graphiques et dessin', 'Gestion des événements', 'Accessibilité'], 'Applications desktop macOS, interfaces utilisateur desktop', '14.0', 'https://developer.apple.com/documentation/appkit'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework d''interface utilisateur pour macOS'),
  official_website = COALESCE(libraries.official_website, 'https://developer.apple.com/documentation/appkit'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework UI complet pour interfaces macOS natives'),
  best_for = COALESCE(libraries.best_for, 'Applications macOS nécessitant interfaces utilisateur riches'),
  features = COALESCE(libraries.features, ARRAY['Contrôles d''interface utilisateur', 'Gestion des fenêtres', 'Graphiques et dessin', 'Gestion des événements', 'Accessibilité']),
  used_for = COALESCE(libraries.used_for, 'Applications desktop macOS, interfaces utilisateur desktop'),
  version = COALESCE(libraries.version, '14.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://developer.apple.com/documentation/appkit');


-- Framework: Dream (Ocaml)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Ocaml'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Dream', (SELECT id FROM language_id), 'Framework web pour OCaml et ReasonML', 'https://aantron.github.io/dream/', 'Framework web OCaml moderne avec API simple et sécurité par défaut', 'Applications web OCaml modernes nécessitant simplicité et sécurité', ARRAY['Routage simple', 'Middleware', 'WebSockets', 'Sessions', 'Sécurité intégrée'], 'Applications web, APIs, services web', '1.0.0', 'https://aantron.github.io/dream/', 'https://github.com/aantron/dream'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web pour OCaml et ReasonML'),
  official_website = COALESCE(libraries.official_website, 'https://aantron.github.io/dream/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web OCaml moderne avec API simple et sécurité par défaut'),
  best_for = COALESCE(libraries.best_for, 'Applications web OCaml modernes nécessitant simplicité et sécurité'),
  features = COALESCE(libraries.features, ARRAY['Routage simple', 'Middleware', 'WebSockets', 'Sessions', 'Sécurité intégrée']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs, services web'),
  version = COALESCE(libraries.version, '1.0.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://aantron.github.io/dream/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/aantron/dream');


-- Framework: Lwt (Ocaml)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Ocaml'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Lwt', (SELECT id FROM language_id), 'Bibliothèque de programmation concurrente légère pour OCaml', 'https://ocsigen.org/lwt/', 'Programmation asynchrone élégante avec des promesses typées', 'Applications OCaml nécessitant concurrence et asynchronicité', ARRAY['Promesses (promises)', 'E/S non bloquantes', 'Primitives de synchronisation', 'Annulation de tâches', 'Intégration avec Unix'], 'Programmation asynchrone, applications réseau, interfaces utilisateur réactives', '5.6.1', 'https://ocsigen.org/lwt/latest/manual/manual', 'https://github.com/ocsigen/lwt'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque de programmation concurrente légère pour OCaml'),
  official_website = COALESCE(libraries.official_website, 'https://ocsigen.org/lwt/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Programmation asynchrone élégante avec des promesses typées'),
  best_for = COALESCE(libraries.best_for, 'Applications OCaml nécessitant concurrence et asynchronicité'),
  features = COALESCE(libraries.features, ARRAY['Promesses (promises)', 'E/S non bloquantes', 'Primitives de synchronisation', 'Annulation de tâches', 'Intégration avec Unix']),
  used_for = COALESCE(libraries.used_for, 'Programmation asynchrone, applications réseau, interfaces utilisateur réactives'),
  version = COALESCE(libraries.version, '5.6.1'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://ocsigen.org/lwt/latest/manual/manual'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/ocsigen/lwt');


-- Framework: Mojolicious (Perl)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Perl'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Mojolicious', (SELECT id FROM language_id), 'Framework web moderne et puissant pour Perl', 'https://mojolicious.org/', 'Framework web Perl moderne avec support temps réel', 'Applications web Perl modernes nécessitant performances et simplicité', ARRAY['Routage RESTful', 'WebSockets', 'JSON intégré', 'Templates', 'Serveur de développement'], 'Applications web, APIs RESTful, microservices, applications temps réel', '9.31', 'https://docs.mojolicious.org/', 'https://github.com/mojolicious/mojo'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web moderne et puissant pour Perl'),
  official_website = COALESCE(libraries.official_website, 'https://mojolicious.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web Perl moderne avec support temps réel'),
  best_for = COALESCE(libraries.best_for, 'Applications web Perl modernes nécessitant performances et simplicité'),
  features = COALESCE(libraries.features, ARRAY['Routage RESTful', 'WebSockets', 'JSON intégré', 'Templates', 'Serveur de développement']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs RESTful, microservices, applications temps réel'),
  version = COALESCE(libraries.version, '9.31'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.mojolicious.org/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/mojolicious/mojo');


-- Framework: Catalyst (Perl)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Perl'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Catalyst', (SELECT id FROM language_id), 'Framework MVC élégant et flexible pour Perl', 'http://www.catalystframework.org/', 'Framework MVC Perl mature et extensible pour applications complexes', 'Applications web Perl d''entreprise nécessitant architecture robuste', ARRAY['Architecture MVC', 'Plugins extensibles', 'ORM intégré (DBIx::Class)', 'Authentification et autorisation', 'Déploiement flexible'], 'Applications web d''entreprise, sites complexes, applications à grande échelle', '5.90131', 'http://www.catalystframework.org/documentation', 'https://github.com/perl-catalyst/catalyst-runtime'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework MVC élégant et flexible pour Perl'),
  official_website = COALESCE(libraries.official_website, 'http://www.catalystframework.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework MVC Perl mature et extensible pour applications complexes'),
  best_for = COALESCE(libraries.best_for, 'Applications web Perl d''entreprise nécessitant architecture robuste'),
  features = COALESCE(libraries.features, ARRAY['Architecture MVC', 'Plugins extensibles', 'ORM intégré (DBIx::Class)', 'Authentification et autorisation', 'Déploiement flexible']),
  used_for = COALESCE(libraries.used_for, 'Applications web d''entreprise, sites complexes, applications à grande échelle'),
  version = COALESCE(libraries.version, '5.90131'),
  documentation_url = COALESCE(libraries.documentation_url, 'http://www.catalystframework.org/documentation'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/perl-catalyst/catalyst-runtime');


-- Framework: Dancer (Perl)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Perl'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Dancer', (SELECT id FROM language_id), 'Framework web léger et élégant pour Perl', 'http://perldancer.org/', 'Framework web Perl minimaliste inspiré par Ruby''s Sinatra', 'Applications web Perl simples nécessitant rapidité de développement', ARRAY['Syntaxe minimaliste', 'Routage simple', 'Plugins', 'Templates', 'Configuration flexible'], 'Applications web légères, APIs, prototypes, microservices', '1.3513', 'http://perldancer.org/documentation', 'https://github.com/PerlDancer/Dancer'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web léger et élégant pour Perl'),
  official_website = COALESCE(libraries.official_website, 'http://perldancer.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web Perl minimaliste inspiré par Ruby''s Sinatra'),
  best_for = COALESCE(libraries.best_for, 'Applications web Perl simples nécessitant rapidité de développement'),
  features = COALESCE(libraries.features, ARRAY['Syntaxe minimaliste', 'Routage simple', 'Plugins', 'Templates', 'Configuration flexible']),
  used_for = COALESCE(libraries.used_for, 'Applications web légères, APIs, prototypes, microservices'),
  version = COALESCE(libraries.version, '1.3513'),
  documentation_url = COALESCE(libraries.documentation_url, 'http://perldancer.org/documentation'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/PerlDancer/Dancer');


-- Framework: Moose (Perl)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Perl'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Moose', (SELECT id FROM language_id), 'Système de programmation orientée objet moderne pour Perl', 'https://metacpan.org/pod/Moose', 'Système OO complet et moderne pour Perl', 'Applications Perl complexes nécessitant architecture OO robuste', ARRAY['Classes et rôles', 'Attributs typés', 'Héritage', 'Traits et mixins', 'Métaprogrammation'], 'Applications orientées objet, systèmes complexes, frameworks', '2.2015', 'https://metacpan.org/pod/distribution/Moose/lib/Moose/Manual.pod', 'https://github.com/moose/Moose'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Système de programmation orientée objet moderne pour Perl'),
  official_website = COALESCE(libraries.official_website, 'https://metacpan.org/pod/Moose'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Système OO complet et moderne pour Perl'),
  best_for = COALESCE(libraries.best_for, 'Applications Perl complexes nécessitant architecture OO robuste'),
  features = COALESCE(libraries.features, ARRAY['Classes et rôles', 'Attributs typés', 'Héritage', 'Traits et mixins', 'Métaprogrammation']),
  used_for = COALESCE(libraries.used_for, 'Applications orientées objet, systèmes complexes, frameworks'),
  version = COALESCE(libraries.version, '2.2015'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://metacpan.org/pod/distribution/Moose/lib/Moose/Manual.pod'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/moose/Moose');


-- Framework: Laravel (Php)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Php'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Laravel', (SELECT id FROM language_id), 'Framework PHP élégant pour le développement web avec une syntaxe expressive', 'https://laravel.com/', 'Développement web PHP moderne avec élégance et productivité', 'Applications web PHP modernes nécessitant un développement rapide', ARRAY['Système de routage expressif', 'ORM Eloquent puissant', 'Migration de base de données', 'Système de templates Blade'], 'Applications web, APIs RESTful, applications d''entreprise, e-commerce', '10.0', 'https://laravel.com/docs', 'https://github.com/laravel/laravel'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework PHP élégant pour le développement web avec une syntaxe expressive'),
  official_website = COALESCE(libraries.official_website, 'https://laravel.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Développement web PHP moderne avec élégance et productivité'),
  best_for = COALESCE(libraries.best_for, 'Applications web PHP modernes nécessitant un développement rapide'),
  features = COALESCE(libraries.features, ARRAY['Système de routage expressif', 'ORM Eloquent puissant', 'Migration de base de données', 'Système de templates Blade']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs RESTful, applications d''entreprise, e-commerce'),
  version = COALESCE(libraries.version, '10.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://laravel.com/docs'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/laravel/laravel');


-- Framework: Symfony (Php)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Php'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Symfony', (SELECT id FROM language_id), 'Framework PHP professionnel et ensemble de composants réutilisables', 'https://symfony.com/', 'Framework PHP robuste et flexible pour applications d''entreprise', 'Applications PHP complexes nécessitant fiabilité et maintenabilité', ARRAY['Architecture modulaire avec composants', 'Haute performance', 'Flexibilité et extensibilité', 'Outils de débogage puissants', 'Communauté et écosystème matures'], 'Applications web d''entreprise, APIs, microservices, applications complexes', '6.3', 'https://symfony.com/doc/current/index.html', 'https://github.com/symfony/symfony'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework PHP professionnel et ensemble de composants réutilisables'),
  official_website = COALESCE(libraries.official_website, 'https://symfony.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework PHP robuste et flexible pour applications d''entreprise'),
  best_for = COALESCE(libraries.best_for, 'Applications PHP complexes nécessitant fiabilité et maintenabilité'),
  features = COALESCE(libraries.features, ARRAY['Architecture modulaire avec composants', 'Haute performance', 'Flexibilité et extensibilité', 'Outils de débogage puissants', 'Communauté et écosystème matures']),
  used_for = COALESCE(libraries.used_for, 'Applications web d''entreprise, APIs, microservices, applications complexes'),
  version = COALESCE(libraries.version, '6.3'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://symfony.com/doc/current/index.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/symfony/symfony');


-- Framework: WordPress (Php)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Php'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'WordPress', (SELECT id FROM language_id), 'Système de gestion de contenu (CMS) le plus populaire au monde', 'https://wordpress.org/', 'CMS flexible et accessible pour tous types de sites web', 'Sites web nécessitant une gestion de contenu simple et efficace', ARRAY['Interface d''administration intuitive', 'Système de plugins extensible', 'Thèmes personnalisables', 'SEO-friendly', 'Communauté massive'], 'Blogs, sites web, e-commerce, portfolios, sites d''entreprise', '6.4', 'https://developer.wordpress.org/', 'https://github.com/WordPress/WordPress'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Système de gestion de contenu (CMS) le plus populaire au monde'),
  official_website = COALESCE(libraries.official_website, 'https://wordpress.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'CMS flexible et accessible pour tous types de sites web'),
  best_for = COALESCE(libraries.best_for, 'Sites web nécessitant une gestion de contenu simple et efficace'),
  features = COALESCE(libraries.features, ARRAY['Interface d''administration intuitive', 'Système de plugins extensible', 'Thèmes personnalisables', 'SEO-friendly', 'Communauté massive']),
  used_for = COALESCE(libraries.used_for, 'Blogs, sites web, e-commerce, portfolios, sites d''entreprise'),
  version = COALESCE(libraries.version, '6.4'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://developer.wordpress.org/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/WordPress/WordPress');


-- Framework: CodeIgniter (Php)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Php'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'CodeIgniter', (SELECT id FROM language_id), 'Framework PHP léger et rapide avec une empreinte minimale', 'https://codeigniter.com/', 'Framework PHP ultra-léger et performant avec courbe d''apprentissage douce', 'Applications PHP nécessitant performance et simplicité', ARRAY['Empreinte légère', 'Performance élevée', 'Configuration minimale', 'Bibliothèque complète', 'Documentation claire'], 'Applications web, APIs, sites de petite à moyenne taille', '4.3', 'https://codeigniter.com/user_guide/index.html', 'https://github.com/codeigniter4/CodeIgniter4'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework PHP léger et rapide avec une empreinte minimale'),
  official_website = COALESCE(libraries.official_website, 'https://codeigniter.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework PHP ultra-léger et performant avec courbe d''apprentissage douce'),
  best_for = COALESCE(libraries.best_for, 'Applications PHP nécessitant performance et simplicité'),
  features = COALESCE(libraries.features, ARRAY['Empreinte légère', 'Performance élevée', 'Configuration minimale', 'Bibliothèque complète', 'Documentation claire']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs, sites de petite à moyenne taille'),
  version = COALESCE(libraries.version, '4.3'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://codeigniter.com/user_guide/index.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/codeigniter4/CodeIgniter4');


-- Framework: CakePHP (Php)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Php'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'CakePHP', (SELECT id FROM language_id), 'Framework PHP rapide et flexible suivant le pattern MVC', 'https://cakephp.org/', 'Framework PHP mature avec conventions claires et productivité élevée', 'Applications PHP nécessitant un développement rapide et structuré', ARRAY['Convention over Configuration', 'ORM intégré', 'Génération de code', 'Validation de données', 'Sécurité intégrée'], 'Applications web, APIs, applications d''entreprise', '5.0', 'https://book.cakephp.org/5/en/index.html', 'https://github.com/cakephp/cakephp'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework PHP rapide et flexible suivant le pattern MVC'),
  official_website = COALESCE(libraries.official_website, 'https://cakephp.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework PHP mature avec conventions claires et productivité élevée'),
  best_for = COALESCE(libraries.best_for, 'Applications PHP nécessitant un développement rapide et structuré'),
  features = COALESCE(libraries.features, ARRAY['Convention over Configuration', 'ORM intégré', 'Génération de code', 'Validation de données', 'Sécurité intégrée']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs, applications d''entreprise'),
  version = COALESCE(libraries.version, '5.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://book.cakephp.org/5/en/index.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/cakephp/cakephp');


-- Framework: Yii (Php)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Php'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Yii', (SELECT id FROM language_id), 'Framework PHP haute performance pour le développement web moderne', 'https://www.yiiframework.com/', 'Framework PHP performant avec génération de code et sécurité avancée', 'Applications PHP nécessitant performance et sécurité', ARRAY['Architecture MVC', 'Générateur de code Gii', 'Sécurité avancée', 'Caching intégré', 'Intégration avec jQuery'], 'Applications web, APIs, applications d''entreprise, e-commerce', '2.0', 'https://www.yiiframework.com/doc/guide/2.0/en', 'https://github.com/yiisoft/yii2'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework PHP haute performance pour le développement web moderne'),
  official_website = COALESCE(libraries.official_website, 'https://www.yiiframework.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework PHP performant avec génération de code et sécurité avancée'),
  best_for = COALESCE(libraries.best_for, 'Applications PHP nécessitant performance et sécurité'),
  features = COALESCE(libraries.features, ARRAY['Architecture MVC', 'Générateur de code Gii', 'Sécurité avancée', 'Caching intégré', 'Intégration avec jQuery']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs, applications d''entreprise, e-commerce'),
  version = COALESCE(libraries.version, '2.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.yiiframework.com/doc/guide/2.0/en'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/yiisoft/yii2');


-- Framework: Laminas (Php)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Php'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Laminas', (SELECT id FROM language_id), 'Collection de packages PHP professionnels (anciennement Zend Framework)', 'https://getlaminas.org/', 'Packages PHP modulaires et professionnels pour applications d''entreprise', 'Applications PHP d''entreprise nécessitant qualité et modularité', ARRAY['Architecture modulaire', 'Composants indépendants', 'Haute qualité de code', 'Testabilité', 'Intégration avec PSR'], 'Applications web d''entreprise, APIs, microservices', '3.0', 'https://docs.laminas.dev/', 'https://github.com/laminas'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Collection de packages PHP professionnels (anciennement Zend Framework)'),
  official_website = COALESCE(libraries.official_website, 'https://getlaminas.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Packages PHP modulaires et professionnels pour applications d''entreprise'),
  best_for = COALESCE(libraries.best_for, 'Applications PHP d''entreprise nécessitant qualité et modularité'),
  features = COALESCE(libraries.features, ARRAY['Architecture modulaire', 'Composants indépendants', 'Haute qualité de code', 'Testabilité', 'Intégration avec PSR']),
  used_for = COALESCE(libraries.used_for, 'Applications web d''entreprise, APIs, microservices'),
  version = COALESCE(libraries.version, '3.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.laminas.dev/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/laminas');


-- Framework: Slim (Php)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Php'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Slim', (SELECT id FROM language_id), 'Micro-framework PHP pour créer des applications web et des APIs', 'https://www.slimframework.com/', 'Framework minimaliste mais complet pour APIs et applications légères', 'APIs RESTful et applications nécessitant légèreté et flexibilité', ARRAY['Routage puissant', 'Middleware', 'Injection de dépendances', 'PSR-7 compatible', 'Empreinte minimale'], 'APIs RESTful, microservices, applications web légères, prototypes', '4.12', 'https://www.slimframework.com/docs/v4/', 'https://github.com/slimphp/Slim'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Micro-framework PHP pour créer des applications web et des APIs'),
  official_website = COALESCE(libraries.official_website, 'https://www.slimframework.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework minimaliste mais complet pour APIs et applications légères'),
  best_for = COALESCE(libraries.best_for, 'APIs RESTful et applications nécessitant légèreté et flexibilité'),
  features = COALESCE(libraries.features, ARRAY['Routage puissant', 'Middleware', 'Injection de dépendances', 'PSR-7 compatible', 'Empreinte minimale']),
  used_for = COALESCE(libraries.used_for, 'APIs RESTful, microservices, applications web légères, prototypes'),
  version = COALESCE(libraries.version, '4.12'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.slimframework.com/docs/v4/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/slimphp/Slim');


-- Framework: Drupal (Php)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Php'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Drupal', (SELECT id FROM language_id), 'CMS et framework pour créer des sites web et applications complexes', 'https://www.drupal.org/', 'CMS enterprise-grade avec capacités de framework pour sites complexes', 'Sites web d''entreprise nécessitant flexibilité et fonctionnalités avancées', ARRAY['Système de modules extensible', 'Taxonomie avancée', 'Types de contenu personnalisables', 'Gestion des utilisateurs et permissions', 'API RESTful intégrée'], 'Sites web d''entreprise, portails, applications web, e-commerce, intranets', '10.1', 'https://www.drupal.org/documentation', 'https://github.com/drupal/drupal'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'CMS et framework pour créer des sites web et applications complexes'),
  official_website = COALESCE(libraries.official_website, 'https://www.drupal.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'CMS enterprise-grade avec capacités de framework pour sites complexes'),
  best_for = COALESCE(libraries.best_for, 'Sites web d''entreprise nécessitant flexibilité et fonctionnalités avancées'),
  features = COALESCE(libraries.features, ARRAY['Système de modules extensible', 'Taxonomie avancée', 'Types de contenu personnalisables', 'Gestion des utilisateurs et permissions', 'API RESTful intégrée']),
  used_for = COALESCE(libraries.used_for, 'Sites web d''entreprise, portails, applications web, e-commerce, intranets'),
  version = COALESCE(libraries.version, '10.1'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.drupal.org/documentation'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/drupal/drupal');


-- Framework: ECLiPSe (Prolog)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Prolog'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'ECLiPSe', (SELECT id FROM language_id), 'Plateforme pour développement de systèmes à base de contraintes', 'http://eclipseclp.org/', 'Plateforme avancée pour programmation par contraintes', 'Applications d''optimisation et planification complexes', ARRAY['Solveurs de contraintes multiples', 'Intégration avec solveurs externes', 'Bibliothèques pour problèmes spécifiques', 'Interface graphique', 'Extensibilité'], 'Programmation par contraintes, optimisation, planification, ordonnancement', '7.0', 'http://eclipseclp.org/doc/', 'https://github.com/eclipse-clp/clpse'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Plateforme pour développement de systèmes à base de contraintes'),
  official_website = COALESCE(libraries.official_website, 'http://eclipseclp.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Plateforme avancée pour programmation par contraintes'),
  best_for = COALESCE(libraries.best_for, 'Applications d''optimisation et planification complexes'),
  features = COALESCE(libraries.features, ARRAY['Solveurs de contraintes multiples', 'Intégration avec solveurs externes', 'Bibliothèques pour problèmes spécifiques', 'Interface graphique', 'Extensibilité']),
  used_for = COALESCE(libraries.used_for, 'Programmation par contraintes, optimisation, planification, ordonnancement'),
  version = COALESCE(libraries.version, '7.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'http://eclipseclp.org/doc/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/eclipse-clp/clpse');


-- Framework: Logtalk (Prolog)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Prolog'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Logtalk', (SELECT id FROM language_id), 'Langage de programmation orienté objet qui étend Prolog', 'https://logtalk.org/', 'Programmation orientée objet pour Prolog', 'Applications Prolog complexes nécessitant modularité et réutilisabilité', ARRAY['Encapsulation', 'Héritage', 'Polymorphisme', 'Protocoles (interfaces)', 'Métaprogrammation'], 'Applications Prolog complexes, programmation orientée objet, projets d''équipe', '3.70.0', 'https://logtalk.org/documentation.html', 'https://github.com/LogtalkDotOrg/logtalk3'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Langage de programmation orienté objet qui étend Prolog'),
  official_website = COALESCE(libraries.official_website, 'https://logtalk.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Programmation orientée objet pour Prolog'),
  best_for = COALESCE(libraries.best_for, 'Applications Prolog complexes nécessitant modularité et réutilisabilité'),
  features = COALESCE(libraries.features, ARRAY['Encapsulation', 'Héritage', 'Polymorphisme', 'Protocoles (interfaces)', 'Métaprogrammation']),
  used_for = COALESCE(libraries.used_for, 'Applications Prolog complexes, programmation orientée objet, projets d''équipe'),
  version = COALESCE(libraries.version, '3.70.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://logtalk.org/documentation.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/LogtalkDotOrg/logtalk3');


-- Framework: Halogen (Purescript)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Purescript'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Halogen', (SELECT id FROM language_id), 'Framework UI déclaratif pour PureScript', 'https://github.com/purescript-halogen/purescript-halogen', 'Framework UI PureScript avec typage fort et architecture de composants robuste', 'Applications web PureScript nécessitant robustesse et maintenabilité', ARRAY['Architecture basée sur les composants', 'Typage statique fort', 'Gestion d''état typée', 'Effets contrôlés', 'Composants réutilisables'], 'Applications web, interfaces utilisateur, applications single-page', '7.0.0', 'https://purescript-halogen.github.io/purescript-halogen/', 'https://github.com/purescript-halogen/purescript-halogen'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework UI déclaratif pour PureScript'),
  official_website = COALESCE(libraries.official_website, 'https://github.com/purescript-halogen/purescript-halogen'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework UI PureScript avec typage fort et architecture de composants robuste'),
  best_for = COALESCE(libraries.best_for, 'Applications web PureScript nécessitant robustesse et maintenabilité'),
  features = COALESCE(libraries.features, ARRAY['Architecture basée sur les composants', 'Typage statique fort', 'Gestion d''état typée', 'Effets contrôlés', 'Composants réutilisables']),
  used_for = COALESCE(libraries.used_for, 'Applications web, interfaces utilisateur, applications single-page'),
  version = COALESCE(libraries.version, '7.0.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://purescript-halogen.github.io/purescript-halogen/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/purescript-halogen/purescript-halogen');


-- Framework: Concur (Purescript)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Purescript'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Concur', (SELECT id FROM language_id), 'Framework UI pour PureScript basé sur les widgets et la composition', 'https://github.com/purescript-concur/purescript-concur-react', 'Approche unique basée sur les widgets pour simplifier la gestion d''état et la concurrence', 'Applications avec logique d''interface utilisateur complexe', ARRAY['Widgets composables', 'Gestion d''état simplifiée', 'Programmation concurrente', 'Typage fort', 'Rendu efficace'], 'Applications web, interfaces utilisateur interactives', '0.4.2', 'https://github.com/purescript-concur/purescript-concur-react/blob/master/docs/index.md', 'https://github.com/purescript-concur/purescript-concur-react/blob/master/docs/index.md'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework UI pour PureScript basé sur les widgets et la composition'),
  official_website = COALESCE(libraries.official_website, 'https://github.com/purescript-concur/purescript-concur-react'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Approche unique basée sur les widgets pour simplifier la gestion d''état et la concurrence'),
  best_for = COALESCE(libraries.best_for, 'Applications avec logique d''interface utilisateur complexe'),
  features = COALESCE(libraries.features, ARRAY['Widgets composables', 'Gestion d''état simplifiée', 'Programmation concurrente', 'Typage fort', 'Rendu efficace']),
  used_for = COALESCE(libraries.used_for, 'Applications web, interfaces utilisateur interactives'),
  version = COALESCE(libraries.version, '0.4.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://github.com/purescript-concur/purescript-concur-react/blob/master/docs/index.md'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/purescript-concur/purescript-concur-react/blob/master/docs/index.md');


-- Framework: Thermite (Purescript)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Purescript'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Thermite', (SELECT id FROM language_id), 'Binding PureScript pour React avec une API inspirée par Elm', 'https://github.com/paf31/purescript-thermite', 'Combinaison de l''architecture Elm avec React et PureScript', 'Applications React nécessitant une architecture plus stricte et fonctionnelle', ARRAY['Architecture inspirée par Elm', 'Composants typés', 'Gestion d''état pure', 'Rendu déclaratif', 'Interopérabilité avec React'], 'Applications web React en PureScript, interfaces utilisateur', '6.3.1', 'https://pursuit.purescript.org/packages/purescript-thermite', 'https://github.com/paf31/purescript-thermite'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Binding PureScript pour React avec une API inspirée par Elm'),
  official_website = COALESCE(libraries.official_website, 'https://github.com/paf31/purescript-thermite'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Combinaison de l''architecture Elm avec React et PureScript'),
  best_for = COALESCE(libraries.best_for, 'Applications React nécessitant une architecture plus stricte et fonctionnelle'),
  features = COALESCE(libraries.features, ARRAY['Architecture inspirée par Elm', 'Composants typés', 'Gestion d''état pure', 'Rendu déclaratif', 'Interopérabilité avec React']),
  used_for = COALESCE(libraries.used_for, 'Applications web React en PureScript, interfaces utilisateur'),
  version = COALESCE(libraries.version, '6.3.1'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://pursuit.purescript.org/packages/purescript-thermite'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/paf31/purescript-thermite');


-- Framework: Django (Python)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Python'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Django', (SELECT id FROM language_id), 'Framework web Python pour la création d''applications web robustes', 'https://www.djangoproject.com/', 'Structure robuste et sécurité intégrée', 'Applications web complexes et sites web d''entreprise', ARRAY['ORM', 'Système de templates', 'Sécurité intégrée', 'Admin automatique'], 'Applications web complexes, sites web d''entreprise, APIs RESTful, CMS', '4.2', 'https://docs.djangoproject.com/en/4.2/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web Python pour la création d''applications web robustes'),
  official_website = COALESCE(libraries.official_website, 'https://www.djangoproject.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Structure robuste et sécurité intégrée'),
  best_for = COALESCE(libraries.best_for, 'Applications web complexes et sites web d''entreprise'),
  features = COALESCE(libraries.features, ARRAY['ORM', 'Système de templates', 'Sécurité intégrée', 'Admin automatique']),
  used_for = COALESCE(libraries.used_for, 'Applications web complexes, sites web d''entreprise, APIs RESTful, CMS'),
  version = COALESCE(libraries.version, '4.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.djangoproject.com/en/4.2/');


-- Framework: Flask (Python)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Python'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Flask', (SELECT id FROM language_id), 'Microframework Python pour la création d''applications web', 'https://flask.palletsprojects.com/', 'Minimalisme et flexibilité', 'Applications web simples et APIs', ARRAY['Flexible', 'Minimaliste', 'Facile à apprendre', 'Extensions'], 'APIs RESTful, applications web simples, microservices, prototypes', '2.3', 'https://flask.palletsprojects.com/en/2.3.x/tutorial/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Microframework Python pour la création d''applications web'),
  official_website = COALESCE(libraries.official_website, 'https://flask.palletsprojects.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Minimalisme et flexibilité'),
  best_for = COALESCE(libraries.best_for, 'Applications web simples et APIs'),
  features = COALESCE(libraries.features, ARRAY['Flexible', 'Minimaliste', 'Facile à apprendre', 'Extensions']),
  used_for = COALESCE(libraries.used_for, 'APIs RESTful, applications web simples, microservices, prototypes'),
  version = COALESCE(libraries.version, '2.3'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://flask.palletsprojects.com/en/2.3.x/tutorial/');


-- Framework: FastAPI (Python)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Python'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'FastAPI', (SELECT id FROM language_id), 'Framework web moderne, rapide et asynchrone pour Python 3.7+', 'https://fastapi.tiangolo.com/', 'Combinaison de rapidité, simplicité et validation automatique des données avec documentation interactive', 'APIs modernes nécessitant des performances élevées et une documentation claire', ARRAY['Performances élevées', 'Validation automatique des données', 'Documentation automatique (OpenAPI)', 'Support asynchrone natif', 'Typage statique avec Pydantic'], 'APIs RESTful, microservices, applications à haute performance, applications asynchrones', '0.104.0', 'https://fastapi.tiangolo.com/', 'https://github.com/tiangolo/fastapi'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web moderne, rapide et asynchrone pour Python 3.7+'),
  official_website = COALESCE(libraries.official_website, 'https://fastapi.tiangolo.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Combinaison de rapidité, simplicité et validation automatique des données avec documentation interactive'),
  best_for = COALESCE(libraries.best_for, 'APIs modernes nécessitant des performances élevées et une documentation claire'),
  features = COALESCE(libraries.features, ARRAY['Performances élevées', 'Validation automatique des données', 'Documentation automatique (OpenAPI)', 'Support asynchrone natif', 'Typage statique avec Pydantic']),
  used_for = COALESCE(libraries.used_for, 'APIs RESTful, microservices, applications à haute performance, applications asynchrones'),
  version = COALESCE(libraries.version, '0.104.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://fastapi.tiangolo.com/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/tiangolo/fastapi');


-- Framework: TensorFlow (Python)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Python'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'TensorFlow', (SELECT id FROM language_id), 'Bibliothèque open-source pour l''apprentissage automatique et l''intelligence artificielle', 'https://www.tensorflow.org/', 'Plateforme complète pour le développement et le déploiement de modèles ML à l''échelle', 'Projets d''IA/ML de recherche et de production nécessitant flexibilité et évolutivité', ARRAY['Calcul numérique via graphes de flux de données', 'Support GPU et TPU', 'Keras intégré', 'TensorFlow Lite pour les appareils mobiles'], 'Machine learning, deep learning, traitement d''images, traitement du langage naturel, analyse prédictive', '2.15.0', 'https://www.tensorflow.org/api_docs', 'https://github.com/tensorflow/tensorflow'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque open-source pour l''apprentissage automatique et l''intelligence artificielle'),
  official_website = COALESCE(libraries.official_website, 'https://www.tensorflow.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Plateforme complète pour le développement et le déploiement de modèles ML à l''échelle'),
  best_for = COALESCE(libraries.best_for, 'Projets d''IA/ML de recherche et de production nécessitant flexibilité et évolutivité'),
  features = COALESCE(libraries.features, ARRAY['Calcul numérique via graphes de flux de données', 'Support GPU et TPU', 'Keras intégré', 'TensorFlow Lite pour les appareils mobiles']),
  used_for = COALESCE(libraries.used_for, 'Machine learning, deep learning, traitement d''images, traitement du langage naturel, analyse prédictive'),
  version = COALESCE(libraries.version, '2.15.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.tensorflow.org/api_docs'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/tensorflow/tensorflow');


-- Framework: PyTorch (Python)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Python'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'PyTorch', (SELECT id FROM language_id), 'Bibliothèque d''apprentissage automatique open-source basée sur Torch', 'https://pytorch.org/', 'Interface pythonique intuitive et flexibilité pour la recherche en deep learning', 'Chercheurs en IA et développeurs nécessitant un prototypage rapide et une flexibilité maximale', ARRAY['Calcul tensoriel avec accélération GPU', 'Différentiation automatique', 'API Python intuitive', 'Mode eager execution pour le débogage'], 'Deep learning, recherche en IA, vision par ordinateur, traitement du langage naturel', '2.1.0', 'https://pytorch.org/docs/stable/index.html', 'https://github.com/pytorch/pytorch'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque d''apprentissage automatique open-source basée sur Torch'),
  official_website = COALESCE(libraries.official_website, 'https://pytorch.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Interface pythonique intuitive et flexibilité pour la recherche en deep learning'),
  best_for = COALESCE(libraries.best_for, 'Chercheurs en IA et développeurs nécessitant un prototypage rapide et une flexibilité maximale'),
  features = COALESCE(libraries.features, ARRAY['Calcul tensoriel avec accélération GPU', 'Différentiation automatique', 'API Python intuitive', 'Mode eager execution pour le débogage']),
  used_for = COALESCE(libraries.used_for, 'Deep learning, recherche en IA, vision par ordinateur, traitement du langage naturel'),
  version = COALESCE(libraries.version, '2.1.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://pytorch.org/docs/stable/index.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/pytorch/pytorch');


-- Framework: Pandas (Python)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Python'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Pandas', (SELECT id FROM language_id), 'Bibliothèque Python pour la manipulation et l''analyse de données', 'https://pandas.pydata.org/', 'Manipulation intuitive et efficace de données tabulaires avec une API riche', 'Scientifiques des données et analystes travaillant avec des données structurées', ARRAY['Manipulation de données tabulaires', 'Fonctions statistiques intégrées', 'Gestion des données manquantes'], 'Analyse de données, nettoyage de données, exploration de données, préparation de données pour ML', '2.1.0', 'https://pandas.pydata.org/docs/', 'https://github.com/pandas-dev/pandas'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque Python pour la manipulation et l''analyse de données'),
  official_website = COALESCE(libraries.official_website, 'https://pandas.pydata.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Manipulation intuitive et efficace de données tabulaires avec une API riche'),
  best_for = COALESCE(libraries.best_for, 'Scientifiques des données et analystes travaillant avec des données structurées'),
  features = COALESCE(libraries.features, ARRAY['Manipulation de données tabulaires', 'Fonctions statistiques intégrées', 'Gestion des données manquantes']),
  used_for = COALESCE(libraries.used_for, 'Analyse de données, nettoyage de données, exploration de données, préparation de données pour ML'),
  version = COALESCE(libraries.version, '2.1.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://pandas.pydata.org/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/pandas-dev/pandas');


-- Framework: NumPy (Python)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Python'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'NumPy', (SELECT id FROM language_id), 'Bibliothèque fondamentale pour le calcul scientifique en Python', 'https://numpy.org/', 'Fondation du calcul scientifique en Python avec des opérations vectorisées efficaces', 'Scientifiques, ingénieurs et analystes de données nécessitant des calculs numériques performants', ARRAY['Tableaux N-dimensionnels puissants', 'Fonctions mathématiques sophistiquées', 'Outils d''intégration avec C/C++', 'Base pour la plupart des bibliothèques scientifiques Python'], 'Calcul numérique, traitement de tableaux multidimensionnels, algèbre linéaire, statistiques', '1.25.0', 'https://numpy.org/doc/stable/', 'https://github.com/numpy/numpy'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque fondamentale pour le calcul scientifique en Python'),
  official_website = COALESCE(libraries.official_website, 'https://numpy.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Fondation du calcul scientifique en Python avec des opérations vectorisées efficaces'),
  best_for = COALESCE(libraries.best_for, 'Scientifiques, ingénieurs et analystes de données nécessitant des calculs numériques performants'),
  features = COALESCE(libraries.features, ARRAY['Tableaux N-dimensionnels puissants', 'Fonctions mathématiques sophistiquées', 'Outils d''intégration avec C/C++', 'Base pour la plupart des bibliothèques scientifiques Python']),
  used_for = COALESCE(libraries.used_for, 'Calcul numérique, traitement de tableaux multidimensionnels, algèbre linéaire, statistiques'),
  version = COALESCE(libraries.version, '1.25.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://numpy.org/doc/stable/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/numpy/numpy');


-- Framework: Streamlit (Python)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Python'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Streamlit', (SELECT id FROM language_id), 'Bibliothèque Python pour créer rapidement des applications web interactives pour la data science', 'https://streamlit.io/', 'Transformation de scripts Python en applications web interactives en quelques minutes sans connaissances frontend', 'Data scientists et ML engineers souhaitant partager rapidement leurs analyses et modèles via des interfaces web', ARRAY['Création d''interfaces web en pur Python', 'Hot-reloading automatique', 'Widgets interactifs intégrés', 'Intégration facile avec les bibliothèques de data science', 'Déploiement simplifié avec Streamlit Cloud'], 'Dashboards interactifs, visualisation de données, prototypage d''applications ML, démonstrations de modèles', '1.28.0', 'https://docs.streamlit.io/', 'https://github.com/streamlit/streamlit'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque Python pour créer rapidement des applications web interactives pour la data science'),
  official_website = COALESCE(libraries.official_website, 'https://streamlit.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Transformation de scripts Python en applications web interactives en quelques minutes sans connaissances frontend'),
  best_for = COALESCE(libraries.best_for, 'Data scientists et ML engineers souhaitant partager rapidement leurs analyses et modèles via des interfaces web'),
  features = COALESCE(libraries.features, ARRAY['Création d''interfaces web en pur Python', 'Hot-reloading automatique', 'Widgets interactifs intégrés', 'Intégration facile avec les bibliothèques de data science', 'Déploiement simplifié avec Streamlit Cloud']),
  used_for = COALESCE(libraries.used_for, 'Dashboards interactifs, visualisation de données, prototypage d''applications ML, démonstrations de modèles'),
  version = COALESCE(libraries.version, '1.28.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.streamlit.io/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/streamlit/streamlit');


-- Framework: Pyramid (Python)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Python'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Pyramid', (SELECT id FROM language_id), 'Framework web Python flexible et pragmatique', 'https://trypyramid.com/', 'Framework web qui commence petit mais évolue avec votre application', 'Applications web nécessitant flexibilité et évolutivité', ARRAY['Configuration minimale', 'Extensibilité', 'Sécurité robuste', 'Système de templates flexible', 'Routage avancé'], 'Applications web, APIs, CMS, applications d''entreprise', '2.0', 'https://docs.pylonsproject.org/projects/pyramid/en/latest/', 'https://github.com/Pylons/pyramid'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web Python flexible et pragmatique'),
  official_website = COALESCE(libraries.official_website, 'https://trypyramid.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web qui commence petit mais évolue avec votre application'),
  best_for = COALESCE(libraries.best_for, 'Applications web nécessitant flexibilité et évolutivité'),
  features = COALESCE(libraries.features, ARRAY['Configuration minimale', 'Extensibilité', 'Sécurité robuste', 'Système de templates flexible', 'Routage avancé']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs, CMS, applications d''entreprise'),
  version = COALESCE(libraries.version, '2.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.pylonsproject.org/projects/pyramid/en/latest/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/Pylons/pyramid');


-- Framework: Tornado (Python)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Python'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Tornado', (SELECT id FROM language_id), 'Bibliothèque web asynchrone et framework d''applications', 'https://www.tornadoweb.org/', 'Framework web asynchrone natif pour applications temps réel à haute performance', 'Applications nécessitant connexions persistantes et traitement asynchrone', ARRAY['I/O non-bloquant', 'WebSockets', 'Performances élevées', 'Évolutivité', 'Client HTTP asynchrone'], 'Applications web asynchrones, WebSockets, applications temps réel, services à haute concurrence', '6.3.3', 'https://www.tornadoweb.org/en/stable/', 'https://github.com/tornadoweb/tornado'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque web asynchrone et framework d''applications'),
  official_website = COALESCE(libraries.official_website, 'https://www.tornadoweb.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web asynchrone natif pour applications temps réel à haute performance'),
  best_for = COALESCE(libraries.best_for, 'Applications nécessitant connexions persistantes et traitement asynchrone'),
  features = COALESCE(libraries.features, ARRAY['I/O non-bloquant', 'WebSockets', 'Performances élevées', 'Évolutivité', 'Client HTTP asynchrone']),
  used_for = COALESCE(libraries.used_for, 'Applications web asynchrones, WebSockets, applications temps réel, services à haute concurrence'),
  version = COALESCE(libraries.version, '6.3.3'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.tornadoweb.org/en/stable/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/tornadoweb/tornado');


-- Framework: Matplotlib (Python)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Python'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Matplotlib', (SELECT id FROM language_id), 'Bibliothèque de visualisation complète pour Python', 'https://matplotlib.org/', 'Bibliothèque de visualisation complète et hautement personnalisable', 'Scientifiques et data scientists nécessitant graphiques précis et publication-ready', ARRAY['Graphiques statiques de haute qualité', 'Personnalisation complète', 'Multiples backends', 'Intégration avec NumPy', 'Support pour formats d''exportation variés'], 'Visualisation de données, graphiques scientifiques, figures pour publications, visualisations interactives', '3.8.2', 'https://matplotlib.org/stable/users/index.html', 'https://github.com/matplotlib/matplotlib'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque de visualisation complète pour Python'),
  official_website = COALESCE(libraries.official_website, 'https://matplotlib.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Bibliothèque de visualisation complète et hautement personnalisable'),
  best_for = COALESCE(libraries.best_for, 'Scientifiques et data scientists nécessitant graphiques précis et publication-ready'),
  features = COALESCE(libraries.features, ARRAY['Graphiques statiques de haute qualité', 'Personnalisation complète', 'Multiples backends', 'Intégration avec NumPy', 'Support pour formats d''exportation variés']),
  used_for = COALESCE(libraries.used_for, 'Visualisation de données, graphiques scientifiques, figures pour publications, visualisations interactives'),
  version = COALESCE(libraries.version, '3.8.2'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://matplotlib.org/stable/users/index.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/matplotlib/matplotlib');


-- Framework: Shiny (R)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'R'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Shiny', (SELECT id FROM language_id), 'Framework pour créer des applications web interactives avec R', 'https://shiny.posit.co/', 'Création d''applications web interactives en R sans connaissances en HTML/CSS/JS', 'Scientifiques des données et statisticiens nécessitant des interfaces web pour leurs analyses', ARRAY['Réactivité', 'Widgets interactifs', 'Intégration avec ggplot2', 'Thèmes', 'Déploiement facile'], 'Visualisation de données, tableaux de bord, applications statistiques', '1.7.5', 'https://shiny.posit.co/r/getstarted/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework pour créer des applications web interactives avec R'),
  official_website = COALESCE(libraries.official_website, 'https://shiny.posit.co/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Création d''applications web interactives en R sans connaissances en HTML/CSS/JS'),
  best_for = COALESCE(libraries.best_for, 'Scientifiques des données et statisticiens nécessitant des interfaces web pour leurs analyses'),
  features = COALESCE(libraries.features, ARRAY['Réactivité', 'Widgets interactifs', 'Intégration avec ggplot2', 'Thèmes', 'Déploiement facile']),
  used_for = COALESCE(libraries.used_for, 'Visualisation de données, tableaux de bord, applications statistiques'),
  version = COALESCE(libraries.version, '1.7.5'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://shiny.posit.co/r/getstarted/');


-- Framework: ggplot2 (R)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'R'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'ggplot2', (SELECT id FROM language_id), 'Système de visualisation de données déclaratif pour R', 'https://ggplot2.tidyverse.org/', 'Création de graphiques élégants et complexes avec une syntaxe déclarative', 'Visualisation de données statistiques en R', ARRAY['Grammaire des graphiques', 'Esthétiques', 'Facettes', 'Thèmes', 'Extensions'], 'Visualisation de données, graphiques statistiques, rapports', '3.4.4', 'https://ggplot2.tidyverse.org/reference/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Système de visualisation de données déclaratif pour R'),
  official_website = COALESCE(libraries.official_website, 'https://ggplot2.tidyverse.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Création de graphiques élégants et complexes avec une syntaxe déclarative'),
  best_for = COALESCE(libraries.best_for, 'Visualisation de données statistiques en R'),
  features = COALESCE(libraries.features, ARRAY['Grammaire des graphiques', 'Esthétiques', 'Facettes', 'Thèmes', 'Extensions']),
  used_for = COALESCE(libraries.used_for, 'Visualisation de données, graphiques statistiques, rapports'),
  version = COALESCE(libraries.version, '3.4.4'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://ggplot2.tidyverse.org/reference/');


-- Framework: dplyr (R)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'R'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'dplyr', (SELECT id FROM language_id), 'Grammaire de manipulation de données pour R', 'https://dplyr.tidyverse.org/', 'Manipulation de données intuitive et expressive en R', 'Préparation et transformation de données en R', ARRAY['Verbes de manipulation de données', 'Pipes', 'Groupement', 'Jointures', 'Résumés'], 'Transformation de données, nettoyage, agrégation, jointures', '1.1.3', 'https://dplyr.tidyverse.org/reference/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Grammaire de manipulation de données pour R'),
  official_website = COALESCE(libraries.official_website, 'https://dplyr.tidyverse.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Manipulation de données intuitive et expressive en R'),
  best_for = COALESCE(libraries.best_for, 'Préparation et transformation de données en R'),
  features = COALESCE(libraries.features, ARRAY['Verbes de manipulation de données', 'Pipes', 'Groupement', 'Jointures', 'Résumés']),
  used_for = COALESCE(libraries.used_for, 'Transformation de données, nettoyage, agrégation, jointures'),
  version = COALESCE(libraries.version, '1.1.3'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://dplyr.tidyverse.org/reference/');


-- Framework: tidyverse (R)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'R'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'tidyverse', (SELECT id FROM language_id), 'Collection de packages R pour la science des données', 'https://www.tidyverse.org/', 'Écosystème cohérent pour l''analyse de données en R', 'Flux de travail complet en science des données avec R', ARRAY['Manipulation de données (dplyr)', 'Visualisation (ggplot2)', 'Importation (readr)', 'Transformation (tidyr)', 'Programmation (purrr)'], 'Science des données, analyse statistique, visualisation, reporting', '2.0.0', 'https://www.tidyverse.org/packages/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Collection de packages R pour la science des données'),
  official_website = COALESCE(libraries.official_website, 'https://www.tidyverse.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Écosystème cohérent pour l''analyse de données en R'),
  best_for = COALESCE(libraries.best_for, 'Flux de travail complet en science des données avec R'),
  features = COALESCE(libraries.features, ARRAY['Manipulation de données (dplyr)', 'Visualisation (ggplot2)', 'Importation (readr)', 'Transformation (tidyr)', 'Programmation (purrr)']),
  used_for = COALESCE(libraries.used_for, 'Science des données, analyse statistique, visualisation, reporting'),
  version = COALESCE(libraries.version, '2.0.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://www.tidyverse.org/packages/');


-- Framework: DrRacket (Racket)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Racket'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'DrRacket', (SELECT id FROM language_id), 'Environnement de développement intégré pour Racket', 'https://docs.racket-lang.org/drracket/', 'IDE conçu spécifiquement pour Racket et l''apprentissage', 'Débutants en programmation et développeurs Racket', ARRAY['Éditeur avec coloration syntaxique', 'Débogueur intégré', 'Support pour multiples langages', 'Outils d''analyse', 'Interface utilisateur simple'], 'Développement Racket, éducation, prototypage, création de langages', '8.10', 'https://docs.racket-lang.org/drracket/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Environnement de développement intégré pour Racket'),
  official_website = COALESCE(libraries.official_website, 'https://docs.racket-lang.org/drracket/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'IDE conçu spécifiquement pour Racket et l''apprentissage'),
  best_for = COALESCE(libraries.best_for, 'Débutants en programmation et développeurs Racket'),
  features = COALESCE(libraries.features, ARRAY['Éditeur avec coloration syntaxique', 'Débogueur intégré', 'Support pour multiples langages', 'Outils d''analyse', 'Interface utilisateur simple']),
  used_for = COALESCE(libraries.used_for, 'Développement Racket, éducation, prototypage, création de langages'),
  version = COALESCE(libraries.version, '8.10'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.racket-lang.org/drracket/');


-- Framework: Scribble (Racket)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Racket'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Scribble', (SELECT id FROM language_id), 'Langage et bibliothèque pour la génération de documents', 'https://docs.racket-lang.org/scribble/', 'Système de documentation programmable et extensible', 'Documentation technique et publications académiques', ARRAY['Syntaxe extensible', 'Code et documentation intégrés', 'Références croisées', 'Bibliographie'], 'Documentation, livres, articles, rapports, sites web', '8.10', 'https://docs.racket-lang.org/scribble/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Langage et bibliothèque pour la génération de documents'),
  official_website = COALESCE(libraries.official_website, 'https://docs.racket-lang.org/scribble/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Système de documentation programmable et extensible'),
  best_for = COALESCE(libraries.best_for, 'Documentation technique et publications académiques'),
  features = COALESCE(libraries.features, ARRAY['Syntaxe extensible', 'Code et documentation intégrés', 'Références croisées', 'Bibliographie']),
  used_for = COALESCE(libraries.used_for, 'Documentation, livres, articles, rapports, sites web'),
  version = COALESCE(libraries.version, '8.10'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.racket-lang.org/scribble/');


-- Framework: Pict (Racket)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Racket'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Pict', (SELECT id FROM language_id), 'Langage fonctionnel pour la création d''images et de diagrammes', 'https://docs.racket-lang.org/pict/', 'Création d''images et diagrammes avec approche fonctionnelle', 'Visualisations techniques et présentations académiques', ARRAY['Composition d''images', 'Transformations géométriques', 'Dessin vectoriel', 'Animation', 'Intégration avec Slideshow'], 'Visualisations, diagrammes, présentations, art génératif', '8.10', 'https://docs.racket-lang.org/pict/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Langage fonctionnel pour la création d''images et de diagrammes'),
  official_website = COALESCE(libraries.official_website, 'https://docs.racket-lang.org/pict/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Création d''images et diagrammes avec approche fonctionnelle'),
  best_for = COALESCE(libraries.best_for, 'Visualisations techniques et présentations académiques'),
  features = COALESCE(libraries.features, ARRAY['Composition d''images', 'Transformations géométriques', 'Dessin vectoriel', 'Animation', 'Intégration avec Slideshow']),
  used_for = COALESCE(libraries.used_for, 'Visualisations, diagrammes, présentations, art génératif'),
  version = COALESCE(libraries.version, '8.10'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.racket-lang.org/pict/');


-- Framework: Rosette (Racket)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Racket'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Rosette', (SELECT id FROM language_id), 'Framework pour créer des langages avec résolution de contraintes', 'https://docs.racket-lang.org/rosette-guide/', 'Création de langages avec capacités de vérification et synthèse', 'Chercheurs en langages de programmation et vérification formelle', ARRAY['Solveurs SMT intégrés', 'Vérification symbolique', 'Synthèse de programmes', 'Analyse de programmes', 'Langages spécifiques au domaine'], 'Vérification de programmes, synthèse de programmes, résolution de contraintes', '4.0', 'https://docs.racket-lang.org/rosette-guide/', 'https://github.com/emina/rosette'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework pour créer des langages avec résolution de contraintes'),
  official_website = COALESCE(libraries.official_website, 'https://docs.racket-lang.org/rosette-guide/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Création de langages avec capacités de vérification et synthèse'),
  best_for = COALESCE(libraries.best_for, 'Chercheurs en langages de programmation et vérification formelle'),
  features = COALESCE(libraries.features, ARRAY['Solveurs SMT intégrés', 'Vérification symbolique', 'Synthèse de programmes', 'Analyse de programmes', 'Langages spécifiques au domaine']),
  used_for = COALESCE(libraries.used_for, 'Vérification de programmes, synthèse de programmes, résolution de contraintes'),
  version = COALESCE(libraries.version, '4.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.racket-lang.org/rosette-guide/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/emina/rosette');


-- Framework: Redex (Racket)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Racket'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Redex', (SELECT id FROM language_id), 'DSL pour la modélisation et l''exploration de sémantiques de langages', 'https://docs.racket-lang.org/redex/', 'Modélisation et test de sémantiques de langages', 'Chercheurs en langages de programmation et sémantique formelle', ARRAY['Définition de langages', 'Systèmes de réduction', 'Génération de tests', 'Visualisation', 'Vérification de propriétés'], 'Recherche en langages, sémantique formelle, vérification de propriétés', '8.10', 'https://docs.racket-lang.org/redex/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'DSL pour la modélisation et l''exploration de sémantiques de langages'),
  official_website = COALESCE(libraries.official_website, 'https://docs.racket-lang.org/redex/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Modélisation et test de sémantiques de langages'),
  best_for = COALESCE(libraries.best_for, 'Chercheurs en langages de programmation et sémantique formelle'),
  features = COALESCE(libraries.features, ARRAY['Définition de langages', 'Systèmes de réduction', 'Génération de tests', 'Visualisation', 'Vérification de propriétés']),
  used_for = COALESCE(libraries.used_for, 'Recherche en langages, sémantique formelle, vérification de propriétés'),
  version = COALESCE(libraries.version, '8.10'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.racket-lang.org/redex/');


-- Framework: Sinatra (Ruby)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Ruby'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Sinatra', (SELECT id FROM language_id), 'Framework web DSL minimaliste pour Ruby', 'https://sinatrarb.com/', 'Simplicité et élégance pour des applications web Ruby légères', 'Applications web Ruby simples et APIs', ARRAY['DSL simple et élégant', 'Routage flexible', 'Intégration avec Rack', 'Helpers', 'Templates'], 'Applications web légères, APIs RESTful, microservices', '3.1.0', 'https://sinatrarb.com/documentation.html'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web DSL minimaliste pour Ruby'),
  official_website = COALESCE(libraries.official_website, 'https://sinatrarb.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Simplicité et élégance pour des applications web Ruby légères'),
  best_for = COALESCE(libraries.best_for, 'Applications web Ruby simples et APIs'),
  features = COALESCE(libraries.features, ARRAY['DSL simple et élégant', 'Routage flexible', 'Intégration avec Rack', 'Helpers', 'Templates']),
  used_for = COALESCE(libraries.used_for, 'Applications web légères, APIs RESTful, microservices'),
  version = COALESCE(libraries.version, '3.1.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://sinatrarb.com/documentation.html');


-- Framework: Hanami (Ruby)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Ruby'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Hanami', (SELECT id FROM language_id), 'Framework web moderne pour Ruby avec une architecture propre', 'https://hanamirb.org/', 'Architecture propre et modulaire pour des applications Ruby maintenables', 'Applications web Ruby nécessitant une architecture modulaire et testable', ARRAY['Architecture MVC', 'Entités et repositories', 'Routage avancé', 'Sécurité intégrée', 'Assets'], 'Applications web, APIs RESTful, applications d''entreprise', '2.1.0', 'https://guides.hanamirb.org/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web moderne pour Ruby avec une architecture propre'),
  official_website = COALESCE(libraries.official_website, 'https://hanamirb.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Architecture propre et modulaire pour des applications Ruby maintenables'),
  best_for = COALESCE(libraries.best_for, 'Applications web Ruby nécessitant une architecture modulaire et testable'),
  features = COALESCE(libraries.features, ARRAY['Architecture MVC', 'Entités et repositories', 'Routage avancé', 'Sécurité intégrée', 'Assets']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs RESTful, applications d''entreprise'),
  version = COALESCE(libraries.version, '2.1.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://guides.hanamirb.org/');


-- Framework: Padrino (Ruby)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Ruby'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Padrino', (SELECT id FROM language_id), 'Framework web élégant construit sur Sinatra', 'http://padrinorb.com/', 'Combine la simplicité de Sinatra avec les fonctionnalités d''un framework complet', 'Applications nécessitant plus que Sinatra mais moins que Rails', ARRAY['Basé sur Sinatra', 'Générateurs', 'Helpers avancés', 'Internationalisation', 'Admin intégré'], 'Applications web, APIs, applications de taille moyenne', '0.15.1', 'http://padrinorb.com/guides/', 'https://github.com/padrino/padrino-framework'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web élégant construit sur Sinatra'),
  official_website = COALESCE(libraries.official_website, 'http://padrinorb.com/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Combine la simplicité de Sinatra avec les fonctionnalités d''un framework complet'),
  best_for = COALESCE(libraries.best_for, 'Applications nécessitant plus que Sinatra mais moins que Rails'),
  features = COALESCE(libraries.features, ARRAY['Basé sur Sinatra', 'Générateurs', 'Helpers avancés', 'Internationalisation', 'Admin intégré']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs, applications de taille moyenne'),
  version = COALESCE(libraries.version, '0.15.1'),
  documentation_url = COALESCE(libraries.documentation_url, 'http://padrinorb.com/guides/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/padrino/padrino-framework');


-- Framework: Grape (Ruby)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Ruby'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Grape', (SELECT id FROM language_id), 'Framework micro-service REST-like pour Ruby', 'https://github.com/ruby-grape/grape', 'Framework spécialisé pour APIs RESTful avec versionnement intégré', 'APIs RESTful complexes nécessitant versionnement et documentation', ARRAY['DSL pour APIs', 'Versionnement d''API', 'Validation de paramètres', 'Formatage de réponses', 'Montable dans Rack'], 'APIs RESTful, microservices, APIs versionnées', '1.7.0', 'https://github.com/ruby-grape/grape/wiki', 'https://github.com/ruby-grape/grape/wiki'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework micro-service REST-like pour Ruby'),
  official_website = COALESCE(libraries.official_website, 'https://github.com/ruby-grape/grape'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework spécialisé pour APIs RESTful avec versionnement intégré'),
  best_for = COALESCE(libraries.best_for, 'APIs RESTful complexes nécessitant versionnement et documentation'),
  features = COALESCE(libraries.features, ARRAY['DSL pour APIs', 'Versionnement d''API', 'Validation de paramètres', 'Formatage de réponses', 'Montable dans Rack']),
  used_for = COALESCE(libraries.used_for, 'APIs RESTful, microservices, APIs versionnées'),
  version = COALESCE(libraries.version, '1.7.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://github.com/ruby-grape/grape/wiki'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/ruby-grape/grape/wiki');


-- Framework: Rocket (Rust)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Rust'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Rocket', (SELECT id FROM language_id), 'Framework web pour Rust axé sur la facilité d''utilisation et la flexibilité', 'https://rocket.rs/', 'Framework web Rust type-safe et intuitif', 'Applications web Rust nécessitant une sécurité de type et une syntaxe élégante', ARRAY['Routage type-safe', 'Gestion des formulaires', 'Templating', 'JSON', 'Sessions'], 'Applications web, APIs RESTful, microservices', '0.5', 'https://rocket.rs/v0.5/guide/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web pour Rust axé sur la facilité d''utilisation et la flexibilité'),
  official_website = COALESCE(libraries.official_website, 'https://rocket.rs/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web Rust type-safe et intuitif'),
  best_for = COALESCE(libraries.best_for, 'Applications web Rust nécessitant une sécurité de type et une syntaxe élégante'),
  features = COALESCE(libraries.features, ARRAY['Routage type-safe', 'Gestion des formulaires', 'Templating', 'JSON', 'Sessions']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs RESTful, microservices'),
  version = COALESCE(libraries.version, '0.5'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://rocket.rs/v0.5/guide/');


-- Framework: Actix (Rust)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Rust'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Actix', (SELECT id FROM language_id), 'Framework web pour Rust basé sur le modèle d''acteur', 'https://actix.rs/', 'Framework web Rust ultra-performant basé sur le modèle d''acteur', 'Applications web Rust nécessitant des performances maximales', ARRAY['Basé sur les acteurs', 'Performances exceptionnelles', 'WebSockets', 'Streaming HTTP', 'Middleware'], 'Applications web hautes performances, APIs RESTful, microservices', '4.0', 'https://actix.rs/docs/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web pour Rust basé sur le modèle d''acteur'),
  official_website = COALESCE(libraries.official_website, 'https://actix.rs/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web Rust ultra-performant basé sur le modèle d''acteur'),
  best_for = COALESCE(libraries.best_for, 'Applications web Rust nécessitant des performances maximales'),
  features = COALESCE(libraries.features, ARRAY['Basé sur les acteurs', 'Performances exceptionnelles', 'WebSockets', 'Streaming HTTP', 'Middleware']),
  used_for = COALESCE(libraries.used_for, 'Applications web hautes performances, APIs RESTful, microservices'),
  version = COALESCE(libraries.version, '4.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://actix.rs/docs/');


-- Framework: Yew (Rust)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Rust'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Yew', (SELECT id FROM language_id), 'Framework moderne pour créer des applications web multi-thread en Rust et WebAssembly', 'https://yew.rs/', 'Framework React-like pour Rust et WebAssembly', 'Applications web côté client en Rust nécessitant des performances natives', ARRAY['Composants', 'HTML déclaratif', 'Concurrence', 'Agents', 'Services'], 'Applications web côté client, applications WebAssembly, interfaces utilisateur', '0.21', 'https://yew.rs/docs/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework moderne pour créer des applications web multi-thread en Rust et WebAssembly'),
  official_website = COALESCE(libraries.official_website, 'https://yew.rs/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework React-like pour Rust et WebAssembly'),
  best_for = COALESCE(libraries.best_for, 'Applications web côté client en Rust nécessitant des performances natives'),
  features = COALESCE(libraries.features, ARRAY['Composants', 'HTML déclaratif', 'Concurrence', 'Agents', 'Services']),
  used_for = COALESCE(libraries.used_for, 'Applications web côté client, applications WebAssembly, interfaces utilisateur'),
  version = COALESCE(libraries.version, '0.21'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://yew.rs/docs/');


-- Framework: Tauri (Rust)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Rust'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Tauri', (SELECT id FROM language_id), 'Framework pour construire des applications de bureau légères avec des technologies web', 'https://tauri.app/', 'Applications de bureau légères et sécurisées avec des technologies web et Rust', 'Applications de bureau nécessitant des performances et une empreinte mémoire réduite', ARRAY['Empreinte mémoire réduite', 'Sécurité', 'Interface native', 'Performances', 'Personnalisation'], 'Applications de bureau multiplateformes, alternatives à Electron', '1.5', 'https://tauri.app/v1/guides/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework pour construire des applications de bureau légères avec des technologies web'),
  official_website = COALESCE(libraries.official_website, 'https://tauri.app/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Applications de bureau légères et sécurisées avec des technologies web et Rust'),
  best_for = COALESCE(libraries.best_for, 'Applications de bureau nécessitant des performances et une empreinte mémoire réduite'),
  features = COALESCE(libraries.features, ARRAY['Empreinte mémoire réduite', 'Sécurité', 'Interface native', 'Performances', 'Personnalisation']),
  used_for = COALESCE(libraries.used_for, 'Applications de bureau multiplateformes, alternatives à Electron'),
  version = COALESCE(libraries.version, '1.5'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://tauri.app/v1/guides/');


-- Framework: Tokio (Rust)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Rust'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Tokio', (SELECT id FROM language_id), 'Plateforme asynchrone pour Rust', 'https://tokio.rs/', 'Runtime asynchrone performant et fiable pour Rust', 'Applications Rust nécessitant des I/O asynchrones et une concurrence efficace', ARRAY['I/O asynchrone', 'Multithreading', 'Timers', 'Synchronisation', 'Tâches'], 'Applications réseau, services concurrents, I/O asynchrone', '1.34', 'https://tokio.rs/tokio/tutorial'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Plateforme asynchrone pour Rust'),
  official_website = COALESCE(libraries.official_website, 'https://tokio.rs/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Runtime asynchrone performant et fiable pour Rust'),
  best_for = COALESCE(libraries.best_for, 'Applications Rust nécessitant des I/O asynchrones et une concurrence efficace'),
  features = COALESCE(libraries.features, ARRAY['I/O asynchrone', 'Multithreading', 'Timers', 'Synchronisation', 'Tâches']),
  used_for = COALESCE(libraries.used_for, 'Applications réseau, services concurrents, I/O asynchrone'),
  version = COALESCE(libraries.version, '1.34'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://tokio.rs/tokio/tutorial');


-- Framework: Serde (Rust)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Rust'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Serde', (SELECT id FROM language_id), 'Framework de sérialisation et désérialisation pour Rust', 'https://serde.rs/', 'Sérialisation et désérialisation de données efficace et type-safe en Rust', 'Applications Rust manipulant des données structurées', ARRAY['Sérialisation/désérialisation générique', 'Dérivation automatique', 'Performances', 'Flexibilité'], 'Traitement de données, APIs, stockage, configuration', '1.0', 'https://serde.rs/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework de sérialisation et désérialisation pour Rust'),
  official_website = COALESCE(libraries.official_website, 'https://serde.rs/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Sérialisation et désérialisation de données efficace et type-safe en Rust'),
  best_for = COALESCE(libraries.best_for, 'Applications Rust manipulant des données structurées'),
  features = COALESCE(libraries.features, ARRAY['Sérialisation/désérialisation générique', 'Dérivation automatique', 'Performances', 'Flexibilité']),
  used_for = COALESCE(libraries.used_for, 'Traitement de données, APIs, stockage, configuration'),
  version = COALESCE(libraries.version, '1.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://serde.rs/');


-- Framework: Akka (Scala)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Scala'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Akka', (SELECT id FROM language_id), 'Boîte à outils pour construire des applications concurrentes, distribuées et résilientes', 'https://akka.io/', 'Modèle d''acteur puissant pour systèmes distribués et résilients', 'Applications nécessitant haute concurrence et tolérance aux pannes', ARRAY['Modèle d''acteur', 'Clustering', 'Streams pour traitement de données', 'HTTP et gRPC', 'Persistence et Event Sourcing'], 'Systèmes distribués, applications réactives, traitement de flux, microservices', '2.8', 'https://doc.akka.io/docs/akka/current/index.html', 'https://github.com/akka/akka'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Boîte à outils pour construire des applications concurrentes, distribuées et résilientes'),
  official_website = COALESCE(libraries.official_website, 'https://akka.io/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Modèle d''acteur puissant pour systèmes distribués et résilients'),
  best_for = COALESCE(libraries.best_for, 'Applications nécessitant haute concurrence et tolérance aux pannes'),
  features = COALESCE(libraries.features, ARRAY['Modèle d''acteur', 'Clustering', 'Streams pour traitement de données', 'HTTP et gRPC', 'Persistence et Event Sourcing']),
  used_for = COALESCE(libraries.used_for, 'Systèmes distribués, applications réactives, traitement de flux, microservices'),
  version = COALESCE(libraries.version, '2.8'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://doc.akka.io/docs/akka/current/index.html'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/akka/akka');


-- Framework: Cats (Scala)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Scala'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'Cats', (SELECT id FROM language_id), 'Bibliothèque pour la programmation fonctionnelle en Scala', 'https://typelevel.org/cats/', 'Abstractions fonctionnelles puissantes pour code Scala robuste', 'Applications Scala nécessitant programmation fonctionnelle pure', ARRAY['Abstractions de programmation fonctionnelle', 'Type classes', 'Monades et foncteurs', 'Gestion des effets', 'Validation fonctionnelle'], 'Applications fonctionnelles, abstractions typées, composition de fonctions', '2.10.0', 'https://typelevel.org/cats/', 'https://github.com/typelevel/cats'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque pour la programmation fonctionnelle en Scala'),
  official_website = COALESCE(libraries.official_website, 'https://typelevel.org/cats/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Abstractions fonctionnelles puissantes pour code Scala robuste'),
  best_for = COALESCE(libraries.best_for, 'Applications Scala nécessitant programmation fonctionnelle pure'),
  features = COALESCE(libraries.features, ARRAY['Abstractions de programmation fonctionnelle', 'Type classes', 'Monades et foncteurs', 'Gestion des effets', 'Validation fonctionnelle']),
  used_for = COALESCE(libraries.used_for, 'Applications fonctionnelles, abstractions typées, composition de fonctions'),
  version = COALESCE(libraries.version, '2.10.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://typelevel.org/cats/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/typelevel/cats');


-- Framework: ZIO (Scala)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Scala'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'ZIO', (SELECT id FROM language_id), 'Bibliothèque pour la programmation asynchrone et concurrente basée sur les effets', 'https://zio.dev/', 'Programmation basée sur les effets pour applications robustes et performantes', 'Applications Scala nécessitant asynchronicité et gestion des erreurs', ARRAY['Effets typés', 'Gestion des erreurs', 'Concurrence structurée', 'Streams', 'Écosystème complet'], 'Applications asynchrones, concurrence, gestion des ressources, applications résilientes', '2.0', 'https://zio.dev/reference/', 'https://github.com/zio/zio'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque pour la programmation asynchrone et concurrente basée sur les effets'),
  official_website = COALESCE(libraries.official_website, 'https://zio.dev/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Programmation basée sur les effets pour applications robustes et performantes'),
  best_for = COALESCE(libraries.best_for, 'Applications Scala nécessitant asynchronicité et gestion des erreurs'),
  features = COALESCE(libraries.features, ARRAY['Effets typés', 'Gestion des erreurs', 'Concurrence structurée', 'Streams', 'Écosystème complet']),
  used_for = COALESCE(libraries.used_for, 'Applications asynchrones, concurrence, gestion des ressources, applications résilientes'),
  version = COALESCE(libraries.version, '2.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://zio.dev/reference/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/zio/zio');


-- Framework: http4s (Scala)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Scala'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'http4s', (SELECT id FROM language_id), 'Bibliothèque HTTP typée et fonctionnelle pour Scala', 'https://http4s.org/', 'HTTP purement fonctionnel avec typage fort pour applications robustes', 'Applications web Scala avec approche fonctionnelle pure', ARRAY['API typée et fonctionnelle', 'Intégration avec Cats et FS2', 'Middleware composable', 'Client et serveur HTTP', 'Support pour streaming'], 'Services web, APIs RESTful, clients HTTP, microservices', '0.23.23', 'https://http4s.org/v0.23/docs/', 'https://github.com/http4s/http4s'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Bibliothèque HTTP typée et fonctionnelle pour Scala'),
  official_website = COALESCE(libraries.official_website, 'https://http4s.org/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'HTTP purement fonctionnel avec typage fort pour applications robustes'),
  best_for = COALESCE(libraries.best_for, 'Applications web Scala avec approche fonctionnelle pure'),
  features = COALESCE(libraries.features, ARRAY['API typée et fonctionnelle', 'Intégration avec Cats et FS2', 'Middleware composable', 'Client et serveur HTTP', 'Support pour streaming']),
  used_for = COALESCE(libraries.used_for, 'Services web, APIs RESTful, clients HTTP, microservices'),
  version = COALESCE(libraries.version, '0.23.23'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://http4s.org/v0.23/docs/'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/http4s/http4s');


-- Framework: SwiftUI (Swift)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Swift'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'SwiftUI', (SELECT id FROM language_id), 'Framework déclaratif pour construire des interfaces utilisateur sur toutes les plateformes Apple', 'https://developer.apple.com/xcode/swiftui/', 'Création d''interfaces utilisateur déclaratives et cohérentes pour toutes les plateformes Apple', 'Applications Apple modernes avec des interfaces utilisateur riches', ARRAY['Syntaxe déclarative', 'Composition de vues', 'État et liaison de données', 'Animations', 'Accessibilité'], 'Applications iOS, macOS, watchOS et tvOS', '5.0', 'https://developer.apple.com/documentation/swiftui/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework déclaratif pour construire des interfaces utilisateur sur toutes les plateformes Apple'),
  official_website = COALESCE(libraries.official_website, 'https://developer.apple.com/xcode/swiftui/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Création d''interfaces utilisateur déclaratives et cohérentes pour toutes les plateformes Apple'),
  best_for = COALESCE(libraries.best_for, 'Applications Apple modernes avec des interfaces utilisateur riches'),
  features = COALESCE(libraries.features, ARRAY['Syntaxe déclarative', 'Composition de vues', 'État et liaison de données', 'Animations', 'Accessibilité']),
  used_for = COALESCE(libraries.used_for, 'Applications iOS, macOS, watchOS et tvOS'),
  version = COALESCE(libraries.version, '5.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://developer.apple.com/documentation/swiftui/');


-- Framework: UIKit (Swift)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Swift'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'UIKit', (SELECT id FROM language_id), 'Framework pour construire des interfaces utilisateur sur iOS et tvOS', 'https://developer.apple.com/documentation/uikit', 'Framework mature et complet pour les interfaces utilisateur iOS', 'Applications iOS nécessitant un contrôle précis de l''interface utilisateur', ARRAY['Contrôles d''interface utilisateur', 'Gestion des événements', 'Animation', 'Dessin et impression', 'Accessibilité'], 'Applications iOS et tvOS', '17.0', 'https://developer.apple.com/documentation/uikit'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework pour construire des interfaces utilisateur sur iOS et tvOS'),
  official_website = COALESCE(libraries.official_website, 'https://developer.apple.com/documentation/uikit'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework mature et complet pour les interfaces utilisateur iOS'),
  best_for = COALESCE(libraries.best_for, 'Applications iOS nécessitant un contrôle précis de l''interface utilisateur'),
  features = COALESCE(libraries.features, ARRAY['Contrôles d''interface utilisateur', 'Gestion des événements', 'Animation', 'Dessin et impression', 'Accessibilité']),
  used_for = COALESCE(libraries.used_for, 'Applications iOS et tvOS'),
  version = COALESCE(libraries.version, '17.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://developer.apple.com/documentation/uikit');


-- Framework: Combine (Swift)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Swift'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Combine', (SELECT id FROM language_id), 'Framework de programmation réactive pour Swift', 'https://developer.apple.com/documentation/combine', 'Programmation réactive native pour l''écosystème Apple', 'Applications Swift nécessitant une gestion avancée des événements asynchrones', ARRAY['Publishers et Subscribers', 'Opérateurs de transformation', 'Gestion des erreurs', 'Schedulers', 'Intégration avec SwiftUI'], 'Gestion des événements asynchrones, traitement des données, interfaces réactives', '4.0', 'https://developer.apple.com/documentation/combine'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework de programmation réactive pour Swift'),
  official_website = COALESCE(libraries.official_website, 'https://developer.apple.com/documentation/combine'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Programmation réactive native pour l''écosystème Apple'),
  best_for = COALESCE(libraries.best_for, 'Applications Swift nécessitant une gestion avancée des événements asynchrones'),
  features = COALESCE(libraries.features, ARRAY['Publishers et Subscribers', 'Opérateurs de transformation', 'Gestion des erreurs', 'Schedulers', 'Intégration avec SwiftUI']),
  used_for = COALESCE(libraries.used_for, 'Gestion des événements asynchrones, traitement des données, interfaces réactives'),
  version = COALESCE(libraries.version, '4.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://developer.apple.com/documentation/combine');


-- Framework: Vapor (Swift)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'Swift'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'Vapor', (SELECT id FROM language_id), 'Framework web pour Swift côté serveur', 'https://vapor.codes/', 'Framework web Swift performant et élégant', 'Applications backend Swift nécessitant des performances et une syntaxe moderne', ARRAY['Routage', 'ORM (Fluent)', 'Templating (Leaf)', 'WebSockets', 'Authentification'], 'Applications web, APIs RESTful, microservices, applications backend', '4.0', 'https://docs.vapor.codes/'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Framework web pour Swift côté serveur'),
  official_website = COALESCE(libraries.official_website, 'https://vapor.codes/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Framework web Swift performant et élégant'),
  best_for = COALESCE(libraries.best_for, 'Applications backend Swift nécessitant des performances et une syntaxe moderne'),
  features = COALESCE(libraries.features, ARRAY['Routage', 'ORM (Fluent)', 'Templating (Leaf)', 'WebSockets', 'Authentification']),
  used_for = COALESCE(libraries.used_for, 'Applications web, APIs RESTful, microservices, applications backend'),
  version = COALESCE(libraries.version, '4.0'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://docs.vapor.codes/');


-- Framework: VBScript (VBA)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'VBA'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url
)
VALUES (
  'VBScript', (SELECT id FROM language_id), 'Langage de script basé sur Visual Basic pour l''automatisation Windows', 'https://learn.microsoft.com/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/t0aew7h6(v=vs.84)', 'Automatisation Windows avec syntaxe similaire à VBA', 'Administrateurs système et automatisation de tâches Windows', ARRAY['Scripts WSH', 'Automatisation COM', 'Scripts HTA', 'Interaction avec le système', 'Tâches planifiées'], 'Scripts système, automatisation Windows, administration système', '5.8', 'https://learn.microsoft.com/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/t0aew7h6(v=vs.84)'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Langage de script basé sur Visual Basic pour l''automatisation Windows'),
  official_website = COALESCE(libraries.official_website, 'https://learn.microsoft.com/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/t0aew7h6(v=vs.84)'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Automatisation Windows avec syntaxe similaire à VBA'),
  best_for = COALESCE(libraries.best_for, 'Administrateurs système et automatisation de tâches Windows'),
  features = COALESCE(libraries.features, ARRAY['Scripts WSH', 'Automatisation COM', 'Scripts HTA', 'Interaction avec le système', 'Tâches planifiées']),
  used_for = COALESCE(libraries.used_for, 'Scripts système, automatisation Windows, administration système'),
  version = COALESCE(libraries.version, '5.8'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://learn.microsoft.com/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/t0aew7h6(v=vs.84)');


-- Framework: VSTO (VBA)
WITH language_id AS (
  SELECT id FROM languages WHERE name = 'VBA'
)
INSERT INTO libraries (
  name, language_id, description, official_website, unique_selling_point, best_for, features, used_for, version, documentation_url, github_url
)
VALUES (
  'VSTO', (SELECT id FROM language_id), 'Visual Studio Tools for Office - Extension de VBA avec .NET', 'https://learn.microsoft.com/visualstudio/vsto/', 'Développement Office professionnel avec .NET et Visual Studio', 'Développeurs .NET créant des solutions Office d''entreprise', ARRAY['Développement .NET pour Office', 'Débogage avancé', 'Contrôles Windows Forms', 'Sécurité améliorée', 'Déploiement professionnel'], 'Applications Office professionnelles, add-ins, intégration .NET', 'Visual Studio 2022', 'https://learn.microsoft.com/visualstudio/vsto/office-solutions-development-overview', 'https://github.com/OfficeDev/Office-VSTO-Samples'
)
ON CONFLICT (name, language_id) 
DO UPDATE SET
  description = COALESCE(libraries.description, 'Visual Studio Tools for Office - Extension de VBA avec .NET'),
  official_website = COALESCE(libraries.official_website, 'https://learn.microsoft.com/visualstudio/vsto/'),
  unique_selling_point = COALESCE(libraries.unique_selling_point, 'Développement Office professionnel avec .NET et Visual Studio'),
  best_for = COALESCE(libraries.best_for, 'Développeurs .NET créant des solutions Office d''entreprise'),
  features = COALESCE(libraries.features, ARRAY['Développement .NET pour Office', 'Débogage avancé', 'Contrôles Windows Forms', 'Sécurité améliorée', 'Déploiement professionnel']),
  used_for = COALESCE(libraries.used_for, 'Applications Office professionnelles, add-ins, intégration .NET'),
  version = COALESCE(libraries.version, 'Visual Studio 2022'),
  documentation_url = COALESCE(libraries.documentation_url, 'https://learn.microsoft.com/visualstudio/vsto/office-solutions-development-overview'),
  github_url = COALESCE(libraries.github_url, 'https://github.com/OfficeDev/Office-VSTO-Samples');

