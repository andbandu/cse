import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ticker: text("ticker").notNull().unique(),
  sector: text("sector").notNull(),
  established: numeric("established").notNull(),
  quotedDate: numeric("quoted_date").notNull(),
  fyEnding: text("fy_ending").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow()
});

export const dividends = pgTable("dividends", {
  id: serial("id").primaryKey(),
  companyId: numeric("company_id").notNull(),
  year: numeric("year").notNull(),
  dividend: numeric("dividend").notNull(),
  frequency: text("frequency"),
  status: text("status").default("final")
});

export const insertCompanySchema = createInsertSchema(companies).omit({ 
  id: true,
  lastUpdated: true 
});

export const insertDividendSchema = createInsertSchema(dividends).omit({
  id: true
});

export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Dividend = typeof dividends.$inferSelect;
export type InsertDividend = z.infer<typeof insertDividendSchema>;
