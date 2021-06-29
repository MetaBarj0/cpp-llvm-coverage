import { defaultSetting } from '../../utils/settings';

import { SettingsContract } from '../../../src/domain/interfaces/settings-contract';
import {
  VscodeUriLike,
  VscodeWorkspaceConfigurationLike,
  VscodeWorkspaceFolderLike, VscodeWorkspaceLike
} from '../../../src/adapters/interfaces/vscode-workspace';

export namespace vscodeWorkspace {
  type Overrides = {
    -readonly [Property in keyof SettingsContract]?: SettingsContract[Property]
  };

  export function buildFakeWorkspaceWithWorkspaceFolderAndOverridableDefaultSettings(overrides: Overrides = {}): VscodeWorkspaceLike {
    return new class implements VscodeWorkspaceLike {
      constructor(overrides: Overrides) {
        this.overrides = overrides;
      }

      workspaceFolders = [
        new class implements VscodeWorkspaceFolderLike {
          uri = new class implements VscodeUriLike {
            fsPath = defaultSetting('rootDirectory').toString();
          };
        }];

      getConfiguration(_section?: string) {
        return new class implements VscodeWorkspaceConfigurationLike {
          constructor(overrides: Overrides) {
            this.overrides = overrides;
          }

          get(section: keyof SettingsContract) {
            if (this.overrides[section])
              return <SettingsContract[typeof section]>this.overrides[section];

            return defaultSetting(section);
          }

          private overrides: Overrides;
        }(this.overrides);
      }

      private overrides: Overrides;
    }(overrides);
  }

  export function buildFakeWorkspaceWithoutWorkspaceFolderAndWithoutSettings(): VscodeWorkspaceLike {
    return new class implements VscodeWorkspaceLike {
      workspaceFolders = undefined;

      getConfiguration(_section?: string) {
        return new class implements VscodeWorkspaceConfigurationLike {
          get(section: keyof SettingsContract) {
            return defaultSetting(section);
          }
        };
      };
    };
  }
}
