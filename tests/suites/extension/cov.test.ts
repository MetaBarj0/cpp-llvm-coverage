import * as chai from 'chai';
import { describe, it, before, after } from 'mocha';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.should();

import * as Cov from '../../../src/extension/factories/cov';

import { Disposable, OutputChannel } from 'vscode';

describe('Extension test suite', () => {
  describe('The cov extension behavior', () => {
    describe('The instantiation of the extension as a vscode disposable', instantiateCovAsDisposableShouldSucceed);
    describe('The extension has a working vscode window output channel', covInstanceHasAnOutputChannel);
    describe('The extension can leverage vscode progress infrastructure', extensionCanShowProgress);
  });
});

function instantiateCovAsDisposableShouldSucceed() {
  let cov: ReturnType<typeof Cov.make>;

  before('Instantiating Cov', () => {
    cov = Cov.make();
  });

  it('should succeed when instantiating the extension as a vscode disposable', () => {
    cov.asDisposable.should.be.an.instanceOf(Disposable);
  });

  after('Disposing of cov instance', () => {
    cov.dispose();
  });
}

function covInstanceHasAnOutputChannel() {
  let cov: ReturnType<typeof Cov.make>;

  before('Instantiating Cov', () => {
    cov = Cov.make();
  });

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

  after('Disposing of cov instance', () => {
    cov.dispose();
  });
}

function extensionCanShowProgress() {
  let cov: ReturnType<typeof Cov.make>;

  before('Instantiating Cov', () => {
    cov = Cov.make();
  });

  it('should show progress when used', () => {
    cov.run().should.eventually.be.fulfilled;
  });

  after('Disposing of cov instance', () => {
    cov.dispose();
  });
}