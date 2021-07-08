import * as chai from 'chai';
import { describe, it, before, after } from 'mocha';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.should();

import * as Cov from '../../../src/extension/cov';
import { extensionId } from '../../../src/extension/definitions';

import { Disposable, OutputChannel, commands, window, Uri, workspace } from 'vscode';
import * as path from 'path';

describe('Extension test suite', () => {
  describe('The cov extension behavior', () => {
    describe('The instantiation of the extension as a vscode disposable', instantiateCovAsDisposableShouldSucceed);
    describe('The extension has a working vscode window output channel', covInstanceHasAnOutputChannel);
    describe('The extension can leverage vscode api adapters when executing the reportUncoveredRegionsInFile command', extensionCanExecuteCommand);
    describe('The freshly instantiated extension have an empty uncovered code regions editors collection', shouldHaveAnEmptyUncoveredCodeRegionsEditorsCollectionAtInstantiation);
  });
});

function instantiateCovAsDisposableShouldSucceed() {
  let cov: ReturnType<typeof Cov.make>;

  before('Instantiating Cov', () => cov = Cov.make());

  it('should succeed when instantiating the extension as a vscode disposable', () => {
    cov.asDisposable.should.be.an.instanceOf(Disposable);
  });

  after('Disposing of cov instance', () => cov.dispose());
}

function covInstanceHasAnOutputChannel() {
  let cov: ReturnType<typeof Cov.make>;

  before('Instantiating Cov', () => cov = Cov.make());

  it('should expose a vscode output channel', () => {
    const covExposesAVscodeOutputChannel = ((outputChannel: OutputChannel): outputChannel is OutputChannel => {
      return outputChannel.append !== undefined &&
        outputChannel.appendLine !== undefined &&
        outputChannel.clear !== undefined &&
        outputChannel.dispose !== undefined &&
        outputChannel.hide !== undefined &&
        outputChannel.name !== undefined &&
        outputChannel.show !== undefined;
    })(cov.outputChannel);

    covExposesAVscodeOutputChannel.should.be.equal(true);
  });

  after('Disposing of cov instance', () => cov.dispose());
}

function extensionCanExecuteCommand() {
  let cov: ReturnType<typeof Cov.make>;

  before('Instantiating Cov', () => cov = Cov.make());

  it('should run the command successfully', async () => {
    const workspaceRootFolder = workspace.workspaceFolders?.[0].uri.fsPath;
    const cppFilePath = path.join(<string>workspaceRootFolder, 'src', 'partiallyCovered', 'partiallyCoveredLib.cpp');

    await window.showTextDocument(Uri.file(cppFilePath), { preserveFocus: false });

    return commands.executeCommand(`${extensionId}.reportUncoveredCodeRegionsInFile`).should.eventually.be.fulfilled;
  });

  after('Disposing of cov instance', () => cov.dispose());
}

function shouldHaveAnEmptyUncoveredCodeRegionsEditorsCollectionAtInstantiation() {
  let cov: ReturnType<typeof Cov.make>;

  before('Instantiating Cov', () => cov = Cov.make());

  it('should contain an empty collection of uncovered code regions read only editors', () => {
    cov.uncoveredCodeRegionsEditors.should.be.empty;
  });

  after('Disposing of cov instance', () => cov.dispose());
}