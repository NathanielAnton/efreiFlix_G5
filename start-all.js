const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Liste tous les dossiers de micro-frontends à démarrer
const projects = [
  'shell',
  'header',
  'breadcrumb',
  'catalogue',
  'fiche-produit',
  'search-bar',
  'mfe-skeleton'
];

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Fonction pour installer les dépendances
const installDependencies = (project) => {
  return new Promise((resolve, reject) => {
    console.log(`${colors.bright}${colors.cyan}[${project}]${colors.reset} Installation des dépendances...`);
    
    const npmInstall = exec('npm install', { cwd: path.join(__dirname, project) });
    
    npmInstall.stdout.on('data', (data) => {
      console.log(`${colors.cyan}[${project}]${colors.reset} ${data.toString().trim()}`);
    });
    
    npmInstall.stderr.on('data', (data) => {
      console.error(`${colors.red}[${project}]${colors.reset} ${data.toString().trim()}`);
    });
    
    npmInstall.on('close', (code) => {
      if (code === 0) {
        console.log(`${colors.bright}${colors.green}[${project}]${colors.reset} Installation terminée avec succès.`);
        resolve();
      } else {
        console.error(`${colors.bright}${colors.red}[${project}]${colors.reset} Erreur lors de l'installation (code ${code}).`);
        reject(`Erreur d'installation pour ${project}`);
      }
    });
  });
};

// Fonction pour démarrer un projet
const startProject = (project, projectIndex) => {
  console.log(`${colors.bright}${colors.green}[${project}]${colors.reset} Démarrage du projet...`);
  
  const colorCodes = [colors.cyan, colors.magenta, colors.yellow, colors.green, colors.blue, colors.red];
  const color = colorCodes[projectIndex % colorCodes.length];
  
  // Utilise spawn pour exécuter npm start dans un nouveau processus
  const npmStart = spawn('npm', ['start'], { 
    cwd: path.join(__dirname, project),
    shell: true,
    stdio: 'pipe'
  });
  
  npmStart.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(`${color}[${project}]${colors.reset} ${line.trim()}`);
      }
    });
  });
  
  npmStart.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.error(`${colors.red}[${project}]${colors.reset} ${line.trim()}`);
      }
    });
  });
  
  npmStart.on('close', (code) => {
    if (code !== 0) {
      console.error(`${colors.bright}${colors.red}[${project}]${colors.reset} Le processus s'est arrêté avec le code ${code}`);
    }
  });
  
  return npmStart;
};

// Fonction principale
async function main() {
  console.log(`${colors.bright}${colors.green}=== Démarrage de tous les micro-frontends EfreiFlix ===${colors.reset}`);
  
  try {
    // Vérifier que tous les projets existent
    for (const project of projects) {
      if (!fs.existsSync(path.join(__dirname, project))) {
        console.error(`${colors.bright}${colors.red}[ERREUR] Le dossier '${project}' n'existe pas.${colors.reset}`);
        process.exit(1);
      }
    }
    
    // Installer les dépendances pour tous les projets en séquence
    for (const project of projects) {
      await installDependencies(project);
    }
    
    console.log(`\n${colors.bright}${colors.green}=== Démarrage des services ===${colors.reset}`);
    
    // Démarrer tous les projets en parallèle
    const processes = projects.map((project, index) => startProject(project, index));
    
    // Gestion propre de l'arrêt
    process.on('SIGINT', () => {
      console.log(`\n${colors.bright}${colors.yellow}Arrêt de tous les services...${colors.reset}`);
      processes.forEach(proc => {
        proc.kill('SIGINT');
      });
    });
    
  } catch (error) {
    console.error(`${colors.bright}${colors.red}[ERREUR] ${error}${colors.reset}`);
    process.exit(1);
  }
}

// Lancer le script
main();