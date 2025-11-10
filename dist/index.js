var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var SUBJECTS = [
  "\u0625\u0633\u0644\u0627\u0645\u064A\u0629",
  "\u0639\u0631\u0628\u064A",
  "\u0625\u0646\u062C\u0644\u064A\u0632\u064A",
  "\u0631\u064A\u0627\u0636\u064A\u0627\u062A",
  "\u0643\u064A\u0645\u064A\u0627\u0621",
  "\u0641\u064A\u0632\u064A\u0627\u0621",
  "\u0623\u062D\u064A\u0627\u0621",
  "\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0627\u062A",
  "\u062D\u0627\u0633\u0648\u0628",
  "\u0628\u062F\u0646\u064A\u0629",
  "\u0641\u0646\u064A\u0629"
];
var DEFAULT_TEACHERS = [
  { name: "\u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0639\u0644\u064A \u0639\u0628\u062F \u0627\u0644\u0639\u0632\u064A\u0632", subject: "\u0625\u0633\u0644\u0627\u0645\u064A\u0629" },
  { name: "\u0645\u062D\u0645\u062F \u0639\u0644\u064A \u0639\u0644\u064A \u0627\u0644\u0634\u0631\u0642\u0627\u0648\u064A", subject: "\u0625\u0633\u0644\u0627\u0645\u064A\u0629" },
  { name: "\u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u062C\u0627\u0628\u0631 \u064A\u0648\u0646\u0633 \u063A\u0627\u0646\u0645", subject: "\u0625\u0633\u0644\u0627\u0645\u064A\u0629" },
  { name: "\u0627\u0644\u0633\u0639\u064A\u062F \u0645\u062D\u0645\u0648\u062F \u0639\u0628\u062F \u0627\u0644\u0633\u0644\u0627\u0645", subject: "\u0625\u0633\u0644\u0627\u0645\u064A\u0629" },
  { name: "\u0645\u0635\u0637\u0641\u0649 \u0639\u0628\u062F \u0627\u0644\u0639\u0632\u064A\u0632", subject: "\u0625\u0633\u0644\u0627\u0645\u064A\u0629" },
  { name: "\u0631\u0645\u0636\u0627\u0646 \u0631\u0645\u0636\u0627\u0646 \u0625\u0628\u0631\u0627\u0647\u064A\u0645", subject: "\u0639\u0631\u0628\u064A" },
  { name: "\u0639\u0646\u062A\u0631 \u0639\u0628\u062F\u0647 \u0639\u0628\u062F\u0647 \u0627\u0644\u0645\u062C\u062F\u064A", subject: "\u0639\u0631\u0628\u064A" },
  { name: "\u0645\u062D\u0645\u062F \u062A\u062D\u0641\u0629", subject: "\u0639\u0631\u0628\u064A" },
  { name: "\u0641\u062A\u062D\u064A \u0643\u0645\u0627\u0644", subject: "\u0639\u0631\u0628\u064A" },
  { name: "\u062E\u0627\u0644\u062F \u0631\u064A\u062D\u0627\u0646 \u0639\u0637\u0627\u0627\u0644\u0644\u0647", subject: "\u0639\u0631\u0628\u064A" },
  { name: "\u0645\u062D\u0645\u062F \u0639\u0644\u064A \u0636\u0627\u062D\u064A", subject: "\u0639\u0631\u0628\u064A" },
  { name: "\u0627\u0633\u0644\u0627\u0645 \u0639\u0627\u062F\u0644", subject: "\u0639\u0631\u0628\u064A" },
  { name: "\u0647\u0627\u0646\u064A \u062C\u0627\u062F \u0633\u0627\u0644\u0645", subject: "\u0639\u0631\u0628\u064A" },
  { name: "\u0625\u0634\u0631\u0627\u0641 \u0645\u0635\u0637\u0641\u0649 \u0639\u0628\u062F \u0627\u0644\u0633\u0644\u0627\u0645", subject: "\u0625\u0646\u062C\u0644\u064A\u0632\u064A" },
  { name: "\u0625\u064A\u0647\u0627\u0628 \u0637\u0644\u0639\u062A \u0645\u062D\u0645\u0648\u062F", subject: "\u0625\u0646\u062C\u0644\u064A\u0632\u064A" },
  { name: "\u0635\u064A\u0627\u0645 \u0645\u0635\u0637\u0641\u0649 \u0623\u062D\u0645\u062F", subject: "\u0625\u0646\u062C\u0644\u064A\u0632\u064A" },
  { name: "\u0631\u0645\u0636\u0627\u0646 \u0633\u064A\u0641 \u062D\u0627\u0641\u0638", subject: "\u0625\u0646\u062C\u0644\u064A\u0632\u064A" },
  { name: "\u0639\u0635\u0627\u0645 \u0645\u062D\u0645\u062F \u0631\u062C\u0628", subject: "\u0625\u0646\u062C\u0644\u064A\u0632\u064A" },
  { name: "\u062C\u0645\u0627\u0644 \u0639\u064A\u0633\u0649", subject: "\u0625\u0646\u062C\u0644\u064A\u0632\u064A" },
  { name: "\u0628\u0633\u064A\u0648\u0646\u064A \u0639\u0644\u064A", subject: "\u0625\u0646\u062C\u0644\u064A\u0632\u064A" },
  { name: "\u0639\u0628\u062F \u0627\u0644\u0633\u0645\u064A\u0639 \u0645\u062D\u0645\u062F \u0635\u0627\u0644\u062D", subject: "\u0631\u064A\u0627\u0636\u064A\u0627\u062A" },
  { name: "\u0639\u0628\u062F \u0627\u0644\u0645\u0646\u0639\u0645 \u0641\u0631\u062C \u0625\u0628\u0631\u0627\u0647\u064A\u0645", subject: "\u0631\u064A\u0627\u0636\u064A\u0627\u062A" },
  { name: "\u0645\u062D\u0645\u062F \u0639\u0628\u062F \u0627\u0644\u0644\u0647 \u0639\u0644\u064A \u0625\u0628\u0631\u0627\u0647\u064A\u0645", subject: "\u0631\u064A\u0627\u0636\u064A\u0627\u062A" },
  { name: "\u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0645\u062D\u0645\u062F \u0627\u0644\u062E\u0636\u0631\u062C\u064A", subject: "\u0631\u064A\u0627\u0636\u064A\u0627\u062A" },
  { name: "\u0645\u062D\u0645\u0648\u062F \u062D\u0633\u0627\u0646\u064A\u0646 \u0625\u0633\u0645\u0627\u0639\u064A\u0644", subject: "\u0631\u064A\u0627\u0636\u064A\u0627\u062A" },
  { name: "\u0623\u064A\u0645\u0646 \u0648\u062D\u064A\u062F", subject: "\u0631\u064A\u0627\u0636\u064A\u0627\u062A" },
  { name: "\u0634\u0631\u064A\u0641 \u0644\u0637\u0641\u064A", subject: "\u0631\u064A\u0627\u0636\u064A\u0627\u062A" },
  { name: "\u0623\u062D\u0645\u062F \u0645\u0631\u064A\u0633\u064A", subject: "\u0631\u064A\u0627\u0636\u064A\u0627\u062A" },
  { name: "\u062E\u0644\u064A\u0644 \u062D\u0633\u0646 \u0639\u062B\u0645\u0627\u0646 \u062E\u0644\u064A\u0644", subject: "\u0643\u064A\u0645\u064A\u0627\u0621" },
  { name: "\u0627\u062D\u0645\u062F \u0639\u0628\u062F \u0627\u0644\u0639\u0632\u064A\u0632 \u0633\u0644\u064A\u0645 \u062E\u0627\u0637\u0631", subject: "\u0643\u064A\u0645\u064A\u0627\u0621" },
  { name: "\u0627\u0644\u062D\u0633\u064A\u0646 \u0645\u062D\u0645\u062F \u0634\u0627\u0643\u0631", subject: "\u0643\u064A\u0645\u064A\u0627\u0621" },
  { name: "\u0639\u0627\u0637\u0641 \u0645\u062D\u0645\u062F \u0639\u0628\u062F \u0627\u0644\u0631\u062D\u064A\u0645", subject: "\u0643\u064A\u0645\u064A\u0627\u0621" },
  { name: "\u0645\u062D\u0645\u0648\u062F \u0642\u0637\u0628", subject: "\u0643\u064A\u0645\u064A\u0627\u0621" },
  { name: "\u0645\u062D\u0645\u062F \u062D\u062C\u0627\u0628", subject: "\u0641\u064A\u0632\u064A\u0627\u0621" },
  { name: "\u0639\u0627\u0645\u0631 \u0645\u062D\u0645\u062F \u0627\u0644\u0639\u0644\u0648\u0629", subject: "\u0641\u064A\u0632\u064A\u0627\u0621" },
  { name: "\u0639\u0628\u062F\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0637\u064A\u0629", subject: "\u0641\u064A\u0632\u064A\u0627\u0621" },
  { name: "\u062D\u0633\u0646\u064A \u0645\u062D\u0645\u062F \u062C\u0627\u062F \u0627\u0644\u0643\u0631\u064A\u0645", subject: "\u0641\u064A\u0632\u064A\u0627\u0621" },
  { name: "\u0645\u062D\u0645\u062F \u062D\u0633\u0646", subject: "\u0623\u062D\u064A\u0627\u0621" },
  { name: "\u0645\u0647\u0646\u062F \u0639\u0627\u0631\u0636\u0629", subject: "\u0623\u062D\u064A\u0627\u0621" },
  { name: "\u0639\u0628\u062F \u0627\u0644\u062D\u0643\u064A\u0645 \u0639\u0644\u064A \u0625\u0633\u0645\u0627\u0639\u064A\u0644", subject: "\u0623\u062D\u064A\u0627\u0621" },
  { name: "\u0627\u062D\u0645\u062F \u0639\u0637\u064A\u0629 \u0627\u0644\u0636\u0648\u064A", subject: "\u0623\u062D\u064A\u0627\u0621" },
  { name: "\u0637\u0627\u0631\u0642 \u0639\u0628\u062F \u0627\u0644\u0641\u062A\u0627\u062D \u0633\u0639\u064A\u062F", subject: "\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0627\u062A" },
  { name: "\u0632\u0643\u064A \u0647\u0627\u0646\u064A", subject: "\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0627\u062A" },
  { name: "\u0637\u0647 \u062D\u0645\u0632\u0629 \u062C\u0644\u0627\u0644", subject: "\u062D\u0627\u0633\u0648\u0628" },
  { name: "\u0623\u0633\u0627\u0645\u0629 \u0623\u0628\u0648 \u0627\u0644\u0641\u062A\u0648\u062D", subject: "\u062D\u0627\u0633\u0648\u0628" },
  { name: "\u062A\u0627\u0645\u0631 \u0627\u0644\u0623\u0634\u0648\u062D", subject: "\u0628\u062F\u0646\u064A\u0629" },
  { name: "\u0625\u064A\u0647\u0627\u0628 \u0645\u0631\u0632\u0648\u0642", subject: "\u0628\u062F\u0646\u064A\u0629" },
  { name: "\u062D\u0645\u0627\u062F\u0629 \u0628\u0633\u0637\u0627\u0648\u064A", subject: "\u0628\u062F\u0646\u064A\u0629" },
  { name: "\u062E\u0627\u0644\u062F \u0639\u0631\u0641\u0627\u0646", subject: "\u0628\u062F\u0646\u064A\u0629" },
  { name: "\u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u0625\u0628\u0631\u0627\u0647\u064A\u0645 \u062D\u0627\u0641\u0638 \u0639\u0628\u062F \u0627\u0644\u0646\u0628\u064A", subject: "\u0641\u0646\u064A\u0629" }
];
var DAYS = ["\u0627\u0644\u0623\u062D\u062F", "\u0627\u0644\u0627\u062B\u0646\u064A\u0646", "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621", "\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621", "\u0627\u0644\u062E\u0645\u064A\u0633"];
var PERIODS = [1, 2, 3, 4, 5, 6, 7];
var teachers = pgTable("teachers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  subject: text("subject").notNull().$type()
});
var scheduleSlots = pgTable("schedule_slots", {
  id: text("id").primaryKey(),
  teacherId: text("teacher_id").notNull().references(() => teachers.id, { onDelete: "cascade" }),
  day: text("day").notNull().$type(),
  period: integer("period").notNull().$type(),
  grade: integer("grade").notNull().$type(),
  section: integer("section").notNull().$type()
});
var gradeSections = pgTable("grade_sections", {
  id: text("id").primaryKey(),
  grade: integer("grade").notNull().$type(),
  sections: text("sections").notNull()
});
var insertTeacherSchema = createInsertSchema(teachers).omit({ id: true }).extend({
  subject: z.enum(SUBJECTS)
});
var insertScheduleSlotSchema = createInsertSchema(scheduleSlots).omit({ id: true }).extend({
  day: z.enum(DAYS),
  period: z.number().int().min(1).max(7),
  grade: z.number().int().min(10).max(12),
  section: z.number().int().min(1),
  teacherId: z.string()
});
var insertGradeSectionSchema = createInsertSchema(gradeSections).omit({ id: true }).extend({
  grade: z.number().int().min(10).max(12),
  sections: z.string()
});

