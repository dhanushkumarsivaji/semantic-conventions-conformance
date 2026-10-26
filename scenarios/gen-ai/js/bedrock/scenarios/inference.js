// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

"use strict";

/**
 * Conformance scenario: a plain Bedrock Converse call.
 *
 * Shared by every implementation under bedrock/, which is what makes their
 * results comparable. Nothing here turns instrumentation on, and nothing here
 * may: naming one would defeat the sharing.
 *
 * The same exchange as every other library's inference scenario: a system
 * instruction and one user turn, carrying every sampling option the
 * conventions have an attribute for and Converse accepts.
 */

const { ConverseCommand } = require("@aws-sdk/client-bedrock-runtime");
const {
  client,
  modelId,
  system,
  messages,
  inferenceConfig,
} = require("./common");

module.exports = async () => {
  await client().send(
    new ConverseCommand({
      modelId,
      system,
      messages: messages(),
      inferenceConfig,
    }),
  );
};
