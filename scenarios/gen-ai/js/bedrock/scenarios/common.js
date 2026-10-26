// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

"use strict";

const { BedrockRuntimeClient } = require("@aws-sdk/client-bedrock-runtime");
const { NodeHttpHandler } = require("@smithy/node-http-handler");

/**
 * Shared Bedrock Runtime client and request pieces.
 *
 * The mock endpoint comes from AWS_ENDPOINT_URL_BEDROCK_RUNTIME, which
 * conformance.yaml maps from ${MOCK_SERVER_URL}. Credentials are only needed
 * to sign the request; the mock does not verify them.
 *
 * Bedrock's default Node transport prefers HTTP/2; the GenAI mock server is
 * plain HTTP/1.1 Flask, so the client is pinned to NodeHttpHandler.
 */
function client() {
  const endpoint = process.env.AWS_ENDPOINT_URL_BEDROCK_RUNTIME;
  return new BedrockRuntimeClient({
    region: process.env.AWS_DEFAULT_REGION || "us-east-1",
    requestHandler: new NodeHttpHandler(),
    ...(endpoint ? { endpoint } : {}),
  });
}

module.exports = {
  client,
  modelId: "anthropic.claude-3-5-sonnet-20240620-v1:0",
  system: [{ text: "You are a helpful assistant." }],
  messages: () => [{ role: "user", content: [{ text: "Say this is a test" }] }],
  // Every sampling option Converse accepts and the conventions attribute.
  // Bedrock has no seed and no penalties, so those stay absent.
  inferenceConfig: {
    maxTokens: 100,
    temperature: 0.5,
    topP: 0.9,
    stopSequences: ["\n\n"],
  },
};
