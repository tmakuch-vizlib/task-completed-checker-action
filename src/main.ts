import * as core from '@actions/core';
import * as github from '@actions/github';
import { removeIgnoreTaskLitsText } from './utils';

async function run(): Promise<void> {
  try {
    const body = github.context.payload.pull_request?.body;
    if (!body) {
      core.info('no task list and skip the process.');
      return;
    }

    const result = removeIgnoreTaskLitsText(body);

    const isTaskCompleted = result.match(/(- \[[ ]\].+)/g) === null;
    if (!isTaskCompleted) {
      core.setFailed('Some tasks are not completed.');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
