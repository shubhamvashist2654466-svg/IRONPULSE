# ⚡ IRONPULSE BACKEND API

> **STRENGTH MEETS SCIENCE.**  
> Complete RESTful API backend for the IRONPULSE fitness and wellness platform.

---

## 🏗️ Architecture & Technology Stack

- **Runtime:** Node.js (ES Modules `"type": "module"`)
- **Web Framework:** Express.js 4
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) + bcryptjs password hashing
- **Security:** Helmet HTTP headers, Express Rate Limiter, CORS protection
- **Validation:** Express Validator with centralized error formatting
- **File Uploads:** Multer with mime-type checking + optional Cloudinary CDN integration
- **Architecture Pattern:** Clean Model-View-Controller (MVC)

---

## 📁 Backend Directory Structure

```text
backend/
├── config/
│   ├── db.js             # Mongoose connection & reconnect event listeners
│   └── cloudinary.js     # Cloudinary CDN initialization & upload stream
├── controllers/
│   ├── authController.js       # Register, login, logout, me, forgot/reset password
│   ├── userController.js       # Profile get/update, change password, favorites
│   ├── workoutController.js    # CRUD workouts, splits, exercise completion
│   ├── exerciseController.js   # Library search, muscle/difficulty filters, CRUD
│   ├── nutritionController.js  # Meal logging, daily/weekly macro calculations, food DB
│   ├── dietController.js       # Diet plan generation & management
│   ├── progressController.js   # Weight logs, body measurements, summary telemetry
│   ├── activityController.js   # Daily steps, active burn, sleep architecture
│   ├── blogController.js       # Evidence-based blog articles & category filter
│   ├── communityController.js  # Social feed, like/unlike, comments, PR shares
│   ├── uploadController.js     # Multipart file upload handler (local + Cloudinary)
│   ├── calculatorController.js # 8 scientific fitness calculation endpoints
│   └── notificationController.js # Alerts, reminders & read toggles
├── middleware/
│   ├── authMiddleware.js       # JWT extraction & role authorization
│   ├── errorMiddleware.js      # Central error handler & 404 handler
│   ├── uploadMiddleware.js     # Multer 5MB image filter & storage
│   └── validationMiddleware.js # Express-validator result interceptor
├── models/
│   ├── User.js           # Athlete accounts, goals, metrics, roles
│   ├── Exercise.js       # Exercise catalog with instructions & cues
│   ├── Workout.js        # Scheduled weekly workouts with set/rep data
│   ├── Nutrition.js      # Daily meal logs with automatic macro sum
│   ├── DietPlan.js       # Caloric blueprints with scheduled meals
│   ├── Progress.js       # Weight and body circumference telemetry
│   ├── Activity.js       # Steps, active calories, sleep stages
│   ├── Blog.js           # Research publications with key takeaways
│   ├── CommunityPost.js  # Social posts, likes, comment threads
│   └── Notification.js   # User alerts and milestone triggers
├── routes/
│   ├── authRoutes.js           # /api/v1/auth
│   ├── userRoutes.js           # /api/v1/users
│   ├── workoutRoutes.js        # /api/v1/workouts
│   ├── exerciseRoutes.js       # /api/v1/exercises
│   ├── nutritionRoutes.js      # /api/v1/nutrition
│   ├── dietRoutes.js           # /api/v1/diet-plans
│   ├── progressRoutes.js       # /api/v1/progress
│   ├── activityRoutes.js       # /api/v1/activity
│   ├── blogRoutes.js           # /api/v1/blogs
│   ├── communityRoutes.js      # /api/v1/community
│   ├── uploadRoutes.js         # /api/v1/upload
│   ├── calculatorRoutes.js     # /api/v1/calculators
│   └── notificationRoutes.js   # /api/v1/notifications
├── scripts/
│   └── seed.js           # Database seeder (Demo users, 20+ exercises, diets, blogs)
├── utils/
│   ├── apiResponse.js    # Standardized success/error/paginated JSON responses
│   ├── calculations.js   # Verified sports science formula implementations
│   └── generateToken.js  # JWT token generator
├── validators/
│   ├── authValidator.js        # Input validation for authentication & profiles
│   └── fitnessValidator.js     # Input validation for fitness & nutrition entities
├── .env                  # Local environment configuration (PORT, JWT, MongoDB URI)
├── .env.example          # Environment template with dummy placeholders
├── .gitignore            # Excludes node_modules, .env, uploads/
├── package.json          # Node dependencies and scripts
└── server.js             # Express application entrypoint
```

