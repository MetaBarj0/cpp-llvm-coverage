import * as VscodeFakes from '../../fakes/adapters/vscode';
import * as FileSystemFakes from '../../fakes/adapters/file-system';
import * as ProcessControlFakes from '../../fakes/adapters/process-control';
import * as SettingsProviderModule from '../../../src/modules/settings-provider/domain/implementations/settings-provider';
import * as CoverageInfoFileResolverModule from '../../../src/modules/coverage-info-file-resolver/domain/implementations/coverage-info-file-resolver';
import * as RegionCoverageInfoModule from '../../../src/modules/coverage-info-collector/domain/abstractions/region-coverage-info';
import * as CoverageInfoCollectorModule from '../../../src/modules/coverage-info-collector/domain/implementations/coverage-info-collector';
import * as BuildTreeDirectoryResolverModule from '../../../src/modules/build-tree-directory-resolver/domain/implementations/build-tree-directory-resolver';
import * as CmakeModule from '../../../src/modules/cmake/domain/implementations/cmake';
import * as TestUtilsModule from '../../utils/settings';
import * as DefinitionsModule from '../../../src/extension/definitions';

export namespace Fakes {
  export namespace Adapters {
    export namespace vscode {
      export const buildFakeWorkspaceWithoutWorkspaceFolderAndWithoutSettings = VscodeFakes.buildFakeWorkspaceWithoutWorkspaceFolderAndWithoutSettings;
      export const buildSpyOfErrorChannel = VscodeFakes.buildSpyOfErrorChannel;
      export const buildFakeErrorChannel = VscodeFakes.buildFakeErrorChannel;
      export const buildFakeWorkspaceWithWorkspaceFolderAndOverridableDefaultSettings = VscodeFakes.buildFakeWorkspaceWithWorkspaceFolderAndOverridableDefaultSettings;
      export const buildFakeProgressReporter = VscodeFakes.buildFakeProgressReporter;
      export const buildSpyOfProgressReporter = VscodeFakes.buildSpyOfProgressReporter;
    }

    export namespace FileSystem {
      export const buildFakeGlobSearchForNoMatch = FileSystemFakes.buildFakeGlobSearchForNoMatch;
      export const buildFakeGlobSearchForExactlyOneMatch = FileSystemFakes.buildFakeGlobSearchForExactlyOneMatch;
      export const buildEmptyReadableStream = FileSystemFakes.buildEmptyReadableStream;
      export const buildInvalidLlvmCoverageJsonObjectStream = FileSystemFakes.buildInvalidLlvmCoverageJsonObjectStream;
      export const buildNotJsonStream = FileSystemFakes.buildNotJsonStream;
      export const buildFakeStreamBuilder = FileSystemFakes.buildFakeStreamBuilder;
      export const buildValidLlvmCoverageJsonObjectStream = FileSystemFakes.buildValidLlvmCoverageJsonObjectStream;
      export const buildFakeFailingStatFile = FileSystemFakes.buildFakeFailingStatFile;
      export const buildFakeFailingMkDir = FileSystemFakes.buildFakeFailingMkDir;
      export const buildFakeSucceedingStatFile = FileSystemFakes.buildFakeSucceedingStatFile;
      export const buildFakeSucceedingMkDir = FileSystemFakes.buildFakeSucceedingMkDir;
    }

    export namespace ProcessControl {
      export const buildFakeFailingProcess = ProcessControlFakes.buildFakeFailingProcess;
      export const buildFakeSucceedingProcess = ProcessControlFakes.buildFakeSucceedingProcess;
    }
  }
}

export namespace Domain {
  export namespace Implementations {
    export namespace SettingsProvider {
      export const make = SettingsProviderModule.make;
    }

    export namespace CoverageInfoFileResolver {
      export const make = CoverageInfoFileResolverModule.make;
    }

    export namespace CoverageInfoCollector {
      export const make = CoverageInfoCollectorModule.make;
    }

    export namespace BuildTreeDirectoryResolver {
      export const make = BuildTreeDirectoryResolverModule.make;
    }

    export namespace Cmake {
      export const make = CmakeModule.make;
    }
  }

  export namespace Abstractions {
    export type RegionCoverageInfo = RegionCoverageInfoModule.RegionCoverageInfo;
  }
}

export namespace TestUtils {
  export const defaultSetting = TestUtilsModule.defaultSetting;
}

export namespace Extension {
  export namespace Definitions {
    export const extensionNameInSettings = DefinitionsModule.extensionNameInSettings;
  }
}