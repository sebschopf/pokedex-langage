### Schéma de Scénarios Amélioré - Pokedex Langage de Programmation

Voici un schéma amélioré des scénarios d'utilisation qui intègre vos précisions:

```mermaid
Scénarios d.download-icon {
            cursor: pointer;
            transform-origin: center;
        }
        .download-icon .arrow-part {
            transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95);
             transform-origin: center;
        }
        button:has(.download-icon):hover .download-icon .arrow-part, button:has(.download-icon):focus-visible .download-icon .arrow-part {
          transform: translateY(-1.5px);
        }
        #mermaid-diagram-rieq{font-family:var(--font-geist-sans);font-size:12px;fill:#000000;}#mermaid-diagram-rieq .error-icon{fill:#552222;}#mermaid-diagram-rieq .error-text{fill:#552222;stroke:#552222;}#mermaid-diagram-rieq .edge-thickness-normal{stroke-width:1px;}#mermaid-diagram-rieq .edge-thickness-thick{stroke-width:3.5px;}#mermaid-diagram-rieq .edge-pattern-solid{stroke-dasharray:0;}#mermaid-diagram-rieq .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-diagram-rieq .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-diagram-rieq .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-diagram-rieq .marker{fill:#666;stroke:#666;}#mermaid-diagram-rieq .marker.cross{stroke:#666;}#mermaid-diagram-rieq svg{font-family:var(--font-geist-sans);font-size:12px;}#mermaid-diagram-rieq p{margin:0;}#mermaid-diagram-rieq .label{font-family:var(--font-geist-sans);color:#000000;}#mermaid-diagram-rieq .cluster-label text{fill:#333;}#mermaid-diagram-rieq .cluster-label span{color:#333;}#mermaid-diagram-rieq .cluster-label span p{background-color:transparent;}#mermaid-diagram-rieq .label text,#mermaid-diagram-rieq span{fill:#000000;color:#000000;}#mermaid-diagram-rieq .node rect,#mermaid-diagram-rieq .node circle,#mermaid-diagram-rieq .node ellipse,#mermaid-diagram-rieq .node polygon,#mermaid-diagram-rieq .node path{fill:#eee;stroke:#999;stroke-width:1px;}#mermaid-diagram-rieq .rough-node .label text,#mermaid-diagram-rieq .node .label text{text-anchor:middle;}#mermaid-diagram-rieq .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-diagram-rieq .node .label{text-align:center;}#mermaid-diagram-rieq .node.clickable{cursor:pointer;}#mermaid-diagram-rieq .arrowheadPath{fill:#333333;}#mermaid-diagram-rieq .edgePath .path{stroke:#666;stroke-width:2.0px;}#mermaid-diagram-rieq .flowchart-link{stroke:#666;fill:none;}#mermaid-diagram-rieq .edgeLabel{background-color:white;text-align:center;}#mermaid-diagram-rieq .edgeLabel p{background-color:white;}#mermaid-diagram-rieq .edgeLabel rect{opacity:0.5;background-color:white;fill:white;}#mermaid-diagram-rieq .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#mermaid-diagram-rieq .cluster rect{fill:hsl(0, 0%, 98.9215686275%);stroke:#707070;stroke-width:1px;}#mermaid-diagram-rieq .cluster text{fill:#333;}#mermaid-diagram-rieq .cluster span{color:#333;}#mermaid-diagram-rieq div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:var(--font-geist-sans);font-size:12px;background:hsl(-160, 0%, 93.3333333333%);border:1px solid #707070;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-diagram-rieq .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#000000;}#mermaid-diagram-rieq .flowchart-link{stroke:hsl(var(--gray-400));stroke-width:1px;}#mermaid-diagram-rieq .marker,#mermaid-diagram-rieq marker,#mermaid-diagram-rieq marker *{fill:hsl(var(--gray-400))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rieq .label,#mermaid-diagram-rieq text,#mermaid-diagram-rieq text>tspan{fill:hsl(var(--black))!important;color:hsl(var(--black))!important;}#mermaid-diagram-rieq .background,#mermaid-diagram-rieq rect.relationshipLabelBox{fill:hsl(var(--white))!important;}#mermaid-diagram-rieq .entityBox,#mermaid-diagram-rieq .attributeBoxEven{fill:hsl(var(--gray-150))!important;}#mermaid-diagram-rieq .attributeBoxOdd{fill:hsl(var(--white))!important;}#mermaid-diagram-rieq .label-container,#mermaid-diagram-rieq rect.actor{fill:hsl(var(--white))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rieq line{stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rieq :root{--mermaid-font-family:var(--font-geist-sans);}Consulte uniquementInvité à s&#39;enregistrerSoumet une correctionsur contenu existantSoumet une correctionSoumet un nouvel élémentbibliothèque, framework, etc.ExamineExamineApprouveRejette aveccommentaire obligatoireGère les utilisateursGère les todosAssocié à unou plusieurs langagesMêmes droits qu&#39;unvalidateur standardToutes les actionsdes validateursGestion complètedes rôlesDésigne lesréférents de langageVisiteur Non EnregistréAffichage du contenu publicCréation de compteUtilisateur Enregistrérole: registeredTable: correctionsstatus: pendingUtilisateur Vérifiérole: verifiedTable: librariesstatus: pendingValidateurrole: validatorMise à jourstatus: approvedMise à jourstatus: rejectedPeut attribuer/retirerle rôle &#39;verified&#39;Création/assignationde tâchesRéférent de Langage(Validateur désigné)Table: language_referentsAdministrateurrole: adminModification detous les user_rolesAttribue le statutde référent
```

## Scénarios Détaillés

### 1. Consultation par les Visiteurs

**Scénario**: Un visiteur non enregistré consulte le contenu du site