---

## ⚙️ Environment Configuration

Create or modify `backend/.env` with your desired configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/ironpulse
JWT_SECRET=ironpulse_ultra_secure_jwt_secret_key_2026_strength_meets_science_998877
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

# Optional: Cloudinary CDN credentials for remote image hosting
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. (Optional) Seed Sample Database Data
Populates the database with default demo accounts, 20+ compound/isolation exercises, sample diet blueprints, and blogs:
```bash
npm run seed
```

> **Default Seed Accounts:**
> - **Demo Athlete:** `alex.mercer@ironpulse.io` / `IronPulse#2026`
> - **Admin Coach:** `admin@ironpulse.io` / `AdminPulse#2026`

### 3. Start the Server
- **Production Mode:**
  ```bash
  npm start
  ```
- **Development Mode (with auto-reload):**
  ```bash
  npm run dev
  ```

Server will run at: **`http://localhost:5000`**  
Health Check: **`http://localhost:5000/api/health`**

---

## 📡 Complete REST API Endpoints Specification

API Base Path: **`/api/v1`**

### 🔐 Authentication (`/api/v1/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/register` | Public | Register a new athlete account |
| `POST` | `/login` | Public | Authenticate user and receive JWT token |
| `POST` | `/logout` | Public | Clear authentication session |
| `GET` | `/me` | Private | Retrieve currently authenticated user |
| `POST` | `/forgot-password` | Public | Request simulated password reset token |
| `POST` | `/reset-password` | Public | Reset password using valid reset token |

### 👤 User Profile (`/api/v1/users`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/profile` | Private | Get full personal metrics & favorites |
| `PUT` | `/profile` | Private | Update name, age, height, weight, goal, avatar |
| `PUT` | `/change-password` | Private | Change password verifying current password |
| `GET` | `/favorites` | Private | Get all bookmarked exercises |
| `POST` | `/favorites/:exerciseId` | Private | Toggle exercise favorite status |

### 🏋️ Workouts (`/api/v1/workouts`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Private | Get user's weekly workout schedule & completion stats |
| `POST` | `/` | Private | Create a new scheduled workout routine |
| `GET` | `/:id` | Private | Get single workout details |
| `PUT` | `/:id` | Private | Update workout name, exercises, sets, reps, weight |
| `DELETE` | `/:id` | Private | Delete workout routine |
| `PATCH` | `/:id/complete` | Private | Toggle workout completion & update streak |

### 🤸 Exercise Library (`/api/v1/exercises`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Search exercises with category, difficulty, equipment filters & pagination |
| `GET` | `/:id` | Public | Get exercise by MongoDB ID or slug |
| `POST` | `/` | Private | Add custom exercise movement |
| `PUT` | `/:id` | Private | Update exercise details |
| `DELETE` | `/:id` | Private | Remove custom exercise |

### 🥗 Nutrition & Foods (`/api/v1/nutrition`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/foods` | Public | Search verified food database (Paneer, Soya, Chicken, Oats, etc.) |
| `GET` | `/daily` | Private | Get daily logged meals & macro totals (Protein, Carbs, Fats) |
| `GET` | `/weekly` | Private | Get weekly aggregated nutrition history |
| `POST` | `/` | Private | Log foods into meal categories (Breakfast, Lunch, Dinner, etc.) |
| `DELETE` | `/:id` | Private | Remove a meal log entry |

