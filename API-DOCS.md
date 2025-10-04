# 📱 API DOKUMENTATION - Mobile Apps (iOS/Android)

## 🔐 BASE URL
```
Production: https://your-domain.vercel.app/api
Development: http://localhost:3000/api
```

## 🔑 AUTHENTIFIZIERUNG

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "password": "securepassword123"
}

Response:
{
  "success": true,
  "message": "Registrierung erfolgreich",
  "user": {
    "id": "user_123",
    "name": "Max Mustermann",
    "email": "max@example.com",
    "plan": "free",
    "role": "user"
  }
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "max@example.com",
  "password": "securepassword123"
}

Response:
{
  "success": true,
  "message": "Login erfolgreich",
  "user": {
    "id": "user_123",
    "name": "Max Mustermann",
    "email": "max@example.com",
    "plan": "free"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 📚 FRAGEN

### Alle Fragen abrufen
```http
GET /api/questions

Response:
{
  "success": true,
  "categories": ["pbefg", "bokraft", "strassenverkehrsrecht", ...],
  "totalQuestions": 255,
  "data": {
    "pbefg": [...],
    "bokraft": [...]
  }
}
```

### Fragen einer Kategorie
```http
GET /api/questions?category=pbefg

Response:
{
  "success": true,
  "category": "pbefg",
  "questions": [
    {
      "id": 1,
      "question": "Was ist PBefG?",
      "answer": "Personenbeförderungsgesetz",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "category": "pbefg",
      "explanation": "..."
    }
  ],
  "count": 70
}
```

### Spezifische Fragen (z.B. für Prüfung)
```http
POST /api/questions
Content-Type: application/json

{
  "categories": ["pbefg", "bokraft"],
  "limit": 20,
  "random": true
}

Response:
{
  "success": true,
  "questions": [...],
  "count": 20
}
```

## 📊 FORTSCHRITT

### Fortschritt abrufen
```http
GET /api/progress
Authorization: Bearer <token>

Response:
{
  "success": true,
  "progress": {
    "userId": "user_123",
    "categories": {
      "pbefg": {
        "completed": [1, 2, 3, 4, 5],
        "correct": 4,
        "wrong": 1,
        "totalTime": 300000
      }
    },
    "totalQuestions": 5,
    "correctAnswers": 4,
    "lastUpdated": "2025-10-02T10:30:00.000Z"
  }
}
```

### Fortschritt speichern
```http
POST /api/progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "category": "pbefg",
  "questionId": 1,
  "isCorrect": true,
  "timeSpent": 30000
}

Response:
{
  "success": true,
  "message": "Fortschritt gespeichert",
  "progress": {...}
}
```

### Kompletten Fortschritt aktualisieren
```http
PUT /api/progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "progress": {
    "categories": {...},
    "totalQuestions": 10,
    "correctAnswers": 8
  }
}

Response:
{
  "success": true,
  "message": "Fortschritt aktualisiert"
}
```

## 🏆 ACHIEVEMENTS

### Achievements abrufen
```http
GET /api/achievements
Authorization: Bearer <token>

Response:
{
  "success": true,
  "achievements": {
    "userId": "user_123",
    "unlocked": ["first_question", "ten_questions"],
    "progress": {
      "pbefg_complete": 45,
      "fifty_questions": 32
    },
    "totalScore": 20,
    "lastUpdated": "2025-10-02T10:30:00.000Z"
  }
}
```

### Achievement Progress updaten
```http
POST /api/achievements
Authorization: Bearer <token>
Content-Type: application/json

{
  "achievementId": "pbefg_complete",
  "progress": 70
}

Response:
{
  "success": true,
  "message": "Achievement freigeschaltet!",
  "achievements": {...}
}
```

## 📝 PRÜFUNGEN

### Prüfungen abrufen
```http
GET /api/exams
Authorization: Bearer <token>

Response:
{
  "success": true,
  "exams": {
    "userId": "user_123",
    "exams": [
      {
        "id": "exam_123",
        "type": "full",
        "questions": 60,
        "correctAnswers": 45,
        "score": 75,
        "passed": true,
        "timeSpent": 5400000,
        "date": "2025-10-02T10:30:00.000Z"
      }
    ],
    "stats": {
      "totalExams": 1,
      "averageScore": 75,
      "bestScore": 75,
      "passRate": 100
    }
  }
}
```

### Prüfung absenden
```http
POST /api/exams
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "full",
  "questions": [
    {
      "id": 1,
      "question": "...",
      "correctAnswer": 0
    }
  ],
  "answers": [0, 2, 1, 0, 3, ...],
  "timeSpent": 5400000
}

Response:
{
  "success": true,
  "message": "Prüfung bestanden!",
  "result": {
    "id": "exam_123",
    "score": 75,
    "passed": true,
    "correctAnswers": 45
  },
  "stats": {...}
}
```

## ⚠️ ERROR RESPONSES

```json
{
  "error": "Fehlermeldung",
  "status": 400/401/403/404/500
}
```

## 🔒 AUTHORIZATION

Für geschützte Endpoints (mit Authorization):
```
Headers:
Authorization: Bearer <jwt_token>
```

## 📱 REACT NATIVE EXAMPLE

```javascript
// API Service
const API_URL = 'https://your-domain.vercel.app/api'

class ApiService {
  constructor() {
    this.token = null
  }

  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    if (data.success) {
      this.token = data.token
      await AsyncStorage.setItem('auth_token', data.token)
    }
    return data
  }

  async getQuestions(category) {
    const response = await fetch(`${API_URL}/questions?category=${category}`)
    return response.json()
  }

  async saveProgress(category, questionId, isCorrect, timeSpent) {
    const response = await fetch(`${API_URL}/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify({ category, questionId, isCorrect, timeSpent })
    })
    return response.json()
  }

  async getAchievements() {
    const response = await fetch(`${API_URL}/achievements`, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    })
    return response.json()
  }

  async submitExam(type, questions, answers, timeSpent) {
    const response = await fetch(`${API_URL}/exams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify({ type, questions, answers, timeSpent })
    })
    return response.json()
  }
}

export default new ApiService()
```

## 🚀 DEPLOYMENT

### Vercel Deployment:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables:
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.vercel.app
```

## 📞 SUPPORT

Bei Fragen oder Problemen:
- Email: support@FahrGewerbe.de
- Docs: https://your-domain.vercel.app/docs
