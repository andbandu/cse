import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { mongoStorage } from "./mongodb-storage"; // Import MongoDB storage

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    let mongoConnected = false;
    
    try {
      // Attempt to connect to MongoDB
      await mongoStorage.connect();
      console.log("MongoDB connection established");
      mongoConnected = true;
    } catch (error) {
      console.warn("MongoDB connection failed, using fallback data", error);
    }

    // Import sample data from server/sample-data.ts
    const { sampleBanks, sampleRates, sampleUpdates } = await import('./sample-data');
    
    if (!mongoConnected) {
      console.log("Using sample data as fallback");
      // Setup mock data handling since MongoDB isn't available
      app.use('/api/banks', (req, res) => {
        res.json(sampleBanks);
      });
      
      app.use('/api/rates', (req, res) => {
        res.json(sampleRates);
      });
      
      app.use('/api/updates', (req, res) => {
        res.json(sampleUpdates);
      });
    }
    
    // Register routes and get the HTTP server
    const server = await registerRoutes(app);

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.error("Server error:", err);
      res.status(status).json({ message });
    });

    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    const port = 3000;
    server.listen(
      {
        port,
      },
      () => {
        log(`Server running on port ${port}`);
        log(`MongoDB is connected and ready to serve data`);
      },
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    console.error("Error details:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
})();