// server/sqlite-storage.ts
import initSqlJs from "sql.js";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs";
function getDatabasePath() {
  const isElectron = process.versions && process.versions.electron;
  if (isElectron && process.env.NODE_ENV === "production") {
    try {
      const { app: app2 } = __require("electron");
      return path.join(app2.getPath("userData"), "school-schedule.db");
    } catch (e) {
      return path.join(process.cwd(), "school-schedule.db");
    }
  } else {
    return path.join(process.cwd(), "school-schedule.db");
  }
}
var SQLiteStorage = class {
  db;
  constructor() {
    const dbPath = getDatabasePath();
    console.log("\u{1F4C2} Database path:", dbPath);
    this.initDatabase(dbPath);
  }
  async initDatabase(dbPath) {
    const SQL = await initSqlJs();
    if (fs.existsSync(dbPath)) {
      const buffer = fs.readFileSync(dbPath);
      this.db = new SQL.Database(buffer);
    } else {
      this.db = new SQL.Database();
    }
    this.db.exec("PRAGMA foreign_keys = ON");
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS teachers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        subject TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS schedule_slots (
        id TEXT PRIMARY KEY,
        teacher_id TEXT NOT NULL,
        day TEXT NOT NULL,
        period INTEGER NOT NULL,
        grade INTEGER NOT NULL,
        section INTEGER NOT NULL,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS grade_sections (
        grade INTEGER PRIMARY KEY,
        sections TEXT NOT NULL
      );
    `);
    const teacherCountResult = this.db.exec("SELECT COUNT(*) as count FROM teachers");
    const teacherCount = teacherCountResult.length > 0 && teacherCountResult[0].values.length > 0 ? teacherCountResult[0].values[0][0] : 0;
    if (teacherCount === 0) {
      console.log("\u{1F393} Initializing with default teachers...");
      for (const teacherData of DEFAULT_TEACHERS) {
        const id = randomUUID();
        this.db.exec(`INSERT INTO teachers (id, name, subject) VALUES ('${id}', '${teacherData.name}', '${teacherData.subject}')`);
      }
    }
    const sectionsCountResult = this.db.exec("SELECT COUNT(*) as count FROM grade_sections");
    const sectionsCount = sectionsCountResult.length > 0 && sectionsCountResult[0].values.length > 0 ? sectionsCountResult[0].values[0][0] : 0;
    if (sectionsCount === 0) {
      console.log("\u{1F4DA} Initializing default grade sections...");
      this.db.exec(`INSERT INTO grade_sections (grade, sections) VALUES (10, '${JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])}')`);
      this.db.exec(`INSERT INTO grade_sections (grade, sections) VALUES (11, '${JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])}')`);
      this.db.exec(`INSERT INTO grade_sections (grade, sections) VALUES (12, '${JSON.stringify([1, 2, 3, 4, 5, 6, 7])}')`);
    }
    this.saveDatabase(dbPath);
    console.log("\u2705 Database initialized successfully");
  }
  saveDatabase(dbPath) {
    const data = this.db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }
  // Teacher methods
  async getTeacher(id) {
    const result = this.db.exec(`SELECT * FROM teachers WHERE id = '${id}'`);
    if (result.length === 0 || result[0].values.length === 0) return void 0;
    const row = result[0].values[0];
    return {
      id: row[0],
      name: row[1],
      subject: row[2]
    };
  }
  async getAllTeachers() {
    const result = this.db.exec("SELECT * FROM teachers");
    if (result.length === 0) return [];
    return result[0].values.map((row) => ({
      id: row[0],
      name: row[1],
      subject: row[2]
    }));
  }
  async createTeacher(insertTeacher) {
    const id = randomUUID();
    this.db.exec(`INSERT INTO teachers (id, name, subject) VALUES ('${id}', '${insertTeacher.name}', '${insertTeacher.subject}')`);
    this.saveDatabase(getDatabasePath());
    return {
      id,
      name: insertTeacher.name,
      subject: insertTeacher.subject
    };
  }
  async updateTeacher(id, updates) {
    const teacher = await this.getTeacher(id);
    if (!teacher) return void 0;
    const updated = { ...teacher, ...updates };
    this.db.exec(`UPDATE teachers SET name = '${updated.name}', subject = '${updated.subject}' WHERE id = '${id}'`);
    this.saveDatabase(getDatabasePath());
    return updated;
  }
  async deleteTeacher(id) {
    this.db.exec(`DELETE FROM teachers WHERE id = '${id}'`);
    this.saveDatabase(getDatabasePath());
    return true;
  }
  // Schedule slot methods
  async getScheduleSlot(id) {
    const result = this.db.exec(`SELECT * FROM schedule_slots WHERE id = '${id}'`);
    if (result.length === 0 || result[0].values.length === 0) return void 0;
    const row = result[0].values[0];
    return {
      id: row[0],
      teacherId: row[1],
      day: row[2],
      period: row[3],
      grade: row[4],
      section: row[5]
    };
  }
  async getTeacherScheduleSlots(teacherId) {
    const result = this.db.exec(`SELECT * FROM schedule_slots WHERE teacher_id = '${teacherId}'`);
    if (result.length === 0) return [];
    return result[0].values.map((row) => ({
      id: row[0],
      teacherId: row[1],
      day: row[2],
      period: row[3],
      grade: row[4],
      section: row[5]
    }));
  }
  async getAllScheduleSlots() {
    const result = this.db.exec("SELECT * FROM schedule_slots");
    if (result.length === 0) return [];
    return result[0].values.map((row) => ({
      id: row[0],
      teacherId: row[1],
      day: row[2],
      period: row[3],
      grade: row[4],
      section: row[5]
    }));
  }
  async createScheduleSlot(insertSlot) {
    const id = randomUUID();
    this.db.exec(
      `INSERT INTO schedule_slots (id, teacher_id, day, period, grade, section) VALUES ('${id}', '${insertSlot.teacherId}', '${insertSlot.day}', ${insertSlot.period}, ${insertSlot.grade}, ${insertSlot.section})`
    );
    this.saveDatabase(getDatabasePath());
    return {
      id,
      teacherId: insertSlot.teacherId,
      day: insertSlot.day,
      period: insertSlot.period,
      grade: insertSlot.grade,
      section: insertSlot.section
    };
  }
  async updateScheduleSlot(id, updates) {
    const slot = await this.getScheduleSlot(id);
    if (!slot) return void 0;
    const updated = { ...slot, ...updates };
    this.db.exec(
      `UPDATE schedule_slots SET teacher_id = '${updated.teacherId}', day = '${updated.day}', period = ${updated.period}, grade = ${updated.grade}, section = ${updated.section} WHERE id = '${id}'`
    );
    this.saveDatabase(getDatabasePath());
    return updated;
  }
  async deleteScheduleSlot(id) {
    this.db.exec(`DELETE FROM schedule_slots WHERE id = '${id}'`);
    this.saveDatabase(getDatabasePath());
    return true;
  }
  async deleteTeacherScheduleSlots(teacherId) {
    this.db.exec(`DELETE FROM schedule_slots WHERE teacher_id = '${teacherId}'`);
    this.saveDatabase(getDatabasePath());
    return true;
  }
  async deleteAllScheduleSlots() {
    this.db.exec("DELETE FROM schedule_slots");
    this.saveDatabase(getDatabasePath());
    return true;
  }
  // Grade section methods
  async getGradeSections(grade) {
    const result = this.db.exec(`SELECT sections FROM grade_sections WHERE grade = ${grade}`);
    if (result.length === 0 || result[0].values.length === 0) {
      return [1, 2, 3, 4, 5, 6, 7];
    }
    return JSON.parse(result[0].values[0][0]);
  }
  async setGradeSections(grade, sections) {
    this.db.exec(
      `INSERT OR REPLACE INTO grade_sections (grade, sections) VALUES (${grade}, '${JSON.stringify(sections)}')`
    );
    this.saveDatabase(getDatabasePath());
  }
  async getAllGradeSections() {
    const result = this.db.exec("SELECT * FROM grade_sections");
    const map = /* @__PURE__ */ new Map();
    if (result.length > 0) {
      result[0].values.forEach((row) => {
        map.set(row[0], JSON.parse(row[1]));
      });
    }
    return map;
  }
  async clearAllData() {
    this.db.exec("DELETE FROM teachers; DELETE FROM schedule_slots;");
    this.saveDatabase(getDatabasePath());
  }
  close() {
    this.saveDatabase(getDatabasePath());
    this.db.close();
  }
};

// server/storage.ts
var storage = new SQLiteStorage();

// server/routes.ts
import { z as z2 } from "zod";
import multer from "multer";
import ExcelJS from "exceljs";
import { nanoid } from "nanoid";

// server/subjectNormalization.ts
function normalizeArabicText(text2) {
  let normalized = text2.trim();
  normalized = normalized.replace(/[\u064B-\u065F]/g, "");
  normalized = normalized.replace(/ـ/g, "");
  normalized = normalized.replace(/^(ال|اللغة|اللغه|مادة|ماده|التربية|التربيه)\s*/g, "");
  normalized = normalized.replace(/[أإآٱ]/g, "\u0627").replace(/ة/g, "\u0647").replace(/ى/g, "\u064A").replace(/ؤ/g, "\u0648").replace(/ئ/g, "\u064A");
  normalized = normalized.replace(/\s+/g, "");
  return normalized.toLowerCase();
}
var SUBJECT_NORMALIZATION_MAP = {
  "\u0627\u0633\u0644\u0627\u0645\u064A\u0647": "\u0625\u0633\u0644\u0627\u0645\u064A\u0629",
  "\u0627\u0633\u0644\u0627\u0645\u064A\u0629": "\u0625\u0633\u0644\u0627\u0645\u064A\u0629",
  "\u0625\u0633\u0644\u0627\u0645\u064A\u0647": "\u0625\u0633\u0644\u0627\u0645\u064A\u0629",
  "\u0625\u0633\u0644\u0627\u0645\u064A\u0629": "\u0625\u0633\u0644\u0627\u0645\u064A\u0629",
  "\u0627\u0633\u0644\u0627\u0645\u064A": "\u0625\u0633\u0644\u0627\u0645\u064A\u0629",
  "\u062F\u064A\u0646\u064A\u0647": "\u0625\u0633\u0644\u0627\u0645\u064A\u0629",
  "\u062F\u064A\u0646\u064A\u0629": "\u0625\u0633\u0644\u0627\u0645\u064A\u0629",
  "\u062F\u064A\u0646": "\u0625\u0633\u0644\u0627\u0645\u064A\u0629",
  "\u0639\u0631\u0628\u064A\u0647": "\u0639\u0631\u0628\u064A",
  "\u0639\u0631\u0628\u064A\u0629": "\u0639\u0631\u0628\u064A",
  "\u0639\u0631\u0628\u064A": "\u0639\u0631\u0628\u064A",
  "\u0644\u063A\u0647\u0639\u0631\u0628\u064A\u0647": "\u0639\u0631\u0628\u064A",
  "\u0627\u0646\u062C\u0644\u064A\u0632\u064A\u0647": "\u0625\u0646\u062C\u0644\u064A\u0632\u064A",
  "\u0627\u0646\u062C\u0644\u064A\u0632\u064A\u0629": "\u0625\u0646\u062C\u0644\u064A\u0632\u064A",
  "\u0627\u0646\u062C\u0644\u064A\u0632\u064A": "\u0625\u0646\u062C\u0644\u064A\u0632\u064A",
  "\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0647": "\u0625\u0646\u062C\u0644\u064A\u0632\u064A",
  "\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629": "\u0625\u0646\u062C\u0644\u064A\u0632\u064A",
  "\u0625\u0646\u062C\u0644\u064A\u0632\u064A": "\u0625\u0646\u062C\u0644\u064A\u0632\u064A",
  "\u0627\u0646\u0643\u0644\u064A\u0632\u064A\u0647": "\u0625\u0646\u062C\u0644\u064A\u0632\u064A",
  "\u0627\u0646\u0643\u0644\u064A\u0632\u064A\u0629": "\u0625\u0646\u062C\u0644\u064A\u0632\u064A",
  "\u0627\u0646\u0643\u0644\u064A\u0632\u064A": "\u0625\u0646\u062C\u0644\u064A\u0632\u064A",
  "\u0627\u0646\u062C\u0644\u064A\u062A\u064A\u0647": "\u0625\u0646\u062C\u0644\u064A\u0632\u064A",
  "\u0627\u0646\u062C\u0644\u064A\u062A\u064A\u0629": "\u0625\u0646\u062C\u0644\u064A\u0632\u064A",
  "\u0644\u063A\u0647\u0627\u0646\u062C\u0644\u064A\u0632\u064A\u0647": "\u0625\u0646\u062C\u0644\u064A\u0632\u064A",
  "\u0631\u064A\u0627\u0636\u064A\u0627\u062A": "\u0631\u064A\u0627\u0636\u064A\u0627\u062A",
  "\u0631\u064A\u0627\u0636\u0647": "\u0631\u064A\u0627\u0636\u064A\u0627\u062A",
  "\u0631\u064A\u0627\u0636\u0629": "\u0631\u064A\u0627\u0636\u064A\u0627\u062A",
  "\u0643\u064A\u0645\u064A\u0627\u0621": "\u0643\u064A\u0645\u064A\u0627\u0621",
  "\u0643\u064A\u0645\u064A\u0627": "\u0643\u064A\u0645\u064A\u0627\u0621",
  "\u0643\u064A\u0645\u064A\u0627\u0648": "\u0643\u064A\u0645\u064A\u0627\u0621",
  "\u0641\u064A\u0632\u064A\u0627\u0621": "\u0641\u064A\u0632\u064A\u0627\u0621",
  "\u0641\u064A\u0632\u064A\u0627": "\u0641\u064A\u0632\u064A\u0627\u0621",
  "\u0641\u064A\u0632\u064A\u0627\u0648": "\u0641\u064A\u0632\u064A\u0627\u0621",
  "\u0627\u062D\u064A\u0627\u0621": "\u0623\u062D\u064A\u0627\u0621",
  "\u0623\u062D\u064A\u0627\u0621": "\u0623\u062D\u064A\u0627\u0621",
  "\u0627\u062D\u064A\u0627": "\u0623\u062D\u064A\u0627\u0621",
  "\u0623\u062D\u064A\u0627": "\u0623\u062D\u064A\u0627\u0621",
  "\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0627\u062A": "\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0627\u062A",
  "\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0647": "\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0627\u062A",
  "\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0629": "\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0627\u062A",
  "\u062D\u0627\u0633\u0648\u0628": "\u062D\u0627\u0633\u0648\u0628",
  "\u062D\u0627\u0633\u0628": "\u062D\u0627\u0633\u0648\u0628",
  "\u062D\u0627\u0633\u0628\u0627\u0644\u064A": "\u062D\u0627\u0633\u0648\u0628",
  "\u062D\u0627\u0633\u0648\u0628\u0627\u0644\u064A": "\u062D\u0627\u0633\u0648\u0628",
  "\u0643\u0645\u0628\u064A\u0648\u062A\u0631": "\u062D\u0627\u0633\u0648\u0628",
  "\u0628\u062F\u0646\u064A\u0647": "\u0628\u062F\u0646\u064A\u0629",
  "\u0628\u062F\u0646\u064A\u0629": "\u0628\u062F\u0646\u064A\u0629",
  "\u0628\u062F\u0646\u064A": "\u0628\u062F\u0646\u064A\u0629",
  "\u0631\u064A\u0627\u0636\u0647\u0628\u062F\u0646\u064A\u0647": "\u0628\u062F\u0646\u064A\u0629",
  "\u0641\u0646\u064A\u0647": "\u0641\u0646\u064A\u0629",
  "\u0641\u0646\u064A\u0629": "\u0641\u0646\u064A\u0629",
  "\u0641\u0646\u064A": "\u0641\u0646\u064A\u0629",
  "\u0631\u0633\u0645": "\u0641\u0646\u064A\u0629"
};
function normalizeSubjectName(rawSubject) {
  const normalized = normalizeArabicText(rawSubject);
  const canonical = SUBJECT_NORMALIZATION_MAP[normalized];
  if (canonical) {
    return canonical;
  }
  console.warn(`Unknown subject variation: "${rawSubject}" (normalized: "${normalized}"). Using original text.`);
  return rawSubject;
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/teachers", async (req, res) => {
    try {
      const teachers2 = await storage.getAllTeachers();
      res.json(teachers2);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      res.status(500).json({ error: "Failed to fetch teachers" });
    }
  });
  app2.get("/api/teachers/:id", async (req, res) => {
    try {
      const teacher = await storage.getTeacher(req.params.id);
      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }
      res.json(teacher);
    } catch (error) {
      console.error("Error fetching teacher:", error);
      res.status(500).json({ error: "Failed to fetch teacher" });
    }
  });
  app2.post("/api/teachers", async (req, res) => {
    try {
      const validatedData = insertTeacherSchema.parse(req.body);
      const teacher = await storage.createTeacher(validatedData);
      res.status(201).json(teacher);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating teacher:", error);
      res.status(500).json({ error: "Failed to create teacher" });
    }
  });
  app2.patch("/api/teachers/:id", async (req, res) => {
    try {
      const result = insertTeacherSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }
      const teacher = await storage.updateTeacher(req.params.id, result.data);
      res.json(teacher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app2.delete("/api/teachers/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTeacher(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Teacher not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting teacher:", error);
      res.status(500).json({ error: "Failed to delete teacher" });
    }
  });
  app2.get("/api/schedule-slots", async (req, res) => {
    try {
      const slots = await storage.getAllScheduleSlots();
      res.json(slots);
    } catch (error) {
      console.error("Error fetching schedule slots:", error);
      res.status(500).json({ error: "Failed to fetch schedule slots" });
    }
  });
  app2.get("/api/teachers/:teacherId/schedule-slots", async (req, res) => {
    try {
      const slots = await storage.getTeacherScheduleSlots(req.params.teacherId);
      res.json(slots);
    } catch (error) {
      console.error("Error fetching teacher schedule slots:", error);
      res.status(500).json({ error: "Failed to fetch teacher schedule slots" });
    }
  });
  app2.post("/api/schedule-slots", async (req, res) => {
    try {
      const validatedData = insertScheduleSlotSchema.parse(req.body);
      const slot = await storage.createScheduleSlot(validatedData);
      res.status(201).json(slot);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating schedule slot:", error);
      res.status(500).json({ error: "Failed to create schedule slot" });
    }
  });
  app2.patch("/api/schedule-slots/:id", async (req, res) => {
    try {
      const updates = insertScheduleSlotSchema.partial().parse(req.body);
      const slot = await storage.updateScheduleSlot(req.params.id, updates);
      if (!slot) {
        return res.status(404).json({ error: "Schedule slot not found" });
      }
      res.json(slot);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error updating schedule slot:", error);
      res.status(500).json({ error: "Failed to update schedule slot" });
    }
  });
  app2.delete("/api/schedule-slots/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteScheduleSlot(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Schedule slot not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting schedule slot:", error);
      res.status(500).json({ error: "Failed to delete schedule slot" });
    }
  });
  app2.delete("/api/schedule-slots", async (req, res) => {
    try {
      await storage.deleteAllScheduleSlots();
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting all schedule slots:", error);
      res.status(500).json({ error: "Failed to delete all schedule slots" });
    }
  });
  app2.post("/api/schedule-slots/batch", async (req, res) => {
    try {
      const { slots } = req.body;
      if (!Array.isArray(slots)) {
        return res.status(400).json({ error: "Slots must be an array" });
      }
      for (const slotData of slots) {
        insertScheduleSlotSchema.parse(slotData);
      }
      await storage.deleteAllScheduleSlots();
      const createdSlots = [];
      for (const slotData of slots) {
        const slot = await storage.createScheduleSlot(slotData);
        createdSlots.push(slot);
      }
      res.status(201).json(createdSlots);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error batch saving schedule slots:", error);
      res.status(500).json({ error: "Failed to batch save schedule slots" });
    }
  });
  app2.post("/api/teachers/:teacherId/schedule-slots/batch", async (req, res) => {
    try {
      const { slots } = req.body;
      if (!Array.isArray(slots)) {
        return res.status(400).json({ error: "Slots must be an array" });
      }
      const allSlots = await storage.getAllScheduleSlots();
      const allTeachers = await storage.getAllTeachers();
      const teacherMap = new Map(allTeachers.map((t) => [t.id, t]));
      for (const slotData of slots) {
        const conflictingSlot = allSlots.find(
          (existingSlot) => existingSlot.teacherId !== req.params.teacherId && existingSlot.day === slotData.day && existingSlot.period === slotData.period && existingSlot.grade === slotData.grade && existingSlot.section === slotData.section
        );
        if (conflictingSlot) {
          const conflictingTeacher = teacherMap.get(conflictingSlot.teacherId);
          return res.status(409).json({
            error: "conflict",
            message: `\u064A\u0648\u062C\u062F \u062A\u0639\u0627\u0631\u0636: \u0627\u0644\u0623\u0633\u062A\u0627\u0630 ${conflictingTeacher?.name || "\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"} (${conflictingTeacher?.subject || "\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}) \u0644\u062F\u064A\u0647 \u062D\u0635\u0629 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u0648\u0642\u062A \u0644\u0644\u0635\u0641 ${slotData.grade}/${slotData.section} \u064A\u0648\u0645 ${slotData.day} \u0627\u0644\u062D\u0635\u0629 ${slotData.period}`,
            conflictingTeacher: {
              name: conflictingTeacher?.name,
              subject: conflictingTeacher?.subject
            },
            slot: {
              day: slotData.day,
              period: slotData.period,
              grade: slotData.grade,
              section: slotData.section
            }
          });
        }
      }
      await storage.deleteTeacherScheduleSlots(req.params.teacherId);
      const createdSlots = [];
      for (const slotData of slots) {
        const validatedData = insertScheduleSlotSchema.parse({
          ...slotData,
          teacherId: req.params.teacherId
        });
        const slot = await storage.createScheduleSlot(validatedData);
        createdSlots.push(slot);
      }
      res.status(201).json(createdSlots);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error batch creating schedule slots:", error);
      res.status(500).json({ error: "Failed to batch create schedule slots" });
    }
  });
  app2.get("/api/class-schedules/:grade/:section", async (req, res) => {
    try {
      const grade = parseInt(req.params.grade);
      const section = parseInt(req.params.section);
      if (isNaN(grade) || isNaN(section)) {
        return res.status(400).json({ error: "Invalid grade or section" });
      }
      const allSlots = await storage.getAllScheduleSlots();
      const allTeachers = await storage.getAllTeachers();
      const classSlots = allSlots.filter(
        (slot) => slot.grade === grade && slot.section === section
      );
      const teacherMap = new Map(allTeachers.map((t) => [t.id, t]));
      const schedule = classSlots.map((slot) => {
        const teacher = teacherMap.get(slot.teacherId);
        return {
          day: slot.day,
          period: slot.period,
          subject: teacher?.subject || "Unknown",
          teacherName: teacher?.name || "Unknown"
        };
      });
      res.json(schedule);
    } catch (error) {
      console.error("Error fetching class schedule:", error);
      res.status(500).json({ error: "Failed to fetch class schedule" });
    }
  });
  app2.post("/api/class-schedules/:grade/:section", async (req, res) => {
    try {
      const grade = parseInt(req.params.grade);
      const section = parseInt(req.params.section);
      const { slots } = req.body;
      if (isNaN(grade) || isNaN(section)) {
        return res.status(400).json({ error: "Invalid grade or section" });
      }
      if (!Array.isArray(slots)) {
        return res.status(400).json({ error: "Slots must be an array" });
      }
      const allSlots = await storage.getAllScheduleSlots();
      const existingSlots = allSlots.filter(
        (slot) => slot.grade === grade && slot.section === section
      );
      for (const slot of existingSlots) {
        await storage.deleteScheduleSlot(slot.id);
      }
      const createdSlots = [];
      for (const slotData of slots) {
        const validatedData = insertScheduleSlotSchema.parse({
          ...slotData,
          grade,
          section
        });
        const slot = await storage.createScheduleSlot(validatedData);
        createdSlots.push(slot);
      }
      res.status(201).json(createdSlots);
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error saving class schedule:", error);
      res.status(500).json({ error: "Failed to save class schedule" });
    }
  });
  app2.get("/api/grade-sections", async (req, res) => {
    try {
      const sectionsMap = await storage.getAllGradeSections();
      const sections = {};
      sectionsMap.forEach((value, key) => {
        sections[key.toString()] = value;
      });
      res.json(sections);
    } catch (error) {
      console.error("Error fetching grade sections:", error);
      res.status(500).json({ error: "Failed to fetch grade sections" });
    }
  });
  app2.get("/api/grade-sections/:grade", async (req, res) => {
    try {
      const grade = parseInt(req.params.grade);
      if (isNaN(grade)) {
        return res.status(400).json({ error: "Invalid grade" });
      }
      const sections = await storage.getGradeSections(grade);
      res.json({ grade, sections });
    } catch (error) {
      console.error("Error fetching grade sections:", error);
      res.status(500).json({ error: "Failed to fetch grade sections" });
    }
  });
  app2.put("/api/grade-sections/:grade", async (req, res) => {
    try {
      const grade = parseInt(req.params.grade);
      const { sections } = req.body;
      if (isNaN(grade)) {
        return res.status(400).json({ error: "Invalid grade" });
      }
      if (!Array.isArray(sections) || !sections.every((s) => typeof s === "number")) {
        return res.status(400).json({ error: "Sections must be an array of numbers" });
      }
      await storage.setGradeSections(grade, sections);
      res.json({ grade, sections });
    } catch (error) {
      console.error("Error updating grade sections:", error);
      res.status(500).json({ error: "Failed to update grade sections" });
    }
  });
  const upload = multer({ storage: multer.memoryStorage() });
  app2.post("/api/import-excel", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const ignoreConflicts = req.body.ignoreConflicts === "true";
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(req.file.buffer);
      const worksheet = workbook.worksheets[0];
      if (!worksheet) {
        return res.status(400).json({ error: "\u0627\u0644\u0645\u0644\u0641 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0623\u064A \u0648\u0631\u0642\u0629 \u0639\u0645\u0644" });
      }
      const teachersMap = /* @__PURE__ */ new Map();
      const slotsArray = [];
      const conflicts = [];
      const startRow = 5;
      const endRow = worksheet.rowCount;
      for (let rowNum = startRow; rowNum <= endRow; rowNum++) {
        const row = worksheet.getRow(rowNum);
        const teacherNameCell = row.getCell(39);
        const subjectCell = row.getCell(38);
        const teacherName = teacherNameCell.value?.toString().trim();
        const subjectName = subjectCell.value?.toString().trim();
        if (!teacherName || !subjectName) {
          continue;
        }
        const subject = normalizeSubjectName(subjectName);
        if (!teachersMap.has(teacherName)) {
          const teacherId = nanoid();
          teachersMap.set(teacherName, {
            id: teacherId,
            name: teacherName,
            subject
          });
        }
        const teacher = teachersMap.get(teacherName);
        const reversedDays = [...DAYS].reverse();
        const reversedPeriods = [...PERIODS].reverse();
        let colOffset = 3;
        reversedDays.forEach((day) => {
          reversedPeriods.forEach((period) => {
            const cell = row.getCell(colOffset);
            const cellValue = cell.value?.toString().trim();
            if (cellValue && cellValue.includes("/")) {
              const parts = cellValue.split("/");
              if (parts.length === 2) {
                let grade;
                let section;
                const part1 = parseInt(parts[0], 10);
                const part2 = parseInt(parts[1], 10);
                if (!isNaN(part1) && !isNaN(part2)) {
                  if (part1 >= 10 && part1 <= 12) {
                    grade = part1;
                    section = part2;
                  } else {
                    grade = part2;
                    section = part1;
                  }
                  if (!isNaN(grade) && !isNaN(section) && grade >= 10 && grade <= 12) {
                    const slot = {
                      id: nanoid(),
                      teacherId: teacher.id,
                      day,
                      period,
                      grade,
                      section
                    };
                    slotsArray.push(slot);
                  }
                }
              }
            }
            colOffset++;
          });
        });
      }
      const slotKeys = /* @__PURE__ */ new Map();
      slotsArray.forEach((slot) => {
        const key = `${slot.day}-${slot.period}-${slot.grade}-${slot.section}`;
        if (!slotKeys.has(key)) {
          slotKeys.set(key, []);
        }
        slotKeys.get(key).push(slot);
      });
      slotKeys.forEach((slots, key) => {
        if (slots.length > 1) {
          const teacherNames = slots.map((s) => {
            const t = Array.from(teachersMap.values()).find((t2) => t2.id === s.teacherId);
            return t ? t.name : "Unknown";
          });
          conflicts.push({
            type: "overlap",
            message: `\u062A\u0639\u0627\u0631\u0636 \u0641\u064A \u0627\u0644\u062D\u0635\u0629: ${slots[0].day} - \u0627\u0644\u062D\u0635\u0629 ${slots[0].period} - \u0627\u0644\u0635\u0641 ${slots[0].grade}/${slots[0].section}`,
            details: {
              day: slots[0].day,
              period: slots[0].period,
              grade: slots[0].grade,
              section: slots[0].section,
              teachers: teacherNames
            }
          });
        }
      });
      if (conflicts.length > 0 && !ignoreConflicts) {
        return res.status(409).json({
          conflicts,
          teachers: Array.from(teachersMap.values()),
          slots: slotsArray
        });
      }
      await storage.clearAllData();
      for (const teacher of Array.from(teachersMap.values())) {
        await storage.createTeacher({ name: teacher.name, subject: teacher.subject });
      }
      const newTeachers = await storage.getAllTeachers();
      const teacherNameToId = new Map(newTeachers.map((t) => [t.name, t.id]));
      for (const slot of slotsArray) {
        const teacherName = Array.from(teachersMap.values()).find((t) => t.id === slot.teacherId)?.name;
        if (teacherName) {
          const realTeacherId = teacherNameToId.get(teacherName);
          if (realTeacherId) {
            await storage.createScheduleSlot({
              teacherId: realTeacherId,
              day: slot.day,
              period: slot.period,
              grade: slot.grade,
              section: slot.section
            });
          }
        }
      }
      res.json({
        success: true,
        teachersImported: newTeachers.length,
        slotsImported: slotsArray.length,
        conflicts: conflicts.length
      });
    } catch (error) {
      console.error("Error importing Excel:", error);
      res.status(500).json({ error: "Failed to import Excel file", message: error.message });
    }
  });
  const templateUpload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.originalname.endsWith(".xlsx")) {
        cb(null, true);
      } else {
        cb(new Error("Only .xlsx files are allowed"));
      }
    }
  });
  app2.post("/api/upload-template", templateUpload.single("template"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const fs3 = await import("fs/promises");
      const path4 = await import("path");
      const templatePath = path4.join(process.cwd(), "client", "public", "\u062C\u062F\u0627\u0648\u0644_template_new.xlsx");
      await fs3.writeFile(templatePath, req.file.buffer);
      res.json({
        success: true,
        message: "Template uploaded successfully",
        filename: "\u062C\u062F\u0627\u0648\u0644_template_new.xlsx"
      });
    } catch (error) {
      console.error("Error uploading template:", error);
      res.status(500).json({ error: "Failed to upload template", message: error.message });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  base: process.env.ELECTRON === "true" ? "./" : "/",
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: void 0
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 5e3,
    allowedHosts: true,
    hmr: {
      clientPort: 443
    },
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid as nanoid2 } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid2()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(port, "0.0.0.0", () => {
    log(`\u2713 Server is running on http://0.0.0.0:${port}`);
    log(`\u2713 Press Ctrl+C to stop`);
  });
})();
