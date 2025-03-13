import { pgTable, text, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Note: This code is adapted for a conceptual MongoDB structure.  Actual implementation requires a MongoDB driver.
// The serial primary keys are removed, assuming MongoDB's _id field will be used.


export const users = pgTable("users", {
  // id: serial("id").primaryKey(),  // Removed, using MongoDB's _id
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;


export const banks = pgTable("banks", {
  // id: serial("id").primaryKey(), // Removed, using MongoDB's _id
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  description: text("description"),
  minDeposit: decimal("min_deposit", { precision: 10, scale: 2 }).notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const insertBankSchema = createInsertSchema(banks).pick({
  name: true,
  shortName: true,
  description: true,
  minDeposit: true,
  updatedAt: true,
});

export type InsertBank = z.infer<typeof insertBankSchema>;
export type Bank = typeof banks.$inferSelect;


export const rates = pgTable("rates", {
  // id: serial("id").primaryKey(), // Removed, using MongoDB's _id
  bankId: integer("bank_id").notNull(),
  termMonths: integer("term_months").notNull(),
  interestRate: decimal("interest_rate", { precision: 5, scale: 2 }).notNull(),
  minDeposit: decimal("min_deposit", { precision: 10, scale: 2 }).notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const insertRateSchema = createInsertSchema(rates).pick({
  bankId: true,
  termMonths: true,
  interestRate: true,
  minDeposit: true,
  updatedAt: true,
});

export type InsertRate = z.infer<typeof insertRateSchema>;
export type Rate = typeof rates.$inferSelect;


export const updates = pgTable("updates", {
  // id: serial("id").primaryKey(), // Removed, using MongoDB's _id
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  date: timestamp("date").notNull(),
});

export const insertUpdateSchema = createInsertSchema(updates).pick({
  title: true,
  content: true,
  category: true,
  imageUrl: true,
  date: true,
});

export type InsertUpdate = z.infer<typeof insertUpdateSchema>;
export type Update = typeof updates.$inferSelect;