1. **Acteurs**:

1. Visiteur non enregistré



2. **Flux**:

1. Le visiteur peut consulter toutes les informations publiques sur les langages, bibliothèques, etc.
2. S'il tente de soumettre une correction ou un ajout, il est invité à s'enregistrer
3. Un message explique les avantages de l'enregistrement et le processus de vérification



3. **Règles d'accès**:

1. Accès en lecture seule au contenu public
2. Pas d'accès aux fonctionnalités de soumission





### 2. Soumission de Corrections par les Utilisateurs Enregistrés

**Scénario**: Un utilisateur enregistré souhaite corriger une information

1. **Acteurs**:

1. Utilisateur enregistré (role: registered)
2. Utilisateur vérifié (role: verified)



2. **Flux**:

1. L'utilisateur identifie une erreur dans une fiche de langage ou bibliothèque
2. Il remplit un formulaire de correction spécifiant:

1. L'élément concerné (language_id ou library_id)
2. Le champ à corriger (field)
3. La correction proposée (suggestion)
4. Une justification (correction_text)



3. La correction est enregistrée dans la table "corrections" avec status="pending"
4. Son user_id est associé à la correction
5. La correction est visible dans l'application avec un indicateur de statut "en attente"



3. **Règles d'accès**:

1. Seuls les utilisateurs authentifiés peuvent soumettre des corrections
2. Les utilisateurs peuvent voir uniquement leurs propres corrections
3. Les validateurs et admins peuvent voir toutes les corrections





### 3. Soumission de Nouveau Contenu par les Utilisateurs Vérifiés

**Scénario**: Un utilisateur vérifié souhaite ajouter une nouvelle bibliothèque

1. **Acteurs**:

1. Utilisateur vérifié (role: verified)



2. **Flux**:

1. L'utilisateur remplit un formulaire d'ajout avec les détails de la bibliothèque
2. L'ajout est enregistré dans la table appropriée (ex: "libraries") avec status="pending"
3. Le user_id de l'utilisateur est associé à l'ajout



3. **Règles d'accès**:

1. Seuls les utilisateurs avec le rôle "verified" ou supérieur peuvent soumettre de nouveaux contenus
2. Les utilisateurs peuvent voir uniquement leurs propres soumissions
3. Les validateurs et admins peuvent voir toutes les soumissions





### 4. Validation des Soumissions

**Scénario**: Un validateur examine et traite les soumissions

1. **Acteurs**:

1. Validateur (role: validator)
2. Référent de langage (validateur désigné pour un langage spécifique)
3. Administrateur (role: admin)



2. **Flux pour l'approbation**:

1. Le validateur examine la soumission
2. S'il l'approuve, il met à jour status="approved"
3. Pour les corrections, les données correspondantes sont mises à jour dans la table principale
4. Pour les nouveaux contenus, l'entrée est activée dans la table principale



3. **Flux pour le rejet**:

1. Le validateur examine la soumission
2. S'il la rejette, il DOIT fournir un commentaire explicatif
3. Le système met à jour status="rejected" et enregistre le commentaire
4. L'utilisateur peut voir le motif du rejet et éventuellement soumettre une version corrigée



4. **Règles d'accès**:

1. Seuls les validateurs et admins peuvent modifier le statut des soumissions
2. Le rejet nécessite obligatoirement un commentaire





### 5. Gestion des Utilisateurs par les Validateurs

**Scénario**: Un validateur gère les statuts des utilisateurs

1. **Acteurs**:

1. Validateur (role: validator)
2. Administrateur (role: admin)



2. **Flux**:

1. Le validateur consulte la liste des utilisateurs enregistrés
2. Il peut attribuer le statut "verified" à un utilisateur registered
3. Il peut retirer le statut "verified" à un utilisateur (le ramenant à "registered")
4. Chaque modification de statut peut être accompagnée d'un commentaire



3. **Règles d'accès**:

1. Les validateurs peuvent uniquement modifier le statut "verified"
2. Les admins peuvent modifier tous les statuts





### 6. Référents de Langage

**Scénario**: Désignation et rôle des référents de langage

1. **Acteurs**:

1. Administrateur (role: admin)
2. Validateur désigné comme référent (role: validator + référent)



2. **Flux de désignation**:

1. L'admin identifie un validateur ayant une expertise sur un langage spécifique
2. Il le désigne comme référent pour ce langage dans la table "language_referents"
3. Le validateur est notifié de sa désignation



3. **Implications**:

1. Le référent est affiché comme contact principal pour le langage
2. Il est prioritairement notifié des soumissions concernant ce langage
3. Il n'a pas de droits supplémentaires, mais une responsabilité accrue



4. **Règles d'accès**:

1. Seuls les admins peuvent désigner des référents
2. Un validateur peut être référent pour plusieurs langages





### 7. Gestion des Tâches (Todos)

**Scénario**: Gestion du module de tâches

1. **Acteurs**:

1. Validateur (role: validator)
2. Administrateur (role: admin)



2. **Flux**:

1. Le validateur accède au module de gestion des tâches
2. Il peut créer de nouvelles tâches avec:

1. Titre et description
2. Catégorie (table: todo_categories)
3. Priorité
4. Date d'échéance



3. Il peut assigner des tâches à des utilisateurs spécifiques
4. Il peut suivre l'avancement et mettre à jour le statut des tâches



3. **Règles d'accès**:

1. Seuls les validateurs et admins peuvent voir et gérer le module todo
2. Les utilisateurs assignés à une tâche peuvent voir et mettre à jour uniquement leurs tâches





Ce schéma de scénarios amélioré reflète les précisions que vous avez apportées sur les rôles, les permissions et les flux de travail dans votre application.