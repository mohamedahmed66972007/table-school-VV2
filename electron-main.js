import { app, BrowserWindow } from 'electron';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let serverProcess;

function createWindow() {
  const isDev = !app.isPackaged;

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "electron-preload.js"),
    },
    icon: path.join(__dirname, "client/public/icon.png"),
    title: "نظام جدولة الحصص المدرسية",
    backgroundColor: "#1e1e1e",
    autoHideMenuBar: true,
  });

  const startURL = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "public", "index.html")}`;

  // ✅ في وضع التطوير فقط
  if (isDev) {
    let retries = 0;
    const maxRetries = 50; // زودنا الوقت شوية

    const tryLoad = () => {
      fetch(startURL)
        .then(() => {
          console.log("✅ Vite server ready!");
          mainWindow.loadURL(startURL);
          mainWindow.webContents.openDevTools();
        })
        .catch(() => {
          retries++;
          console.log(`⏳ Waiting for Vite server... (${retries}/${maxRetries})`);
          if (retries < maxRetries) setTimeout(tryLoad, 1000);
          else {
            console.error("❌ Vite server not responding after 50s.");
            app.quit();
          }
        });
    };

    tryLoad();
  } else {
    mainWindow.loadURL(startURL);
  }

  mainWindow.on("closed", () => (mainWindow = null));
}


// =========================
// تشغيل سيرفر Node
// =========================
function startServer() {
  console.log('🚀 Starting Express server...');
  
  const isProduction = process.env.NODE_ENV === 'production' || app.isPackaged;
  const serverScript = isProduction 
    ? path.join(__dirname, 'dist/index.js')
    : path.join(__dirname, 'server/index.ts');
  
  const command = isProduction ? 'node' : (process.platform === 'win32' ? 'npm.cmd' : 'npm');
  const args = isProduction ? [serverScript] : ['run', 'dev'];

  serverProcess = spawn(command, args, {
    cwd: __dirname,
    env: { 
      ...process.env, 
      NODE_ENV: isProduction ? 'production' : 'development',
      PORT: '5000'
    },
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });

  serverProcess.on('error', (err) => {
    console.error('❌ Failed to start server:', err);
  });

  serverProcess.on('exit', (code) => {
    console.log(`Server process exited with code ${code}`);
  });
}

// =========================
// أحداث التطبيق
// =========================
app.whenReady().then(() => {
  startServer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (serverProcess) serverProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (serverProcess) serverProcess.kill();
});
