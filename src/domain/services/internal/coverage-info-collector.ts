import * as SettingsProvider from './settings-provider';
import * as CoverageInfoFileResolver from './coverage-info-file-resolver';
import * as ProgressReporter from './progress-reporter';
import * as ErrorChannel from './error-channel';
import { CoverageInfoCollectorContract } from '../../interfaces/coverage-info-collector-contract';
import { VscodeWorkspaceLike } from '../../../adapters/interfaces/vscode-workspace';

import { Readable } from 'stream';
import { CoverageInfo } from '../../value-objects/coverage-info';

export function make(adapters: Adapters): CoverageInfoCollectorContract {
  return new CoverageInfoCollector(adapters);
}

export type LLVMCoverageInfoStreamBuilder = {
  createStream: (path: string) => Readable;
};

class CoverageInfoCollector implements CoverageInfoCollectorContract {
  constructor(adapters: Adapters) {
    this.workspace = adapters.workspace;
    this.globSearch = adapters.globSearch;
    this.llvmCoverageInfoStreamBuilder = adapters.llvmCoverageInfoStreamBuilder;
    this.progressReporter = adapters.progressReporter;
    this.errorChannel = adapters.errorChannel;
  }

  async collectFor(sourceFilePath: string) {
    const coverageInfoFileResolver = CoverageInfoFileResolver.make({
      workspace: this.workspace,
      globSearch: this.globSearch,
      progressReporter: this.progressReporter,
      errorChannel: this.errorChannel
    });

    const path = await coverageInfoFileResolver.resolveCoverageInfoFileFullPath();

    // TODO: find a way to report progress...better
    this.progressReporter.report({
      message: 'Prepared summary and uncovered region of code information.',
      increment: 100 / 6 * 6
    });

    return new CoverageInfo(() => this.llvmCoverageInfoStreamBuilder.createStream(path), sourceFilePath, this.errorChannel);
  }

  private readonly workspace: VscodeWorkspaceLike;
  private readonly globSearch: CoverageInfoFileResolver.GlobSearchLike;
  private readonly llvmCoverageInfoStreamBuilder: LLVMCoverageInfoStreamBuilder;
  private readonly progressReporter: ProgressReporter.ProgressLike;
  private readonly errorChannel: ErrorChannel.OutputChannelLike;
};

type Adapters = {
  workspace: VscodeWorkspaceLike,
  globSearch: CoverageInfoFileResolver.GlobSearchLike,
  llvmCoverageInfoStreamBuilder: LLVMCoverageInfoStreamBuilder,
  progressReporter: ProgressReporter.ProgressLike,
  errorChannel: ErrorChannel.OutputChannelLike
};
