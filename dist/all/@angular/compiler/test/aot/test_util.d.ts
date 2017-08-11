/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AotCompilerHost, AotCompilerOptions, GeneratedFile } from '@angular/compiler';
import { MetadataBundlerHost, ModuleMetadata } from '@angular/tsc-wrapped';
import * as ts from 'typescript';
export declare type MockFileOrDirectory = string | MockDirectory;
export declare type MockDirectory = {
    [name: string]: MockFileOrDirectory | undefined;
};
export declare function isDirectory(data: MockFileOrDirectory | undefined): data is MockDirectory;
export declare const settings: ts.CompilerOptions;
export interface EmitterOptions {
    emitMetadata: boolean;
    mockData?: MockDirectory;
}
export declare class EmittingCompilerHost implements ts.CompilerHost {
    private options;
    private addedFiles;
    private writtenFiles;
    private scriptNames;
    private root;
    private collector;
    constructor(scriptNames: string[], options: EmitterOptions);
    writtenAngularFiles(target?: Map<string, string>): Map<string, string>;
    addScript(fileName: string, content: string): void;
    override(fileName: string, content: string): void;
    addWrittenFile(fileName: string, content: string): void;
    getWrittenFiles(): {
        name: string;
        content: string;
    }[];
    readonly scripts: string[];
    readonly written: Map<string, string>;
    effectiveName(fileName: string): string;
    fileExists(fileName: string): boolean;
    readFile(fileName: string): string;
    directoryExists(directoryName: string): boolean;
    getCurrentDirectory(): string;
    getDirectories(dir: string): string[];
    getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void): ts.SourceFile;
    getDefaultLibFileName(options: ts.CompilerOptions): string;
    writeFile: ts.WriteFileCallback;
    getCanonicalFileName(fileName: string): string;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
}
export declare class MockCompilerHost implements ts.CompilerHost {
    private data;
    scriptNames: string[];
    overrides: Map<string, string>;
    writtenFiles: Map<string, string>;
    private sourceFiles;
    private assumeExists;
    private traces;
    constructor(scriptNames: string[], data: MockDirectory);
    override(fileName: string, content: string): void;
    addScript(fileName: string, content: string): void;
    assumeFileExists(fileName: string): void;
    remove(files: string[]): void;
    fileExists(fileName: string): boolean;
    readFile(fileName: string): string;
    trace(s: string): void;
    getCurrentDirectory(): string;
    getDirectories(dir: string): string[];
    getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void): ts.SourceFile;
    getDefaultLibFileName(options: ts.CompilerOptions): string;
    writeFile: ts.WriteFileCallback;
    getCanonicalFileName(fileName: string): string;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
    private getFileContent(fileName);
    private getEffectiveName(name);
}
export declare class MockAotCompilerHost implements AotCompilerHost {
    private tsHost;
    private metadataCollector;
    private metadataVisible;
    private dtsAreSource;
    constructor(tsHost: MockCompilerHost);
    hideMetadata(): void;
    tsFilesOnly(): void;
    getMetadataFor(modulePath: string): {
        [key: string]: any;
    }[] | undefined;
    moduleNameToFileName(moduleName: string, containingFile: string): string | null;
    loadSummary(filePath: string): string | null;
    isSourceFile(sourceFilePath: string): boolean;
    getOutputFileName(sourceFilePath: string): string;
    fileNameToModuleName(importedFile: string, containingFile: string): string | null;
    loadResource(path: string): string;
}
export declare class MockMetadataBundlerHost implements MetadataBundlerHost {
    private host;
    private collector;
    constructor(host: ts.CompilerHost);
    getMetadataFor(moduleName: string): ModuleMetadata | undefined;
}
export declare type MockFileArray = {
    fileName: string;
    content: string;
}[];
export declare type MockData = MockDirectory | Map<string, string> | (MockDirectory | Map<string, string>)[];
export declare function toMockFileArray(data: MockData, target?: MockFileArray): MockFileArray;
export declare function arrayToMockMap(arr: MockFileArray): Map<string, string>;
export declare function arrayToMockDir(arr: MockFileArray): MockDirectory;
export declare function setup(options?: {
    compileAngular: boolean;
    compileAnimations: boolean;
}): Map<string, string>;
export declare function expectNoDiagnostics(program: ts.Program): void;
export declare function isSource(fileName: string): boolean;
export declare function compile(rootDirs: MockData, options?: {
    emit?: boolean;
    useSummaries?: boolean;
    preCompile?: (program: ts.Program) => void;
    postCompile?: (program: ts.Program) => void;
    stubsOnly?: boolean;
} & AotCompilerOptions, tsOptions?: ts.CompilerOptions): {
    genFiles: GeneratedFile[];
    outDir: MockDirectory;
};
