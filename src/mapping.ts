//@ts-ignore
import { BigInt, require } from "@hyperoracle/zkgraph-lib";
import { Bytes, Block, Event} from "@hyperoracle/zkgraph-lib";
import { TwoString } from "./events/twostring";
import { until, beyond, find, rfind, concat } from "./utils/basics";

let addr = Bytes.fromHexString('0xc9f47C58d6e87D902Acb826cf31220C1429F5236');

let esig_until = Bytes.fromHexString('0xb210ae05de079c8a70587dd78abb12abf9e026404a3f73336b7ef22ab0f3f863');

let esig_beyond = Bytes.fromHexString('0x833204b0f1287665edfec99f3aa2b03446df15faca4bd4ccc1a7cea84571199e');

let esig_find = Bytes.fromHexString('0xb20c041f6c43cba208bc953ca1a88206192971cc30ff2310e76bc680a7785297');

let esig_rfind = Bytes.fromHexString('0x0775b21f5ec381c37c1c46c80636c6b7079b77e35462d1082ba5d013a32f78e1');

let esig_concat = Bytes.fromHexString('0xc403a8f5179114f328ff461ae8669e39dbcbc308c025dd177e8c8cce45ad4472');


export function handleBlocks(blocks: Block[]): Bytes {
  // init output state
  let calculatedWithFunctionHash: Bytes = Bytes.fromHexString("0x");

  // #1 can access all (matched) events of the latest block
  let events: Event[] = blocks[0].events;

  // #2 also can access (matched) events of a given account address (should present in yaml first).
  // a subset of 'events'
  let eventsByAcct: Event[] = blocks[0].account(addr).events;

  require(eventsByAcct.length > 0);

  let eventsByAcctEsigUntil: Event[] = blocks[0].account(addr).eventsByEsig(esig_until)
  let eventsByAcctEsigBeyond: Event[] = blocks[0].account(addr).eventsByEsig(esig_beyond)
  let eventsByAcctEsigFind: Event[] = blocks[0].account(addr).eventsByEsig(esig_find)
  let eventsByAcctEsigRfind: Event[] = blocks[0].account(addr).eventsByEsig(esig_rfind)
  let eventsByAcctEsigConcat: Event[] = blocks[0].account(addr).eventsByEsig(esig_concat)

  let result: string = "";
  let isEventExist: bool = false;

  if (eventsByAcctEsigUntil.length > 0) {
    let event = eventsByAcctEsigUntil[0];
    let twostring = TwoString.fromEvent(event);

    result = until(twostring.slice1, twostring.slice2);
    isEventExist = true;
  }

  if (eventsByAcctEsigBeyond.length > 0) {
    let event = eventsByAcctEsigBeyond[0];
    let twostring = TwoString.fromEvent(event);

    
    result = beyond(twostring.slice1, twostring.slice2);
    isEventExist = true;
  }

  if (eventsByAcctEsigFind.length > 0) {
    let event = eventsByAcctEsigFind[0];
    let twostring = TwoString.fromEvent(event);

    result = find(twostring.slice1, twostring.slice2);
    isEventExist = true;
  }

  if (eventsByAcctEsigRfind.length > 0) {
    let event = eventsByAcctEsigRfind[0];
    let twostring = TwoString.fromEvent(event);

    result = rfind(twostring.slice1, twostring.slice2);
    isEventExist = true;
  }

  if (eventsByAcctEsigConcat.length > 0) {
    let event = eventsByAcctEsigConcat[0];
    let twostring = TwoString.fromEvent(event);

    result = concat(twostring.slice1, twostring.slice2);
    isEventExist = true;
  }

  require(isEventExist);

  for (let i = events.length - 1; i >= 0; i--) {
    if (
      events[i].address == addr &&
      (events[i].esig == esig_until ||
        events[i].esig == esig_beyond ||
        events[i].esig == esig_find ||
        events[i].esig == esig_rfind ||
        events[i].esig == esig_concat)
    ) {
      const destinationFunction = "0xa444f5e9";

      // merging the function hash with the calculated value to create calldata
      calculatedWithFunctionHash = Bytes.fromHexString(
        destinationFunction + Bytes.fromUTF8(result).toHexString().padStart(64, "0")
      );

    }
  }

  return calculatedWithFunctionHash;
}


