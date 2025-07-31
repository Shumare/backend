import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';

const execAsync = promisify(exec);

@Injectable()
export class HardhatService {
  private nodeProcess: ChildProcess | null = null;

  // 👇 Chemin vers le dossier contenant Hardhat
  private readonly hardhatPath = path.resolve(
    __dirname,
    '../../../smart contract',
  );

  async compileContract(): Promise<string> {
    const { stdout, stderr } = await execAsync('npx hardhat compile', {
      cwd: this.hardhatPath, // 👈 Compile dans le bon dossier
    });

    if (stderr) return `Compilation error: ${stderr}`;
    return stdout;
  }

  async deployContract(): Promise<string> {
    const { stdout, stderr } = await execAsync(
      'npx hardhat run scripts/issueMultipleDiplomas.js --network localhost',
      {
        cwd: this.hardhatPath, // 👈 Exécution depuis le bon dossier
      },
    );

    if (stderr) return `Deploy error: ${stderr}`;
    return stdout;
  }

  async startNode(): Promise<string> {
    console.log(`Hardhat path: ${this.hardhatPath}`);
    if (this.nodeProcess) {
      return 'Hardhat node is already running.';
    }

    this.nodeProcess = spawn('npx', ['hardhat', 'node'], {
      cwd: this.hardhatPath, // 👈 Node lancé dans le bon dossier
      shell: true,
    });

    this.nodeProcess.stdout?.on('data', (data) => {
      console.log(`[Hardhat Node] ${data}`);
    });

    this.nodeProcess.stderr?.on('data', (data) => {
      console.error(`[Hardhat Node ERROR] ${data}`);
    });

    this.nodeProcess.on('close', (code) => {
      console.log(`Hardhat node exited with code ${code}`);
      this.nodeProcess = null;
    });

    return 'Hardhat node started.';
  }

  async stopNode(): Promise<string> {
    if (!this.nodeProcess) {
      return 'No Hardhat node is running.';
    }

    this.nodeProcess.kill('SIGTERM');
    this.nodeProcess = null;

    return 'Hardhat node stopped.';
  }
}
