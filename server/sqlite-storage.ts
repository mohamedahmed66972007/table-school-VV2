
import initSqlJs from 'sql.js';
import type { Database as DatabaseType } from 'sql.js';
import { type Teacher, type InsertTeacher, type ScheduleSlot, type InsertScheduleSlot, DEFAULT_TEACHERS } from "@shared/schema";
import { randomUUID } from "crypto";
import { IStorage } from "./storage";
import path from "path";
import fs from 'fs';

// Get the user data directory based on environment
function getDatabasePath(): string {
  // Check if running in Electron
  const isElectron = process.versions && process.versions.electron;

  if (isElectron && process.env.NODE_ENV === 'production') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { app } = require('electron');
      // In production Electron app, store in user data directory
      return path.join(app.getPath('userData'), 'school-schedule.db');
    } catch (e) {
      // Fall back to current directory if electron is not available
      return path.join(process.cwd(), 'school-schedule.db');
    }
  } else {
    // In development or non-Electron, store in project directory
    return path.join(process.cwd(), 'school-schedule.db');
  }
}

export class SQLiteStorage implements IStorage {
  private db: DatabaseType;

  constructor() {
    const dbPath = getDatabasePath();
    console.log('📂 Database path:', dbPath);

    this.initDatabase(dbPath);
  }

  private async initDatabase(dbPath: string) {
    const SQL = await initSqlJs();

    if (fs.existsSync(dbPath)) {
      const buffer = fs.readFileSync(dbPath);
      this.db = new SQL.Database(buffer);
    } else {
      this.db = new SQL.Database();
    }

    // Enable foreign keys
    this.db.exec('PRAGMA foreign_keys = ON');

    // Create tables
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

    // Check if teachers table is empty and initialize with default teachers
    const teacherCountResult = this.db.exec('SELECT COUNT(*) as count FROM teachers');
    const teacherCount = teacherCountResult.length > 0 && teacherCountResult[0].values.length > 0 ? teacherCountResult[0].values[0][0] : 0;

    if (teacherCount === 0) {
      console.log('🎓 Initializing with default teachers...');
      
      for (const teacherData of DEFAULT_TEACHERS) {
        const id = randomUUID();
        this.db.exec(`INSERT INTO teachers (id, name, subject) VALUES ('${id}', '${teacherData.name}', '${teacherData.subject}')`);
      }
    }

    // Initialize default grade sections if empty
    const sectionsCountResult = this.db.exec('SELECT COUNT(*) as count FROM grade_sections');
    const sectionsCount = sectionsCountResult.length > 0 && sectionsCountResult[0].values.length > 0 ? sectionsCountResult[0].values[0][0] : 0;

    if (sectionsCount === 0) {
      console.log('📚 Initializing default grade sections...');
      this.db.exec(`INSERT INTO grade_sections (grade, sections) VALUES (10, '${JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])}')`);
      this.db.exec(`INSERT INTO grade_sections (grade, sections) VALUES (11, '${JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8])}')`);
      this.db.exec(`INSERT INTO grade_sections (grade, sections) VALUES (12, '${JSON.stringify([1, 2, 3, 4, 5, 6, 7])}')`);
    }

    this.saveDatabase(dbPath);
    console.log('✅ Database initialized successfully');
  }

  private saveDatabase(dbPath: string) {
    const data = this.db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }

  // Teacher methods
  async getTeacher(id: string): Promise<Teacher | undefined> {
    const result = this.db.exec(`SELECT * FROM teachers WHERE id = '${id}'`);
    if (result.length === 0 || result[0].values.length === 0) return undefined;
    
    const row = result[0].values[0];
    return { 
      id: row[0] as string, 
      name: row[1] as string, 
      subject: row[2] as string 
    };
  }

  async getAllTeachers(): Promise<Teacher[]> {
    const result = this.db.exec('SELECT * FROM teachers');
    if (result.length === 0) return [];
    
    return result[0].values.map(row => ({
      id: row[0] as string,
      name: row[1] as string,
      subject: row[2] as string
    }));
  }

  async createTeacher(insertTeacher: InsertTeacher): Promise<Teacher> {
    const id = randomUUID();
    this.db.exec(`INSERT INTO teachers (id, name, subject) VALUES ('${id}', '${insertTeacher.name}', '${insertTeacher.subject}')`);
    this.saveDatabase(getDatabasePath());
    return {
      id,
      name: insertTeacher.name,
      subject: insertTeacher.subject
    };
  }

  async updateTeacher(id: string, updates: Partial<InsertTeacher>): Promise<Teacher | undefined> {
    const teacher = await this.getTeacher(id);
    if (!teacher) return undefined;

    const updated = { ...teacher, ...updates };
    this.db.exec(`UPDATE teachers SET name = '${updated.name}', subject = '${updated.subject}' WHERE id = '${id}'`);
    this.saveDatabase(getDatabasePath());
    return updated;
  }

