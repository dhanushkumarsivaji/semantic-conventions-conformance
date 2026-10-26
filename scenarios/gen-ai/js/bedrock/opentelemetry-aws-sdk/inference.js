// Copyright The OpenTelemetry Authors
// SPDX-License-Identifier: Apache-2.0

"use strict";

const {
  AwsInstrumentation,
} = require("@opentelemetry/instrumentation-aws-sdk");
const { runScenario } = require("@otel-conformance/scenario-sdk");

runScenario({ instrumentations: [new AwsInstrumentation()] }, () =>
  require("@otel-conformance/bedrock-scenarios/inference")(),
);
