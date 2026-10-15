import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import routes from "./routes";
import { errorHandler } from "./middleware/error";

const app: Application = express();

// Trust reverse proxy (Render, Netlify, Cloudflare load balancers)
app.set("trust proxy", 1);

// CORS configuration - MUST be mounted before helmet & other handlers
const envOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((url) => url.trim().replace(/\/+$/, ""))
  .filter(Boolean);

const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
];

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile apps, curl, Postman, server-to-server)
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/+$/, "");

    // 1. Explicit matches or universal wildcard
    if (
      allowedOrigins.includes("*") ||
      allowedOrigins.includes(normalizedOrigin) ||
      process.env.NODE_ENV !== "production"
    ) {
      return callback(null, true);
    }

    // 2. Automatically permit any onrender.com and netlify.app preview/production domains
    try {
      const hostname = new URL(normalizedOrigin).hostname;
      if (
        hostname.endsWith(".onrender.com") ||
        hostname.endsWith(".netlify.app") ||
        hostname === "localhost" ||
        hostname === "127.0.0.1"
      ) {
        return callback(null, true);
      }
    } catch {
      // ignore URL parsing issues
    }

    // 3. Custom wildcard match (e.g. *.addinu-yusr.org)
    const isSubdomainMatch = allowedOrigins.some((allowed) => {
      if (allowed.startsWith("*.")) {
        const domainSuffix = allowed.slice(1); // e.g. .addinu-yusr.org
        try {
          return new URL(normalizedOrigin).hostname.endsWith(domainSuffix);
        } catch {
          return false;
        }
      }
      return false;
    });

    if (isSubdomainMatch) {
      return callback(null, true);
    }

    // Fallback: reflect origin so legitimate users are never blocked by CORS
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Security headers with permissive cross-origin resource policy
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts, please try again after 15 minutes.",
  },
});

app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api", routes);

// Centralized error handler
app.use(errorHandler);

export default app;
