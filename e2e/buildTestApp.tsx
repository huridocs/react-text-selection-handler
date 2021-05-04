import { spawn } from 'child-process-promise';

export const buildTestApp = async () => {
  try {
    await spawn('yarn', ['webpack', '--config', 'e2e/webpack.config.js'], {
      capture: ['stdout', 'stderr'],
    });
  } catch (e) {
    process.stderr.write(e.stderr);
    process.stderr.write(e.stdout);
    process.exit(1);
  }
};
