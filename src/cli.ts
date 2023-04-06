#!/usr/bin/env node
import { makeProgram } from './command';

const program = makeProgram();
program.parseAsync(process.argv);
