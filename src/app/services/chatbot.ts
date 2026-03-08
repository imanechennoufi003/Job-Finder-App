import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private conversationHistory: string[] = [];

  constructor() {
    this.initializeChat();
  }

  private initializeChat() {
    const greeting = this.createBotMessage(
      "Salut! 👋 Je suis ton assistant Job Finder AI. Je peux t'aider avec tes questions sur les emplois, tes compétences, les conseils de carrière, ou n'importe quoi d'autre. Que veux-tu savoir?"
    );
    this.messagesSubject.next([greeting]);
  }

  sendMessage(text: string): void {
    // Add user message
    const userMessage = this.createUserMessage(text);
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, userMessage]);

    // Add to conversation history
    this.conversationHistory.push(`Utilisateur: ${text}`);

    // Generate bot response (fast reply)
    setTimeout(() => {
      const botResponse = this.generateAIResponse(text);
      const botMessage = this.createBotMessage(botResponse);
      this.messagesSubject.next([...this.messagesSubject.value, botMessage]);
      this.conversationHistory.push(`Assistant: ${botResponse}`);
    }, 250);
  }

  private generateAIResponse(userInput: string): string {
    const input = userInput.toLowerCase().trim();

    // Job Search Related
    if (this.contains(input, ['comment', 'chercher', 'emploi', 'job', 'offre', 'poste'])) {
      return this.getRandomResponse([
        "Pour chercher un emploi efficacement, je te recommande de:\n1. Mets à jour ton profil sur notre plateforme\n2. Définis tes critères de recherche (région, secteur, salaire)\n3. Configure des alertes pour les nouvelles offres\n4. Étudie bien les descriptions des postes\n5. Personalise ta lettre de motivation pour chaque candidature\n\nVeux-tu que je t'aide à peaufiner ton profil?",
        "Chercher un emploi est un processus! Voici mes conseils:\n• Sois actif et régulier dans tes recherches\n• Peaufine ton CV et ta lettre de motivation\n• Utilise les réseaux professionnels\n• Demande des recommandations\n• Prépare-toi bien avant les entretiens\n\nQu'est-ce qui te bloque actuellement?"
      ]);
    }

    // Skills & Development
    if (this.contains(input, ['compétence', 'skills', 'apprendre', 'formation', 'développement', 'formation', 'cours'])) {
      return this.getRandomResponse([
        "C'est super d'investir en toi! Pour développer tes compétences:\n• Identifie les skills demandées dans ton domaine\n• Prends des cours en ligne (Udemy, Coursera, etc.)\n• Pratique régulièrement sur des projets réels\n• Suis les tendances de ton industrie\n• Apprends de tes pairs et mentors\n\nQuelles compétences veux-tu développer?",
        "Développer ses compétences est clé pour progresser! Je peux t'aider à:\n• Identifier les gaps dans tes compétences\n• Trouver les ressources pour apprendre\n• Créer un plan de développement\n• Mettre en valeur tes nouvelles skills\n\nDans quel domaine veux-tu progresser?"
      ]);
    }

    // Salary & Negotiation
    if (this.contains(input, ['salaire', 'salary', 'rémunération', 'négocier', 'paie', 'rémunérer'])) {
      return this.getRandomResponse([
        "La négociation salariale est importante! Voici mes conseils:\n• Recherche les salaires moyens de ton secteur\n• Mets en avant tes réalisations et expérience\n• Sois réaliste mais confiant dans ta demande\n• Négocie d'autres avantages (télétravail, formation, congés)\n• Prépare-toi avec des arguments solides\n\nVeux-tu des infos sur les salaires de ton secteur?",
        "Le salaire est souvent un sujet délicat. Conseils:\n• Connais ta valeur sur le marché\n• Prépare des chiffres et des faits\n• Écoute ce qu'on te propose\n• Négocie intelligemment et respectueusement\n• Documente tout par écrit\n\nY a-t-il une offre spécifique que tu negocies?"
      ]);
    }

    // Interview Preparation
    if (this.contains(input, ['entretien', 'interview', 'préparation', 'préparer', 'interview'])) {
      return this.getRandomResponse([
        "Bien te préparer à un entretien c'est clé! Points importants:\n1. Recherche l'entreprise et le poste en détail\n2. Prépare des exemples de tes réalisations\n3. Entraîne-toi à parler de tes points forts\n4. Prépare des questions pertinentes\n5. Teste la connexion vidéo (si entretien en ligne)\n6. Arrive 10 min en avance\n\nTu as bientôt un entretien?",
        "Les entretiens peuvent stresser, mais avec de la préparation tu seras confiant! À faire:\n• Connais ton CV par cœur\n• Évite les clichés, sois authentique\n• Pose des questions sur la culture de l'entreprise\n• Sois positif et énergique\n• Appelle/envoie un message de remerciement après\n\nQuel type de poste visas-tu?"
      ]);
    }

    // Motivation & Career Advice
    if (this.contains(input, ['motivation', 'découragé', 'stressé', 'carrière', 'conseil', 'aide'])) {
      return this.getRandomResponse([
        "Je comprends que chercher un emploi peut être frustrant. Voici comment rester motivé:\n• Fixe-toi des objectifs réalistes et mesurables\n• Célèbre chaque petite victoire\n• Reste en contact avec d'autres chercheurs\n• Prends soin de toi (sport, sommeil, amis)\n• Varie tes activités (ne te concentre pas uniquement sur la recherche)\n• Crois en toi!\n\nQu'est-ce qui te décourage le plus?",
        "C'est normal de se sentir stressé. Quelques conseils:\n• Ne laisse pas une rejection te définir\n• Apprends de chaque entretien\n• Prends du repos quand tu en as besoin\n• Parle à quelqu'un de tes sentiments\n• Chaque 'non' te rapproche du 'oui'\n\nVeux-tu en parler?"
      ]);
    }

    // Recruitment/Employer Questions
    if (this.contains(input, ['recruter', 'recrut', 'candidat', 'embauche', 'hiring', 'team'])) {
      return this.getRandomResponse([
        "Recruter les bons talents c'est crucial! Mes recommandations:\n1. Écris une description de poste claire et complète\n2. Cherche sur plusieurs canaux (notre plateforme, réseaux, etc.)\n3. Sois réactif avec les candidats\n4. Cherche l'adéquation culturelle aussi\n5. Offre une bonne expérience candidat\n\nVeux-tu publier une offre?",
        "Trouver les bons candidats prend du temps. Stratégie:\n• Sois précis sur les requirements\n• Vends ta culture d'entreprise\n• Sois transparent sur le processus\n• Donne du feedback aux candidats\n• Agis vite pour les bons profils\n\nQuel type de candidat cherches-tu?"
      ]);
    }

    // Thanking/Greetings
    if (this.contains(input, ['merci', 'thanks', 'thank', 'merci beaucoup', 'merci de', 'au revoir', 'bye', 'à bientôt'])) {
      return this.getRandomResponse([
        "De rien! 😊 N'hésite pas à revenir si tu as d'autres questions. Bonne chance dans ta recherche d'emploi!",
        "Avec plaisir! Je suis toujours là pour t'aider. À bientôt! 👋"
      ]);
    }

    // Default helpful response
    return this.getRandomResponse([
      "C'est une bonne question! 🤔\n\nJe peux t'aider avec:\n• Chercher un emploi\n• Préparer des entretiens\n• Développer tes compétences\n• Conseils de carrière\n• Questions sur les salaires\n• Conseils de recrutement\n\nQu'est-ce qui t'intéresse le plus?",
      "Intéressant! Peux-tu me donner plus de détails pour que je te donne une meilleure réponse? 🎯",
      "C'est un sujet important. En savoir plus:\n• Des exemples concrets?\n• Un secteur spécifique?\n• Une situation particulière?\n\nAide-moi à comprendre mieux! 👂"
    ]);
  }

  private contains(input: string, keywords: string[]): boolean {
    return keywords.some(keyword => input.includes(keyword));
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private createUserMessage(text: string): ChatMessage {
    return {
      id: this.generateId(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
  }

  private createBotMessage(text: string): ChatMessage {
    return {
      id: this.generateId(),
      text,
      sender: 'bot',
      timestamp: new Date()
    };
  }

  private generateId(): string {
    return `msg_${Date.now()}_${Math.random()}`;
  }

  resetChat(): void {
    this.conversationHistory = [];
    this.messagesSubject.next([]);
    this.initializeChat();
  }

  getConversationHistory(): string[] {
    return this.conversationHistory;
  }
}
