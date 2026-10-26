// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { ConverseCommand } = require("@aws-sdk/client-bedrock-runtime");
const common = require("./common");
const inference = require("./inference");

describe("bedrock inference scenario contract", () => {
  it("exports an async workload without importing OpenTelemetry", () => {
    assert.equal(typeof inference, "function");
    const source = require("node:fs").readFileSync(
      require.resolve("./inference"),
      "utf8",
    );
    assert.equal(source.includes("opentelemetry"), false);
  });

  it("carries the sampling options the inference class requires", () => {
    assert.equal(common.inferenceConfig.maxTokens, 100);
    assert.equal(common.inferenceConfig.temperature, 0.5);
    assert.equal(common.inferenceConfig.topP, 0.9);
    assert.deepEqual(common.inferenceConfig.stopSequences, ["\n\n"]);
  });

  it("builds a Converse command matching the Python bedrock exchange", () => {
    const command = new ConverseCommand({
      modelId: common.modelId,
      system: common.system,
      messages: common.messages(),
      inferenceConfig: common.inferenceConfig,
    });
    assert.equal(command.input.modelId, common.modelId);
    assert.equal(command.input.system[0].text, "You are a helpful assistant.");
    assert.equal(
      command.input.messages[0].content[0].text,
      "Say this is a test",
    );
  });
});
