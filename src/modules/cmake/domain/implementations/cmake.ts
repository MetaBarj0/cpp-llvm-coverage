import * as Imports from '../../imports';

type Context = {
  settings: Imports.Domain.Abstractions.Settings,
  progressReporter: Imports.Adapters.Abstractions.vscode.ProgressLike,
  errorChannel: Imports.Adapters.Abstractions.vscode.OutputChannelLike,
  execFileForCommand: Imports.Adapters.Abstractions.processControl.ExecFileCallable,
  execFileForTarget: Imports.Adapters.Abstractions.processControl.ExecFileCallable,
};

export function make(context: Context): Imports.Domain.Abstractions.Cmake {
  return new Cmake(context);
}

class Cmake extends Imports.Domain.Implementations.BasicCmake implements Imports.Domain.Abstractions.Cmake {
  constructor(context: Context) {
    super(context.progressReporter, context.settings, context.errorChannel);

    this.execFileForCommand = context.execFileForCommand;
    this.execFileForTarget = context.execFileForTarget;
  }

  protected reachCommand() {
    return this.executeCommandWith({
      execFile: this.execFileForCommand,
      arguments: ['--version']
    });
  }

  protected override generateProject() {
    const build = this.settings.buildTreeDirectory;
    const source = this.settings.rootDirectory;

    return this.executeCommandWith({
      execFile: this.execFileForCommand,
      arguments: ['-B', build, '-S', source, ...this.settings.additionalCmakeOptions]
    });
  }

  protected override build() {
    const build = this.settings.buildTreeDirectory;
    const target = this.settings.cmakeTarget;

    return this.executeCommandWith({
      execFile: this.execFileForTarget,
      arguments: ['--build', build, '--target', target]
    });
  }

  private executeCommandWith(options: {
    execFile: Imports.Adapters.Abstractions.processControl.ExecFileCallable,
    arguments: ReadonlyArray<string>
  }) {
    return new Promise<void>((resolve, reject) => {
      const cmakeCommand = this.settings.cmakeCommand;

      options.execFile(
        cmakeCommand, options.arguments,
        {
          cwd: this.settings.rootDirectory,
          env: process.env
        },
        (error, stdout, stderr) => {
          if (!error)
            return resolve();

          const errorMessage = `\n${error.message}\n${stderr}\n${stdout}`;

          return reject(new Error(errorMessage));
        });
    });
  }

  private readonly execFileForCommand: Imports.Adapters.Abstractions.processControl.ExecFileCallable;
  private readonly execFileForTarget: Imports.Adapters.Abstractions.processControl.ExecFileCallable;
};