### 📋 Diet Plans (`/api/v1/diet-plans`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Private | Get curated blueprints & personalized diet plans |
| `GET` | `/:id` | Private | Get diet plan by ID |
| `POST` | `/` | Private | Save personalized diet plan with meal timings |
| `PUT` | `/:id` | Private | Update personalized diet plan |
| `DELETE` | `/:id` | Private | Delete personalized diet plan |

### 📈 Progress Tracking (`/api/v1/progress`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Private | Retrieve weight and body measurement check-in logs |
| `POST` | `/` | Private | Record new check-in (Weight, body fat %, measurements) |
| `GET` | `/summary` | Private | Calculate net weight change & chart-ready time series |
| `DELETE` | `/:id` | Private | Remove progress record |

### ⌚ Daily Activity Telemetry (`/api/v1/activity`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/daily` | Private | Get steps, calories burned, distance, sleep stages |
| `POST` | `/` | Private | Log or upsert daily activity telemetry |
| `GET` | `/weekly` | Private | Get weekly activity cadence history |

### 📖 Evidence-Based Blog (`/api/v1/blogs`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Fetch published articles with search and category filter |
| `GET` | `/:id` | Public | Fetch full article by ID or slug and increment view count |
| `POST` | `/` | Admin | Publish new scientific article |
| `PUT` | `/:id` | Admin | Edit published article |
| `DELETE` | `/:id` | Admin | Delete article |

### 💬 Community Feed (`/api/v1/community`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Retrieve community post feed with pagination |
| `POST` | `/` | Private | Create milestone, transformation or PR post |
| `PUT` | `/:id` | Private | Update own post |
| `DELETE` | `/:id` | Private | Delete own post |
| `POST` | `/:id/like` | Private | Like / unlike community post |
| `POST` | `/:id/comments` | Private | Add comment to post |
| `DELETE` | `/:id/comments/:commentId` | Private | Remove comment |

### 🧮 Fitness Calculators (`/api/v1/calculators`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/bmi` | Public | Body Mass Index calculation & WHO healthy range |
| `POST` | `/bmr` | Public | Basal Metabolic Rate using Mifflin-St Jeor formula |
| `POST` | `/tdee` | Public | Total Daily Energy Expenditure with cutting/bulking targets |
| `POST` | `/protein` | Public | Daily protein target based on goal and weight |
| `POST` | `/daily-calories`| Public | Caloric target & 4-4-9 macro distribution (P, C, F) |
| `POST` | `/body-fat` | Public | U.S. Navy circumference body fat percentage |
| `POST` | `/ideal-weight` | Public | Multi-formula consensus (Devine, Robinson, Miller) |
| `POST` | `/water-intake` | Public | Fluid estimation based on mass, climate, workouts |

### 🖼️ Image Uploads (`/api/v1/upload`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/image` | Private | Upload image file (multipart/form-data field `image`) |

### 🔔 Notifications (`/api/v1/notifications`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Private | Fetch notifications list & unread count |
| `PATCH`| `/read-all` | Private | Mark all notifications as read |
| `PATCH`| `/:id/read` | Private | Mark single notification as read |
| `DELETE`| `/:id` | Private | Delete notification |

---

## 🔗 Frontend Integration Guide

To connect your existing React frontend to this backend in the future:

1. In the React project, create an `api.js` or `axios.js` client pointing to:
   ```javascript
   const API_BASE = 'http://localhost:5000/api/v1';
   ```
2. Attach the JWT token stored in `localStorage` to all authenticated requests:
   ```javascript
   const token = localStorage.getItem('ironpulse_auth_token');
   const headers = token ? { Authorization: `Bearer ${token}` } : {};
   ```
3. The response structure is standardized across all endpoints:
   ```json
   {
     "success": true,
     "statusCode": 200,
     "message": "Success message",
     "data": { ... }
   }
   ```
