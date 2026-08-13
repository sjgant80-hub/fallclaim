// audit.mjs — fallclaim's audit layout, and the chain built from it.
//
// ⚑ THE BYTES MUST NOT CHANGE. There are logs in the wild signed by the old inline writer. If this
// layout differs by one character, every entry a firm has already written stops reproducing and the
// verifier reports its whole history as tampered. Making a real audit trail look forged is a worse
// outcome than not checking it at all, so this is a faithful copy and audit.test.mjs pins it against
// the original formula.
//
// The chain semantics live in the shared, separately-gated audit-chain kernel. Only the byte layout
// is this repo's business.
import { auditChain } from './audit-chain.mjs';

export function payloadOf(prevHash, entry, index) {
  const e = (entry && typeof entry === 'object') ? entry : {};
  const p = e.payload ?? {};
  // ⚑ KEY ORDER IS PART OF THE SIGNATURE. JSON.stringify walks keys in insertion order, so this
  // object is built in exactly the order the original built its body. Reordering one line here
  // silently invalidates every entry ever written.
  return JSON.stringify({
    i: e.i, ts: e.ts, tool: e.tool, adviserId: p.adviserId || '', clientId: p.clientId || '',
    caseId: p.caseId || '', action: e.action, reasoning: e.reasoning,
    configVersion: e.configVersion, prevHash: String(prevHash == null ? '' : prevHash), payload: p,
  });
}

/** The writer and the checker, from one call, over one layout — so they cannot drift apart. */
export function makeAuditChain(sha256) {
  return auditChain({
    sha256,
    payloadOf: payloadOf,
    hashField: "docHash",
  });
}

export default { payloadOf, makeAuditChain };