  async deleteTeacher(id: string): Promise<boolean> {
    this.db.exec(`DELETE FROM teachers WHERE id = '${id}'`);
    this.saveDatabase(getDatabasePath());
    return true;
  }

  // Schedule slot methods
  async getScheduleSlot(id: string): Promise<ScheduleSlot | undefined> {
    const result = this.db.exec(`SELECT * FROM schedule_slots WHERE id = '${id}'`);
    if (result.length === 0 || result[0].values.length === 0) return undefined;
    
    const row = result[0].values[0];
    return {
      id: row[0] as string,
      teacherId: row[1] as string,
      day: row[2] as any,
      period: row[3] as any,
      grade: row[4] as any,
      section: row[5] as number,
    };
  }

  async getTeacherScheduleSlots(teacherId: string): Promise<ScheduleSlot[]> {
    const result = this.db.exec(`SELECT * FROM schedule_slots WHERE teacher_id = '${teacherId}'`);
    if (result.length === 0) return [];
    
    return result[0].values.map(row => ({
      id: row[0] as string,
      teacherId: row[1] as string,
      day: row[2] as any,
      period: row[3] as any,
      grade: row[4] as any,
      section: row[5] as number,
    }));
  }

  async getAllScheduleSlots(): Promise<ScheduleSlot[]> {
    const result = this.db.exec('SELECT * FROM schedule_slots');
    if (result.length === 0) return [];
    
    return result[0].values.map(row => ({
      id: row[0] as string,
      teacherId: row[1] as string,
      day: row[2] as any,
      period: row[3] as any,
      grade: row[4] as any,
      section: row[5] as number,
    }));
  }

  async createScheduleSlot(insertSlot: InsertScheduleSlot): Promise<ScheduleSlot> {
    const id = randomUUID();
    this.db.exec(
      `INSERT INTO schedule_slots (id, teacher_id, day, period, grade, section) VALUES ('${id}', '${insertSlot.teacherId}', '${insertSlot.day}', ${insertSlot.period}, ${insertSlot.grade}, ${insertSlot.section})`
    );
    this.saveDatabase(getDatabasePath());
    return {
      id,
      teacherId: insertSlot.teacherId,
      day: insertSlot.day as any,
      period: insertSlot.period as any,
      grade: insertSlot.grade as any,
      section: insertSlot.section,
    };
  }

  async updateScheduleSlot(id: string, updates: Partial<InsertScheduleSlot>): Promise<ScheduleSlot | undefined> {
    const slot = await this.getScheduleSlot(id);
    if (!slot) return undefined;

    const updated = { ...slot, ...updates };
    this.db.exec(
      `UPDATE schedule_slots SET teacher_id = '${updated.teacherId}', day = '${updated.day}', period = ${updated.period}, grade = ${updated.grade}, section = ${updated.section} WHERE id = '${id}'`
    );
    this.saveDatabase(getDatabasePath());
    return updated;
  }

  async deleteScheduleSlot(id: string): Promise<boolean> {
    this.db.exec(`DELETE FROM schedule_slots WHERE id = '${id}'`);
    this.saveDatabase(getDatabasePath());
    return true;
  }

  async deleteTeacherScheduleSlots(teacherId: string): Promise<boolean> {
    this.db.exec(`DELETE FROM schedule_slots WHERE teacher_id = '${teacherId}'`);
    this.saveDatabase(getDatabasePath());
    return true;
  }

  async deleteAllScheduleSlots(): Promise<boolean> {
    this.db.exec('DELETE FROM schedule_slots');
    this.saveDatabase(getDatabasePath());
    return true;
  }

  // Grade section methods
  async getGradeSections(grade: number): Promise<number[]> {
    const result = this.db.exec(`SELECT sections FROM grade_sections WHERE grade = ${grade}`);
    if (result.length === 0 || result[0].values.length === 0) {
      return [1, 2, 3, 4, 5, 6, 7];
    }
    return JSON.parse(result[0].values[0][0] as string);
  }

  async setGradeSections(grade: number, sections: number[]): Promise<void> {
    this.db.exec(
      `INSERT OR REPLACE INTO grade_sections (grade, sections) VALUES (${grade}, '${JSON.stringify(sections)}')`
    );
    this.saveDatabase(getDatabasePath());
  }

  async getAllGradeSections(): Promise<Map<number, number[]>> {
    const result = this.db.exec('SELECT * FROM grade_sections');
    const map = new Map<number, number[]>();
    
    if (result.length > 0) {
      result[0].values.forEach(row => {
        map.set(row[0] as number, JSON.parse(row[1] as string));
      });
    }
    
    return map;
  }

  async clearAllData(): Promise<void> {
    this.db.exec('DELETE FROM teachers; DELETE FROM schedule_slots;');
    this.saveDatabase(getDatabasePath());
  }

  close() {
    this.saveDatabase(getDatabasePath());
    this.db.close();
  }
}
