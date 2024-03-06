const { exec } = require("child_process");
const fs = require("fs");

let lastLog = Date.now();
const ONE_MINUTE = 60000;
const INTERVAL_TEN_SECONDS = 100;
const LOG_FILE_NAME = "activityMonitor.log";
const SCRIPT_FOR_WINDOWS = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
const SCRIPT_ALL_PLATFORM = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";

setInterval(() => {
  const command =
    process.platform === "win32" ? SCRIPT_FOR_WINDOWS : SCRIPT_ALL_PLATFORM;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`Error: ${stderr}`);
      return;
    }

    const log = getLog(stdout);

    process.stdout.write("\r" + " ".repeat(process.stdout.columns - 1) + "\r");

    process.stdout.write(log);

    const now = Date.now();
    try {
      if (now - lastLog >= ONE_MINUTE) {
        fs.appendFileSync(LOG_FILE_NAME, `<${new Date(now)}> : ${log}\n`);
        lastLog = now;
      }
    } catch (err) {
      throw err;
    }
  });
}, INTERVAL_TEN_SECONDS);

function getLog(stdout) {
  const result = stdout.replace(/\n/g, " ");
  const data = result.split(" ");
  const process = `Process: ${data[0]}`;
  const CPUUsage = `CPU Usage: ${data[1]} seconds`;
  const memoryUsage = `Memory Usage: ${data[2] / 1000000} Mb`;
  return `${process}, ${CPUUsage}, ${memoryUsage}`;
}
