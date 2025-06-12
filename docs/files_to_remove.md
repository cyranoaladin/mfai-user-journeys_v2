# Fichiers à supprimer ou fusionner

Ce document liste les fichiers qui peuvent être supprimés ou fusionnés pour nettoyer la structure du projet.

## Fichiers dupliqués

| Fichier à supprimer | Remplacé par | Justification |
|---------------------|--------------|---------------|
| `/components/Journey/VerticalTimeline.tsx` | `/components/Journey/Timeline/VerticalTimeline.tsx` | Version plus récente et mieux typée dans le dossier Timeline |
| `/components/Journey/JourneyCard.tsx` | `/components/Journey/EnhancedJourneyCard.tsx` | EnhancedJourneyCard est plus complet avec plus de fonctionnalités |
| `/components/Journey/ZynoBox.tsx` | `/components/Journey/Zyno/ZynoActions.tsx` | Fonctionnalités similaires, ZynoActions est plus complet |
| `/components/Journey/ZynoTeaser.tsx` | `/components/Journey/Zyno/ZynoSimulator.tsx` | Fonctionnalités similaires, à consolider dans le dossier Zyno |
| `/components/Journey/NFTBadge.tsx` | `/components/Journey/Rewards/RewardBadge.tsx` | Renommé pour plus de clarté et déplacé dans le dossier Rewards |
| `/components/Journey/ProofBadge.tsx` | `/components/Journey/Rewards/RewardBadge.tsx` | Fonctionnalités similaires, à consolider |

## Fichiers à déplacer

| Fichier à déplacer | Nouvelle destination | Justification |
|-------------------|---------------------|---------------|
| `/components/Journey/PhaseNavigator.tsx` | `/components/Journey/Phases/PhaseNavigator.tsx` | Regroupement logique des composants de phases |
| `/components/Journey/PhaseSection.tsx` | `/components/Journey/Phases/PhaseSection.tsx` | Regroupement logique des composants de phases |
| `/components/Journey/JourneyIntro.tsx` | `/components/Journey/Intro/JourneyIntro.tsx` | Organisation par domaine fonctionnel |

## Dossiers à consolider

| Dossier actuel | Action | Justification |
|----------------|--------|---------------|
| `/components/Journey/PhaseSystem/` | Fusionner dans `/components/Journey/Phases/` | Organisation par domaine fonctionnel |
| `/components/Journey/PhaseFeedback/` | Fusionner dans `/components/Journey/Phases/` | Organisation par domaine fonctionnel |
| `/components/Journey/ProofSection/` | Fusionner dans `/components/Journey/Rewards/` | Organisation par domaine fonctionnel |
| `/components/Journey/ZynoActions/` | Fusionner dans `/components/Journey/Zyno/` | Organisation par domaine fonctionnel |

## Remarques importantes

- Avant de supprimer un fichier, assurez-vous qu'il n'est pas référencé ailleurs dans le code
- Mettez à jour les imports dans les fichiers qui utilisent ces composants
- Testez l'application après chaque série de modifications
